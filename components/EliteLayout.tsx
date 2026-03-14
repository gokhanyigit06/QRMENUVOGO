'use client';

import { Category, Product } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { useMenu } from '@/lib/store';
import { trackProductView } from '@/lib/services';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import PlaceholderImage from './PlaceholderImage';

interface EliteLayoutProps {
    categories: Category[];
    products: Product[];
    language: 'tr' | 'en';
}

export default function EliteLayout({ categories, products, language }: EliteLayoutProps) {
    const { settings, restaurant } = useMenu();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Split categories into Food and Drink segments
    const foodCategories = categories.filter(c => c.segment === 'food' || !c.segment).sort((a, b) => (a.order || 0) - (b.order || 0));
    const drinkCategories = categories.filter(c => c.segment === 'drink').sort((a, b) => (a.order || 0) - (b.order || 0));

    const [activeSegment, setActiveSegment] = useState<'food' | 'drink'>('food');
    const [activeCategory, setActiveCategory] = useState<Category | null>(null);

    // Filter categories based on active segment
    const currentCategories = activeSegment === 'food' ? foodCategories : drinkCategories;

    // Reset active category when segment changes
    useEffect(() => {
        if (currentCategories.length > 0) {
            setActiveCategory(currentCategories[0]);
        } else {
            setActiveCategory(null);
        }
    }, [activeSegment]);

    // Track Category Interest for Heatmap
    useEffect(() => {
        if (activeCategory && restaurant?.id) {
            // Find first product in this category to track as a view
            // This populates the "Hot Categories" heatmap in admin
            const firstProduct = products.find(p => p.categoryId === activeCategory.id);
            if (firstProduct) {
                trackProductView(restaurant.id, firstProduct.id).catch(console.error);
            }
        }
    }, [activeCategory?.id, restaurant?.id]);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProduct(null), 300);
    };

    const filteredProducts = activeCategory
        ? products.filter(p => p.categoryId === activeCategory.id)
        : [];

    return (
        <div className="font-minister-sans min-h-screen bg-[var(--theme-card-bg)] max-w-2xl mx-auto shadow-xl transition-colors duration-500">
            <ProductModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                product={selectedProduct}
                language={language}
            />

            {/* Segment Switcher (YEMEKLER | İÇECEKLER) */}
            <nav className="flex justify-center items-center gap-6 py-8 bg-[var(--theme-card-bg)]/95 sticky top-0 z-40 backdrop-blur-sm border-b border-[var(--theme-border)] transition-colors duration-500">
                <button
                    onClick={() => setActiveSegment('food')}
                    className={cn(
                        "text-base tracking-widest uppercase transition-all duration-300 font-minister-title",
                        activeSegment === 'food'
                            ? "font-black text-[var(--theme-primary)] border-b-2 border-[var(--theme-primary)]"
                            : "font-semibold text-[var(--theme-muted-text)] hover:text-[var(--theme-text)]"
                    )}
                >
                    {language === 'en' ? 'FOOD' : 'YEMEKLER'}
                </button>
                <span className="text-2xl text-[var(--theme-muted-text)] opacity-30">•</span>
                <button
                    onClick={() => setActiveSegment('drink')}
                    className={cn(
                        "text-base tracking-widest uppercase transition-all duration-300 font-minister-title",
                        activeSegment === 'drink'
                            ? "font-black text-[var(--theme-primary)] border-b-2 border-[var(--theme-primary)]"
                            : "font-semibold text-[var(--theme-muted-text)] hover:text-[var(--theme-text)]"
                    )}
                >
                    {language === 'en' ? 'DRINKS' : 'İÇECEKLER'}
                </button>
            </nav>

            {/* Sub Categories (Pills) - Horizontally Scrollable */}
            <div className="flex overflow-x-auto gap-2 px-4 py-6 no-scrollbar touch-pan-x">
                {currentCategories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                            "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 font-minister-sans whitespace-nowrap flex-shrink-0",
                            activeCategory?.id === cat.id
                                ? "bg-[var(--theme-primary)] text-[var(--theme-primary-text)] border-[var(--theme-primary)] shadow-md"
                                : "bg-[var(--theme-card-bg)] text-[var(--theme-primary)] border-[var(--theme-primary)] hover:bg-[var(--theme-muted)]"
                        )}
                    >
                        {language === 'en' && cat.nameEn ? cat.nameEn : cat.name}
                    </button>
                ))}
            </div>

            {/* Category Header */}
            {activeCategory && (
                <div className="text-center mb-8 px-4">
                    <h2 className="text-2xl font-bold uppercase tracking-widest text-[var(--theme-text)] font-minister-title">
                        {language === 'en' && activeCategory.nameEn ? activeCategory.nameEn : activeCategory.name}
                    </h2>
                    <div className="w-24 h-[1px] bg-[var(--theme-primary)] mt-2 mx-auto" />
                </div>
            )}

            {/* Products List - Custom Minister Style */}
            <div className="px-6 pb-20 space-y-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory?.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-8"
                    >
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex gap-4 group cursor-pointer"
                                    onClick={() => handleProductClick(product)}
                                >
                                    {/* Image Container - Square, Minimal */}
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-[var(--theme-muted)] rounded-none overflow-hidden shadow-sm relative border border-[var(--theme-border)]">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <PlaceholderImage 
                                              alt={product.name} 
                                            />
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <h3 className="text-lg font-bold text-[var(--theme-text)] leading-tight mb-1 font-minister-title tracking-tight">
                                                {language === 'en' && product.nameEn ? product.nameEn : product.name}
                                            </h3>
                                            <p className="text-xs text-[var(--theme-muted-text)] leading-snug line-clamp-2 md:line-clamp-3 font-minister-sans italic">
                                                {language === 'en' && product.descriptionEn ? product.descriptionEn : product.description}
                                            </p>

                                            {/* Variants Display - Directly on card */}
                                            {product.variants && product.variants.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {product.variants.map((v, i) => (
                                                        <div key={i} className="px-3 py-1 bg-[var(--theme-muted)] border border-[var(--theme-border)] rounded-md text-xs font-bold text-[var(--theme-text)] font-minister-sans shadow-sm">
                                                            {v.name}: <span className="text-[var(--theme-primary)] font-black ml-1">{v.price} ₺</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Main Price Badge - Only show if price > 0 or no variants */}
                                        {((product.price && product.price > 0) || !product.variants || product.variants.length === 0) && (
                                            <div className="mt-2 flex items-center gap-3">
                                                <span className="inline-block px-4 py-1.5 border border-[var(--theme-primary)] bg-[var(--theme-primary)] text-[var(--theme-primary-text)] rounded-full text-sm font-bold font-minister-sans">
                                                    {product.discountPrice || product.price} ₺
                                                </span>
                                                {product.discountPrice && (
                                                    <span className="text-xs text-[var(--theme-muted-text)] line-through">
                                                        {product.price} ₺
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 text-center text-gray-400 text-sm font-light italic font-minister-sans">
                                {language === 'en' ? 'Preparing delicious items...' : 'Bu kategori hazırlanıyor...'}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

