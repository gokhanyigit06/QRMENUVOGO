
'use client';

import { useMenu } from '@/lib/store';
import * as Services from '@/lib/services';

import { Eye, EyeOff, Save, Upload, Globe, Palette, Layout } from 'lucide-react';
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

export default function SettingsPage() {
    const { settings, updateSettings, uploadImage } = useMenu();
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
            const url = await uploadImage(file);
            setLocalSettings(prev => ({ ...prev, [field]: url }));
        } catch (error) {
            alert('Resim yüklenirken hata oluştu.');
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleToggle = (key: 'bannerActive' | 'popupActive' | 'darkMode') => {
        setLocalSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleChange = (key: string, value: any) => {
        setLocalSettings(prev => ({ ...prev, [key]: value }));
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
            const url = await uploadImage(file);
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

    const themeColors = [
        { name: 'Siyah (Varsayılan)', value: 'black', class: 'bg-black' },
        { name: 'Beyaz', value: 'white', class: 'bg-white border border-gray-200' },
        { name: 'Mavi', value: 'blue', class: 'bg-blue-600' },
        { name: 'Turuncu', value: 'orange', class: 'bg-orange-500' },
        { name: 'Kırmızı', value: 'red', class: 'bg-red-600' },
        { name: 'Yeşil', value: 'green', class: 'bg-green-600' },
    ];

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
                                        ].map((t) => (
                                            <button
                                                key={t.id}
                                                onClick={() => handleChange('themeId', t.id)}
                                                className={cn(
                                                    "relative group rounded-xl border-2 transition-all p-1 bg-white",
                                                    localSettings.themeId === t.id ? 'border-amber-500 ring-2 ring-amber-200' : 'border-gray-100 hover:border-gray-200'
                                                )}
                                            >
                                                <div className={cn("aspect-[4/5] rounded-lg bg-gradient-to-br flex flex-col items-center justify-center gap-2 p-4 mb-2", t.color)}>
                                                    <div className="w-full h-2 bg-white/60 rounded" />
                                                    <div className="w-2/3 h-2 bg-white/40 rounded" />
                                                    <div className="w-full aspect-square bg-white/80 rounded-md shadow-sm mt-2" />
                                                </div>
                                                <div className="text-left px-2 pb-2">
                                                    <div className="text-xs font-black text-gray-900 leading-none">{t.name}</div>
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
                                        ].map((l) => (
                                            <button
                                                key={l.id}
                                                onClick={() => handleChange('menuLayout', l.id)}
                                                className={cn(
                                                    "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                                                    localSettings.menuLayout === l.id ? 'border-black bg-black text-white' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
                                                )}
                                            >
                                                <span className="text-2xl">{l.icon}</span>
                                                <span className="text-[10px] font-black uppercase tracking-widest">{l.name}</span>
                                            </button>
                                        ))}
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
                                            <Label className="text-sm font-bold text-gray-700">Ana Renk</Label>
                                            <div className="flex flex-wrap gap-2">
                                                {themeColors.map(color => (
                                                    <button
                                                        key={color.value}
                                                        onClick={() => handleChange('themeColor', color.value)}
                                                        className={cn(
                                                            "h-10 w-10 rounded-full border-2 transition-all",
                                                            localSettings.themeColor === color.value ? 'border-gray-900 scale-110' : 'border-transparent shadow-sm'
                                                        )}
                                                        title={color.name}
                                                    >
                                                        <div className={cn("h-full w-full rounded-full", color.class)} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-sm font-bold text-gray-700">Yazı Fontu</Label>
                                            <Select value={localSettings.fontFamily || 'Inter'} onValueChange={(val) => handleChange('fontFamily', val)}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Font Seçin" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Inter">Inter (Standard)</SelectItem>
                                                    <SelectItem value="Montserrat">Montserrat (Modern)</SelectItem>
                                                    <SelectItem value="Playfair Display">Playfair (Elegant)</SelectItem>
                                                    <SelectItem value="Brodo">Brodo (Stylish)</SelectItem>
                                                    <SelectItem value="Source Sans Pro">Source Sans (Elite)</SelectItem>
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

                            <Card className="shadow-sm border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-lg">Ürün Kartı Renkleri</CardTitle>
                                    <CardDescription>Ürün Başlığı, Açıklama ve Fiyat renkleri.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-6 md:grid-cols-3">
                                    <div className="space-y-3">
                                        <Label className="text-xs font-black uppercase text-gray-500">BAŞLIK RENK</Label>
                                        <div className="flex items-center gap-2">
                                            <Input type="color" value={localSettings.productTitleColor || '#000000'} onChange={(e) => handleChange('productTitleColor', e.target.value)} className="h-10 w-full p-1" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-xs font-black uppercase text-gray-500">AÇIKLAMA RENK</Label>
                                        <div className="flex items-center gap-2">
                                            <Input type="color" value={localSettings.productDescriptionColor || '#666666'} onChange={(e) => handleChange('productDescriptionColor', e.target.value)} className="h-10 w-full p-1" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-xs font-black uppercase text-gray-500">FİYAT RENK</Label>
                                        <div className="flex items-center gap-2">
                                            <Input type="color" value={localSettings.productPriceColor || '#d97706'} onChange={(e) => handleChange('productPriceColor', e.target.value)} className="h-10 w-full p-1" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'home' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <Card className="shadow-sm border-gray-200">
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
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <Card className="border-blue-100 bg-blue-50/20">
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
