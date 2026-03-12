import { useMenu } from '@/lib/store';
import { Product } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Flame, Leaf, Wheat } from 'lucide-react'; // Icons for tags
import { ALLERGENS } from '@/lib/allergens';
import Image from 'next/image';

interface ProductCardProps {
    product: Product;
    language: 'tr' | 'en';
    onClick?: () => void;
    layoutMode?: 'grid' | 'list' | 'list-no-image' | 'medium' | 'masonry' | 'cards' | 'minimal-list' | 'paper';
}

export default function ProductCard({ product, language, onClick, layoutMode = 'grid' }: ProductCardProps) {
    const { settings } = useMenu();

    const displayName = language === 'en' && product.nameEn ? product.nameEn : product.name;
    const displayDescription = language === 'en' && product.descriptionEn ? product.descriptionEn : product.description;

    // Helper to get icon
    const getIcon = (iconName?: string) => {
        switch (iconName) {
            case 'pepper': return <Flame className="h-3 w-3" />;
            case 'leaf': return <Leaf className="h-3 w-3" />;
            case 'wheat': return <Wheat className="h-3 w-3" />;
            default: return null;
        }
    };

    // Dynamic Styles from Settings
    const titleSize = {
        medium: 'text-lg',
        large: 'text-xl',
        xl: 'text-2xl'
    }[settings.productTitleSize || 'large'];

    const descriptionSize = {
        small: 'text-xs',
        medium: 'text-sm',
        large: 'text-base'
    }[settings.productDescriptionSize || 'medium'];

    const priceSize = {
        medium: 'text-lg',
        large: 'text-xl',
        xl: 'text-2xl'
    }[settings.productPriceSize || 'large'];

    // Fallback image logic
    const imageSrc = (product.image && product.image.length > 5)
        ? product.image
        : (settings.defaultProductImage && settings.defaultProductImage.length > 5)
            ? settings.defaultProductImage
            : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c';

    // Helper to format title (break line on parenthesis)
    const formatTitle = (title: string) => {
        const parts = title.split('(');
        if (parts.length > 1) {
            const mainPart = parts[0];
            const secondaryPart = '(' + parts.slice(1).join('(');
            return (
                <span>
                    {mainPart}
                    <span className="block mt-1">
                        {secondaryPart}
                    </span>
                </span>
            );
        }
        return title;
    };

    const getThemeCardStyles = () => {
        const base = "group flex flex-col overflow-hidden transition-all duration-300 cursor-pointer ";
        switch (settings.themeId) {
            case 'minimal': return base + "rounded-none border-b border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900/50";
            case 'elegance': return base + "rounded-2xl border border-rose-900/10 shadow-lg backdrop-blur-sm bg-white/90 dark:bg-black/50 hover:shadow-xl hover:border-rose-900/30";
            case 'modern': return base + "rounded-3xl border-transparent shadow-xl bg-white dark:bg-slate-900 hover:shadow-2xl hover:-translate-y-1";
            case 'vibrant': return base + "rounded-xl border border-amber-500/30 shadow-[0_4px_15px_-3px_rgba(245,158,11,0.2)] bg-white dark:bg-amber-950/20 hover:scale-[1.02] hover:border-amber-500/60";
            case 'neon': return base + "rounded-xl border border-fuchsia-500/50 shadow-[0_0_15px_rgba(217,70,239,0.2)] bg-zinc-950 hover:shadow-[0_0_25px_rgba(217,70,239,0.5)]";
            case 'rustic': return base + "rounded-none border-y-2 border-amber-900/10 bg-[#fdfbf7] dark:bg-[#2c241b] shadow-sm hover:shadow-md";
            case 'paper': return base + "border-b border-stone-200/50 hover:bg-black/5 dark:hover:bg-white/5 bg-transparent";
            case 'custom': return base + "rounded-xl border border-black/5 hover:border-black/10 shadow-sm hover:shadow-md bg-white/50 backdrop-blur-sm";
            default: return base + "rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md";
        }
    };

    // RENDER: PAPER (High End Minimal Text Only)
    if (layoutMode === 'paper') {
        return (
            <div
                onClick={onClick}
                className={cn(getThemeCardStyles(), "py-4 flex flex-col items-center justify-center text-center")}
            >
                <h3 className={cn("font-serif tracking-widest uppercase mb-1", titleSize)} style={{ color: settings.themeId === 'custom' ? settings.customTextColor : settings.productTitleColor }}>
                    {formatTitle(displayName)}
                </h3>
                {displayDescription && (
                    <p className={cn("italic font-serif opacity-70 max-w-[80%] mx-auto mb-2", descriptionSize)} style={{ color: settings.themeId === 'custom' ? settings.customTextColor : settings.productDescriptionColor }}>
                        {displayDescription}
                    </p>
                )}
                {(product.price !== undefined && product.price !== null && (!product.variants || product.variants.length === 0)) && (
                    product.discountPrice ? (
                        <div className="flex items-center gap-3 mt-1">
                            <span className={cn("font-serif line-through opacity-50", priceSize)} style={{ color: settings.themeId === 'custom' ? settings.customTextColor : settings.productPriceColor }}>{product.price}₺</span>
                            <span className={cn("font-serif font-bold", priceSize)} style={{ color: settings.themeId === 'custom' ? settings.customTextColor : settings.productPriceColor }}>{product.discountPrice}₺</span>
                        </div>
                    ) : (
                        <span className={cn("font-serif mt-1", priceSize)} style={{ color: settings.themeId === 'custom' ? settings.customTextColor : settings.productPriceColor }}>
                            {product.price} ₺
                        </span>
                    )
                )}
            </div>
        )
    }

    // RENDER: MINIMAL LIST (Text Only Cafe Style)
    if (layoutMode === 'minimal-list') {
        return (
            <div
                onClick={onClick}
                className={cn(getThemeCardStyles(), "py-3 border-b border-black/5 dark:border-white/5 last:border-0 rounded-none bg-transparent hover:bg-black/5")}
            >
                <div className="flex justify-between items-baseline w-full">
                    <h3 className={cn("font-medium tracking-tight", titleSize)} style={{ color: settings.themeId === 'custom' ? settings.customTextColor : settings.productTitleColor }}>
                        {displayName}
                    </h3>
                    <div className="flex-1 mx-4 border-b border-dotted border-black/20 dark:border-white/20"></div>
                    <div className="flex items-baseline shrink-0">
                        {(product.price !== undefined && product.price !== null && (!product.variants || product.variants.length === 0)) && (
                            product.discountPrice ? (
                                <>
                                    <span className={cn("line-through opacity-50 mr-2 text-xs")} style={{ color: settings.themeId === 'custom' ? settings.customTextColor : settings.productPriceColor }}>{product.price}₺</span>
                                    <span className={cn("font-bold", priceSize)} style={{ color: settings.themeId === 'custom' ? settings.customTextColor : settings.productPriceColor }}>{product.discountPrice}₺</span>
                                </>
                            ) : (
                                <span className={cn("font-bold", priceSize)} style={{ color: settings.themeId === 'custom' ? settings.customTextColor : settings.productPriceColor }}>
                                    {product.price} ₺
                                </span>
                            )
                        )}
                    </div>
                </div>
                {displayDescription && (
                    <p className={cn("mt-1 opacity-60 text-left", descriptionSize)} style={{ color: settings.themeId === 'custom' ? settings.customTextColor : settings.productDescriptionColor }}>
                        {displayDescription}
                    </p>
                )}
            </div>
        )
    }

    // RENDER: CARDS (Large Image Box)
    if (layoutMode === 'cards') {
        return (
            <div
                onClick={onClick}
                className={getThemeCardStyles()}
            >
                <div className="relative aspect-video w-full bg-gray-100">
                    <Image
                        src={imageSrc}
                        alt={displayName}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className={cn("font-bold leading-tight tracking-wide mb-1", titleSize)}>
                            {formatTitle(displayName.toLocaleUpperCase('tr-TR'))}
                        </h3>
                        {(product.price !== undefined && product.price !== null && (!product.variants || product.variants.length === 0)) && (
                            product.discountPrice ? (
                                <div className="flex items-center gap-2">
                                    <span className={cn("font-bold", priceSize)} style={{ color: settings.themeId === 'custom' ? settings.customAccentColor : settings.productPriceColor }}>{product.discountPrice} ₺</span>
                                    <span className="text-sm line-through opacity-70">{product.price} ₺</span>
                                </div>
                            ) : (
                                <span className={cn("font-bold", priceSize)} style={{ color: settings.themeId === 'custom' ? settings.customAccentColor : settings.productPriceColor }}>{product.price} ₺</span>
                            )
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // RENDER: LIST-NO-IMAGE (Minimal / Cocktail Style)
    if (layoutMode === 'list-no-image') {
        return (
            <div
                onClick={onClick}
                className={cn(getThemeCardStyles(), "p-4 md:p-6")}
            >
                <div className="flex items-center justify-between gap-4">
                    <h3
                        className={cn("font-bold leading-tight tracking-wide", titleSize)}
                        style={{ color: settings.productTitleColor }}
                    >
                        {formatTitle(displayName.toLocaleUpperCase('tr-TR'))}
                    </h3>
                    <div className="flex flex-col items-end shrink-0">
                        {(product.price !== undefined && product.price !== null && (!product.variants || product.variants.length === 0)) && (
                            product.discountPrice ? (
                                <div className="flex flex-col items-end">
                                    <span className="text-xs text-gray-400 line-through">₺{product.price}</span>
                                    <span
                                        className={cn("font-bold", priceSize)}
                                        style={{ color: settings.productPriceColor }}
                                    >
                                        ₺{product.discountPrice}
                                    </span>
                                </div>
                            ) : (
                                <span
                                    className={cn("font-bold", priceSize)}
                                    style={{ color: settings.productPriceColor }}
                                >
                                    ₺{product.price}
                                </span>
                            )
                        )}
                    </div>
                </div>
                {displayDescription && (
                    <p
                        className={cn("mt-2 leading-relaxed opacity-80", descriptionSize)}
                        style={{ color: settings.productDescriptionColor }}
                    >
                        {displayDescription}
                    </p>
                )}
            </div>
        );
    }

    // RENDER: LIST (Wine / Gin Style with Variants List)
    if (layoutMode === 'list') {
        return (
            <div
                onClick={onClick}
                className={cn(getThemeCardStyles(), "p-4 md:p-6")}
            >
                {/* Header */}
                <h3
                    className={cn("font-bold leading-tight tracking-wide mb-3 pb-3 border-b border-gray-100 border-dashed", titleSize)}
                    style={{ color: settings.productTitleColor }}
                >
                    {formatTitle(displayName.toLocaleUpperCase('tr-TR'))}
                </h3>

                {/* Variants List (Explicit) */}
                {product.variants && product.variants.length > 0 ? (
                    <div className="space-y-2">
                        {product.variants.map((variant, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                                <span className={cn("text-sm font-medium flex items-center gap-2", settings.themeId === 'custom' ? '' : 'text-gray-600 dark:text-gray-400')} style={{ color: settings.themeId === 'custom' ? settings.customTextColor : undefined }}>
                                    {/* Simple Icon Logic based on variant name keywords */}
                                    {(variant.name.toLowerCase().includes('kadeh') || variant.name.toLowerCase().includes('glass') || variant.name.includes('cl')) && (
                                        <svg className="w-3 h-3 opacity-50" viewBox="0 0 24 24" fill="currentColor"><path d="M11 21h2v-2h-2v2zm1-18c-2.76 0-5 2.24-5 5v5c0 1.29.39 2.49 1.05 3.48L7 19v2h10v-2l-1.05-2.52C16.61 15.49 17 14.29 17 11V6c0-2.76-2.24-5-5-5z" /></svg>
                                    )}
                                    {(variant.name.toLowerCase().includes('şişe') || variant.name.toLowerCase().includes('bottle')) && (
                                        <svg className="w-3 h-3 opacity-50" viewBox="0 0 24 24" fill="currentColor"><path d="M17.06.88l-6.09 6.09 3.19 3.19 2.56-2.56c.19-.19.31-.47.31-.76 0-.3-.11-.57-.31-.76l-1.87-1.87.53-.53 1.68 1.68c.15.15.34.22.53.22s.38-.07.53-.22c.29-.29.29-.77 0-1.06l-1.68-1.68.53-.53 2.52 2.52c.29.29.77.29 1.06 0 .29-.29.29-.77 0-1.06L17.06.88zM4.3 9l3.07 3.07-2.56 2.56c-.59.59-.59 1.54 0 2.12l5.5 5.5c.59.59 1.54.59 2.12 0l2.56-2.56 3.07 3.07c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L4.3 9z" /></svg>
                                    )}
                                    {variant.name}
                                </span>
                                <span className={cn("font-bold")} style={{ color: settings.themeId === 'custom' ? settings.customAccentColor : settings.productPriceColor }}>
                                    {variant.price} ₺
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Tek Fiyat</span>
                        {(product.price !== undefined && product.price !== null) && (
                            product.discountPrice ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-400 line-through">₺{product.price}</span>
                                    <span
                                        className={cn("font-bold", priceSize)}
                                        style={{ color: settings.productPriceColor }}
                                    >
                                        ₺{product.discountPrice}
                                    </span>
                                </div>
                            ) : (
                                <span
                                    className={cn("font-bold", priceSize)}
                                    style={{ color: settings.productPriceColor }}
                                >
                                    ₺{product.price}
                                </span>
                            )
                        )}
                    </div>
                )}
            </div>
        );
    }

    // RENDER: GRID & MASONRY (Standard with Image)
    return (
        <div
            onClick={onClick}
            className={cn(getThemeCardStyles())}
        >

            {/* Large Top Image */}
            <div className="relative aspect-square w-full bg-gray-100 dark:bg-[#1a1a2e]">
                <Image
                    src={imageSrc}
                    alt={displayName}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.discountPrice && (
                    <div className="absolute top-3 left-3 rounded-md bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-sm">
                        {language === 'en' ? 'Sale' : 'İndirim'}
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex flex-1 flex-col p-6">
                {/* Title and Price Row */}
                <div className="mb-2 flex items-start justify-between gap-4">
                    <h3
                        className={cn("font-bold leading-tight tracking-wide", titleSize)}
                        style={{ color: settings.productTitleColor }}
                    >
                        {formatTitle(displayName.toLocaleUpperCase('tr-TR'))}
                    </h3>
                    <div className="flex flex-col items-end">
                        {(product.price !== undefined && product.price !== null && (!product.variants || product.variants.length === 0)) && (
                            product.discountPrice ? (
                                <>
                                    <span className="text-xs text-gray-400 line-through">₺{product.price}</span>
                                    <span
                                        className={cn("font-bold", priceSize)}
                                        style={{ color: settings.productPriceColor }}
                                    >
                                        ₺{product.discountPrice}
                                    </span>
                                </>
                            ) : (
                                <span
                                    className={cn("font-bold", priceSize)}
                                    style={{ color: settings.productPriceColor }}
                                >
                                    ₺{product.price}
                                </span>
                            )
                        )}
                    </div>
                </div>

                {/* Description */}
                <p
                    className={cn("mb-4 leading-relaxed", descriptionSize)}
                    style={{ color: settings.productDescriptionColor }}
                >
                    {displayDescription}
                </p>

                {/* Allergen Icons */}
                {product.allergens && product.allergens.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                        {product.allergens.map((allergenId) => {
                            const allergen = ALLERGENS.find(a => a.id === allergenId);
                            if (!allergen) return null;
                            const Icon = allergen.icon;
                            return (
                                <div
                                    key={allergenId}
                                    className="flex items-center justify-center rounded-full bg-gray-100 p-1.5 text-gray-500"
                                    title={language === 'en' ? allergen.nameEn : allergen.nameTr}
                                >
                                    <Icon className={cn("h-4 w-4", allergen.color)} />
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Variants List */}
                {product.variants && product.variants.length > 0 && (
                    <div className="mb-4 mt-2 space-y-2 border-t border-dashed border-gray-200 pt-3">
                        {product.variants.map((variant, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                                <span className={cn("font-bold", settings.themeId === 'custom' ? '' : 'text-gray-700 dark:text-gray-300')} style={{ color: settings.themeId === 'custom' ? settings.customTextColor : undefined }}>{variant.name}</span>
                                <span
                                    className={cn("font-bold text-base")}
                                    style={{ color: settings.themeId === 'custom' ? settings.customAccentColor : settings.productPriceColor }}
                                >
                                    {variant.price} ₺
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Tags / Allergens Footer */}
                {product.tags && product.tags.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                        {product.tags.map((tag) => (
                            <span
                                key={tag.id}
                                className={cn(
                                    "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                                    tag.color || "bg-gray-100 text-gray-600"
                                )}
                            >
                                {getIcon(tag.icon)}
                                {tag.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
