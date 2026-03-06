'use client';

import { useMenu } from '@/lib/store';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';

export default function A4MenuComponent({ hideControls = false }: { hideControls?: boolean }) {
    const { products, categories, settings, loading } = useMenu();

    useEffect(() => {
        document.body.classList.remove('dark');
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-white p-8">
                <div className="max-w-[210mm] mx-auto space-y-8">
                    <Skeleton className="h-24 w-full" />
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-32 w-full" />
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
        <div className="min-h-screen bg-gray-100 p-8 print:p-0 print:bg-white font-serif">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

                @media print {
                    @page {
                        size: A4 portrait;
                        margin: 0mm; /* Removes browser header/footer */
                    }
                    body {
                        background: white;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .no-print {
                        display: none !important;
                    }
                    /* Ensure content is readable over any background */
                    .content-layer {
                        position: relative;
                        z-index: 20;
                    }
                }

                .menu-font-title {
                    font-family: 'Cormorant Garamond', serif;
                }
                .menu-font-body {
                    font-family: 'Montserrat', sans-serif;
                }
            `}</style>

            {/* Controls */}
            {!hideControls && (
                <div className="no-print fixed top-6 right-6 z-50 flex flex-col gap-2">
                    <button
                        onClick={() => window.print()}
                        className="bg-black text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline><path d="M6 18h12"></path><path d="M6 5h12"></path></svg>
                        YAZDIR / PDF (A4)
                    </button>
                </div>
            )}

            {/* Page Content Wrapper */}
            <div className="mx-auto bg-white shadow-2xl print:shadow-none w-[210mm] relative print:w-full print:static print:overflow-visible">

                {/* Corner Decorations removed */}

                {/* Main Content Content */}
                <div className="relative z-10 content-layer px-8 py-12 print:p-[20mm]">

                    {/* Header */}
                    {/* Header */}
                    <div className="text-center mb-12">
                        {/* Custom Menu Title / Date - Placed above logo */}
                        {settings.menuTitleText && (
                            <p className="text-[#6d4c41]/80 text-xs uppercase mb-4 font-bold tracking-widest">
                                {settings.menuTitleText}
                            </p>
                        )}

                        {settings.logoUrl ? (
                            <img src={settings.logoUrl} alt={settings.siteName} className="h-24 w-auto object-contain mx-auto mb-4" />
                        ) : (
                            <h1 className="text-5xl font-bold text-[#4a3728] menu-font-title uppercase tracking-widest">{settings.siteName}</h1>
                        )}
                        <p className="text-[#6d4c41] tracking-[0.3em] text-xs uppercase mt-2 font-medium">{settings.siteDescription || "MENÜ"}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-12">
                        {categorizedProducts.map((category) => (
                            <div key={category.id} className="break-inside-avoid page-break-inside-avoid mb-8">
                                {/* Category Title */}
                                <div className="text-center mb-8 relative">
                                    <h2 className="text-3xl font-bold text-[#4a3728] menu-font-title uppercase inline-block px-4 bg-white relative z-10">
                                        {category.name}
                                    </h2>
                                    <div className="absolute top-1/2 left-0 w-full h-px bg-[#4a3728]/20 -z-0"></div>
                                    {category.nameEn && (
                                        <p className="text-xs text-[#8d6e63] mt-1 font-medium tracking-wide uppercase">{category.nameEn}</p>
                                    )}
                                </div>

                                {/* Items Grid */}
                                <div className="grid grid-cols-1 gap-x-12 gap-y-6">
                                    {category.items.map((product) => {
                                        // Simple price formatting
                                        const priceFormatted = new Intl.NumberFormat('tr-TR', {
                                            style: 'currency',
                                            currency: 'TRY',
                                            minimumFractionDigits: 0
                                        }).format(product.price || 0).replace('₺', '');

                                        return (
                                            <div key={product.id} className="group">
                                                <div className="flex items-baseline justify-between menu-font-title">
                                                    <h3 className="text-xl font-bold text-[#3e2723] uppercase tracking-wide">
                                                        {product.name}
                                                    </h3>
                                                    <div className="flex-1 mx-4 border-b-2 border-dotted border-[#4a3728]/30 relative -top-1.5 opacity-50"></div>
                                                    <div className="text-xl font-bold text-[#3e2723] whitespace-nowrap">
                                                        {priceFormatted}<span className="text-sm font-normal ml-1">₺</span>
                                                    </div>
                                                </div>

                                                {(product.description) && (
                                                    <p className="menu-font-body text-[#5d4037] text-sm mt-1 leading-relaxed w-[90%] opacity-90">
                                                        {product.description}
                                                    </p>
                                                )}

                                                {/* Variants */}
                                                {product.variants && product.variants.length > 0 && (
                                                    <div className="mt-2 space-y-1">
                                                        {product.variants.map((variant, vIndex) => (
                                                            <div key={vIndex} className="flex justify-between items-center text-sm w-[90%] pl-2 border-l-2 border-[#4a3728]/20">
                                                                <span className="font-medium text-[#4e342e] menu-font-body">{variant.name}</span>
                                                                <span className="font-bold text-[#3e2723] menu-font-title">
                                                                    {new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 0 }).format(variant.price || 0)}<span className="text-xs font-normal ml-0.5">₺</span>
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Allergen/Extra info could go here */}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer for the last page */}
                    <div className="mt-16 text-center border-t border-[#4a3728]/10 pt-8 print:hidden">
                        <p className="text-xs text-gray-400 font-mono">
                            {settings.siteName} - A4 Menu List
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
