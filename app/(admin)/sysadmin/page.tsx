'use client';

import { useEffect, useState } from 'react';
import * as Services from '@/lib/services';
import { LayoutDashboard, LogOut, Plus, ShieldCheck, Trash2, ExternalLink, ArrowRight, Globe, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function SysAdminPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    // Data
    const [restaurants, setRestaurants] = useState<any[]>([]);

    // Form State
    const [showForm, setShowForm] = useState(false);
    const [newName, setNewName] = useState('');
    const [newSlug, setNewSlug] = useState('');
    const [newPassword, setNewPassword] = useState('123456');
    const [loading, setLoading] = useState(false);

    // MASTER PASSWORD (In production, use ENV var checks or real auth)
    const MASTER_KEY = 'supersecret';

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === MASTER_KEY) {
            setIsAuthenticated(true);
            loadRestaurants();
        } else {
            alert('Yanlış şifre!');
        }
    };

    const loadRestaurants = async () => {
        try {
            const data = await Services.getAllRestaurants();
            setRestaurants(data || []);
        } catch (error) {
            console.error(error);
            alert('Veriler çekilemedi.');
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await Services.createRestaurant(newName, newSlug, newPassword);
            alert('Restoran başarıyla oluşturuldu!');
            setShowForm(false);
            setNewName('');
            setNewSlug('');
            loadRestaurants();
        } catch (error: any) {
            console.error(error);
            alert('Hata: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu restoranı ve tüm verilerini silmek istediğinize emin misiniz?')) return;
        try {
            await Services.deleteRestaurant(id);
            loadRestaurants();
        } catch (error) {
            console.error(error);
            alert('Silinemedi.');
        }
    };



    // Impersonate (Yönetici Olarak Gir)
    const handleImpersonate = (rest: any) => {
        // LocalStorage'a session yazıp admin paneline fırlat
        localStorage.setItem('qr_admin_session', JSON.stringify({
            restaurantId: rest.id,
            slug: rest.slug,
            name: rest.name,
            loginTime: new Date().toISOString(),
            isSuperAdmin: true // Belki ilerde işe yarar
        }));

        // Admin paneline git
        window.open('/admin', '_blank'); // Yeni sekmede aç
    };

    // --- LOGIN SCREEN ---
    if (!isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
                <Card className="w-full max-w-sm rounded-2xl shadow-xl border-gray-100">
                    <CardHeader className="text-center pb-6">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black text-white shadow-lg mb-4">
                            <ShieldCheck className="h-8 w-8" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-900">Süper Admin</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="password">Master Key</Label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Lock className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        autoFocus
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="pl-10"
                                        placeholder="Şifreyi giriniz"
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                                Giriş Yap
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // --- DASHBOARD SCREEN ---
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10 w-full mb-8">
                <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="h-8 w-8 text-black" />
                        <h1 className="text-xl font-bold text-gray-900">Platform Yönetimi</h1>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => setIsAuthenticated(false)}
                        className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-2"
                    >
                        <LogOut className="h-4 w-4" /> Çıkış
                    </Button>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-4 py-8">

                {/* Stats & Actions */}
                <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Restoranlar</h2>
                        <p className="text-gray-500 mt-1">Sistemdeki tüm kayıtlı işletmeler ({restaurants.length})</p>
                    </div>
                    <Button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center gap-2 bg-black text-white hover:bg-gray-800"
                    >
                        {showForm ? 'İptal' : <><Plus className="h-4 w-4" /> Yeni Restoran Ekle</>}
                    </Button>
                </div>

                {/* Create Form */}
                {showForm && (
                    <Card className="mb-8 border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-4">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-bold text-gray-900">Yeni Restoran Kurulumu</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-4 items-end">
                                <div className="space-y-2">
                                    <Label htmlFor="newName">Restoran Adı</Label>
                                    <Input
                                        id="newName"
                                        required
                                        value={newName}
                                        onChange={e => setNewName(e.target.value)}
                                        placeholder="Örn: Burger King"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="newSlug">URL Slug</Label>
                                    <Input
                                        id="newSlug"
                                        required
                                        value={newSlug}
                                        onChange={e => setNewSlug(e.target.value.toLowerCase().replace(/ /g, '-'))}
                                        placeholder="örn: burger-king"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">Yönetici Şifresi</Label>
                                    <Input
                                        id="newPassword"
                                        required
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-black text-white hover:bg-gray-800 md:w-auto"
                                >
                                    {loading ? 'Kuruluyor...' : 'Kurulumu Başlat'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* List Table */}
                <Card className="overflow-hidden border-gray-200 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-500">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-700 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">ID</th>
                                    <th className="px-6 py-4 font-semibold">Restoran</th>
                                    <th className="px-6 py-4 font-semibold">URL Kodu (Slug)</th>
                                    <th className="px-6 py-4 font-semibold">Özel Domain</th>
                                    <th className="px-6 py-4 font-semibold">Şifre</th>
                                    <th className="px-6 py-4 font-semibold">Kayıt Tarihi</th>
                                    <th className="px-6 py-4 text-right font-semibold">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {restaurants.map((rest) => (
                                    <tr key={rest.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-amber-600 font-bold">#{rest.numeric_id || '---'}</td>
                                        <td className="px-6 py-4 font-bold text-gray-900">{rest.name}</td>
                                        <td className="px-6 py-4 font-mono text-xs text-gray-600">/{rest.slug}</td>
                                        <td className="px-6 py-4">
                                            {rest.custom_domain ? (
                                                <span className="text-xs text-blue-600 underline truncate block max-w-[150px]">{rest.custom_domain}</span>
                                            ) : (
                                                <span className="text-xs text-gray-400">---</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs">{rest.password}</td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {rest.created_at ? new Date(rest.created_at).toLocaleDateString('tr-TR') : '---'}
                                        </td>
                                        <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleImpersonate(rest)}
                                                className="h-8 gap-1 border-gray-200 bg-white hover:bg-gray-100 hover:text-black font-semibold"
                                                title="Yönetici Paneline Git"
                                            >
                                                Yönet
                                                <ArrowRight className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                                className="h-8 gap-1 border-gray-200 bg-white hover:bg-gray-100 hover:text-black font-semibold"
                                            >
                                                <a href={rest.custom_domain ? `https://${rest.custom_domain}` : `/${rest.slug}`} target="_blank">
                                                    Gör
                                                    <ExternalLink className="h-3 w-3" />
                                                </a>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(rest.id)}
                                                className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                                                title="Sil"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {restaurants.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                            Henüz hiç restoran yok.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

            </main>
        </div>
    );
}
