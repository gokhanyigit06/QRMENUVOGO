'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRestaurantBySlug } from '@/lib/services';
import { auth } from '@/lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { ChefHat, Lock, User, Mail, ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

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
            // 1. Restoranı bul ve şifreyi kontrol et
            const restaurant = await getRestaurantBySlug(slug);

            if (!restaurant) {
                throw new Error('Restoran bulunamadı.');
            }

            // Basit şifre kontrolü (Düz metin - Restaurant interface'ine göre)
            // Not: Firebase'den gelen veride password alanı olduğunu varsayıyoruz (Supabase'den öyle geliyordu)
            if ((restaurant as any).password !== password) {
                throw new Error('Hatalı şifre.');
            }

            // 2. Başarılı! Giriş bilgisini kaydet (LocalStorage)
            localStorage.setItem('qr_admin_session', JSON.stringify({
                restaurantId: restaurant.id,
                slug: restaurant.slug,
                name: restaurant.name,
                loginTime: new Date().toISOString()
            }));

            // 3. Admin paneline yönlendir
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
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md shadow-xl border-gray-100 rounded-2xl">
                <CardHeader className="text-center pb-8">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white shadow-lg">
                        <ChefHat className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
                        {showForgotPass ? 'Şifremi Unuttum' : 'Yönetici Girişi'}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-2">
                        {showForgotPass
                            ? 'Sisteme kayıtlı e-posta adresinizi girin.'
                            : 'QR Menü sisteminizi yönetmek için giriş yapın.'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {showForgotPass ? (
                        <form className="space-y-6" onSubmit={handleResetPassword}>
                            {resetSuccess ? (
                                <div className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-600 text-center font-medium border border-emerald-100">
                                    Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu (ve gereksiz klasörünü) kontrol edin.
                                    <div className="mt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => { setShowForgotPass(false); setResetSuccess(false); }}
                                            className="w-full"
                                        >
                                            Giriş Ekranına Dön
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="resetEmail" className="sr-only">E-Posta</Label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <Mail className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <Input
                                                    id="resetEmail"
                                                    type="email"
                                                    required
                                                    value={resetEmail}
                                                    onChange={(e) => setResetEmail(e.target.value)}
                                                    className="pl-10 py-6 rounded-xl bg-gray-50/50"
                                                    placeholder="E-Posta Adresi"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 text-center font-medium border border-red-100">
                                            {error}
                                        </div>
                                    )}

                                    <div className="flex gap-3 overflow-hidden p-1">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => { setShowForgotPass(false); setError(''); }}
                                            className="h-14 w-14 shrink-0 rounded-xl flex items-center justify-center p-0 border-gray-200"
                                        >
                                            <ArrowLeft className="w-5 h-5 text-gray-500" />
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 h-14 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 bg-black text-white"
                                        >
                                            {loading ? 'Gönderiliyor' : 'Bağlantı Gönder'}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </form>
                    ) : (
                        <form className="space-y-6" onSubmit={handleLogin}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="slug" className="sr-only">Restoran Kodu</Label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <Input
                                            id="slug"
                                            type="text"
                                            required
                                            value={slug}
                                            onChange={(e) => setSlug(e.target.value)}
                                            className="pl-10 py-6 rounded-xl bg-gray-50/50"
                                            placeholder="Restoran Kodu (Örn: mickeys)"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="sr-only">Şifre</Label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-10 py-6 rounded-xl bg-gray-50/50"
                                            placeholder="Şifre"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end text-sm">
                                <button
                                    type="button"
                                    onClick={() => { setShowForgotPass(true); setError(''); }}
                                    className="font-medium text-black hover:underline"
                                >
                                    Şifremi unuttum?
                                </button>
                            </div>

                            {error && (
                                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 text-center font-medium border border-red-100">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full py-6 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
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
                                    'Giriş Yap'
                                )}
                            </Button>
                        </form>
                    )}
                </CardContent>
                <CardFooter className="flex-col pb-8">
                    <div className="text-center text-xs text-gray-400 w-full space-y-1">
                        <p>© 2026 QRSaaS Yönetim Paneli</p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
