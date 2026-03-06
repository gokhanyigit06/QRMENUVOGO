
'use client';

import { Category, Product } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { useMenu } from '@/lib/store';
import IconComponent from '@/components/IconComponent';

interface CategoryTabsProps {
    categories: Category[];
    products: Product[];
    language: 'tr' | 'en';
}

export default function CategoryTabs({ categories, products, language }: CategoryTabsProps) {
    const { settings } = useMenu();
    const [activeTab, setActiveTab] = useState<string>(categories[0]?.id || '');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const tabsRef = useRef<HTMLDivElement>(null);

    const sortedCategories = [...categories].sort((a, b) => (a.order || 0) - (b.order || 0));
    const activeCategory = sortedCategories.find(c => c.id === activeTab);

    const filteredProducts = products.filter(p => {
        const isCampaignCategory = ['kampanyalar', 'campaigns', 'fırsatlar', 'deals'].includes(activeCategory?.name.toLowerCase() || '');
        if (isCampaignCategory) return p.badge && p.badge.trim().length > 0;
        return p.categoryId === activeTab;
    });

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProduct(null), 300);
    };

    // Scroll active tab into view
    useEffect(() => {
        const activeElem = document.getElementById(`tab-${activeTab}`);
        if (activeElem && tabsRef.current) {
            const container = tabsRef.current;
            const scrollLeft = activeElem.offsetLeft - (container.offsetWidth / 2) + (activeElem.offsetWidth / 2);
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    }, [activeTab]);

    return (
        <div className="space-y-6">
            <ProductModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                product={selectedProduct}
                language={language}
            />

            {/* Sticky Tabs Bar */}
            <div className="sticky top-[80px] z-20 -mx-2 px-2 bg-inherit/95 backdrop-blur-md py-4 border-b border-gray-100 dark:border-gray-800">
                <div
                    ref={tabsRef}
                    className="flex gap-2 overflow-x-auto hide-scrollbar px-2"
                >
                    {sortedCategories.map((category) => {
                        const isActive = activeTab === category.id;
                        const hasProducts = products.some(p => p.categoryId === category.id);
                        if (!hasProducts && !['kampanyalar', 'campaigns'].includes(category.name.toLowerCase())) return null;

                        return (
                            <button
                                key={category.id}
                                id={`tab-${category.id}`}
                                onClick={() => setActiveTab(category.id)}
                                className={cn(
                                    "flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-bold transition-all border shadow-sm",
                                    isActive
                                        ? "bg-black text-white border-black scale-105"
                                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400"
                                )}
                            >
                                {category.icon && !isActive && (
                                    <IconComponent name={category.icon} className="h-4 w-4" />
                                )}
                                {language === 'en' && category.nameEn ? category.nameEn : category.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Active Category Header */}
            {activeCategory && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 px-2">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
                        {language === 'en' && activeCategory.nameEn ? activeCategory.nameEn : activeCategory.name}
                    </h2>
                    {activeCategory.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">{activeCategory.description}</p>
                    )}
                </div>
            )}

            {/* Products Grid */}
            <div className="grid gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        language={language}
                        layoutMode={activeCategory?.layout_mode || 'grid'}
                        onClick={() => handleProductClick(product)}
                    />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="py-20 text-center text-gray-400 italic">
                    {language === 'en' ? 'No products found in this category.' : 'Bu kategoride ürün bulunamadı.'}
                </div>
            )}
        </div>
    );
}
