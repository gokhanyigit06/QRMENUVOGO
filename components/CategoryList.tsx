
'use client';

import { Category, Product } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { useMenu } from '@/lib/store';

interface CategoryListProps {
    categories: Category[];
    products: Product[];
    language: 'tr' | 'en';
}

export default function CategoryList({ categories, products, language }: CategoryListProps) {
    const { settings } = useMenu();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const sortedCategories = [...categories].sort((a, b) => (a.order || 0) - (b.order || 0));

    // Kategori layout_mode'una ve sitewide menuLayout'a göre ürün layoutMode'u belirle
    function getProductLayoutMode(siteLayout: string | undefined, catLayout: string | undefined): string {
        const sl = siteLayout || '';
        const cl = catLayout || 'grid';
        // list/list-no-image kategoriler, masonry/grid/cards sitewide ayarını geçersiz kılar
        if (['list', 'list-no-image'].includes(cl) && ['masonry', 'grid', 'cards'].includes(sl)) return cl;
        // list-no-image kategori, sitewide list ayarını geçersiz kılar
        if (cl === 'list-no-image' && sl === 'list') return 'list-no-image';
        // Sitewide ayar öncelikli
        if (['masonry', 'cards', 'minimal-list', 'paper', 'list', 'grid'].includes(sl)) return sl;
        return cl;
    }

    // Container CSS sınıfını belirle: liste tabanlı → tek sütun, resimli → çok sütun
    function getContainerClass(siteLayout: string | undefined, catLayout: string | undefined): string {
        const effective = getProductLayoutMode(siteLayout, catLayout);
        if (['list', 'list-no-image', 'minimal-list', 'paper'].includes(effective)) {
            return 'grid grid-cols-1 gap-3';
        }
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';
    }

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProduct(null), 300);
    };

    return (
        <div className="space-y-12">
            <ProductModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                product={selectedProduct}
                language={language}
            />

            {sortedCategories.map((category) => {
                const isCampaignCategory = ['kampanyalar', 'campaigns', 'fırsatlar', 'deals'].includes(category.name.toLowerCase());
                const categoryProducts = isCampaignCategory
                    ? products.filter(p => p.badge && p.badge.trim().length > 0)
                    : products.filter(p => p.categoryId === category.id);

                if (categoryProducts.length === 0) return null;

                return (
                    <section key={category.id} id={`cat-${category.id}`} className="space-y-6">
                        {/* THEME DISTINCTIVE CATEGORY HEADERS */}
                        {settings.themeId === 'minimal' && (
                            <div className="px-2 pb-2 mb-6 border-b border-[var(--theme-border)]">
                                <h2 className="text-2xl font-light tracking-[0.2em] uppercase text-[var(--theme-text)]">
                                    {language === 'en' && category.nameEn ? category.nameEn : category.name}
                                </h2>
                            </div>
                        )}
                        {settings.themeId === 'elegance' && (
                            <div className="flex items-center gap-6 px-4 py-8 mb-4">
                                <div className="h-[1px] flex-1 bg-[var(--theme-primary)] opacity-30" />
                                <h2 className="text-3xl font-serif italic text-[var(--theme-text)] tracking-wider">
                                    {language === 'en' && category.nameEn ? category.nameEn : category.name}
                                </h2>
                                <div className="h-[1px] flex-1 bg-[var(--theme-primary)] opacity-30" />
                            </div>
                        )}
                        {settings.themeId === 'modern' && (
                            <div className="px-2 mb-6 flex items-center justify-between">
                                <h2 className="text-3xl font-black text-[var(--theme-text)] uppercase tracking-tight">
                                    {language === 'en' && category.nameEn ? category.nameEn : category.name}
                                </h2>
                                <div className="h-2 w-12 bg-[var(--theme-primary)] rounded-full" />
                            </div>
                        )}
                        {settings.themeId === 'neon' && (
                            <div className="flex items-center gap-4 px-2 mb-8">
                                <div className="h-px flex-1 bg-fuchsia-500/50 shadow-[0_0_10px_rgba(217,70,239,0.5)]" />
                                <h2 className="text-2xl font-black text-white uppercase tracking-widest drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]">
                                    {language === 'en' && category.nameEn ? category.nameEn : category.name}
                                </h2>
                                <div className="h-px flex-1 bg-fuchsia-500/50 shadow-[0_0_10px_rgba(217,70,239,0.5)]" />
                            </div>
                        )}
                        {settings.themeId === 'paper' && (
                            <div className="text-center px-4 py-6 mb-2">
                                <h2 className="text-2xl font-serif font-bold text-[var(--theme-text)] uppercase tracking-widest border-y border-[var(--theme-border)] py-3 inline-block">
                                    ~ {language === 'en' && category.nameEn ? category.nameEn : category.name} ~
                                </h2>
                            </div>
                        )}
                        {settings.themeId === 'rustic' && (
                            <div className="flex items-center gap-4 px-2 mb-6">
                                <div className="h-1 flex-1 bg-[var(--theme-border)] rounded-full" />
                                <h2 className="text-2xl font-serif font-bold text-[var(--theme-text)] uppercase">
                                    {language === 'en' && category.nameEn ? category.nameEn : category.name}
                                </h2>
                                <div className="h-1 flex-1 bg-[var(--theme-border)] rounded-full" />
                            </div>
                        )}
                        {settings.themeId === 'vibrant' && (
                            <div className="px-2 mb-6 block text-center">
                                <h2 className="inline-block px-6 py-2 bg-[var(--theme-primary)] text-[var(--theme-primary-text)] rounded-xl text-xl font-bold uppercase tracking-wide shadow-md">
                                    {language === 'en' && category.nameEn ? category.nameEn : category.name}
                                </h2>
                            </div>
                        )}
                        {/* DEFAULT / CUSTOM FALLBACK HEADER */}
                        {(!settings.themeId || !['minimal', 'elegance', 'modern', 'neon', 'paper', 'rustic', 'vibrant'].includes(settings.themeId)) && (
                            <div className="flex items-center gap-4 px-2 mb-6">
                                <div className="h-px flex-1 bg-[var(--theme-border)]" />
                                <h2 className="text-xl font-black text-[var(--theme-text)] uppercase tracking-widest">
                                    {language === 'en' && category.nameEn ? category.nameEn : category.name}
                                </h2>
                                <div className="h-px flex-1 bg-[var(--theme-border)]" />
                            </div>
                        )}


                        <div className={cn(
                            "p-2",
                            getContainerClass(settings.menuLayout, category.layout_mode)
                        )}>
                            {categoryProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    language={language}
                                    layoutMode={getProductLayoutMode(settings.menuLayout, category.layout_mode) as any}
                                    onClick={() => handleProductClick(product)}
                                />
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
