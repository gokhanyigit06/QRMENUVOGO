
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Load Env
function loadEnv() {
    const envFiles = ['.env.local', '.env'];
    for (const file of envFiles) {
        const filePath = path.join(process.cwd(), file);
        if (fs.existsSync(filePath)) {
            console.log(`Loading env from ${file}`);
            const content = fs.readFileSync(filePath, 'utf-8');
            content.split('\n').forEach(line => {
                const [key, value] = line.split('=');
                if (key && value) {
                    process.env[key.trim()] = value.trim().replace(/^["']|["']$/g, '');
                }
            });
        }
    }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env or .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupTest() {
    console.log('Fetching restaurants...');
    const { data: restaurants, error } = await supabase.from('restaurants').select('*').limit(1);

    if (error || !restaurants || restaurants.length === 0) {
        console.error('Error fetching restaurant or no restaurant found:', error);
        return;
    }

    const restaurant = restaurants[0];
    console.log('Found restaurant:', restaurant.name, 'ID:', restaurant.id);

    console.log('Updating website domain to "test-site"...');
    const { error: updateError } = await supabase
        .from('restaurants')
        .update({
            website_domain: 'test-site',
            website_settings: {
                hero: {
                    title: "Lezzet Dünyasına Hoş Geldiniz",
                    subtitle: "En taze malzemelerle hazırlanan eşsiz tatlar.",
                    buttonText: "Menüyü Gör",
                    buttonLink: "/menu",
                    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
                },
                about: {
                    title: "Biz Kimiz?",
                    content: "1990'dan beri şehrin kalbinde, misafirlerimize unutulmaz deneyimler sunuyoruz. Geleneksel tarifleri modern dokunuşlarla harmanlıyoruz.",
                    imageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
                },
                contact: {
                    address: "Bağdat Caddesi No: 123, Kadıköy, İstanbul",
                    phone: "+90 216 123 45 67",
                    email: "info@lezzetdunyasi.com",
                    mapEmbedCode: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192697.8885052968!2d28.87209647248316!3d41.00549580931215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1704987654321!5m2!1str!2str"
                }
            }
        })
        .eq('id', restaurant.id);

    if (updateError) {
        console.error('Update failed:', updateError);
    } else {
        console.log('SUCCESS! Website domain set to "test-site".');
        console.log('You can view it at: http://localhost:3000/c/test-site');
    }
}

setupTest();
