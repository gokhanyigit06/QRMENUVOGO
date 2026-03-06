'use client';

import { Category, Product, SiteSettings, defaultSettings, WebsiteSettings } from '@/lib/data';
import * as Services from '@/lib/services';
import { useParams } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface MenuContextType {
    products: Product[];
    categories: Category[];
    settings: SiteSettings;

    loading: boolean;

    restaurant: import('./data').Restaurant | null;

    domainType: 'MENU' | 'WEBSITE' | null;
    websiteSettings: WebsiteSettings | undefined;
    addProduct: (product: Partial<Product>) => Promise<void>;
    updateProduct: (product: Product) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    reorderProducts: (products: Product[]) => Promise<void>;
    updateSettings: (settings: Partial<SiteSettings>) => Promise<void>;
    updateCategories: (categories: Category[]) => Promise<void>;
    updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
    addCategory: (category: Partial<Category>) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
    uploadImage: (file: File) => Promise<string>;
    refreshData: () => Promise<void>;
    setInitialData: (data: any) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children, initialMockData }: { children: React.ReactNode, initialMockData?: any }) {
    const params = useParams();
    const [restaurantId, setRestaurantId] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>(initialMockData?.products || []);
    const [categories, setCategories] = useState<Category[]>(initialMockData?.categories || []);
    const [settings, setSettings] = useState<SiteSettings>(initialMockData?.settings || defaultSettings);
    const [restaurant, setRestaurant] = useState<import('./data').Restaurant | null>(null);

    const [loading, setLoading] = useState(initialMockData ? false : true);
    const [domainType, setDomainType] = useState<'MENU' | 'WEBSITE' | null>(initialMockData?.domainType || null);
    const [websiteSettings, setWebsiteSettings] = useState<WebsiteSettings | undefined>(initialMockData?.websiteSettings || undefined);

    const refreshData = async (overrideId?: string) => {
        if (initialMockData) return; // Don't refresh in mock mode
        const targetId = overrideId || restaurantId;
        if (!targetId) return;

        setLoading(true);
        try {
            const [fetchedCategories, fetchedProducts, fetchedSettings] = await Promise.all([
                Services.getCategories(targetId),
                Services.getProducts(targetId),
                Services.getSettings(targetId)
            ]);

            setCategories(fetchedCategories || []);
            setProducts(fetchedProducts || []);
            if (fetchedSettings) {
                setSettings({ ...defaultSettings, ...fetchedSettings });
            }
        } catch (error) {
            console.error("Failed to fetch menu data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Initial Load - Multi-tenant Support
    // Initial Load - Multi-tenant Support
    useEffect(() => {
        const init = async () => {
            let slug: string | null = null;
            let domain: string | null = null;
            let restaurantIdFromSession: string | null = null;

            // 1. Check URL Slug (Client View)
            if (params?.slug) {
                if (typeof params.slug === 'string') {
                    // Prevent 'listemenu' and 'baskili' from being treated as a restaurant slug
                    if (params.slug !== 'listemenu' && params.slug !== 'baskili') {
                        slug = params.slug;
                    }
                } else if (Array.isArray(params.slug)) {
                    // Handle catch-all routes [...slug]
                    // If the first segment is reserved, use the second segment as the slug if applicable, or ignore
                    if ((params.slug[0] === 'listemenu' || params.slug[0] === 'baskili') && params.slug[1]) {
                        slug = params.slug[1];
                    } else if (params.slug[0] !== 'listemenu' && params.slug[0] !== 'baskili') {
                        slug = params.slug[0];
                    }
                }
            }

            // 2. Check Custom Domain (Client View)
            if (!slug && params?.domain && typeof params.domain === 'string') {
                domain = params.domain;
            }

            // 3. Check LocalStorage (Admin View)
            // We only check session if we are NOT on a slug or domain page
            else {
                try {
                    const session = localStorage.getItem('qr_admin_session');
                    if (session) {
                        const data = JSON.parse(session);
                        if (data.restaurantId) {
                            restaurantIdFromSession = data.restaurantId;
                        }
                    }
                } catch (e) {
                    console.error("Session parse error", e);
                }
            }

            if (slug) {
                const restaurant = await Services.getRestaurantBySlug(slug);
                if (restaurant) {
                    setRestaurantId(restaurant.id);
                    setRestaurant(restaurant);
                    setDomainType('MENU'); // Slug access is always MENU
                    setWebsiteSettings(restaurant.website_settings);
                    refreshData(restaurant.id);
                } else {
                    console.error("Restaurant not found:", slug);
                    setLoading(false);
                }
            } else if (domain) {
                const result = await Services.getRestaurantByDomain(domain);
                if (result) {
                    setRestaurantId(result.restaurant.id);
                    setRestaurant(result.restaurant);
                    setDomainType(result.type);
                    setWebsiteSettings(result.restaurant.website_settings);
                    refreshData(result.restaurant.id);
                } else {
                    console.error("Restaurant domain not found:", domain);
                    setLoading(false);
                }
            } else if (restaurantIdFromSession) {
                const restaurant = await Services.getRestaurantById(restaurantIdFromSession);
                if (restaurant) {
                    setRestaurantId(restaurant.id);
                    setRestaurant(restaurant);
                    refreshData(restaurant.id);
                } else {
                    setLoading(false);
                }
            } else {
                // Not in a restaurant context (e.g. Home Page or Login Page)
                setLoading(false);
            }
        };
        init();
    }, [params?.slug, params?.domain]);

    const addProduct = async (product: Partial<Product>) => {
        if (!restaurantId) return;
        try {
            await Services.createProduct({ ...product, restaurantId });
            await refreshData();
        } catch (error: any) {
            console.error("Error adding product (Store):", JSON.stringify(error, null, 2) || error.message || error);
            throw error;
        }
    };

    const updateProduct = async (product: Product) => {
        setProducts(prev => prev.map(p => p.id === product.id ? product : p));
        try {
            await Services.updateProduct(product.id, product);
        } catch (error: any) {
            console.error("Error updating product:", error.message || error);
            await refreshData();
        }
    };

    const deleteProduct = async (id: string) => {
        setProducts(prev => prev.filter(p => p.id !== id));
        try {
            await Services.deleteProduct(id);
        } catch (error) {
            console.error("Error deleting product:", error);
            await refreshData();
        }
    };

    const updateSettings = async (newSettings: Partial<SiteSettings>) => {
        if (!restaurantId) return;
        setSettings(prev => ({ ...prev, ...newSettings }));
        try {
            await Services.updateSettings(restaurantId, newSettings);
            // Update local state immediately for UI responsiveness
            setSettings(prev => ({ ...prev, ...newSettings }));
        } catch (error: any) {
            console.error("Error updating settings FULL:", error);
            console.error("Error Status:", error.status || error.code || "No status");
            console.error("Error Message:", error.message || "No message");
            console.error("Error Details:", error.details || error.hint || (typeof error === 'object' ? JSON.stringify(error) : error));
        }
    };

    const updateCategories = async (newCategories: Category[]) => {
        setCategories(newCategories);
        try {
            const updates = newCategories.map((cat, index) =>
                Services.updateCategory(cat.id, { order: index, name: cat.name })
            );
            await Promise.all(updates);
        } catch (error) {
            console.error("Error updating categories:", error);
            await refreshData();
        }
    };

    const addCategory = async (category: Partial<Category>) => {
        if (!restaurantId) return;
        try {
            await Services.createCategory({ ...category, restaurantId });
            await refreshData();
        } catch (error: any) {
            console.error("Error adding category:", error);
            alert("Kategori eklenirken hata: " + (error?.message || JSON.stringify(error)));
            throw error;
        }
    };

    const updateCategory = async (id: string, category: Partial<Category>) => {
        setCategories(prev => prev.map(c => c.id === id ? { ...c, ...category } : c));
        try {
            await Services.updateCategory(id, category);
        } catch (error) {
            console.error("Error updating category:", error);
            await refreshData();
        }
    };

    const deleteCategory = async (id: string) => {
        setCategories(prev => prev.filter(c => c.id !== id));
        try {
            await Services.deleteCategory(id);
        } catch (error) {
            console.error("Error deleting category:", error);
            await refreshData();
        }
    };

    const reorderProducts = async (newProducts: Product[]) => {
        setProducts(newProducts);
        try {
            const updates = newProducts.map((prod, index) =>
                Services.updateProduct(prod.id, { sortOrder: index })
            );
            await Promise.all(updates);
        } catch (error) {
            console.error("Error reordering products:", error);
        }
    };

    const uploadImage = async (file: File) => {
        return await Services.uploadImage(file, `${restaurant?.id || 'general'}/images`);
    };

    const setInitialData = (data: any) => {
        if (data.products) setProducts(data.products);
        if (data.categories) setCategories(data.categories);
        if (data.settings) setSettings(data.settings);
        if (data.restaurant) {
            setRestaurant(data.restaurant);
            setRestaurantId(data.restaurant.id);
        }
        setLoading(false);
    };

    return (
        <MenuContext.Provider value={{
            products,
            categories,

            settings,
            loading,
            restaurant,
            domainType,
            websiteSettings,
            addProduct,
            updateProduct,
            deleteProduct,
            reorderProducts,
            updateSettings,
            updateCategories,
            updateCategory,
            addCategory,
            deleteCategory,
            uploadImage,
            refreshData: () => refreshData(),
            setInitialData
        }}>
            {children}
        </MenuContext.Provider>
    );
}

export function useMenu() {
    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
}
