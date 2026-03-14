
'use client';

import { useMenu } from '@/lib/store';
import * as Services from '@/lib/services';

import { Eye, EyeOff, Save, Upload, Globe, Palette, Layout, Lock, FileImage, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

import { hasFeatureAccess } from '@/lib/data';

export default function SettingsPage() {
    const { settings, updateSettings, uploadImage, restaurant } = useMenu();
    // Local state for editing before save
    const [localSettings, setLocalSettings] = useState(settings);
    const [isUploading, setIsUploading] = useState(false);

    // UI State for vertical tabs
    const [activeTab, setActiveTab] = useState<string>('appearance');

    // Password Update State
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loadingPass, setLoadingPass] = useState(false);

    // Domain Logic
    const [domain, setDomain] = useState('');
    const [loadingDomain, setLoadingDomain] = useState(false);

    useEffect(() => {
        const loadDomain = async () => {
            const session = localStorage.getItem('qr_admin_session');
            if (!session) return;
            try {
                const data = JSON.parse(session);
                if (data.slug) {
                    const r = await Services.getRestaurantBySlug(data.slug);
                    if (r && r.custom_domain) setDomain(r.custom_domain);
                }
            } catch (e) { console.error(e); }
        };
        loadDomain();
    }, []);

    const handleDomainSave = async () => {
        const session = localStorage.getItem('qr_admin_session');
        if (!session) return;

        const confirm = window.confirm('Bu domain için DNS ayarlarını (CNAME) yaptığınızdan emin misiniz? Yanlış ayar menünüzün çalışmamasına neden olabilir.');
        if (!confirm) return;

        try {
            setLoadingDomain(true);
            const data = JSON.parse(session);
            const rId = data.restaurantId || data.id;
            await Services.updateRestaurantDomain(rId, domain);
            alert('Domain başarıyla kaydedildi! CNAME yönlendirmesinin aktif olması biraz zaman alabilir.');
        } catch (e) {
            console.error(e);
            alert('Hata: Domain kaydedilemedi.');
        } finally {
            setLoadingDomain(false);
        }
    };

    const handleChangePassword = async () => {
        if (!newPassword || newPassword !== confirmPassword) {
            alert('Şifreler uyuşmuyor veya boş!');
            return;
        }

        let targetId = (settings as any).restaurantId;
        if (!targetId) {
            const session = localStorage.getItem('qr_admin_session');
            if (session) {
                try { targetId = JSON.parse(session).restaurantId; } catch { }
            }
        }

        if (!targetId) {
            alert('Hata: Oturum bilgisi bulunamadı.');
            return;
        }

        setLoadingPass(true);
        try {
            await Services.updateRestaurantPassword(targetId, newPassword);
            alert('Şifreniz güncellendi.');
            setNewPassword('');
            setConfirmPassword('');
        } catch (e) {
            console.error(e);
            alert('Şifre güncellenemedi.');
        } finally {
            setLoadingPass(false);
        }
    };

    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    const handleImageUpload = async (file: File, field: 'logoUrl' | 'defaultProductImage') => {
        if (!file) return;
        setIsUploading(true);
        try {
            const url = await uploadImage(file, 'settings');
            setLocalSettings(prev => ({ ...prev, [field]: url }));
        } catch (error) {
            alert('Resim yüklenirken hata oluştu.');
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleToggle = (key: 'bannerActive' | 'popupActive' | 'darkMode' | 'storeActive') => {
        setLocalSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleChange = (key: string, value: any) => {
        setLocalSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleThemeChange = (themeId: string) => {
        const themePresets: Record<string, any> = {
            elegance: { fontFamily: 'Playfair Display', darkMode: true },
            vibrant: { fontFamily: 'Inter', darkMode: false },
            rustic: { fontFamily: 'Playfair Display', darkMode: false },
            paper: { fontFamily: 'Playfair Display', darkMode: false },
            default: { fontFamily: 'Inter', darkMode: false },
            custom: {} // Preserve whatever they already entered for Custom colors
        };
        const preset = themePresets[themeId] || themePresets.default;

        setLocalSettings(prev => ({
            ...prev,
            themeId,
            ...preset
        }));
    };

    const handleBannerUrlChange = (index: number, value: string) => {
        const newUrls = [...localSettings.bannerUrls];
        newUrls[index] = value;
        setLocalSettings(prev => ({ ...prev, bannerUrls: newUrls }));
    };

    const handleMobileBannerUrlChange = (index: number, value: string) => {
        const newUrls = [...(localSettings.mobileBannerUrls || [])];
        while (newUrls.length <= index) newUrls.push('');
        newUrls[index] = value;
        setLocalSettings(prev => ({ ...prev, mobileBannerUrls: newUrls }));
    };

    const handleBannerUpload = async (file: File, index: number, type: 'desktop' | 'mobile') => {
        if (!file) return;
        setIsUploading(true);
        try {
            const url = await uploadImage(file, 'settings');
            if (type === 'desktop') {
                handleBannerUrlChange(index, url);
            } else {
                handleMobileBannerUrlChange(index, url);
            }
        } catch (error) {
            alert('Resim yüklenirken hata oluştu.');
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    const addBannerUrl = () => {
        if (localSettings.bannerUrls.length < 5) {
            setLocalSettings(prev => ({
                ...prev,
                bannerUrls: [...prev.bannerUrls, ''],
                mobileBannerUrls: [...(prev.mobileBannerUrls || []), '']
            }));
        }
    };

    const removeBannerUrl = (index: number) => {
        const newUrls = localSettings.bannerUrls.filter((_, i) => i !== index);
        const newMobileUrls = (localSettings.mobileBannerUrls || []).filter((_, i) => i !== index);
        setLocalSettings(prev => ({ ...prev, bannerUrls: newUrls, mobileBannerUrls: newMobileUrls }));
    };

    const handleSave = async () => {
        try {
            await updateSettings(localSettings);
            alert("Ayarlar başarıyla kaydedildi.");
        } catch (error) {
            console.error(error);
            alert("Ayarlar kaydedilirken hata oluştu!");
        }
    };

    const canUsePremiumThemes = hasFeatureAccess(restaurant?.plan_type, 'premiumThemes');
    const canUseAdvancedLayouts = hasFeatureAccess(restaurant?.plan_type, 'advancedLayouts');
    const canUseCustomColors = hasFeatureAccess(restaurant?.plan_type, 'customColors');
    const canUseBanners = hasFeatureAccess(restaurant?.plan_type, 'banners');
    const canUseCustomDomain = hasFeatureAccess(restaurant?.plan_type, 'customDomain');

    return (
        <div className="space-y-6 pb-20 max-w-[1200px] mx-auto w-full overflow-x-hidden p-4 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-gray-100 pb-6 w-full">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sistem Ayarları</h1>
                    <p className="text-sm text-gray-500 mt-1">Sistemin genel görünümü ve gelişmiş ayarlarını yönetin.</p>
                </div>
                <div className="flex-shrink-0 w-full md:w-auto">
                    <Button
                        onClick={handleSave}
                        className="w-full flex items-center justify-center gap-2 h-11 px-6 text-sm font-bold shadow-md bg-black text-white hover:bg-gray-800 transition-transform active:scale-95"
                    >
                        <Save className="h-4 w-4" />
                        Tüm Değişiklikleri Kaydet
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 w-full mt-4">
                <aside className="lg:w-1/4 xl:w-1/5 shrink-0">
                    <nav className="flex flex-row overflow-x-auto lg:flex-col gap-1 pb-4 lg:pb-0 hide-scrollbar border-b lg:border-none border-gray-100">
                        {[
                            { id: 'appearance', name: 'Genel Görünüm' },
                            { id: 'menu', name: 'Menü Tasarımı' },
                            { id: 'home', name: 'Ana Sayfa Banner' },
                            { id: 'footer', name: 'Alt Bilgi (Footer)' },
                            { id: 'advanced', name: 'Gelişmiş & Güvenlik' },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex whitespace-nowrap items-center px-4 py-3 text-sm font-semibold rounded-lg transition-colors",
                                    activeTab === tab.id ? 'bg-black text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                                )}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </aside>

                <div className="flex-1 max-w-4xl min-w-0">
                    {activeTab === 'appearance' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                             {/* Logo & Slogan */}
                             <Card className="shadow-sm border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <FileImage className="h-5 w-5 text-gray-600" />
                                        Tanıtım & Marka
                                    </CardTitle>
                                    <CardDescription>Menünüzün üst kısmında görünecek işletme adı ve logo.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex flex-col md:flex-row gap-6 items-start">
                                        {/* Logo Column */}
                                        <div className="flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-xl p-6 w-full md:w-1/3 min-w-[200px] bg-gray-50/50">
                                            {localSettings.logoUrl ? (
                                                <div className="relative w-28 h-28 flex items-center justify-center bg-white rounded-xl shadow-sm border p-2">
                                                    <img src={localSettings.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                                                    <button
                                                        onClick={() => handleChange('logoUrl', '')}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="w-28 h-28 flex items-center justify-center bg-white border border-gray-200 rounded-xl text-gray-300 shadow-sm">
                                                    <FileImage className="w-8 h-8 opacity-50" />
                                                </div>
                                            )}
                                            <div className="flex flex-col items-center gap-2">
                                                <label className="cursor-pointer bg-white border px-4 py-2 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center shadow-sm transition-colors w-full justify-center">
                                                    {isUploading ? 'Yükleniyor...' : 'Logo Yükle'}
                                                    <input 
                                                        type="file" 
                                                        className="hidden" 
                                                        accept="image/*"
                                                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'logoUrl')} 
                                                        disabled={isUploading}
                                                    />
                                                </label>
                                                <span className="text-[10px] text-gray-400 font-medium">Önerilen: Karesel PNG/JPG</span>
                                            </div>
                                        </div>

                                        {/* Site Name and Description Column */}
                                        <div className="flex-1 space-y-4 w-full">
                                            <div className="space-y-2">
                                                <Label className="text-sm font-bold text-gray-700">İşletme Adı (Site Adı)</Label>
                                                <Input 
                                                    value={localSettings.siteName || ''} 
                                                    onChange={(e) => handleChange('siteName', e.target.value)} 
                                                    placeholder="Örn: Mickey's Cafe" 
                                                    className="h-11"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-bold text-gray-700">Slogan (Alt Başlık)</Label>
                                                <Input 
                                                    value={localSettings.siteDescription || ''} 
                                                    onChange={(e) => handleChange('siteDescription', e.target.value)} 
                                                    placeholder="Örn: Dünyanın en iyi kahvesi" 
                                                    className="h-11"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Premium Themes Selection */}
                            <Card className="shadow-sm border-amber-200 bg-amber-50/20">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                <Palette className="h-5 w-5 text-amber-600" />
                                                Premium Temalar
                                            </CardTitle>
                                            <CardDescription>Menünüz için etkileyici bir görünüm seçin.</CardDescription>
                                        </div>
                                        <div className="bg-amber-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest shadow-sm">PLUS</div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[
                                            { id: 'default', name: 'Standart', desc: 'Klasik Şık', color: 'from-gray-100 to-gray-200' },
                                            { id: 'elite', name: 'Elite', desc: 'Segmented', color: 'from-emerald-50 to-emerald-100' },
                                            { id: 'elegance', name: 'Elegance', desc: 'Kırmızı Şıklık', color: 'from-rose-950 to-red-950' },
                                            { id: 'vibrant', name: 'Vibrant', desc: 'Turuncu Enerji', color: 'from-amber-500/80 to-orange-500/80' },
                                            { id: 'rustic', name: 'Rustic', desc: 'Doğal Kafe', color: 'from-[#8b5a2b] to-[#4a3623]' },
                                            { id: 'paper', name: 'Paper', desc: 'Lüks Kağıt Menü', color: 'from-[#f9f6f0] to-[#e8dec0] border border-stone-300' },
                                            { id: 'custom', name: 'Özel Tasarım', desc: 'Kendi Paletinizi Yaratın', color: 'from-purple-400 via-pink-400 to-amber-400 border border-purple-200' },
                                        ].map((t) => (
                                            <button
                                                key={t.id}
                                                onClick={() => {
                                                    const isPremiumTheme = t.id !== 'default';
                                                    if (isPremiumTheme && !canUsePremiumThemes) {
                                                        alert('Bu tema PRO veya PLUS paket gerektirir. Paketinizi yükseltiniz.');
                                                        return;
                                                    }
                                                    handleThemeChange(t.id);
                                                }}
                                                className={cn(
                                                    "relative group rounded-xl border-2 transition-all p-1 bg-white",
                                                    localSettings.themeId === t.id ? 'border-amber-500 ring-2 ring-amber-200' : 'border-gray-100 hover:border-gray-200',
                                                    t.id !== 'default' && !canUsePremiumThemes ? 'opacity-60 grayscale' : ''
                                                )}
                                            >
                                                <div className={cn("aspect-[4/5] rounded-lg bg-gradient-to-br flex flex-col items-center justify-center gap-2 p-4 mb-2", t.color)}>
                                                    <div className="w-full h-2 bg-white/60 rounded" />
                                                    <div className="w-2/3 h-2 bg-white/40 rounded" />
                                                    <div className="w-full aspect-square bg-white/80 rounded-md shadow-sm mt-2" />
                                                </div>
                                                <div className="text-left px-2 pb-2">
                                                    <div className="text-xs font-black text-gray-900 leading-none flex items-center gap-1">
                                                        {t.name}
                                                        {t.id !== 'default' && !canUsePremiumThemes && <Lock className="w-3 h-3 text-red-500" />}
                                                    </div>
                                                    <div className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tighter">{t.desc}</div>
                                                </div>
                                                {localSettings.themeId === t.id && (
                                                    <div className="absolute -top-2 -right-2 bg-amber-500 text-white p-1 rounded-full shadow-lg">
                                                        <Save className="h-3 w-3" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {localSettings.themeId === 'custom' && (
                                        <div className="mt-6 p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-4 relative overflow-hidden">
                                            {!canUseCustomColors && (
                                                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                                                    <Lock className="w-8 h-8 text-gray-400 mb-2" />
                                                    <p className="text-sm font-bold text-gray-800">Özel Tasarım PRO pakette</p>
                                                </div>
                                            )}
                                            <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                                                <Palette className="w-4 h-4 text-purple-500" /> Özel Renk Paleti (Custom)
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-xs font-bold text-gray-600">Arka Plan Rengi</Label>
                                                    <div className="flex gap-2">
                                                        <Input
                                                            type="color"
                                                            value={localSettings.customBgColor || '#ffffff'}
                                                            onChange={(e) => handleChange('customBgColor', e.target.value)}
                                                            className="w-12 h-10 p-1 cursor-pointer rounded-md"
                                                        />
                                                        <Input
                                                            type="text"
                                                            value={localSettings.customBgColor || '#ffffff'}
                                                            onChange={(e) => handleChange('customBgColor', e.target.value)}
                                                            className="font-mono text-xs uppercase"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-xs font-bold text-gray-600">Başlık/Metin Rengi</Label>
                                                    <div className="flex gap-2">
                                                        <Input
                                                            type="color"
                                                            value={localSettings.customTextColor || '#000000'}
                                                            onChange={(e) => handleChange('customTextColor', e.target.value)}
                                                            className="w-12 h-10 p-1 cursor-pointer rounded-md"
                                                        />
                                                        <Input
                                                            type="text"
                                                            value={localSettings.customTextColor || '#000000'}
                                                            onChange={(e) => handleChange('customTextColor', e.target.value)}
                                                            className="font-mono text-xs uppercase"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-xs font-bold text-gray-600">Vurgu/Aksan Rengi</Label>
                                                    <div className="flex gap-2">
                                                        <Input
                                                            type="color"
                                                            value={localSettings.customAccentColor || '#f59e0b'}
                                                            onChange={(e) => handleChange('customAccentColor', e.target.value)}
                                                            className="w-12 h-10 p-1 cursor-pointer rounded-md"
                                                        />
                                                        <Input
                                                            type="text"
                                                            value={localSettings.customAccentColor || '#f59e0b'}
                                                            onChange={(e) => handleChange('customAccentColor', e.target.value)}
                                                            className="font-mono text-xs uppercase"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card className="shadow-sm border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Layout className="h-5 w-5 text-gray-600" />
                                        Menü Yerleşimi
                                    </CardTitle>
                                    <CardDescription>Ürünlerin nasıl listeleneceğini seçin.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[
                                            { id: 'accordion', name: 'Akordiyon', icon: '↔️' },
                                            { id: 'list', name: 'Düz Liste', icon: '📄' },
                                            { id: 'tabs', name: 'Sekmeli', icon: '📑' },
                                            { id: 'grid', name: 'Izgara', icon: '🔳' },
                                            { id: 'masonry', name: 'Masonry', icon: '🧱' },
                                            { id: 'cards', name: 'Kutu Kart', icon: '🎴' },
                                            { id: 'minimal-list', name: 'Sade (Liste)', icon: '📝' },
                                            { id: 'paper', name: 'Lüks Kağıt', icon: '📜' },
                                        ].map((l) => {
                                            const isAdvanced = ['masonry', 'cards', 'paper', 'grid'].includes(l.id);
                                            return (
                                                <button
                                                    key={l.id}
                                                    onClick={() => {
                                                        if (isAdvanced && !canUseAdvancedLayouts) {
                                                            alert('Bu yerleşim PRO paket gerektirir.');
                                                            return;
                                                        }
                                                        handleChange('menuLayout', l.id);
                                                    }}
                                                    className={cn(
                                                        "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all relative",
                                                        localSettings.menuLayout === l.id ? 'border-black bg-black text-white' : 'border-gray-100 bg-gray-50 hover:bg-gray-100',
                                                        isAdvanced && !canUseAdvancedLayouts ? 'opacity-60 grayscale' : ''
                                                    )}
                                                >
                                                    {isAdvanced && !canUseAdvancedLayouts && <Lock className="absolute top-2 right-2 w-3 h-3 text-red-500" />}
                                                    <span className="text-2xl">{l.icon}</span>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-center">{l.name}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-sm border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-lg">Renk & Font Ayarları</CardTitle>
                                    <CardDescription>Genel stil tercihleriniz.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                                        <div className="space-y-3">
                                            <Label className="text-sm font-bold text-gray-700">Yazı Fontu</Label>
                                            <Select value={localSettings.fontFamily || 'Inter'} onValueChange={(val) => handleChange('fontFamily', val)}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Font Seçin" />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-80">
                                                    {/* Temel */}
                                                    <SelectItem value="Inter" style={{ fontFamily: 'Inter, sans-serif' }}>Inter (Standart)</SelectItem>
                                                    <SelectItem value="Lato" style={{ fontFamily: 'Lato, sans-serif' }}>Lato (Profesyonel)</SelectItem>
                                                    <SelectItem value="Open Sans" style={{ fontFamily: '"Open Sans", sans-serif' }}>Open Sans (Okunabilir)</SelectItem>
                                                    <SelectItem value="Source Sans Pro" style={{ fontFamily: '"Source Sans Pro", sans-serif' }}>Source Sans Pro (Elite)</SelectItem>
                                                    {/* Modern */}
                                                    <SelectItem value="Montserrat" style={{ fontFamily: 'Montserrat, sans-serif' }}>Montserrat</SelectItem>
                                                    <SelectItem value="Poppins" style={{ fontFamily: 'Poppins, sans-serif' }}>Poppins (Geometrik)</SelectItem>
                                                    <SelectItem value="Outfit" style={{ fontFamily: 'Outfit, sans-serif' }}>Outfit (Çağdaş)</SelectItem>
                                                    <SelectItem value="DM Sans" style={{ fontFamily: '"DM Sans", sans-serif' }}>DM Sans</SelectItem>
                                                    <SelectItem value="Raleway" style={{ fontFamily: 'Raleway, sans-serif' }}>Raleway (Zarif & İnce)</SelectItem>
                                                    <SelectItem value="Josefin Sans" style={{ fontFamily: '"Josefin Sans", sans-serif' }}>Josefin Sans (Retro Butik)</SelectItem>
                                                    <SelectItem value="Barlow" style={{ fontFamily: 'Barlow, sans-serif' }}>Barlow (Endüstriyel)</SelectItem>
                                                    <SelectItem value="Cabin" style={{ fontFamily: 'Cabin, sans-serif' }}>Cabin (Kafe Hissi)</SelectItem>
                                                    <SelectItem value="Nunito" style={{ fontFamily: 'Nunito, sans-serif' }}>Nunito (Samimi & Yuvarlak)</SelectItem>
                                                    <SelectItem value="Quicksand" style={{ fontFamily: 'Quicksand, sans-serif' }}>Quicksand (Sevimli)</SelectItem>
                                                    <SelectItem value="Exo 2" style={{ fontFamily: '"Exo 2", sans-serif' }}>Exo 2 (Futuristik)</SelectItem>
                                                    {/* Serif / Lüks */}
                                                    <SelectItem value="Playfair Display" style={{ fontFamily: '"Playfair Display", serif' }}>Playfair Display (Zarif Serif)</SelectItem>
                                                    <SelectItem value="Cormorant Garamond" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Cormorant Garamond (Klasik)</SelectItem>
                                                    <SelectItem value="Cinzel" style={{ fontFamily: 'Cinzel, serif' }}>Cinzel (Antik Lüks)</SelectItem>
                                                    <SelectItem value="Bebas Neue" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>Bebas Neue (Güçlü Başlık)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="flex items-center justify-between rounded-xl bg-gray-50/50 p-4 border border-gray-100">
                                            <div className="space-y-0.5">
                                                <Label className="font-bold text-gray-900">Koyu Mod</Label>
                                                <p className="text-[10px] text-gray-500">Karanlık tema.</p>
                                            </div>
                                            <Switch checked={localSettings.darkMode} onCheckedChange={() => handleToggle('darkMode')} />
                                        </div>

                                        <div className="flex items-center justify-between rounded-xl bg-gray-50/50 p-4 border border-gray-100">
                                            <div className="space-y-0.5">
                                                <Label className="font-bold text-gray-900">Mağaza Aktifliği</Label>
                                                <p className="text-[10px] text-gray-500">Müşteriye kapat/aç.</p>
                                            </div>
                                            <Switch checked={localSettings.storeActive !== false} onCheckedChange={() => handleToggle('storeActive')} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'menu' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <Card className="shadow-sm border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-lg">Kategori Görünümü</CardTitle>
                                    <CardDescription>Kategoriler için font ve boyut ayarları.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-3">
                                        <Label className="text-sm font-bold text-gray-700">Başlık Boyutu</Label>
                                        <div className="flex gap-2">
                                            {['medium', 'large', 'xl'].map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => handleChange('categoryFontSize', size)}
                                                    className={cn(
                                                        "flex-1 rounded-lg border py-2 text-xs font-bold transition-all uppercase",
                                                        localSettings.categoryFontSize === size ? 'bg-black text-white' : 'bg-white text-gray-600'
                                                    )}
                                                >
                                                    {size === 'medium' ? 'Orta' : size === 'large' ? 'Büyük' : 'XL'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-sm font-bold text-gray-700">Başlık Kalınlığı</Label>
                                        <div className="flex gap-2">
                                            {['normal', 'bold', 'black'].map((weight) => (
                                                <button
                                                    key={weight}
                                                    onClick={() => handleChange('categoryFontWeight', weight)}
                                                    className={cn(
                                                        "flex-1 rounded-lg border py-2 text-xs font-bold transition-all uppercase",
                                                        localSettings.categoryFontWeight === weight ? 'bg-black text-white' : 'bg-white text-gray-600'
                                                    )}
                                                >
                                                    {weight === 'normal' ? 'Normal' : weight === 'bold' ? 'Kalın' : 'Extra'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-sm font-bold text-gray-700">Kategori Yüksekliği</Label>
                                        <div className="flex gap-2">
                                            {['small', 'medium', 'large'].map((h) => (
                                                <button
                                                    key={h}
                                                    onClick={() => handleChange('categoryRowHeight', h)}
                                                    className={cn(
                                                        "flex-1 rounded-lg border py-2 text-xs font-bold transition-all uppercase",
                                                        localSettings.categoryRowHeight === h ? 'bg-black text-white' : 'bg-white text-gray-600'
                                                    )}
                                                >
                                                    {h === 'small' ? 'Az' : h === 'medium' ? 'Orta' : 'Çok'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>


                        </div>
                    )}

                    {activeTab === 'home' && (
                        <div className="space-y-6 animate-in fade-in duration-300 relative">
                            {!canUseBanners && (
                                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-20 flex flex-col items-center pt-24 rounded-xl">
                                    <Lock className="w-10 h-10 text-gray-400 mb-2" />
                                    <p className="text-lg font-bold text-gray-900">Ana Sayfa Banner Yönetimi PRO Pakette</p>
                                    <p className="text-sm text-gray-600 mt-2">Müşterilerinize kampanyalarınızı bannerlar ile duyurun.</p>
                                </div>
                            )}

                            <Card className={cn("shadow-sm border-gray-200", !canUseBanners && "opacity-50 blur-[2px]")}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <div className="space-y-1">
                                        <CardTitle className="text-lg">Ana Sayfa Banner</CardTitle>
                                        <CardDescription>Kampanya ve duyuru görselleri.</CardDescription>
                                    </div>
                                    <Switch checked={localSettings.bannerActive} onCheckedChange={() => handleToggle('bannerActive')} />
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-4">
                                        {localSettings.bannerUrls.map((url, index) => (
                                            <div key={index} className="flex flex-col gap-4 p-4 rounded-xl border bg-gray-50/50">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs font-black text-gray-400 uppercase">Banner {index + 1}</span>
                                                    <Button variant="ghost" size="sm" onClick={() => removeBannerUrl(index)} className="text-red-600 h-6">Kaldır</Button>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Input value={url} onChange={(e) => handleBannerUrlChange(index, e.target.value)} placeholder="Banner URL" />
                                                    <label className="cursor-pointer bg-white border px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-50 flex items-center">
                                                        YÜKLE
                                                        <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleBannerUpload(e.target.files[0], index, 'desktop')} />
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                        {localSettings.bannerUrls.length < 5 && (
                                            <Button variant="outline" onClick={addBannerUrl} className="border-dashed border-2 py-8">
                                                + Yeni Banner Ekle
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'footer' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <Card className="shadow-sm border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-lg">Footer Ayarları</CardTitle>
                                    <CardDescription>Sosyal medya ve telif yazıları.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>Instagram Kullanıcı Adı</Label>
                                            <Input value={localSettings.socialInstagram || ''} onChange={(e) => handleChange('socialInstagram', e.target.value)} placeholder="username" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>WhatsApp Numarası</Label>
                                            <Input value={localSettings.socialWhatsapp || ''} onChange={(e) => handleChange('socialWhatsapp', e.target.value)} placeholder="05XXXXXXXXX" />
                                        </div>
                                        <div className="space-y-2 col-span-2">
                                            <Label>Alt Yazı (Copyright)</Label>
                                            <Input value={localSettings.footerCopyright || `© ${new Date().getFullYear()} Tüm Hakları Saklıdır`} onChange={(e) => handleChange('footerCopyright', e.target.value)} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'advanced' && (
                        <div className="space-y-6 animate-in fade-in duration-300 relative">
                            <Card className="border-blue-100 bg-blue-50/20 relative overflow-hidden">
                                {!canUseCustomDomain && (
                                    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                                        <Lock className="w-8 h-8 text-blue-400 mb-2" />
                                        <p className="text-sm font-bold text-blue-900">Özel Alan Adı PRO Pakette</p>
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Globe className="h-5 w-5 text-blue-600" />
                                        Özel Alan Adı
                                    </CardTitle>
                                    <CardDescription>
                                        Müşterilerinizin kendi alan adlarından size ulaşmasını sağlayın.
                                        Domain sağlayıcınızdan (GoDaddy vb.) sunucumuzun IP adresini (`A Kaydı`) veya sunucu adresimizi (`CNAME`) domaininize kaydetmeniz gerekir.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex gap-2">
                                        <Input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="menu.restoraniniz.com" className="bg-white" />
                                        <Button onClick={handleDomainSave} disabled={loadingDomain} className="bg-blue-600">
                                            {loadingDomain ? '...' : 'Bağla'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-red-100 bg-red-50/20">
                                <CardHeader>
                                    <CardTitle className="text-lg text-red-900">Şifre Değiştir</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4 md:grid-cols-2">
                                    <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Yeni Şifre" className="bg-white" />
                                    <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Tekrar" className="bg-white" />
                                </CardContent>
                                <CardFooter className="justify-end border-t border-red-100/50 pt-4">
                                    <Button onClick={handleChangePassword} disabled={!newPassword || loadingPass} className="bg-red-600">
                                        Şifreyi Güncelle
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
