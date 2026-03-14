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
import { GlobalAnnouncement } from '@/components/GlobalAnnouncement';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

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
                if (sessionData.slug) {
                    const data = await Services.getRestaurantBySlug(sessionData.slug);
                    if (data) {
                        setRestaurant(data);
                    } else {
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
        window.location.href = '/login'; 
    };

    if (!restaurant) return null;

    return (
        <MenuProvider>
            <div className={cn("flex min-h-screen bg-[#CCCFD9]/20", inter.className)}>
                {/* Sidebar */}
                <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#CCCFD9] pb-10 pt-5 transition-transform flex flex-col no-print">
                    <div className="px-6 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 shrink-0 rounded-xl bg-[#5A37A6] flex items-center justify-center shadow-lg shadow-[#5A37A6]/20">
                                <Store className="h-5 w-5 text-white" />
                            </div>
                            <div className="overflow-hidden">
                                <h2 className="truncate text-sm font-bold text-[#402814]">{restaurant.name}</h2>
                                <p className="truncate text-xs text-[#402814]/40">Yönetim Paneli</p>
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
                            className="group flex w-full items-center justify-center gap-2 rounded-xl border border-[#CCCFD9] bg-white px-3 py-2.5 text-xs font-bold text-[#402814] shadow-sm transition-all hover:border-[#5A37A6] hover:text-[#5A37A6] hover:shadow-md active:scale-95"
                        >
                            <span>Menüyü Önizle</span>
                            <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </div>

                    <nav className="flex-1 px-4 space-y-1">
                        <SidebarLink href="/admin" icon={<LayoutDashboard className="h-5 w-5" />} label="Genel Bakış" />
                        <SidebarLink href="/admin/categories" icon={<List className="h-5 w-5" />} label="Kategoriler" />
                        <SidebarLink href="/admin/products" icon={<Menu className="h-5 w-5" />} label="Ürünler" />
                        <SidebarLink href="/admin/bulk" icon={<CreditCard className="h-5 w-5" />} label="Toplu İşlemler" />
                        <SidebarLink href="/admin/qr" icon={<Printer className="h-5 w-5" />} label="QR Kod Oluşturucu" />
                        <SidebarLink href="/admin/print" icon={<FileImage className="h-5 w-5" />} label="Menü Çıktısı (PDF)" />
                        <SidebarLink href="/admin/billing" icon={<CreditCard className="h-5 w-5" />} label="Fatura & Abonelik" />

                        {/* Premium Features */}
                        <div className="pt-4 mt-4 mb-2 border-t border-[#CCCFD9]/30">
                            <p className="px-3 text-xs font-semibold text-[#402814]/30 uppercase tracking-wider mb-2">Platform Plus</p>
                            <Link
                                href="/admin/analytics"
                                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#402814]/70 hover:bg-[#5A37A6]/5 hover:text-[#5A37A6] transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <PieChart className="h-5 w-5 text-[#402814]/40 group-hover:text-[#5A37A6]" />
                                    <span>Gelişmiş Analiz</span>
                                </div>
                                {(restaurant?.plan_type !== 'PLUS' && restaurant?.plan_type !== 'PRO') && (
                                    <span className="text-[10px] font-bold bg-[#8F6CD9] text-white px-1.5 py-0.5 rounded shadow-sm">PLUS</span>
                                )}
                            </Link>

                            <Link
                                href="/admin/branches"
                                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#402814]/70 hover:bg-[#5A37A6]/5 hover:text-[#5A37A6] transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <Building2 className="h-5 w-5 text-[#402814]/40 group-hover:text-[#5A37A6]" />
                                    <span>Şubelerim</span>
                                </div>
                                {restaurant?.plan_type !== 'PLUS' && (
                                    <span className="text-[10px] font-bold bg-[#8F6CD9] text-white px-1.5 py-0.5 rounded shadow-sm">PLUS</span>
                                )}
                            </Link>
                        </div>

                        <SidebarLink href="/admin/settings" icon={<Settings className="h-5 w-5" />} label="Ayarlar" className="border-t border-[#CCCFD9]/30 mt-2 pt-4" />
                    </nav>

                    <div className="mt-auto px-4 pt-4 border-t border-[#CCCFD9]/30">
                        <div className="rounded-xl bg-[#CCCFD9]/10 p-4 border border-[#CCCFD9]/20 mb-3">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-[#5A37A6]/10 flex items-center justify-center text-[#5A37A6] font-bold uppercase">
                                    {restaurant.name.substring(0, 2)}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-bold text-[#402814] truncate">{restaurant.name}</p>
                                    <p className="text-xs text-[#402814]/40 truncate">@{restaurant.slug}</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#A60D0D] hover:bg-[#A60D0D]/5 transition-colors"
                        >
                            <LogOut className="h-5 w-5" />
                            Çıkış Yap
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="ml-64 flex-1 p-8 print:ml-0 print:p-0">
                    <div className="mx-auto max-w-5xl print:max-w-none">
                        <GlobalAnnouncement />
                        {children}
                    </div>
                </main>
            </div>
        </MenuProvider>
    );
}

function SidebarLink({ href, icon, label, className }: { href: string, icon: React.ReactNode, label: string, className?: string }) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#402814]/70 hover:bg-[#5A37A6]/5 hover:text-[#5A37A6] transition-colors",
                className
            )}
        >
            {icon}
            {label}
        </Link>
    );
}
