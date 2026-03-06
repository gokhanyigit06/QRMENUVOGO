'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createRestaurant } from '@/lib/services';
import { CheckCircle2, ChevronRight, Store, Link as LinkIcon, User, Lock, Mail, Loader2, ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        plan: 'BASIC' as 'BASIC' | 'PRO' | 'PLUS',
        restaurantName: '',
        slug: '',
        customDomain: '',
        email: '',
        password: '',
    });

    const PLANS = [
        { id: 'BASIC', name: 'Başlangıç', price: '₺299/ay', features: ['Tüm Premium Temalar', 'Sınırsız Kategori', 'Email Desteği'] },
        { id: 'PRO', name: 'Profesyonel', price: '₺499/ay', features: ['Özel Domain (Müşteriye Özel)', 'Sınırsız Ürün & QR', 'Öncelikli Destek'] },
        { id: 'PLUS', name: 'Kurumsal', price: '₺799/ay', features: ['Çoklu Şube Yönetimi', 'Menü Çevirisi', '7/24 Telefon Desteği'] }
    ];

    const handleNext = () => setStep(s => s + 1);
    const handlePrev = () => setStep(s => s - 1);

    const handleRegister = async () => {
        setLoading(true);
        setError('');

        try {
            // Slug format verification
            const validSlug = form.slug.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (validSlug.length < 3) throw new Error('Restoran linki en az 3 karakter olmalıdır.');

            // Call to firebase service
            const rest = await createRestaurant(
                form.restaurantName,
                validSlug,
                form.password,
                form.plan,
                form.email,
                form.customDomain,
                null
            );

            // Set login session automatically
            localStorage.setItem('qr_admin_session', JSON.stringify({
                restaurantId: rest.id,
                slug: rest.slug,
                name: rest.name,
                loginTime: new Date().toISOString()
            }));

            // Direct to admin
            router.push('/admin');

        } catch (err: any) {
            setError(err.message || 'Kayıt sırasında bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col selection:bg-amber-500/30">
            {/* Header */}
            <header className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center">
                        <span className="font-bold">QRS</span>
                    </div>
                    <span className="font-bold text-xl tracking-tight">QRSaaS Onboarding</span>
                </div>
                {step > 1 && (
                    <Button variant="ghost" onClick={handlePrev} className="text-gray-400 hover:text-white">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Geri Dön
                    </Button>
                )}
            </header>

            {/* Content */}
            <main className="flex-grow flex items-center justify-center p-6">
                <div className="w-full max-w-4xl">

                    {/* Progress Bar */}
                    <div className="mb-12 flex items-center justify-center gap-4 text-sm font-medium text-gray-400">
                        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-amber-500' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-amber-500 bg-amber-500/10' : 'border-gray-700'}`}>1</div>
                            <span>Paket</span>
                        </div>
                        <div className={`w-12 h-px ${step >= 2 ? 'bg-amber-500' : 'bg-gray-800'}`}></div>
                        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-amber-500' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-amber-500 bg-amber-500/10' : 'border-gray-700'}`}>2</div>
                            <span>Hesap</span>
                        </div>
                        <div className={`w-12 h-px ${step >= 3 ? 'bg-amber-500' : 'bg-gray-800'}`}></div>
                        <div className={`flex items-center gap-2 ${step >= 3 ? 'text-amber-500' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-amber-500 bg-amber-500/10' : 'border-gray-700'}`}>3</div>
                            <span>Ödeme (Gösterim)</span>
                        </div>
                    </div>

                    {/* Step 1: Packages */}
                    {step === 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className="text-center space-y-2">
                                <h1 className="text-3xl font-bold">Size Uygun Paketi Seçin</h1>
                                <p className="text-gray-400">İstediğiniz zaman paketinizi yükseltebilir veya iptal edebilirsiniz.</p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {PLANS.map((p) => (
                                    <div
                                        key={p.id}
                                        onClick={() => setForm({ ...form, plan: p.id as any })}
                                        className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${form.plan === p.id ? 'border-amber-500 bg-amber-500/5 scale-105' : 'border-white/10 hover:border-white/30 bg-white/5'}`}
                                    >
                                        <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                                        <div className="text-3xl font-bold text-amber-500 mb-6">{p.price}</div>
                                        <div className="space-y-3">
                                            {p.features.map((f, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                    {f}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-8">
                                            <div className={`w-full py-3 rounded-xl text-center font-semibold text-sm transition-colors ${form.plan === p.id ? 'bg-amber-500 text-black' : 'bg-white/10 text-white'}`}>
                                                {form.plan === p.id ? 'Seçildi' : 'Seç'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center pt-8">
                                <Button onClick={handleNext} className="gap-2 px-8 py-6 rounded-full bg-white text-black hover:bg-gray-200 text-lg font-bold">
                                    Devam Et <ChevronRight className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Account Details */}
                    {step === 2 && (
                        <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className="text-center space-y-2">
                                <h1 className="text-3xl font-bold">İşletme Hesabınızı Oluşturun</h1>
                                <p className="text-gray-400">Sisteme giriş ve dükkan bilgilerinizi ayarlayın.</p>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>İşletme Adı <span className="text-amber-500">*</span></Label>
                                        <div className="relative">
                                            <Store className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                            <Input
                                                className="pl-10 bg-black/50 border-white/10 h-12"
                                                placeholder="Örn: Mickey's Cafe"
                                                value={form.restaurantName}
                                                onChange={(e) => setForm({ ...form, restaurantName: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Sistem Linki (Slug) <span className="text-amber-500">*</span></Label>
                                        <div className="flex rounded-lg overflow-hidden border border-white/10 bg-black/50 h-12 focus-within:ring-2 focus-within:ring-amber-500">
                                            <div className="flex items-center px-4 bg-white/5 border-r border-white/10 text-gray-400 text-sm">
                                                qrmenu.com/
                                            </div>
                                            <input
                                                className="flex-1 bg-transparent px-3 text-white outline-none placeholder:text-gray-600 text-sm"
                                                placeholder="mickeys"
                                                value={form.slug}
                                                onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '') })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Kendi Özel Domaininiz (Opsiyonel)</Label>
                                        <div className="relative">
                                            <LinkIcon className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                            <Input
                                                className="pl-10 bg-black/50 border-white/10 h-12"
                                                placeholder="Örn: mickeyscafe.com"
                                                value={form.customDomain}
                                                onChange={(e) => setForm({ ...form, customDomain: e.target.value })}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Opsiyonel. Boş bırakırsanız otomatik olarak <strong className="text-white">{form.slug ? `${form.slug}-id-qrmenu.vogolab.com` : 'restoranid-qrmenu.vogolab.com'}</strong> adresi atanacaktır.
                                        </p>
                                    </div>

                                    <div className="pt-4 pb-2"><div className="h-px bg-white/10"></div></div>

                                    <div className="space-y-2">
                                        <Label>E-Posta Adresi <span className="text-amber-500">*</span></Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                            <Input
                                                type="email"
                                                className="pl-10 bg-black/50 border-white/10 h-12"
                                                placeholder="admin@mickeys.com"
                                                value={form.email}
                                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Yönetici Şifreniz <span className="text-amber-500">*</span></Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                            <Input
                                                type="password"
                                                className="pl-10 bg-black/50 border-white/10 h-12"
                                                placeholder="••••••••"
                                                value={form.password}
                                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleNext}
                                    disabled={!form.restaurantName || !form.slug || !form.email || !form.password}
                                    className="w-full h-12 text-black bg-amber-500 hover:bg-amber-400 font-bold text-md"
                                >
                                    Son Adıma Geç
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Payment Checkout Mock */}
                    {step === 3 && (
                        <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className="text-center space-y-2">
                                <h1 className="text-3xl font-bold">Kayıt İşlemini Tamamlayın</h1>
                                <p className="text-gray-400">Şu anda ödeme simülasyonundayız. Sadece onayla deyin.</p>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8">

                                <div className="p-4 rounded-xl border border-white/10 bg-black/50 flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-lg text-white">{PLANS.find(p => p.id === form.plan)?.name} Paketi</div>
                                        <div className="text-sm text-gray-400">{form.restaurantName} işletmesi için</div>
                                    </div>
                                    <div className="text-2xl font-bold text-amber-500">
                                        {PLANS.find(p => p.id === form.plan)?.price.split('/')[0]}
                                    </div>
                                </div>

                                {/* Mock CC Box */}
                                <div className="space-y-4 opacity-50 pointer-events-none">
                                    <div className="space-y-2">
                                        <Label>Kart Üzerindeki İsim</Label>
                                        <Input className="bg-black/50 border-white/10" value="Gökhan Yiğit" readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Kart Numarası</Label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                                            <Input className="pl-10 bg-black/50 border-white/10" value="4555 6666 7777 8888" readOnly />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Son Kullanma</Label>
                                            <Input className="bg-black/50 border-white/10" value="12/29" readOnly />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>CVC</Label>
                                            <Input className="bg-black/50 border-white/10" value="***" readOnly />
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    onClick={handleRegister}
                                    disabled={loading}
                                    className="w-full h-14 text-black bg-white hover:bg-gray-200 font-bold text-lg rounded-xl flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <><Loader2 className="w-5 h-5 animate-spin" /> Hesap Oluşturuluyor...</>
                                    ) : (
                                        'Ödemeyi Onayla ve Paneli Aç'
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}
