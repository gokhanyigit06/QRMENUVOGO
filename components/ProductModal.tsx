'use client';

import { Product } from '@/lib/data';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import Image from 'next/image';
import PlaceholderImage from './PlaceholderImage';
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

    // Theme Color Logic replaced by dynamic settings
    const priceColor = settings.themeId === 'custom' ? settings.customAccentColor : 'var(--theme-primary)';
    const titleColor = settings.themeId === 'custom' ? settings.customTextColor : 'var(--theme-text)';
    const descColor = settings.themeId === 'custom' ? settings.customTextColor : 'var(--theme-muted-text)';

    // Image Source Logic
    const hasImage = (product.image && product.image.length > 5) || (settings.defaultProductImage && settings.defaultProductImage.length > 5);
    const imageSrc = (product.image && product.image.length > 5)
        ? product.image
        : settings.defaultProductImage;

    // Theme Background Logic
    const getModalStyles = () => {
        return "relative w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 transform bg-[var(--theme-card-bg)] text-[var(--theme-card-text)] border border-[var(--theme-border)]";
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
                <div className="relative aspect-square w-full bg-[var(--theme-muted)]">
                    {hasImage ? (
                        <Image
                            src={imageSrc!}
                            alt={displayName}
                            fill
                            unoptimized
                            className="object-cover"
                        />
                    ) : (
                        <PlaceholderImage alt={displayName} />
                    )}
                </div>

                {/* Details */}
                <div className="p-8">
                    <h2 className="text-3xl font-black leading-tight tracking-wide mb-2 opacity-90" style={{ color: titleColor }}>
                        {displayName.toLocaleUpperCase('tr-TR')}
                    </h2>

                    <div className="flex items-center gap-3 mb-6">
                        {(product.variants && product.variants.length > 0) ? (
                            null
                        ) : (
                            product.discountPrice ? (
                                <>
                                    <span className={cn("text-3xl font-bold text-[var(--theme-primary)]")} style={{ color: priceColor }}>
                                        ₺{product.discountPrice}
                                    </span>
                                    <span className="text-lg text-[var(--theme-muted-text)] line-through font-medium opacity-60">
                                        ₺{product.price}
                                    </span>
                                </>
                            ) : (
                                <span className={cn("text-3xl font-bold text-[var(--theme-primary)]")} style={{ color: priceColor }}>
                                    ₺{product.price}
                                </span>
                            )
                        )}
                    </div>

                    {displayDescription && (
                        <p className="text-lg leading-relaxed font-medium opacity-70" style={{ color: descColor }}>
                            {displayDescription}
                        </p>
                    )}

                    {/* Variants if any */}
                    {product.variants && product.variants.length > 0 && (
                        <div className="mt-6 space-y-3 p-4 rounded-xl bg-[var(--theme-muted)]/50 border border-[var(--theme-border)]">
                            {product.variants.map((variant, idx) => (
                                <div key={idx} className="flex items-center justify-between text-base">
                                    <span className="font-bold opacity-90 text-[var(--theme-text)]" style={{ color: titleColor }}>{variant.name}</span>
                                    <span className={cn("font-bold text-lg text-[var(--theme-primary)]")} style={{ color: priceColor }}>
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
