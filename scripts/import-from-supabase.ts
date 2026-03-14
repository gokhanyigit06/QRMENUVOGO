import { createClient } from '@supabase/supabase-js';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, addDoc, serverTimestamp, setDoc, doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import fetch from 'node-fetch'; // if we need fetch in Node
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Initialize Supabase
const supabaseUrl = 'https://ppyvajojssguolwrqkzb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBweXZham9qc3NndW9sd3Jxa3piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY2ODA0MDcsImV4cCI6MjA4MjI1NjQwN30.bgYKvBnDWbAHDdKqEBhY5mQ9C-ja8mMm7Wb3DobyB7s';
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

async function uploadImageToFirebase(imageUrl: string, slug: string, folder: 'categories' | 'products'): Promise<string | null> {
    if (!imageUrl) return null;
    
    try {
        const response = await fetch(imageUrl);
        if (!response.ok) return imageUrl; // Resim olarak indirilemezse eski URL'i koru
        
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.jpg`;
        
        const storageRef = ref(storage, `restaurants/${slug}/${folder}/${fileName}`);
        
        // Use uploadBytes with proper metadata
        const metadata = { contentType: 'image/jpeg' };
        await uploadBytes(storageRef, new Uint8Array(buffer), metadata);
        
        return await getDownloadURL(storageRef);
    } catch (e) {
        console.error(`Resim yüklenemedi: ${imageUrl}`, e);
        return imageUrl; // Hata olursa eski resmi tut
    }
}

async function startImport(targetSlug: string) {
    console.log(`\n\n=== ${targetSlug.toUpperCase()} İÇİN İÇE AKTARMA BAŞLIYOR ===`);
    
    // 1. Firebase'den Restoranı Bul (Senin sys adminden eklediğin)
    const restQuery = query(collection(db, 'restaurants'), where('slug', '==', targetSlug));
    const restSnap = await getDocs(restQuery);
    
    if (restSnap.empty) {
        console.error(`Firebase'de ${targetSlug} slug'ına sahip restoran BULUNAMADI! Lütfen önce System Admin panelinden restoranı oluşturun.`);
        return;
    }
    
    const firebaseRestId = restSnap.docs[0].id;
    console.log(`Firebase Restaurant ID: ${firebaseRestId}`);

    // 2. Supabase'den Restoranı Bul
    const { data: supaRest, error: supaRestErr } = await supabase
        .from('restaurants')
        .select('*')
        .eq('slug', targetSlug)
        .single();
        
    if (supaRestErr || !supaRest) {
        console.error(`Supabase'de ${targetSlug} restoranı bulunamadı.`, supaRestErr);
        return;
    }
    
    const supabaseRestId = supaRest.id;
    console.log(`Supabase Restaurant ID: ${supabaseRestId}`);

    // Kategori ID eşleştirmesi için Map (Supabase ID -> Firebase ID)
    const categoryIdMap = new Map<string, string>();

    /* --- KATEGORI VE URUNU GECICI OLARAK COMMENTE ALIYORUM SADECE AYARLARI HIZLI CEKSIN ---
    // 2.5 ÖNCE VAR OLAN KATEGORİ VE ÜRÜNLERİ SİL (DUPLICATE ÖNLEMEK İÇİN)
    console.log(`\n--- ${targetSlug} için eski kategoriler ve ürünler temizleniyor ---`);
    const qOldCats = query(collection(db, 'categories'), where('restaurant_id', '==', firebaseRestId));
    const oldCatsSnap = await getDocs(qOldCats);
    for (const doc of oldCatsSnap.docs) { await deleteDoc(doc.ref); }
    
    const qOldProds = query(collection(db, 'products'), where('restaurant_id', '==', firebaseRestId));
    const oldProdsSnap = await getDocs(qOldProds);
    for (const doc of oldProdsSnap.docs) { await deleteDoc(doc.ref); }

    // 3. KATEGORİLERİ ÇEK VE YÜKLE
    console.log(`\n--- Kategoriler Çekiliyor ---`);
    const { data: supaCategories, error: supaCatErr } = await supabase
        .from('categories')
        .select('*')
        .eq('restaurant_id', supabaseRestId);

    if (supaCatErr) {
        console.error("Supabase kategorileri çekilemedi", supaCatErr);
        return;
    }

    console.log(`${supaCategories.length} kategori bulundu.`);
    let catCount = 0;
    
    for (const supaCat of supaCategories) {
        console.log(`Kategori yükleniyor: ${supaCat.name}`);
        
        let newImageUrl = supaCat.image;
        if (newImageUrl) {
            newImageUrl = await uploadImageToFirebase(newImageUrl, targetSlug, 'categories');
        }

        const newCatData = {
            restaurant_id: firebaseRestId,
            name: supaCat.name || '',
            name_en: supaCat.nameEn || '',
            description: supaCat.description || '',
            badge: supaCat.badge || '',
            image: newImageUrl || '',
            icon: supaCat.icon || '',
            icon_color: supaCat.iconColor || '#000',
            icon_size: supaCat.iconSize || 'medium',
            layout_mode: supaCat.layout_mode || 'grid',
            segment: supaCat.segment || 'food',
            station_name: supaCat.station_name || 'Mutfak',
            sort_order: supaCat.sortOrder || catCount,
            visibility_days: supaCat.visibility_days || [],
            visibility_start_time: supaCat.visibility_start_time || '',
            visibility_end_time: supaCat.visibility_end_time || '',
            slug: supaCat.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            created_at: serverTimestamp()
        };

        const docRef = await addDoc(collection(db, 'categories'), Object.fromEntries(Object.entries(newCatData).filter(([_, v]) => v !== undefined)));
        categoryIdMap.set(supaCat.id, docRef.id);
        catCount++;
    }

    // 4. ÜRÜNLERİ ÇEK VE YÜKLE
    console.log(`\n--- Ürünler Çekiliyor ---`);
    const { data: supaProducts, error: supaProdErr } = await supabase
        .from('products')
        .select('*')
        .eq('restaurant_id', supabaseRestId);

    if (supaProdErr) {
        console.error("Supabase ürünleri çekilemedi", supaProdErr);
        return;
    }

    console.log(`${supaProducts.length} ürün bulundu.`);
    let prodCount = 0;

    for (const supaProd of supaProducts) {
        console.log(`Ürün yükleniyor: ${supaProd.name}`);
        
        const newCategoryId = categoryIdMap.get(supaProd.category_id);
        if (!newCategoryId) {
            console.warn(`DİKKAT: '${supaProd.name}' ürününün kategorisi eşleşmedi, atlanıyor...`);
            continue;
        }

        let newProdImageUrl = supaProd.image;
        if (newProdImageUrl) {
            newProdImageUrl = await uploadImageToFirebase(newProdImageUrl, targetSlug, 'products');
        }

        const newProdData = {
            restaurant_id: firebaseRestId,
            category_id: newCategoryId,
            name: supaProd.name || '',
            name_en: supaProd.nameEn || '',
            description: supaProd.description || '',
            description_en: supaProd.descriptionEn || '',
            price: supaProd.price || 0,
            discount_price: supaProd.discountPrice || null,
            image: newProdImageUrl || '',
            badge: supaProd.badge || '',
            is_active: supaProd.isActive !== false,
            sort_order: supaProd.sortOrder || prodCount,
            tags: supaProd.tags || [],
            allergens: supaProd.allergens || [],
            variants: supaProd.variants || [],
            created_at: serverTimestamp()
        };

        await addDoc(collection(db, 'products'), Object.fromEntries(Object.entries(newProdData).filter(([_, v]) => v !== undefined)));
        prodCount++;
    }
    ---- KATEGORI VE URUN SONU --- */

    // 5. AYARLARI ÇEK VE YÜKLE
    console.log(`\n--- Ayarlar (Settings) Çekiliyor ---`);
    const { data: supaSettings, error: supaSetErr } = await supabase
        .from('settings')
        .select('*')
        .eq('restaurant_id', supabaseRestId)
        .single();
        
    if (supaSetErr || !supaSettings) {
        console.warn("Supabase ayarları (settings) çekilemedi veya yok, varsayılan bırakılıyor.");
    } else {
        console.log(`Ayarlar bulundu, aktarılıyor (Logo, Banner vb.).`);
        
        let newLogoUrl = supaSettings.logo_url;
        if (newLogoUrl) {
            newLogoUrl = await uploadImageToFirebase(newLogoUrl, targetSlug, 'settings' as any);
        }

        let newDefaultProductImage = supaSettings.default_product_image;
        if (newDefaultProductImage) {
             newDefaultProductImage = await uploadImageToFirebase(newDefaultProductImage, targetSlug, 'settings' as any);
        }

        let newBannerUrls = supaSettings.banner_urls || [];
        if (Array.isArray(newBannerUrls) && newBannerUrls.length > 0) {
            const updatedBanners = [];
            for (const bUrl of newBannerUrls) {
                if (bUrl) {
                    const uploaded = await uploadImageToFirebase(bUrl, targetSlug, 'settings' as any);
                    updatedBanners.push(uploaded);
                }
            }
            newBannerUrls = updatedBanners;
        }

        const newSettingsData = {
             restaurant_id: firebaseRestId,
             ...supaSettings, // Tüm kalan ayarları taşı
             logo_url: newLogoUrl || '',
             default_product_image: newDefaultProductImage || '',
             banner_urls: newBannerUrls
        };
        
        // Supabase id veya db metadata'yı temizle
        delete newSettingsData.id;

        await setDoc(doc(db, 'settings', firebaseRestId), Object.fromEntries(Object.entries(newSettingsData).filter(([_, v]) => v !== undefined)));
        console.log(`Ayarlar başarıyla Firebase'e yazıldı.`);
    }

    console.log(`\n=== EŞLEŞTİRME BAŞARIYLA TAMAMLANDI ===`);
}

async function run() {
    // Önce mickeys, sonra botin için çalıştırıyoruz.
    await startImport('mickeys');
    await startImport('botin');
    process.exit(0);
}

run();
