'use client';

import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import { 
    LayoutDashboard, 
    Building2, 
    Megaphone, 
    Activity, 
    Bell, 
    Search,
    LogOut,
    Plus,
    Lock,
    Trash2,
    Info,
    AlertTriangle,
    CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import * as Services from '@/lib/services';

const inter = Inter({ subsets: ['latin'] });

type TabType = 'overview' | 'restaurants' | 'announcements' | 'logs';

const MASTER_KEY = 'supersecret';

export default function SysAdminPage() {
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // Auth State
    const [passwordInput, setPasswordInput] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoadingInit, setIsLoadingInit] = useState(true);

    // Data States
    const [stats, setStats] = useState<any>(null);
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [loadingData, setLoadingData] = useState(false);

    // Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [planFilter, setPlanFilter] = useState('all');

    // Announcement States
    const [newAnnTitle, setNewAnnTitle] = useState('');
    const [newAnnContent, setNewAnnContent] = useState('');
    const [newAnnType, setNewAnnType] = useState<'info' | 'warning' | 'success'>('info');
    const [isSubmittingAnn, setIsSubmittingAnn] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const isAuth = sessionStorage.getItem('sysadmin_auth') === 'true';
            setIsAuthenticated(isAuth);
            setIsLoadingInit(false);
            if(isAuth) {
                fetchData();
            }
        };
        checkAuth();
    }, []);

    const fetchData = async () => {
        setLoadingData(true);
        try {
            const [sysStats, allRest] = await Promise.all([
                Services.getSystemStats(),
                Services.getAllRestaurants()
            ]);
            setStats(sysStats);
            setRestaurants(allRest);
            
            const ann = await Services.getGlobalAnnouncements();
            setAnnouncements(ann);
        } catch (error) {
            console.error("Error fetching sysadmin data:", error);
        } finally {
            setLoadingData(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === MASTER_KEY) {
            sessionStorage.setItem('sysadmin_auth', 'true');
            setIsAuthenticated(true);
            fetchData();
        } else {
            setLoginError('Yetkisiz erişim denemesi.');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('sysadmin_auth');
        setIsAuthenticated(false);
        setPasswordInput('');
        setLoginError('');
    };

    const handleCreateAnnouncement = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newAnnTitle || !newAnnContent) return;
        setIsSubmittingAnn(true);
        try {
            await Services.createGlobalAnnouncement(newAnnTitle, newAnnContent, newAnnType);
            setNewAnnTitle('');
            setNewAnnContent('');
            setNewAnnType('info');
            // Refresh
            const ann = await Services.getGlobalAnnouncements();
            setAnnouncements(ann);
        } catch (error) {
            console.error("Duyuru oluşturulamadı:", error);
        } finally {
            setIsSubmittingAnn(false);
        }
    };

    const handleDeleteAnnouncement = async (id: string) => {
        try {
            await Services.deleteAnnouncement(id);
            setAnnouncements(prev => prev.filter(a => a.id !== id));
        } catch (error) {
            console.error("Duyuru silinemedi:", error);
        }
    };

    if (isLoadingInit) return <div className="min-h-screen bg-[#0D0D0D]"></div>;

    if (!isAuthenticated) {
        return (
            <div className={cn("min-h-screen flex items-center justify-center bg-[#F9F9F9]", inter.className)}>
                <div className="w-full max-w-md p-8 bg-white rounded-lg border border-[#BFBFBF] shadow-sm">
                    <div className="flex justify-center mb-8">
                        <div className="h-12 w-12 bg-[#F2561D] rounded flex items-center justify-center font-black text-white text-2xl">
                            V
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-center text-[#0D0D0D] mb-2">Sistem Yönetimi</h1>
                    <p className="text-sm text-center text-[#8C8C8C] mb-8">Lütfen yönetici şifrenizi girin.</p>
                    
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-[#8C8C8C]" />
                                </div>
                                <input
                                    type="password"
                                    value={passwordInput}
                                    onChange={(e) => {
                                        setPasswordInput(e.target.value);
                                        setLoginError('');
                                    }}
                                    className="w-full pl-10 pr-4 py-3 rounded-md border border-[#BFBFBF] focus:outline-none focus:border-[#F2561D] focus:ring-1 focus:ring-[#F2561D] text-[#0D0D0D] bg-[#F9F9F9]"
                                    placeholder="Superadmin Şifresi"
                                />
                            </div>
                            {loginError && <p className="mt-2 text-sm text-red-600 font-medium">{loginError}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#0D0D0D] hover:bg-[#F2561D] text-white font-bold py-3 px-4 rounded-md transition-colors"
                        >
                            Giriş Yap
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const pageTitles = {
        'overview': 'Dashboard',
        'restaurants': 'Firmalar',
        'announcements': 'Sistem Duyuruları',
        'logs': 'Aktivite Logları'
    };

    // Derived Data
    const proPlusCount = restaurants.filter(r => r.plan_type === 'PRO' || r.plan_type === 'PLUS').length;
    
    // Filtered Restaurants
    const filteredRestaurants = restaurants.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.slug.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPlan = planFilter === 'all' || r.plan_type?.toLowerCase() === planFilter.toLowerCase();
        return matchesSearch && matchesPlan;
    });

    const recentRestaurants = [...restaurants].sort((a,b) => {
        const da = a.created_at?.seconds || 0;
        const db = b.created_at?.seconds || 0;
        return db - da;
    }).slice(0, 5);

    return (
        <div className={cn("min-h-screen flex bg-[#F9F9F9]", inter.className)}>
            {/* 1. SIDEBAR (Sol Menü) */}
            <aside className="w-64 bg-[#0D0D0D] flex flex-col sticky top-0 h-screen shrink-0 border-r border-[#0D0D0D]">
                {/* Logo Area */}
                <div className="h-20 flex items-center px-6 border-b border-[#8C8C8C]/20 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-[#F2561D] rounded flex items-center justify-center font-black text-white shrink-0">
                            V
                        </div>
                        <span className="text-white font-bold tracking-wider text-lg truncate">VOGO QR</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                    <SidebarItem 
                        icon={<LayoutDashboard className="h-5 w-5" />} 
                        label="Dashboard" 
                        active={activeTab === 'overview'} 
                        onClick={() => setActiveTab('overview')} 
                    />
                    <SidebarItem 
                        icon={<Building2 className="h-5 w-5" />} 
                        label="Firmalar" 
                        active={activeTab === 'restaurants'} 
                        onClick={() => setActiveTab('restaurants')} 
                    />
                    <SidebarItem 
                        icon={<Megaphone className="h-5 w-5" />} 
                        label="Duyurular" 
                        active={activeTab === 'announcements'} 
                        onClick={() => setActiveTab('announcements')} 
                    />
                    <SidebarItem 
                        icon={<Activity className="h-5 w-5" />} 
                        label="Loglar" 
                        active={activeTab === 'logs'} 
                        onClick={() => setActiveTab('logs')} 
                    />
                </nav>

                {/* Footer / Logout */}
                <div className="p-4 border-t border-[#8C8C8C]/20 shrink-0">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium text-[#8C8C8C] hover:text-[#FFFFFF] hover:bg-white/5 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* 2. MAIN WRAPPER (Topbar + Content) */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#F9F9F9] h-screen overflow-hidden">
                
                {/* TOPBAR (Üst Bilgi Çubuğu) */}
                <header className="h-20 bg-white border-b border-[#BFBFBF] flex items-center justify-between px-8 shrink-0">
                    {/* Left: Page Title */}
                    <div>
                        <h1 className="text-2xl font-bold text-[#0D0D0D]">
                            {pageTitles[activeTab]}
                        </h1>
                    </div>

                    {/* Right: Actions & Profile */}
                    <div className="flex items-center gap-6">
                        {/* Hızlı Ekleme Butonu */}
                        <Button 
                            className="bg-[#F2561D] hover:bg-[#D9704A] text-white font-medium rounded-md gap-2 h-10 px-4 shadow-sm"
                            onClick={() => setActiveTab('announcements')}
                        >
                            <Plus className="h-4 w-4" />
                            Global Duyuru Ekle
                        </Button>

                        {/* Bildirim Çanı */}
                        <button className="relative p-2 text-[#8C8C8C] hover:text-[#0D0D0D] transition-colors">
                            <Bell className="h-5 w-5" />
                        </button>

                        <div className="w-px h-8 bg-[#BFBFBF]"></div>

                        {/* Admin Profil */}
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-[#0D0D0D]">Superadmin</p>
                                <p className="text-xs text-[#8C8C8C]">VOGO QR</p>
                            </div>
                            <div className="h-10 w-10 bg-[#BFBFBF]/30 rounded-full border border-[#BFBFBF] flex items-center justify-center text-[#8C8C8C] font-bold">
                                VQ
                            </div>
                        </div>
                    </div>
                </header>

                {/* 3. MAIN CONTENT (Ana İçerik - Grid Sistem) */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {loadingData ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F2561D]"></div>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'overview' && (
                                <div className="max-w-7xl mx-auto space-y-8">
                                    {/* Top Widgets */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <StatCard title="Toplam Firma" value={stats?.totalRestaurants || restaurants.length || 0} subtitle="Kayıtlı tüm tenantlar" icon={<Building2 />} />
                                        <StatCard title="Aktif Menü Ziyareti (Son 30)" value={stats?.totalViews || 0} subtitle="Son 30 gündeki hitler" icon={<Activity />} />
                                        <StatCard title="PRO / PLUS Paket" value={proPlusCount} subtitle="Premium abone sayısı" icon={<Building2 />} />
                                        <StatCard title="Bugünkü Aktiflik" value={stats?.activeToday || 0} subtitle="Bugünkü etkileşimler" icon={<Activity />} />
                                    </div>

                                    {/* Tables Section */}
                                    <div className="bg-white rounded-lg border border-[#BFBFBF] shadow-sm overflow-hidden">
                                        <div className="px-6 py-5 border-b border-[#BFBFBF]">
                                            <h2 className="text-lg font-bold text-[#0D0D0D]">Son Kayıt Olan Firmalar</h2>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead className="bg-[#F9F9F9] border-b border-[#BFBFBF]">
                                                    <tr>
                                                        <th className="px-6 py-3 text-xs font-medium text-[#8C8C8C] uppercase tracking-wider">Firma Adı</th>
                                                        <th className="px-6 py-3 text-xs font-medium text-[#8C8C8C] uppercase tracking-wider">Kayıt Tarihi</th>
                                                        <th className="px-6 py-3 text-xs font-medium text-[#8C8C8C] uppercase tracking-wider">Paket</th>
                                                        <th className="px-6 py-3 text-xs font-medium text-[#8C8C8C] uppercase tracking-wider text-right">Durum</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-[#BFBFBF]/50">
                                                    {recentRestaurants.map((r, idx) => (
                                                        <TableRow 
                                                            key={idx}
                                                            name={r.name} 
                                                            status={r.plan_type ? 'Aktif' : 'Pasif'} 
                                                            plan={r.plan_type || 'Ücretsiz'} 
                                                            date={r.created_at ? new Date(r.created_at.seconds * 1000).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Bilinmiyor'} 
                                                        />
                                                    ))}
                                                    {recentRestaurants.length === 0 && (
                                                        <tr>
                                                            <td colSpan={4} className="px-6 py-4 text-center text-sm text-[#8C8C8C]">Henüz firma bulunmuyor.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'restaurants' && (
                                <div className="max-w-7xl mx-auto space-y-6">
                                    {/* Toolbar: Search and Filters */}
                                    <div className="flex flex-col sm:flex-row justify-between gap-4 items-center bg-white p-4 rounded-lg border border-[#BFBFBF] shadow-sm">
                                        <div className="relative w-full sm:w-96">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Search className="h-4 w-4 text-[#8C8C8C]" />
                                            </div>
                                            <input 
                                                type="text" 
                                                placeholder="Firma ara..." 
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 rounded-md border border-[#BFBFBF] focus:outline-none focus:border-[#F2561D] focus:ring-1 focus:ring-[#F2561D] text-sm text-[#0D0D0D] bg-[#F9F9F9]"
                                            />
                                        </div>
                                        <div className="flex gap-2 w-full sm:w-auto">
                                            <select 
                                                value={planFilter}
                                                onChange={(e) => setPlanFilter(e.target.value)}
                                                className="px-4 py-2 rounded-md border border-[#BFBFBF] focus:outline-none focus:border-[#F2561D] text-sm text-[#0D0D0D] bg-[#F9F9F9] min-w-[140px]"
                                            >
                                                <option value="all">Tüm Paketler</option>
                                                <option value="pro">Pro Paket</option>
                                                <option value="plus">Plus Paket</option>
                                                <option value="basic">Basic Paket</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Restaurants Table */}
                                    <div className="bg-white rounded-lg border border-[#BFBFBF] shadow-sm overflow-hidden">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead className="bg-[#F9F9F9] border-b border-[#BFBFBF]">
                                                    <tr>
                                                        <th className="px-6 py-3 text-xs font-medium text-[#8C8C8C] uppercase tracking-wider">Firma Adı & Slug</th>
                                                        <th className="px-6 py-3 text-xs font-medium text-[#8C8C8C] uppercase tracking-wider">Durum</th>
                                                        <th className="px-6 py-3 text-xs font-medium text-[#8C8C8C] uppercase tracking-wider">Kayıt Tarihi</th>
                                                        <th className="px-6 py-3 text-xs font-medium text-[#8C8C8C] uppercase tracking-wider">Paket Tipi</th>
                                                        <th className="px-6 py-3 text-xs font-medium text-[#8C8C8C] uppercase tracking-wider text-right">İşlemler</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-[#BFBFBF]/50">
                                                    {filteredRestaurants.map(r => (
                                                        <RestaurantRow 
                                                            key={r.id}
                                                            id={r.slug} 
                                                            name={r.name} 
                                                            status={r.plan_type ? 'Aktif' : 'Pasif'} 
                                                            date={r.created_at ? new Date(r.created_at.seconds * 1000).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Bilinmiyor'} 
                                                            plan={r.plan_type || 'Ücretsiz'} 
                                                            url={r.slug}
                                                        />
                                                    ))}
                                                    {filteredRestaurants.length === 0 && (
                                                        <tr>
                                                            <td colSpan={5} className="px-6 py-4 text-center text-sm text-[#8C8C8C]">Aranan kriterlerde firma bulunamadı.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="px-6 py-4 border-t border-[#BFBFBF] bg-[#F9F9F9] flex items-center justify-between">
                                            <span className="text-xs text-[#8C8C8C]">Toplam {filteredRestaurants.length} firma gösteriliyor.</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'announcements' && (
                                <div className="max-w-7xl mx-auto space-y-8">
                                    {/* Create Form */}
                                    <div className="bg-white rounded-lg border border-[#BFBFBF] shadow-sm p-6">
                                        <h2 className="text-lg font-bold text-[#0D0D0D] mb-6 flex items-center gap-2">
                                            <Megaphone className="h-5 w-5 text-[#F2561D]" />
                                            Yeni Global Duyuru Yayınla
                                        </h2>
                                        <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="md:col-span-2 space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-[#8C8C8C] mb-1">Duyuru Başlığı</label>
                                                        <input 
                                                            type="text" 
                                                            required
                                                            value={newAnnTitle}
                                                            onChange={e => setNewAnnTitle(e.target.value)}
                                                            className="w-full px-4 py-2 bg-[#F9F9F9] border border-[#BFBFBF] rounded-md focus:outline-none focus:border-[#F2561D] focus:ring-1 focus:ring-[#F2561D] text-[#0D0D0D] text-sm"
                                                            placeholder="Örn: Sistem Bakımı Bildirimi"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-[#8C8C8C] mb-1">İçerik</label>
                                                        <textarea 
                                                            required
                                                            value={newAnnContent}
                                                            onChange={e => setNewAnnContent(e.target.value)}
                                                            className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#BFBFBF] rounded-md focus:outline-none focus:border-[#F2561D] focus:ring-1 focus:ring-[#F2561D] text-[#0D0D0D] text-sm h-32 resize-none"
                                                            placeholder="Kullanıcılara gösterilecek mesajı buraya yazın..."
                                                        ></textarea>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-[#8C8C8C] mb-1">Duyuru Tipi</label>
                                                        <div className="space-y-2">
                                                            <label className={cn(
                                                                "flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors",
                                                                newAnnType === 'info' ? "border-blue-500 bg-blue-50/50" : "border-[#BFBFBF] hover:bg-[#F9F9F9]"
                                                            )}>
                                                                <input type="radio" name="annType" value="info" checked={newAnnType === 'info'} onChange={() => setNewAnnType('info')} className="sr-only" />
                                                                <Info className={cn("h-5 w-5", newAnnType === 'info' ? "text-blue-500" : "text-[#8C8C8C]")} />
                                                                <span className={cn("text-sm font-medium", newAnnType === 'info' ? "text-blue-700" : "text-[#0D0D0D]")}>Bilgi (Info)</span>
                                                            </label>
                                                            <label className={cn(
                                                                "flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors",
                                                                newAnnType === 'warning' ? "border-orange-500 bg-orange-50/50" : "border-[#BFBFBF] hover:bg-[#F9F9F9]"
                                                            )}>
                                                                <input type="radio" name="annType" value="warning" checked={newAnnType === 'warning'} onChange={() => setNewAnnType('warning')} className="sr-only" />
                                                                <AlertTriangle className={cn("h-5 w-5", newAnnType === 'warning' ? "text-orange-500" : "text-[#8C8C8C]")} />
                                                                <span className={cn("text-sm font-medium", newAnnType === 'warning' ? "text-orange-700" : "text-[#0D0D0D]")}>Uyarı (Warning)</span>
                                                            </label>
                                                            <label className={cn(
                                                                "flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors",
                                                                newAnnType === 'success' ? "border-green-500 bg-green-50/50" : "border-[#BFBFBF] hover:bg-[#F9F9F9]"
                                                            )}>
                                                                <input type="radio" name="annType" value="success" checked={newAnnType === 'success'} onChange={() => setNewAnnType('success')} className="sr-only" />
                                                                <CheckCircle2 className={cn("h-5 w-5", newAnnType === 'success' ? "text-green-500" : "text-[#8C8C8C]")} />
                                                                <span className={cn("text-sm font-medium", newAnnType === 'success' ? "text-green-700" : "text-[#0D0D0D]")}>Başarı (Success)</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-end pt-4 border-t border-[#BFBFBF]">
                                                <Button type="submit" disabled={isSubmittingAnn} className="bg-[#F2561D] hover:bg-[#D9704A] text-white">
                                                    {isSubmittingAnn ? 'Yayınlanıyor...' : 'Duyuruyu Yayınla'}
                                                </Button>
                                            </div>
                                        </form>
                                    </div>

                                    {/* Existing Announcements */}
                                    <div className="bg-white rounded-lg border border-[#BFBFBF] shadow-sm overflow-hidden">
                                        <div className="px-6 py-5 border-b border-[#BFBFBF]">
                                            <h2 className="text-lg font-bold text-[#0D0D0D]">Aktif Duyurular</h2>
                                        </div>
                                        <div className="divide-y divide-[#BFBFBF]/50">
                                            {announcements.map((ann) => (
                                                <div key={ann.id} className="p-6 flex flex-col sm:flex-row gap-4 justify-between items-start hover:bg-[#F9F9F9] transition-colors">
                                                    <div className="flex gap-4 items-start">
                                                        <div className={cn(
                                                            "mt-1 rounded-full p-2 shrink-0",
                                                            ann.type === 'info' ? "bg-blue-100 text-blue-600" : 
                                                            ann.type === 'warning' ? "bg-orange-100 text-orange-600" : 
                                                            "bg-green-100 text-green-600"
                                                        )}>
                                                            {ann.type === 'info' && <Info className="h-5 w-5" />}
                                                            {ann.type === 'warning' && <AlertTriangle className="h-5 w-5" />}
                                                            {ann.type === 'success' && <CheckCircle2 className="h-5 w-5" />}
                                                        </div>
                                                        <div>
                                                            <h3 className="text-[#0D0D0D] font-bold text-base mb-1">{ann.title}</h3>
                                                            <p className="text-[#8C8C8C] text-sm break-words max-w-3xl">{ann.content}</p>
                                                            <span className="text-xs text-[#BFBFBF] font-medium mt-3 block">
                                                                Yayın Tarihi: {ann.created_at ? new Date(ann.created_at.seconds * 1000).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' }) : 'Bilinmiyor'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        onClick={() => handleDeleteAnnouncement(ann.id)}
                                                        className="shrink-0 text-[#8C8C8C] hover:text-[#F2561D] transition-colors p-2 rounded-md hover:bg-[#F2561D]/10"
                                                        title="Duyuruyu Sil"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            ))}
                                            {announcements.length === 0 && (
                                                <div className="p-12 text-center text-[#8C8C8C]">
                                                    Henüz yayınlanmış bir duyuru bulunmuyor.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'logs' && (
                                <div className="max-w-7xl mx-auto border-2 border-dashed border-[#BFBFBF] rounded-lg p-12 text-center">
                                    <h3 className="text-lg font-medium text-[#8C8C8C] mb-2">Sistem Logları</h3>
                                    <p className="text-sm text-[#8C8C8C]">Bu alanda platformdaki genel aktiviteler listelenecektir.</p>
                                </div>
                            )}
                        </>
                    )}
                </main>

            </div>
        </div>
    );
}

// Stat Card Component
function StatCard({ icon, title, value, subtitle }: any) {
    return (
        <div className="bg-white rounded-lg border border-[#BFBFBF] shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-[#8C8C8C]">{title}</span>
                <div className="h-8 w-8 rounded-full bg-[#F2561D]/10 text-[#F2561D] flex items-center justify-center">
                    {icon}
                </div>
            </div>
            <div>
                <p className="text-3xl font-bold text-[#0D0D0D] mb-1">{value}</p>
                <p className="text-xs text-[#8C8C8C]">{subtitle}</p>
            </div>
        </div>
    );
}

// Dummy Table Row (Used for Dashboard Overview)
function TableRow({ name, status, plan, date }: any) {
    return (
        <tr className="hover:bg-[#F9F9F9] transition-colors">
            <td className="px-6 py-4">
                <p className="text-sm font-bold text-[#0D0D0D]">{name}</p>
            </td>
            <td className="px-6 py-4">
                <span className="text-xs text-[#8C8C8C]">{date}</span>
            </td>
            <td className="px-6 py-4">
                <span className="text-xs font-semibold text-[#8C8C8C]">{plan}</span>
            </td>
            <td className="px-6 py-4 text-right">
                <span className={cn(
                    "text-[10px] font-bold uppercase px-2 py-1 rounded",
                    status === 'Aktif' ? "bg-[#D9704A]/10 text-[#D9704A]" : "bg-[#8C8C8C]/10 text-[#8C8C8C]"
                )}>
                    {status}
                </span>
            </td>
        </tr>
    );
}

// Detailed Restaurant Table Row
function RestaurantRow({ id, name, status, date, plan, url }: any) {
    return (
        <tr className="hover:bg-[#F9F9F9] transition-colors">
            <td className="px-6 py-4">
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#0D0D0D]">{name}</span>
                    <span className="text-xs text-[#8C8C8C]">@{id}</span>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={cn(
                    "text-[10px] font-bold uppercase px-2 py-1 rounded",
                    status === 'Aktif' ? "bg-[#D9704A]/10 text-[#D9704A]" : "bg-[#8C8C8C]/10 text-[#8C8C8C]"
                )}>
                    {status}
                </span>
            </td>
            <td className="px-6 py-4">
                <span className="text-xs text-[#8C8C8C]">{date}</span>
            </td>
            <td className="px-6 py-4">
                <span className="text-xs font-semibold text-[#8C8C8C]">{plan}</span>
            </td>
            <td className="px-6 py-4 text-right">
                <a href={`/${url}`} target="_blank" className="text-xs font-bold text-[#F2561D] hover:text-[#D9704A]">Görüntüle</a>
            </td>
        </tr>
    );
}

// Sidebar Link Component (Sıkı Tasarım Kurallarına Göre)
function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors group",
                active 
                    ? "bg-[#F2561D] text-white" 
                    : "text-[#8C8C8C] hover:text-[#FFFFFF] hover:bg-white/5"
            )}
        >
            <span className={cn(
                "transition-colors",
                active ? "text-white" : "text-[#8C8C8C] group-hover:text-[#D9704A]"
            )}>
                {icon}
            </span>
            {label}
        </button>
    );
}
