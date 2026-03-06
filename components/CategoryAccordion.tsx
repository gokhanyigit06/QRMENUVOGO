
'use client';

import { Category, Product } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { useMenu } from '@/lib/store';
import { trackProductView } from '@/lib/services';
import { useLenis } from 'lenis/react';
import IconComponent, { AVAILABLE_ICONS } from '@/components/IconComponent';

interface CategoryAccordionProps {
    categories: Category[];
    products: Product[];
    language: 'tr' | 'en';
}

export default function CategoryAccordion({ categories, products, language }: CategoryAccordionProps) {
    const { settings, restaurant } = useMenu();
    const lenis = useLenis(); // Get lenis instance

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Track open state for active categories (multiple can be open at a time).
    const [activeCategoryIds, setActiveCategoryIds] = useState<string[]>(() => {
        if (categories.length > 0) {
            return [categories[0].id];
        }
        return [];
    });

    const toggleCategory = (id: string) => {
        const isOpening = !activeCategoryIds.includes(id);

        if (isOpening && restaurant?.id) {
            // Track view for heatmap
            const firstProduct = products.find(p => p.categoryId === id);
            if (firstProduct) {
                trackProductView(restaurant.id, firstProduct.id).catch(console.error);
            }
        }

        setActiveCategoryIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(c => c !== id);
            } else {
                return [...prev, id];
            }
        });

        if (isOpening) {
            setTimeout(() => {
                const element = document.getElementById(`category-${id}`);
                if (element && lenis) {
                    const headerOffset = 150;
                    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - headerOffset;

                    // lenis.scrollTo(offsetPosition, {
                    //     duration: 1.2,
                    //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Exponential out easing
                    // });
                    // Use native smooth scroll for better performance in heavy layouts
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                } else if (element) {
                    // Fallback if lenis isn't ready
                    const headerOffset = 150;
                    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            }, 300);
        }
    };

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Delay clearing product to allow close animation
        setTimeout(() => setSelectedProduct(null), 300);
    };

    // Styling Maps
    const gapMap = {
        small: 'space-y-2',
        medium: 'space-y-4',
        large: 'space-y-8'
    };

    const heightMap = {
        small: 'h-20',
        medium: 'h-28',
        large: 'h-40'
    };

    const fontSizeMap = {
        medium: 'text-xl',
        large: 'text-3xl',
        xl: 'text-5xl'
    };

    const fontWeightMap = {
        normal: 'font-medium',
        bold: 'font-bold',
        black: 'font-black'
    };

    const trackingMap = {
        tighter: 'tracking-tighter',
        tight: 'tracking-tight',
        normal: 'tracking-normal',
        wide: 'tracking-wide',
        wider: 'tracking-wider',
        widest: 'tracking-widest'
    };

    const currentGap = gapMap[settings.categoryGap || 'medium'];
    const currentHeight = heightMap[settings.categoryRowHeight || 'medium'];
    const currentFontSize = fontSizeMap[settings.categoryFontSize || 'large'];
    const currentFontWeight = fontWeightMap[settings.categoryFontWeight || 'black'];
    const currentTracking = trackingMap[settings.categoryLetterSpacing || 'normal'];

    return (
        <>
            <ProductModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                product={selectedProduct}
                language={language}
            />

            <div className={currentGap}>
                {[...categories]
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .filter((category) => {
                        // PLUS: Zaman Ayarlı Görünürlük Kontrolü
                        const now = new Date();
                        const currentDay = now.getDay(); // 0-6 (Pazar:0)
                        const currentTimeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

                        // 1. Gün Kontrolü (Eğer liste boş değilse)
                        if (category.visibility_days && category.visibility_days.length > 0) {
                            if (!category.visibility_days.includes(currentDay)) return false;
                        }

                        // 2. Saat Kontrolü
                        if (category.visibility_start_time && category.visibility_end_time) {
                            const start = category.visibility_start_time;
                            const end = category.visibility_end_time;

                            // Gece yarısını aşan saatler için (Örn: 22:00 - 04:00)
                            if (start > end) {
                                if (currentTimeStr < start && currentTimeStr > end) return false;
                            } else {
                                // Normal aralık (Örn: 08:00 - 12:00)
                                if (currentTimeStr < start || currentTimeStr > end) return false;
                            }
                        }

                        return true;
                    })
                    .map((category) => {
                        // ... (rest of mapping logic) ...
                        // Check if this is a "Campaigns" smart category
                        const isCampaignCategory = ['kampanyalar', 'campaigns', 'fırsatlar', 'deals'].includes(category.name.toLowerCase());

                        let categoryProducts: Product[] = [];

                        if (isCampaignCategory) {
                            // Smart Category Logic: Include products with ANY badge
                            categoryProducts = products.filter(p => p.badge && p.badge.trim().length > 0);
                        } else {
                            // Standard Logic: Products belonging to this category ID
                            categoryProducts = products.filter(p => p.categoryId === category.id);
                        }
                        const isOpen = activeCategoryIds.includes(category.id);
                        let displayName = language === 'en' && category.nameEn ? category.nameEn : category.name;

                        // Conditional Turkish char conversion based on settings (e.g. for fonts like Brodo)
                        if (settings.categoryCharConvert) {
                            const turkishMap: Record<string, string> = {
                                'ğ': 'g', 'Ğ': 'G',
                                'ü': 'u', 'Ü': 'U',
                                'ş': 's', 'Ş': 'S',
                                'ı': 'i', 'İ': 'I',
                                'ö': 'o', 'Ö': 'O',
                                'ç': 'c', 'Ç': 'C'
                            };
                            displayName = displayName.replace(/[ğĞüÜşŞıİöÖçÇ]/g, match => turkishMap[match] || match);
                        }

                        // Filter out categories with no products
                        if (categoryProducts.length === 0) return null;

                        return (
                            <div
                                key={category.id}
                                id={`category-${category.id}`}
                                className="overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300"
                            >
                                {/* ... header button ... */}
                                <button
                                    onClick={() => toggleCategory(category.id)}
                                    className={`relative flex ${currentHeight} w-full items-center overflow-hidden text-left`}
                                >
                                    {/* ... background image ... */}
                                    <div className="absolute inset-0 z-0">
                                        <Image
                                            src={category.image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5'}
                                            alt={displayName}
                                            fill
                                            unoptimized
                                            className={cn(
                                                "object-cover transition-opacity duration-300",
                                                // isOpen ? "scale-105" : "scale-100" // Reduced scale, removed blur for performance
                                            )}
                                        />
                                        {/* Dynamic Gradient Overlay based on state */}
                                        <div
                                            className={cn(
                                                "absolute inset-0 transition-opacity duration-300",
                                                isOpen ? "bg-black/70" : ""
                                            )}
                                            style={{
                                                backgroundColor: isOpen ? undefined : `rgba(0,0,0, ${settings.categoryOverlayOpacity !== undefined && settings.categoryOverlayOpacity !== null ? settings.categoryOverlayOpacity / 100 : 0.5})`
                                            }}
                                        />
                                    </div>

                                    {/* ... Content ... */}
                                    {/* (Same header content code) */}
                                    <div className="relative z-10 flex w-full items-center justify-between px-6">
                                        <div className="flex items-center w-full gap-4">
                                            {/* Category Icon */}
                                            {category.icon && (
                                                <div className="relative h-14 w-14 shrink-0 drop-shadow-lg transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                                                    {/* Check if it's an image URL first */
                                                        (category.icon.startsWith('http') || category.icon.startsWith('/')) ? (
                                                            <Image
                                                                src={category.icon}
                                                                alt=""
                                                                fill
                                                                className="object-contain"
                                                            />
                                                        ) : (
                                                            /* Otherwise assume it's a Lucide icon name */
                                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/20 shadow-sm">
                                                                <IconComponent
                                                                    name={category.icon}
                                                                    className={cn(
                                                                        "transition-colors",
                                                                        category.iconSize === 'small' ? 'h-5 w-5' :
                                                                            category.iconSize === 'large' ? 'h-9 w-9' : 'h-7 w-7',
                                                                        !category.iconColor && "text-white"
                                                                    )}
                                                                    style={{ color: category.iconColor }}
                                                                />
                                                            </div>
                                                        )}
                                                </div>
                                            )}

                                            <div className="flex flex-col gap-0.5">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h3
                                                        className={`${currentFontSize} ${currentFontWeight} text-white drop-shadow-md ${currentTracking}`}
                                                        style={{ fontFamily: settings.categoryFontFamily ? `"${settings.categoryFontFamily}", sans-serif` : undefined }}
                                                    >
                                                        {displayName}
                                                    </h3>
                                                    {category.badge && (
                                                        <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white shadow-sm">
                                                            {category.badge.toLocaleUpperCase('tr-TR')}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-2 text-white/80">
                                                    <p className="text-xs font-bold">
                                                        {categoryProducts.length} {language === 'en' ? 'Items' : 'Çeşit'}
                                                    </p>
                                                    {category.discountRate && (
                                                        <>
                                                            <span className="text-[10px] opacity-50">•</span>
                                                            <span className="rounded-full bg-red-600/90 px-2 py-0.5 text-[10px] font-bold text-white">
                                                                %{category.discountRate} {language === 'en' ? 'Off' : 'İndirim'}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>

                                                {category.description && (
                                                    <p className="text-xs font-medium text-white/70 line-clamp-1 mt-0.5">
                                                        {category.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className={cn(
                                            "flex h-10 w-10 items-center justify-center rounded-full bg-black/20 transition-transform duration-300 shrink-0",
                                            isOpen ? "rotate-180 bg-white text-black" : "text-white"
                                        )}>
                                            <ChevronDown className="h-6 w-6" />
                                        </div>
                                    </div>
                                </button>

                                {/* Accordion Body / Products Grid */}
                                <div
                                    className={cn(
                                        "grid transition-all duration-300 ease-in-out",
                                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                    )}
                                >
                                    <div className="overflow-hidden">
                                        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3 bg-white">
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
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
