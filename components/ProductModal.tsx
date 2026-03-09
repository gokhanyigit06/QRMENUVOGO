'use client';

import { Product } from '@/lib/data';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useMenu } from '@/lib/store';
import { trackProductView } from '@/lib/services';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    language: 'tr' | 'en';
}

export default function ProductModal({ isOpen, onClose, product, language }: ProductModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const { settings, restaurant } = useMenu();

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';

            // PLUS: Track product view
            const trackingId = restaurant?.id || settings.restaurantId;
            if (product?.id && trackingId) {
                trackProductView(trackingId, product.id).catch(console.error);
            }
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;
    if (!product) return null;

    const displayName = language === 'en' && product.nameEn ? product.nameEn : product.name;
    const displayDescription = language === 'en' && product.descriptionEn ? product.descriptionEn : product.description;

    // Theme Color Logic
    const themeTextColors: Record<string, string> = {
        black: 'text-amber-600',
        white: 'text-black',
        blue: 'text-blue-600',
        orange: 'text-orange-600',
        red: 'text-red-600',
        green: 'text-green-600'
    };
    const activeColorClass = themeTextColors[settings.themeColor || 'black'] || 'text-amber-600';

    // Image Source Logic
    const imageSrc = (product.image && product.image.length > 5)
        ? product.image
        : (settings.defaultProductImage && settings.defaultProductImage.length > 5)
            ? settings.defaultProductImage
            : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c';

    // Theme Background Logic
    const getModalStyles = () => {
        const base = "relative w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 transform ";
        switch (settings.themeId) {
            case 'minimal': return base + (settings.darkMode ? "bg-zinc-950 text-zinc-100" : "bg-zinc-100 text-zinc-900");
            case 'elegance': return base + (settings.darkMode ? "bg-rose-950 text-rose-50" : "bg-rose-50 text-rose-950");
            case 'modern': return base + (settings.darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900");
            case 'vibrant': return base + (settings.darkMode ? "bg-amber-950 text-amber-50" : "bg-amber-50 text-amber-950");
            case 'neon': return base + (settings.darkMode ? "bg-black text-fuchsia-100" : "bg-zinc-900 text-fuchsia-200");
            case 'rustic': return base + (settings.darkMode ? "bg-[#1a1410] text-[#e8dccb]" : "bg-[#f4efe6] text-[#4a3623]");
            case 'paper': return base + (settings.darkMode ? "bg-stone-900 text-stone-200" : "bg-[#f9f6f0] text-stone-900");
            case 'custom': return base + "border border-black/10"; // Custom handles colors via style tags
            default: return base + (settings.darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900");
        }
    };

    // Text Fallback (if not handled by parent class)
    const textColor = settings.themeId === 'custom' ? settings.customTextColor : undefined;
    const bgColor = settings.themeId === 'custom' ? settings.customBgColor : undefined;

    return (
        <div className={cn(
            "fixed inset-0 z-[60] flex items-center justify-center px-4 transition-all duration-300",
            isOpen ? "visible opacity-100" : "invisible opacity-0"
        )}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={cn(
                    getModalStyles(),
                    isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
                )}
                style={{ backgroundColor: bgColor, color: textColor }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white shadow-md backdrop-blur transition-transform hover:scale-110 active:scale-95"
                >
                    <X className="h-6 w-6" />
                </button>

                {/* Product Image */}
                <div className="relative aspect-square w-full bg-gray-100">
                    <Image
                        src={imageSrc}
                        alt={displayName}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                </div>

                {/* Details */}
                <div className="p-8">
                    <h2 className="text-3xl font-black leading-tight tracking-wide mb-2 opacity-90">
                        {displayName.toLocaleUpperCase('tr-TR')}
                    </h2>

                    <div className="flex items-center gap-3 mb-6">
                        {(product.variants && product.variants.length > 0) ? (
                            null
                        ) : (
                            product.discountPrice ? (
                                <>
                                    <span className={cn("text-3xl font-bold", activeColorClass)}>
                                        ₺{product.discountPrice}
                                    </span>
                                    <span className="text-lg text-gray-400 line-through font-medium">
                                        ₺{product.price}
                                    </span>
                                </>
                            ) : (
                                <span className={cn("text-3xl font-bold", activeColorClass)}>
                                    ₺{product.price}
                                </span>
                            )
                        )}
                    </div>

                    {displayDescription && (
                        <p className="text-lg leading-relaxed font-medium opacity-70">
                            {displayDescription}
                        </p>
                    )}

                    {/* Variants if any */}
                    {product.variants && product.variants.length > 0 && (
                        <div className="mt-6 space-y-3 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5">
                            {product.variants.map((variant, idx) => (
                                <div key={idx} className="flex items-center justify-between text-base">
                                    <span className="font-bold opacity-90">{variant.name}</span>
                                    <span className={cn("font-bold text-lg", activeColorClass)}>
                                        {variant.price} ₺
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
