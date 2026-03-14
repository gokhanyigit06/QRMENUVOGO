
import { getRestaurantBySlug, getCategories, getProducts, getSettings } from "@/lib/services";
import MenuClient from "./MenuClient";
import { notFound } from "next/navigation";

// --- ISR: Beher saatte bir yenile (3600 saniye) ---
export const revalidate = 3600;

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;

    // 1. Fetch Restaurant Check Demo State First
    let restaurant;
    let categories;
    let products;
    let settings;

    restaurant = await getRestaurantBySlug(slug);

    if (!restaurant) {
        notFound();
    }

    // 2. Fetch all other data in parallel for speed
    const [fetchedCategories, fetchedProducts, fetchedSettings] = await Promise.all([
        getCategories(restaurant.id),
        getProducts(restaurant.id),
        getSettings(restaurant.id)
    ]);
    categories = fetchedCategories;
    products = fetchedProducts;
    settings = fetchedSettings;

    // 3. Pass to Client Component
    // We'll also pass this to the MenuProvider via local hydration or props
    return (
        <MenuClient
            initialData={{
                restaurant,
                categories,
                products,
                settings: settings || undefined
            }}
        />
    );
}
