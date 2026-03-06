
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
                        <div className="flex items-center gap-4 px-2">
                            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
                            <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-widest">
                                {language === 'en' && category.nameEn ? category.nameEn : category.name}
                            </h2>
                            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
                        </div>

                        <div className="grid gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3">
                            {categoryProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    language={language}
                                    layoutMode={category.layout_mode || 'grid'}
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
