'use client';

import { useMenu } from '@/lib/store';
import { QRCodeSVG } from 'qrcode.react';
import { Download, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRef, useState, useEffect } from 'react';

export default function QRGeneratorPage() {
    const { restaurant, settings, loading } = useMenu();
    const qrRef = useRef<HTMLDivElement>(null);
    const [qrUrl, setQrUrl] = useState('');

    useEffect(() => {
        if (!restaurant) return;

        // Kendi domaini varsa onu, yoksa bizim tanımladığımız custom domain (slug-id-qrmenu.vogolab.com) adresini veya doğrudan slug ile açılan url'i veriyoruz.
        // Ama en garantisi, o sisteme ne kayıtlıysa (custom_domain alanı) onu almak. Yoksa mickeys-id.vogolab.com falan da olabilir.
        if (restaurant.custom_domain) {
            setQrUrl(`https://${restaurant.custom_domain}`);
        } else {
            // Backup url if somehow custom_domain is missing
            setQrUrl(`https://qrmenu.vogolab.com/${restaurant.slug}`);
        }
    }, [restaurant]);


    const handleDownload = () => {
        if (!qrRef.current) return;

        // Konvertleme SVG'den geçip doğrudan SVG olarak indirebiliriz ya da Canvas ile PNG.
        const svgElement = qrRef.current.querySelector('svg');
        if (!svgElement) return;

        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            // Add padding and white background to the downloaded image
            canvas.width = img.width + 40;
            canvas.height = img.height + 40;
            if (ctx) {
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 20, 20);

                const pngFile = canvas.toDataURL("image/png");
                const downloadLink = document.createElement("a");
                downloadLink.download = `${restaurant?.slug || 'menu'}-qrcode.png`;
                downloadLink.href = `${pngFile}`;
                downloadLink.click();
            }
        };
        img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
    };

    if (loading) {
        return <div className="p-10 flex justify-center"><div className="animate-spin w-8 h-8 rounded-full border-4 border-amber-500 border-t-transparent"></div></div>;
    }

    if (!restaurant) return null;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">QR Kod Oluşturucu</h1>
                <p className="text-sm text-gray-500 mt-1">Masanıza veya broşürünüze koymak için hazır menü karekodunuz.</p>
            </div>

            <Card className="border-gray-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-gray-50/50 border-b border-gray-100">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <QrCode className="w-5 h-5 text-amber-600" />
                        Ücretsiz Tasarım
                    </CardTitle>
                    <CardDescription>Bu karekodu matbaaya göndererek masalarınız için pleksi baskı yaptırabilirsiniz.</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
                        <div
                            className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center gap-6"
                            ref={qrRef}
                        >
                            <QRCodeSVG
                                value={qrUrl}
                                size={250}
                                level="H"
                                includeMargin={true}
                                imageSettings={{
                                    src: settings?.logoUrl || '/store-default.png',
                                    x: undefined,
                                    y: undefined,
                                    height: 50,
                                    width: 50,
                                    excavate: true,
                                }}
                            />
                            {settings?.siteName && (
                                <div className="text-xl font-black text-center text-gray-900 tracking-tight">
                                    {settings.siteName}
                                </div>
                            )}
                        </div>

                        <div className="space-y-6 max-w-xs text-center md:text-left">
                            <div className="space-y-2">
                                <h3 className="font-bold text-gray-900">Yönlenecek Adres</h3>
                                <div className="p-3 bg-gray-100 text-sm font-medium text-gray-700 rounded-lg break-all">
                                    {qrUrl}
                                </div>
                                <p className="text-xs text-gray-500">Kamera ile okutulduğunda misafirleriniz doğrudan bu siteye gidecektir.</p>
                            </div>

                            <Button
                                onClick={handleDownload}
                                className="w-full h-14 text-base font-bold flex items-center justify-center gap-2 rounded-xl shadow-md hover:shadow-lg transition-all"
                            >
                                <Download className="w-5 h-5" />
                                PNG Olarak İndir
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
