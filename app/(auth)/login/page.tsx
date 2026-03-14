'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRestaurantBySlug } from '@/lib/services';
import { auth } from '@/lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { ChefHat, Lock, User, Mail, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function LoginPage() {
    const router = useRouter();
    const [slug, setSlug] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Forgot Password states
    const [showForgotPass, setShowForgotPass] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const restaurant = await getRestaurantBySlug(slug);

            if (!restaurant) {
                throw new Error('Restoran bulunamadı.');
            }

            if (restaurant.is_active === false) {
                throw new Error('İşletme hesabı askıya alınmıştır. Lütfen sistem yöneticisiyle iletişime geçin.');
            }

            if ((restaurant as any).password !== password) {
                throw new Error('Hatalı şifre.');
            }

            localStorage.setItem('qr_admin_session', JSON.stringify({
                restaurantId: restaurant.id,
                slug: restaurant.slug,
                name: restaurant.name,
                loginTime: new Date().toISOString()
            }));

            router.push('/admin');

        } catch (err: any) {
            setError(err.message || 'Giriş yapılamadı.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!resetEmail) {
            setError("Lütfen e-posta adresinizi girin.");
            return;
        }

        setLoading(true);
        setError('');
        setResetSuccess(false);

        try {
            await sendPasswordResetEmail(auth, resetEmail);
            setResetSuccess(true);
        } catch (err: any) {
            console.error("Firebase Reset Error:", err);
            setError("Şifre sıfırlama e-postası gönderilemedi. E-posta adresinizi kontrol edin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#CCCFD9]/20 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-[#5A37A6]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-[#8F6CD9]/10 rounded-full blur-3xl" />

            <Card className="w-full max-w-md shadow-2xl border-[#CCCFD9] rounded-[2.5rem] bg-white relative z-10 border-solid">
                <CardHeader className="text-center pb-8 pt-10">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#5A37A6] to-[#8F6CD9] text-white shadow-xl shadow-[#5A37A6]/20 rotate-3">
                        <ChefHat className="h-10 w-10" />
                    </div>
                    <CardTitle className="text-3xl font-black tracking-tight text-[#402814]">
                        {showForgotPass ? 'Şifre Kurtarma' : 'İşletme Girişi'}
                    </CardTitle>
                    <CardDescription className="text-[#402814]/60 mt-3 font-medium">
                        {showForgotPass
                            ? 'Sisteme kayıtlı e-posta adresinizi girin.'
                            : 'QR Menü sisteminizi yönetmek için giriş yapın.'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-10">
                    {showForgotPass ? (
                        <form className="space-y-6" onSubmit={handleResetPassword}>
                            {resetSuccess ? (
                                <div className="rounded-2xl bg-emerald-50 p-6 text-sm text-emerald-700 text-center font-bold border border-emerald-100 animate-in zoom-in-95">
                                    <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    Şifre sıfırlama bağlantısı gönderildi. <br/> Lütfen mail kutunuzu kontrol edin.
                                    <div className="mt-6">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => { setShowForgotPass(false); setResetSuccess(false); }}
                                            className="w-full rounded-xl border-[#CCCFD9] font-bold h-12"
                                        >
                                            Giriş Ekranına Dön
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="resetEmail" className="text-xs font-black uppercase text-[#402814]/40 ml-1">E-Posta Adresi</Label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#CCCFD9]/50 group-focus-within:text-[#5A37A6] transition-colors">
                                                    <Mail className="h-5 w-5" />
                                                </div>
                                                <Input
                                                    id="resetEmail"
                                                    type="email"
                                                    required
                                                    value={resetEmail}
                                                    onChange={(e) => setResetEmail(e.target.value)}
                                                    className="pl-11 h-14 rounded-2xl border-[#CCCFD9] bg-gray-50/50 focus:ring-[#5A37A6]/10"
                                                    placeholder="mail@isletme.com"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600 text-center font-bold border border-red-100">
                                            {error}
                                        </div>
                                    )}

                                    <div className="flex gap-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => { setShowForgotPass(false); setError(''); }}
                                            className="h-14 w-14 shrink-0 rounded-2xl border-[#CCCFD9] hover:bg-gray-50 transition-all"
                                        >
                                            <ArrowLeft className="w-5 h-5 text-[#402814]/40" />
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 h-14 text-base font-black rounded-2xl shadow-lg shadow-[#5A37A6]/10 bg-[#5A37A6] hover:bg-[#8F6CD9] text-white transition-all active:scale-[0.98]"
                                        >
                                            {loading ? 'Gönderiliyor...' : 'Sıfırlama Linki Gönder'}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </form>
                    ) : (
                        <form className="space-y-6" onSubmit={handleLogin}>
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="slug" className="text-xs font-black uppercase text-[#402814]/40 ml-1">Restoran Kodu</Label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#CCCFD9]/50 group-focus-within:text-[#5A37A6] transition-colors">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <Input
                                            id="slug"
                                            type="text"
                                            required
                                            value={slug}
                                            onChange={(e) => setSlug(e.target.value)}
                                            className="pl-11 h-14 rounded-2xl border-[#CCCFD9] bg-gray-50/50 focus:ring-[#5A37A6]/10 font-bold text-[#402814]"
                                            placeholder="mickeys-pizza"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-xs font-black uppercase text-[#402814]/40 ml-1">Şifre</Label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#CCCFD9]/50 group-focus-within:text-[#5A37A6] transition-colors">
                                            <Lock className="h-5 w-5" />
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-11 h-14 rounded-2xl border-[#CCCFD9] bg-gray-50/50 focus:ring-[#5A37A6]/10 font-bold"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end">
                                <button
                                    type="button"
                                    onClick={() => { setShowForgotPass(true); setError(''); }}
                                    className="text-xs font-bold text-[#5A37A6] hover:text-[#8F6CD9] transition-colors"
                                >
                                    Şifrenizi mi unuttunuz?
                                </button>
                            </div>

                            {error && (
                                <div className="rounded-xl bg-[#A60D0D]/5 p-4 text-xs text-[#A60D0D] text-center font-bold border border-[#A60D0D]/10">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 text-base font-black rounded-2xl shadow-xl shadow-[#5A37A6]/20 bg-[#5A37A6] hover:bg-[#8F6CD9] text-white transition-all active:scale-[0.98]"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Kontrol Ediliyor...
                                    </span>
                                ) : (
                                    'Yönetim Paneline Giriş'
                                )}
                            </Button>
                        </form>
                    )}
                </CardContent>
                <CardFooter className="flex-col pb-10">
                    <div className="text-center text-[10px] text-[#402814]/30 w-full space-y-1 font-bold uppercase tracking-tight">
                        <p>© 2026 QRSaaS Yönetim Çözümleri</p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
