'use client';

import {
    CreditCard,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
    Store,
    ExternalLink,
    List,
    Building2,
    PieChart,
    Printer,
    FileImage
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MenuProvider } from '@/lib/store';
import * as Services from '@/lib/services';
import { Restaurant } from '@/lib/data';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

    useEffect(() => {
        const loadRestaurant = async () => {
            const session = localStorage.getItem('qr_admin_session');
            if (!session) {
                router.push('/login');
                return;
            }
            try {
                const sessionData = JSON.parse(session);
                // Fetch fresh data to check active modules
                if (sessionData.slug) {
                    const data = await Services.getRestaurantBySlug(sessionData.slug);
                    if (data) {
                        setRestaurant(data);
                    } else {
                        // Fallback to session data if fetch fails (though unlikely for valid user)
                        // But session data might miss is_ordering_active fields, so better to redirect or handle error
                        // For now we assume fetch works if session is valid
                        setRestaurant(sessionData as Restaurant);
                    }
                }
            } catch {
                router.push('/login');
            }
        };

        loadRestaurant();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('qr_admin_session');
        window.location.href = '/login'; // Hard reload to clear all states
    };

    if (!restaurant) return null;

    return (
        <MenuProvider>
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 pb-10 pt-5 transition-transform flex flex-col no-print">
                    <div className="px-6 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 shrink-0 rounded-xl bg-black flex items-center justify-center shadow-lg shadow-gray-200">
                                <Store className="h-5 w-5 text-white" />
                            </div>
                            <div className="overflow-hidden">
                                <h2 className="truncate text-sm font-bold text-gray-900">{restaurant.name}</h2>
                                <p className="truncate text-xs text-gray-500">Yönetim Paneli</p>
                            </div>
                        </div>

                        <a
                            href={
                                restaurant.custom_domain && 
                                typeof window !== 'undefined' && 
                                !window.location.hostname.includes('localhost') && 
                                !window.location.hostname.includes('127.0.0.1')
                                    ? `https://${restaurant.custom_domain}`
                                    : `/${restaurant.slug}`
                            }
                            target="_blank"
                            className="group flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs font-bold text-gray-700 shadow-sm transition-all hover:border-amber-400 hover:text-amber-600 hover:shadow-md active:scale-95"
                        >
                            <span>Menüyü Önizle</span>
                            <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </div>

                    <nav className="flex-1 px-4 space-y-1">
                        <Link
                            href="/admin"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-600 transition-colors"
                        >
                            <LayoutDashboard className="h-5 w-5" />
                            Genel Bakış
                        </Link>
                        <Link
                            href="/admin/categories"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-600 transition-colors"
                        >
                            <List className="h-5 w-5" />
                            Kategoriler
                        </Link>
                        <Link
                            href="/admin/products"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-600 transition-colors"
                        >
                            <Menu className="h-5 w-5" />
                            Ürünler
                        </Link>



                        <Link
                            href="/admin/bulk"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-600 transition-colors"
                        >
                            <CreditCard className="h-5 w-5" />
                            Toplu İşlemler
                        </Link>

                        <Link
                            href="/admin/qr"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-600 transition-colors"
                        >
                            <Printer className="h-5 w-5" />
                            QR Kod Oluşturucu
                        </Link>

                        <Link
                            href="/admin/print"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-600 transition-colors"
                        >
                            <FileImage className="h-5 w-5" />
                            Menü Çıktısı (PDF)
                        </Link>

                        <Link
                            href="/admin/billing"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-600 transition-colors"
                        >
                            <CreditCard className="h-5 w-5" />
                            Fatura & Abonelik
                        </Link>


                        {/* Premium Features */}
                        <div className="pt-4 mt-4 mb-2 border-t border-gray-100">
                            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Platform Plus</p>
                            <Link
                                href="/admin/analytics"
                                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <PieChart className="h-5 w-5 text-gray-400 group-hover:text-amber-600" />
                                    <span>Gelişmiş Analiz</span>
                                </div>
                                {(restaurant?.plan_type !== 'PLUS' && restaurant?.plan_type !== 'PRO') && (
                                    <span className="text-[10px] font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-white px-1.5 py-0.5 rounded shadow-sm">PLUS</span>
                                )}
                            </Link>

                            <Link
                                href="/admin/branches"
                                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <Building2 className="h-5 w-5 text-gray-400 group-hover:text-amber-600" />
                                    <span>Şubelerim</span>
                                </div>
                                {restaurant?.plan_type !== 'PLUS' && (
                                    <span className="text-[10px] font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-white px-1.5 py-0.5 rounded shadow-sm">PLUS</span>
                                )}
                            </Link>
                        </div>

                        <Link
                            href="/admin/settings"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors border-t border-gray-100 mt-2 pt-4"
                        >
                            <Settings className="h-5 w-5" />
                            Ayarlar
                        </Link>
                    </nav>

                    <div className="mt-auto px-4 pt-4 border-t border-gray-100">
                        <div className="rounded-xl bg-gray-50 p-4 border border-gray-100 mb-3">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold uppercase">
                                    {restaurant.name.substring(0, 2)}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-bold text-gray-900 truncate">{restaurant.name}</p>
                                    <p className="text-xs text-gray-500 truncate">@{restaurant.slug}</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="h-5 w-5" />
                            Çıkış Yap
                        </button>


                    </div>
                </aside>

                {/* Main Content */}
                <main className="ml-64 flex-1 p-8 print:ml-0 print:p-0">
                    <div className="mx-auto max-w-5xl print:max-w-none">
                        {children}
                    </div>
                </main>
            </div>
        </MenuProvider>
    );
}
