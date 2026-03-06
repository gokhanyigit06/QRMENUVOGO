'use client';

import { useMenu } from '@/lib/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, CreditCard, Receipt, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BillingPage() {
    const { restaurant, loading } = useMenu();
    const [plan, setPlan] = useState('');

    useEffect(() => {
        if (restaurant) setPlan(restaurant.plan_type || 'BASIC');
    }, [restaurant]);

    const PLANS = [
        { id: 'BASIC', name: 'Başlangıç', price: '₺299/ay', features: ['Tüm Premium Temalar', 'Sınırsız Kategori', 'Email Desteği'] },
        { id: 'PRO', name: 'Profesyonel', price: '₺499/ay', features: ['Özel Domain', 'Sınırsız Ürün & QR', 'Öncelikli Destek'] },
        { id: 'PLUS', name: 'Kurumsal', price: '₺799/ay', features: ['Çoklu Şube Yönetimi', 'Menü Çevirisi', '7/24 Telefon Desteği'] }
    ];

    const handleUpgrade = (selectedPlan: string) => {
        alert(`Şu anda ödeme simülasyonundayız. İleride İyzico / Stripe ödeme ekranı açılarak hesabınız otomatik ${selectedPlan} paketine yükselecektir.`);
    };

    if (loading) {
        return <div className="p-10 flex justify-center"><div className="animate-spin w-8 h-8 rounded-full border-4 border-amber-500 border-t-transparent"></div></div>;
    }

    if (!restaurant) return null;

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Abonelik ve Faturalar</h1>
                <p className="text-sm text-gray-500 mt-1">Sistem paketinizi yönetin ve yeni özelliklerin kilidini açın.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-gray-200 shadow-sm border-t-4 border-t-amber-500">
                    <CardHeader className="bg-amber-50/20">
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Zap className="h-5 w-5 text-amber-500" />
                            Mevcut Planınız: {PLANS.find(p => p.id === plan)?.name}
                        </CardTitle>
                        <CardDescription>
                            Geçerli dönemin sonunda kartınızdan otomatik bakiye çekilecektir.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            <div className="flex justify-between items-center p-4 rounded-xl border border-gray-100 bg-gray-50">
                                <div className="space-y-1">
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Kayıtlı Kart</div>
                                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                                        <CreditCard className="w-5 h-5 text-gray-500" />
                                        **** **** **** 8888
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" onClick={() => alert("Kart değiştir ekranı(İyzico vb.)")}>
                                    Kartı Güncelle
                                </Button>
                            </div>

                            <div className="flex gap-4">
                                <Button className="w-1/2 rounded-xl h-12 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 shadow-sm" onClick={() => alert('İptal işlemi destek ile yapılır veya otomatik durdurulur.')}>
                                    Aboneliği İptal Et
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-gray-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Receipt className="h-5 w-5 text-gray-500" />
                            Son Faturalar
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center text-sm py-2 border-b">
                            <span className="text-gray-500">01 Mart 2026</span>
                            <span className="font-bold">Ödendi</span>
                        </div>
                        <div className="flex justify-between items-center text-sm py-2 border-b">
                            <span className="text-gray-500">01 Şubat 2026</span>
                            <span className="font-bold">Ödendi</span>
                        </div>
                        <Button variant="link" className="px-0 pt-2 h-auto text-amber-600 font-bold">
                            Tümünü Gör
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-xl font-bold pt-8 pb-4">Paketinizi Yükseltin</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {PLANS.map((p) => (
                    <div
                        key={p.id}
                        className={`p-6 rounded-2xl border-2 transition-all relative ${plan === p.id ? 'border-amber-500 bg-amber-500/5 shadow-md shadow-amber-500/10' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                    >
                        {plan === p.id && (
                            <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg text-center">
                                TERCİH EDİLEN
                            </div>
                        )}
                        <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                        <div className="text-3xl font-bold text-gray-900 mb-6">{p.price}</div>
                        <div className="space-y-3 mb-8">
                            {p.features.map((f, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan === p.id ? 'text-amber-500' : 'text-gray-400'}`} />
                                    {f}
                                </div>
                            ))}
                        </div>
                        <div className="mt-auto">
                            <Button
                                disabled={plan === p.id}
                                onClick={() => handleUpgrade(p.id)}
                                variant={plan === p.id ? 'outline' : 'default'}
                                className={`w-full rounded-xl h-12 font-bold ${plan !== p.id && 'bg-black text-white hover:bg-gray-800'}`}
                            >
                                {plan === p.id ? 'Mevcut Planınız' : 'Yükselt'}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
