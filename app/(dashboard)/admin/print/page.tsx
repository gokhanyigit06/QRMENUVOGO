'use client';

import { useMenu } from '@/lib/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileImage, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Image from 'next/image';

export default function PrintCenterPage() {
    const { restaurant, categories, products, settings, loading } = useMenu();
    const [isGenerating, setIsGenerating] = useState(false);
    const printRef = useRef<HTMLDivElement>(null);

    const generatePDF = async () => {
        if (!printRef.current) return;
        setIsGenerating(true);

        try {
            // Canvasi oluşturmadan önce DOM'un oturması için çok kısa bir bekleme süresi
            await new Promise(resolve => setTimeout(resolve, 300));

            // Dev HTML alanını ekrandan yakala
            const canvas = await html2canvas(printRef.current, {
                scale: 1, // 1 scale (Önceki 1.5 çok yüksek bellek kullanımına yol açıyordu)
                useCORS: true,
                allowTaint: false,
                backgroundColor: '#ffffff'
            });

            // 70cm Genişlik, 50cm Yükseklik = 700mm x 500mm
            // Format [700, 500] Landscape (Yatay) olacak
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: [700, 500]
            });

            // Image'i PDF'e yatay formatta tam oturt
            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            pdf.addImage(imgData, 'JPEG', 0, 0, 700, 500);

            pdf.save(`${restaurant?.slug || 'menu'}-70x50-poster.pdf`);

        } catch (error: any) {
            console.error("PDF Generate Error", error);
            alert("PDF çıkartılırken hata oluştu: " + (error.message || "Bilinmeyen hata. Tarayıcınız işlemi engelliyor olabilir."));
        } finally {
            setIsGenerating(false);
        }
    };

    if (loading) {
        return <div className="p-10 flex justify-center"><div className="animate-spin w-8 h-8 rounded-full border-4 border-amber-500 border-t-transparent"></div></div>;
    }

    if (!restaurant) return null;

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Baskı Merkezi (Menü Çıktısı)</h1>
                <p className="text-sm text-gray-500 mt-1">Sunucuya yük bindirmeden doğrudan tarayıcınızdan PDF menü oluşturun.</p>
            </div>

            <Card className="border-gray-200 shadow-sm border-t-4 border-t-amber-500">
                <CardHeader className="bg-amber-50/20">
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <FileImage className="h-5 w-5 text-amber-500" />
                        70x50 cm Yatay Poster Çıktısı
                    </CardTitle>
                    <CardDescription>
                        Matbaaya göndermek için devasa boyutlu bir PDF hazırla. Tüm ürünleriniz sisteme girdiğiniz sırayla otomatik dizilir.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <Button
                        onClick={generatePDF}
                        disabled={isGenerating}
                        className="w-full md:w-auto h-14 px-8 text-base font-bold flex items-center justify-center gap-2 rounded-xl shadow-md bg-black text-white hover:bg-gray-800 transition-all"
                    >
                        {isGenerating ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> Mükemmel PDF Hazırlanıyor, Bekleyin...</>
                        ) : (
                            <><Download className="w-5 h-5" /> 70x50 PDF İndir (Yüksek Kalite)</>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* GİZLİ BASKI ALANI: Cihaz Hafızasını yormamak için 3500px Genişlik x 2500px Yükseklik */}
            <div className="overflow-hidden h-0 w-0 opacity-0 pointer-events-none fixed top-0 left-0">
                <div
                    ref={printRef}
                    className="bg-white"
                    style={{
                        width: '3500px',
                        minHeight: '2500px', // Landscape 70x50 oranı (7:5)
                        padding: '120px',
                        fontFamily: 'Inter, sans-serif'
                    }}
                >
                    {/* Header: Logo and Site Name */}
                    <div className="flex flex-row items-center justify-center gap-10 border-b-[4px] pb-10 mb-10" style={{ borderColor: '#e5e7eb' }}>
                        {settings?.logoUrl && (
                            <div className="relative w-[250px] h-[250px]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={settings.logoUrl}
                                    alt="Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}
                        <div className="flex flex-col">
                            <h1 className="text-[125px] font-black tracking-tight leading-none uppercase" style={{ color: '#111827' }}>
                                {settings?.siteName || restaurant.name}
                            </h1>
                            {settings?.siteDescription && (
                                <p className="text-[40px] mt-3 font-medium" style={{ color: '#6b7280' }}>{settings.siteDescription}</p>
                            )}
                        </div>
                    </div>

                    {/* Content: Çoklu Sütun (Masonry/Columns Effect) */}
                    <div className="columns-3 gap-[50px]">
                        {categories.map((cat) => {
                            const catProducts = products.filter(p => p.categoryId === cat.id && p.isActive !== false);
                            if (catProducts.length === 0) return null;

                            return (
                                <div key={cat.id} className="break-inside-avoid mb-[50px] p-8 rounded-[40px] border-[3px]" style={{ backgroundColor: '#f9fafb', borderColor: '#f3f4f6' }}>
                                    <h2 className="text-[60px] font-black mb-8 uppercase tracking-tight border-b-[3px] pb-4" style={{ color: '#d97706', borderColor: '#fde68a' }}>{cat.name}</h2>
                                    <div className="space-y-8">
                                        {catProducts.map(prod => (
                                            <div key={prod.id} className="flex flex-col gap-3">
                                                <div className="flex justify-between items-start gap-6">
                                                    <h3 className="text-[40px] font-bold leading-tight flex-1" style={{ color: '#111827' }}>{prod.name}</h3>
                                                    <div className="text-[42px] font-black shrink-0 whitespace-nowrap" style={{ color: '#d97706' }}>
                                                        {prod.price} <span className="text-[28px]">₺</span>
                                                    </div>
                                                </div>
                                                {prod.description && (
                                                    <p className="text-[25px] leading-snug w-[90%]" style={{ color: '#6b7280' }}>{prod.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer / Branding */}
                    <div className="mt-16 text-center text-[30px] border-t-[4px] pt-8" style={{ color: '#9ca3af', borderColor: '#f3f4f6' }}>
                        Bu menü VogoLab QRSaaS tarafından otomatik oluşturulmuştur.
                    </div>
                </div>
            </div>

        </div>
    );
}
