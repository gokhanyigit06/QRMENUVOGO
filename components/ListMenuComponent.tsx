'use client';

import { useMenu } from '@/lib/store';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';

export default function ListMenuComponent({ hideControls = false }: { hideControls?: boolean }) {
    const { products, categories, settings, loading } = useMenu();

    useEffect(() => {
        document.body.classList.remove('dark');
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-white p-8">
                <div className="max-w-7xl mx-auto space-y-4">
                    <Skeleton className="h-12 w-64" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Skeleton key={i} className="h-48 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const categorizedProducts = categories.map(category => ({
        ...category,
        items: products.filter(p => p.categoryId === category.id).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    })).filter(cat => cat.items.length > 0);

    return (
        <div className="min-h-screen bg-gray-200 print:bg-white font-sans overflow-x-auto">
            <style jsx global>{`
                @media print {
                    @page {
                        size: landscape;
                        margin: 1mm;
                    }
                    body {
                        background: white !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        zoom: 0.95;
                    }
                    .no-print {
                        display: none !important;
                    }
                }
                
                .printable-area {
                    width: 100%;
                    min-width: 1900px;
                    background: white;
                    margin: 0 auto;
                }

                @media print {
                    .printable-area {
                        min-width: 100%;
                        width: 100%;
                        padding: 0 !important;
                    }
                }

                .column-container {
                    column-count: 6;
                    column-gap: 1.5rem;
                }

                @media print {
                    .column-container {
                        column-count: 9; /* Reverted to 9 columns */
                        column-gap: 2mm;
                    }
                    .category-block {
                        margin-bottom: 2px;
                    }
                    /* Forced tight spacing for products */
                    .product-row {
                        margin-top: -1.5px !important; /* Pull products closer */
                        margin-bottom: 0 !important;
                        padding-top: 0 !important;
                        padding-bottom: 0 !important;
                        line-height: 0.85 !important;
                    }
                    /* Add breathing room for variants */
                    .variant-row {
                        margin-top: 0.5px !important;
                        line-height: 1.1 !important;
                    }
                }
            `}</style>

            {/* Controls */}
            {!hideControls && (
                <div className="no-print bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 py-3 sticky top-0 z-50 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900 tracking-tight">Tek Sayfa Menü (Final Sıkıştırma v4)</h1>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Sütun: 9 | Varyantlar Açıldı, Ürünler Kısıldı</p>
                        </div>
                    </div>
                    <button
                        onClick={() => window.print()}
                        className="bg-[#4a3728] text-white px-8 py-2.5 rounded-full text-sm font-bold shadow-xl hover:scale-105 transition-all"
                    >
                        🖨️ YAZDIR (TEK SAYFA)
                    </button>
                </div>
            )}

            {/* The Horizontal Menu Surface */}
            <div className="printable-area p-8 print:p-0">

                {/* Brand Header */}
                <div className="bg-[#4a3728] print:bg-[#4a3728] text-white px-8 py-2 mb-3 flex items-center justify-between print:mb-1 print:py-1 print:px-2">
                    <div className="flex flex-col">
                        {settings.logoUrl ? (
                            <img src={settings.logoUrl} alt={settings.siteName} className="h-6 w-auto object-contain brightness-0 invert print:h-4" />
                        ) : (
                            <h2 className="text-3xl font-serif italic font-black uppercase tracking-tighter print:text-xs leading-none">{settings.siteName}</h2>
                        )}
                    </div>
                    <div className="text-right border-l border-white/20 pl-6 print:pl-2">
                        <p className="text-[9px] font-bold tracking-[0.4em] uppercase opacity-80 print:text-[5.5px] leading-none mb-0.5">{settings.siteDescription || "MENU"}</p>
                        <p className="text-[8px] opacity-40 italic print:text-[5px] leading-none uppercase">{settings.menuTitleText || new Date().toLocaleDateString('tr-TR')}</p>
                    </div>
                </div>

                {/* The Column Grid */}
                <div className="column-container">
                    {categorizedProducts.map((category) => (
                        <div key={category.id} className="category-block">
                            {/* Category Banner */}
                            <div className="bg-[#6d4c41] print:bg-[#6d4c41] px-2 py-0.5 mb-1 print:mb-0.5">
                                <h3 className="text-[9.5px] font-black text-white uppercase tracking-[0.05em] flex items-center justify-between print:text-[6px] leading-tight">
                                    <span>{category.name}</span>
                                    {category.nameEn && <span className="opacity-40 text-[7.5px] font-medium print:text-[5px]">/ {category.nameEn}</span>}
                                </h3>
                            </div>

                            {/* Product Rows - ULTRA COMPACT */}
                            <div className="space-y-0.5 print:space-y-0">
                                {category.items.map((product) => {
                                    const nameParts = product.name.match(/^(.+?)(\(.+\))$/);
                                    const title = nameParts ? nameParts[1].trim() : product.name;
                                    const subTitle = nameParts ? nameParts[2].trim() : null;

                                    return (
                                        <div key={product.id} className="product-row flex flex-col py-0.5 print:py-0">
                                            <div className="flex justify-between items-baseline gap-0.5">
                                                <div className="flex-1 overflow-hidden">
                                                    <div className="flex items-center gap-0.5 overflow-hidden">
                                                        <span className="product-text font-extrabold text-[#222] text-[9px] uppercase whitespace-nowrap leading-none tracking-tighter print:text-[6.2px]">
                                                            {title}
                                                        </span>
                                                        <div className="flex-1 border-b border-dotted border-gray-300 translate-y-[-1.5px] opacity-50"></div>
                                                    </div>
                                                    {subTitle && (
                                                        <p className="text-[8px] font-bold text-[#c62828] mt-0 italic leading-none uppercase print:text-[5.5px]">
                                                            {subTitle}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-right pl-0.5">
                                                    <span className="text-[9px] font-black text-gray-900 whitespace-nowrap print:text-[6.2px]">
                                                        {product.price}<span className="text-[5px] ml-0.2 font-bold text-gray-400">₺</span>
                                                    </span>
                                                </div>
                                            </div>
                                            {/* Variants */}
                                            {product.variants && product.variants.length > 0 && (
                                                <div className="variant-row pl-1 mt-0.5 print:mt-[1px] space-y-0.5 print:space-y-[1px]">
                                                    {product.variants.map((v, i) => (
                                                        <div key={i} className="flex justify-between items-baseline opacity-80 leading-snug">
                                                            <span className="text-[7px] text-gray-600 print:text-[5px] font-medium leading-snug">- {v.name}</span>
                                                            <span className="text-[7px] text-gray-800 print:text-[5px] font-bold leading-snug">
                                                                {v.price}₺
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Minimal Footer */}
                <div className="mt-4 pt-1 border-t border-gray-100 flex justify-between items-center opacity-30 print:mt-1">
                    <p className="text-[7px] font-bold uppercase print:text-[4px] leading-none mb-0">* FİYATLARIMIZA KDV DAHİLDİR</p>
                    <p className="text-[7px] font-black italic print:text-[4px] leading-none">{settings.siteName}</p>
                </div>
            </div>
        </div>
    );
}
