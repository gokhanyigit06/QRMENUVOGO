'use client';

import { useMenu } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Category } from '@/lib/data';
import { Loader2, Ban, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import IconComponent, { AVAILABLE_ICONS } from '@/components/IconComponent';

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (category: Category) => void;
    category?: Category;
}

export function CategoryModal({ isOpen, onClose, onSave, category }: CategoryModalProps) {
    const { uploadImage } = useMenu();
    const [isUploading, setIsUploading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [iconSearch, setIconSearch] = useState('');

    const [formData, setFormData] = useState<Partial<Category>>({
        name: '',
        nameEn: '',
        image: '',
        description: '',
        badge: '',
        discountRate: undefined,
        icon: '',
        iconColor: '#ffffff',
        iconSize: 'medium',
        station_name: 'Mutfak',
        segment: 'food',
        visibility_start_time: '',
        visibility_end_time: '',
        visibility_days: []
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (category) {
            setFormData(category);
        } else {
            setFormData({
                name: '',
                nameEn: '',
                image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
                description: '',
                badge: '',
                discountRate: undefined,
                icon: '',
                iconColor: '#ffffff',
                iconSize: 'medium',
                station_name: 'Mutfak',
                segment: 'food',
                visibility_start_time: '',
                visibility_end_time: '',
                visibility_days: []
            });
        }
    }, [category, isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.setProperty('overflow', 'hidden', 'important');
            document.documentElement.style.setProperty('overflow', 'hidden', 'important');
        } else {
            document.body.style.removeProperty('overflow');
            document.documentElement.style.removeProperty('overflow');
        }
        return () => {
            document.body.style.removeProperty('overflow');
            document.documentElement.style.removeProperty('overflow');
        };
    }, [isOpen]);

    if (!isOpen || !mounted) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as Category);
        onClose();
    };

    return createPortal(
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-5xl flex flex-col rounded-xl bg-white shadow-2xl my-4">
                    <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 shrink-0">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                                {category ? 'Kategoriyi Düzenle' : 'Yeni Kategori Oluştur'}
                            </h2>
                            <p className="text-xs text-gray-500 font-medium">Menü kategorilerinizi buradan yönetebilirsiniz.</p>
                        </div>
                        <button onClick={onClose} className="rounded-full p-2 bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors">
                            <span className="sr-only">Kapat</span>
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <form id="category-form" onSubmit={handleSubmit} className="p-5 overflow-y-auto max-h-[80vh]">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            {/* Left Column */}
                            <div className="md:col-span-12 lg:col-span-7 space-y-6">
                                <section className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 space-y-4">
                                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 text-primary-dark">
                                        <span className="w-1.5 h-4 bg-primary-dark rounded-full"></span>
                                        Temel Bilgiler
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="mb-1 block text-xs font-bold text-gray-700">Kategori Adı</label>
                                            <input
                                                type="text" required value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
                                                placeholder="Örn: Pizzalar"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs font-bold text-gray-700">🇬🇧 İngilizce Adı</label>
                                            <input
                                                type="text" value={formData.nameEn || ''}
                                                onChange={e => setFormData({ ...formData, nameEn: e.target.value })}
                                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs font-bold text-gray-700">Rozet (Badge)</label>
                                            <input
                                                type="text" value={formData.badge || ''}
                                                onChange={e => setFormData({ ...formData, badge: e.target.value })}
                                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
                                                placeholder="Yeni, Popüler vb."
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="mb-1 block text-xs font-bold text-gray-700">Açıklama</label>
                                            <textarea
                                                rows={2} value={formData.description || ''}
                                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
                                            />
                                        </div>
                                    </div>
                                </section>

                                <section className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 space-y-4">
                                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                        <span className="w-1.5 h-4 bg-primary-dark rounded-full"></span>
                                        Kategori Grubu & İstasyon
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-4">
                                            <label className="block text-xs font-bold text-gray-700">Menü Grubu (Segment)</label>
                                            <div className="flex gap-2">
                                                <button type="button" onClick={() => setFormData({ ...formData, segment: 'food' })}
                                                    className={cn("flex-1 px-4 py-2 text-sm font-bold rounded-lg border transition-all", formData.segment === 'food' ? "bg-black text-white border-black" : "bg-white text-gray-600 border-gray-200")}>
                                                    🥘 Yemekler
                                                </button>
                                                <button type="button" onClick={() => setFormData({ ...formData, segment: 'drink' })}
                                                    className={cn("flex-1 px-4 py-2 text-sm font-bold rounded-lg border transition-all", formData.segment === 'drink' ? "bg-black text-white border-black" : "bg-white text-gray-600 border-gray-200")}>
                                                    🍹 İçecekler
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="block text-xs font-bold text-gray-700">Sipariş İstasyonu</label>
                                            <div className="flex gap-2">
                                                <button type="button" onClick={() => setFormData({ ...formData, station_name: 'Mutfak' })}
                                                    className={cn("flex-1 px-4 py-2 text-sm font-bold rounded-lg border transition-all", formData.station_name === 'Mutfak' ? "bg-black text-white border-black" : "bg-white text-gray-600 border-gray-200")}>
                                                    Mutfak
                                                </button>
                                                <button type="button" onClick={() => setFormData({ ...formData, station_name: 'Bar' })}
                                                    className={cn("flex-1 px-4 py-2 text-sm font-bold rounded-lg border transition-all", formData.station_name === 'Bar' ? "bg-black text-white border-black" : "bg-white text-gray-600 border-gray-200")}>
                                                    Bar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-gray-500 italic mt-2">Bu grup seçimi Elite temasında 'YEMEKLER | İÇECEKLER' ayrımını sağlar.</p>
                                </section>

                                <section className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 space-y-4">
                                    <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                                        <span className="w-1.5 h-4 bg-amber-500 rounded-full"></span>
                                        🕒 Zaman Ayarlı Görünürlük
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-amber-900 uppercase">Başlangıç</label>
                                            <input type="time" value={formData.visibility_start_time || ''} onChange={e => setFormData({ ...formData, visibility_start_time: e.target.value })}
                                                className="w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-amber-900 uppercase">Bitiş</label>
                                            <input type="time" value={formData.visibility_end_time || ''} onChange={e => setFormData({ ...formData, visibility_end_time: e.target.value })}
                                                className="w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm" />
                                        </div>
                                        <div className="col-span-2">
                                            <div className="flex flex-wrap gap-1">
                                                {[{ id: 1, l: 'Pzt' }, { id: 2, l: 'Sal' }, { id: 3, l: 'Çar' }, { id: 4, l: 'Per' }, { id: 5, l: 'Cum' }, { id: 6, l: 'Cmt' }, { id: 0, l: 'Paz' }].map(d => (
                                                    <button key={d.id} type="button" className={cn("px-2.5 py-1 rounded text-[10px] font-bold transition-all border", (formData.visibility_days || []).includes(d.id) ? "bg-amber-500 border-amber-600 text-white" : "bg-white border-amber-200 text-amber-700")}
                                                        onClick={() => {
                                                            const curr = formData.visibility_days || [];
                                                            setFormData({ ...formData, visibility_days: curr.includes(d.id) ? curr.filter(id => id !== d.id) : [...curr, d.id] });
                                                        }}>{d.l}</button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Right Column */}
                            <div className="md:col-span-12 lg:col-span-5 space-y-6">
                                <section className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
                                    <h3 className="text-sm font-bold text-gray-900">Görsel & Stil</h3>

                                    <div className="space-y-3">
                                        <label className="block text-xs font-bold text-gray-700">Kategori Fotoğrafı</label>
                                        <div className="relative group aspect-video rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center overflow-hidden">
                                            {formData.image ? (
                                                <img src={formData.image} className="absolute inset-0 w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex flex-col items-center text-gray-400">
                                                    <Plus className="h-6 w-6 mb-1" />
                                                    <span className="text-[10px] font-bold uppercase">Görsel Seç</span>
                                                </div>
                                            )}
                                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*"
                                                onChange={async e => {
                                                    const f = e.target.files?.[0];
                                                    if (f) {
                                                        setIsUploading(true);
                                                        try { const url = await uploadImage(f); setFormData(p => ({ ...p, image: url })); }
                                                        finally { setIsUploading(false); }
                                                    }
                                                }} />
                                            {isUploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><Loader2 className="animate-spin" /></div>}
                                        </div>
                                        <input type="text" value={formData.image || ''} onChange={e => setFormData({ ...formData, image: e.target.value })}
                                            className="w-full text-[10px] border px-2 py-1 rounded bg-gray-50" placeholder="veya URL" />
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-bold text-gray-700">İkon & Renk</label>
                                            <input type="color" value={formData.iconColor || '#000000'} onChange={e => setFormData({ ...formData, iconColor: e.target.value })} className="h-6 w-6 p-0 border-0 rounded cursor-pointer mb-2" />
                                        </div>
                                        <input type="text" value={iconSearch} onChange={e => setIconSearch(e.target.value)}
                                            className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs" placeholder="İkonlarda ara..." />
                                        <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto pr-1">
                                            <button type="button" onClick={() => setFormData({ ...formData, icon: '' })} className={cn("aspect-square flex items-center justify-center rounded-lg bg-gray-100", !formData.icon && "ring-2 ring-black")}>
                                                <Ban size={16} />
                                            </button>
                                            {AVAILABLE_ICONS.filter(i => i.toLowerCase().includes(iconSearch.toLowerCase())).slice(0, 48).map(i => (
                                                <button key={i} type="button" onClick={() => setFormData({ ...formData, icon: i })}
                                                    className={cn("aspect-square flex items-center justify-center rounded-lg bg-gray-50", formData.icon === i && "bg-black text-white")}>
                                                    <IconComponent name={i} className="h-4 w-4" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-2">Görünüm Modu (Grid/Liste)</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['grid', 'list', 'medium'].map(m => (
                                                    <button key={m} type="button" onClick={() => setFormData({ ...formData, layout_mode: m as any })}
                                                        className={cn("px-3 py-2 text-[10px] font-bold rounded-lg border uppercase transition-all", formData.layout_mode === m ? "bg-black text-white border-black" : "bg-white text-gray-500 border-gray-200")}>
                                                        {m}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">Global İndirim Oranı (%)</label>
                                            <input type="number" value={formData.discountRate || ''} onChange={e => setFormData({ ...formData, discountRate: parseInt(e.target.value) || undefined })}
                                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" placeholder="Opsiyonel" />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </form>

                    <div className="flex items-center justify-end gap-3 px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl shrink-0">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900">Vazgeç</button>
                        <button type="submit" form="category-form" className="px-8 py-2.5 text-sm font-bold bg-black text-white rounded-xl shadow-lg hover:translate-y-[-1px] transition-all">
                            {category ? 'Güncelle' : 'Kategoriyi Oluştur'}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

