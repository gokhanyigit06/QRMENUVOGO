import { createClient } from '@supabase/supabase-js';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
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

async function syncIcons() {
    console.log("Fetching matching restaurant from Supabase...");
    
    // 1. Fetch from Supabase
    const { data: supaRest, error: supaRestErr } = await supabase
        .from('restaurants')
        .select('*')
        .eq('slug', 'mickeys')
        .single();
    
    if (supaRestErr) {
        console.error("Supabase Restaurant Error:", supaRestErr);
        return;
    }
    
    const { data: supaCats, error: supaCatsErr } = await supabase
        .from('categories')
        .select('*')
        .eq('restaurant_id', supaRest.id);
        
    if (supaCatsErr) {
        console.error("Supabase Categories Error:", supaCatsErr);
        return;
    }

    console.log(`Found ${supaCats.length} categories for Mickey's in Supabase.`);

    // 2. Fetch from Firebase
    console.log("Fetching matching restaurant from Firebase...");
    const restQuery = query(collection(db, 'restaurants'), where('slug', '==', 'mickeys'));
    const restSnap = await getDocs(restQuery);
    
    if (restSnap.empty) {
        console.error("Firebase Restaurant 'mickeys' not found.");
        return;
    }
    
    const fireRestId = restSnap.docs[0].id;
    
    const catQuery = query(collection(db, 'categories'), where('restaurant_id', '==', fireRestId));
    const catSnap = await getDocs(catQuery);
    
    console.log(`Found ${catSnap.docs.length} categories in Firebase.`);
    
    let updatedCount = 0;

    for (const catDoc of catSnap.docs) {
        const fireCat = catDoc.data();
        
        // Find matching category in supabase
        const matchingSupaCat = supaCats.find(c => 
            c.name.trim().toLowerCase() === fireCat.name?.trim().toLowerCase()
        );
        
        // Let's also sync the category layout layout_mode or sizes if we want, but user asked for icons
        if (matchingSupaCat && matchingSupaCat.icon) {
            console.log(`Updating '${fireCat.name}' icon to '${matchingSupaCat.icon}'`);
            await updateDoc(doc(db, 'categories', catDoc.id), {
                icon: matchingSupaCat.icon
            });
            updatedCount++;
        }
    }
    
    console.log(`Successfully updated ${updatedCount} category icons in Firebase!`);
    process.exit(0);
}

syncIcons();
