import { getRestaurantByDomain, getCategories, getProducts, getSettings } from "@/lib/services";
import MenuClient from "../../[slug]/MenuClient";
import { notFound } from "next/navigation";

export const revalidate = 3600;

interface PageProps {
    params: Promise<{ domain: string }>;
}

export default async function CustomDomainPage({ params }: PageProps) {
    const { domain } = await params;

    // 1. Fetch Restaurant via Domain from Firestore
    const result = await getRestaurantByDomain(domain);

    if (!result || !result.restaurant) {
        notFound();
    }

    const { restaurant } = result;

    // 2. Fetch all other data
    const [categories, products, settings] = await Promise.all([
        getCategories(restaurant.id),
        getProducts(restaurant.id),
        getSettings(restaurant.id)
    ]);

    // 3. Render exact same Menu Component
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
