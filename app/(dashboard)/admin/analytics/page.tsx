'use client';

import { useMenu } from '@/lib/store';
import {
    PieChart as PieChartIcon,
    Lock,
    ArrowRight,
    Users,
    Clock,
    MousePointerClick,
    TrendingUp,
    Loader2,
    RefreshCcw,
    Smartphone,
    Monitor,
    Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect, useMemo } from 'react';
import * as Services from '@/lib/services';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    Cell
} from 'recharts';
import { cn } from '@/lib/utils';

export default function AnalyticsPage() {
    const { restaurant } = useMenu();
    const [period, setPeriod] = useState<'today' | 'week' | 'month' | 'year'>('month');
    const [loading, setLoading] = useState(true);
    const [analyticsData, setAnalyticsData] = useState<{
        pageViews: any[],
        productViews: any[],
        totalHits?: number,
        totalProductViews?: number
    }>({ pageViews: [], productViews: [] });

    useEffect(() => {
        if (restaurant?.id) {
            loadAnalytics();
        }
    }, [restaurant, period]);

    const loadAnalytics = async () => {
        try {
            setLoading(true);
            const data = await Services.getAnalyticsSummary(restaurant!.id, period);
            setAnalyticsData(data);
        } catch (error) {
            console.error("Error loading analytics:", error);
        } finally {
            setLoading(false);
        }
    };

    // --- Statistics Calculations ---

    const stats = useMemo(() => {
        const { pageViews, productViews } = analyticsData;

        // Hits Today vs Yesterday (Bypassing 1000 limit)
        const totalHits = analyticsData.totalHits || pageViews.length;
        const mobileHits = pageViews.filter(v => v.device_type === 'mobile').length;

        // Ratio based on SAMPLE (Stats)
        const mobileRatio = pageViews.length > 0 ? Math.round((mobileHits / pageViews.length) * 100) : 0;

        // Interaction Rate: Product views / Total scans
        const totalProductViews = analyticsData.totalProductViews || productViews.length;
        const interactionRate = pageViews.length > 0 ? Math.round((productViews.length / pageViews.length) * 100) : 0;

        return {
            totalHits,
            mobileRatio,
            interactionRate,
            totalProductViews
        };
    }, [analyticsData]);

    // --- Chart Data Processing ---

    const hourlyData = useMemo(() => {
        const { pageViews } = analyticsData;
        if (!pageViews.length) return [];

        const hours = Array.from({ length: 24 }, (_, i) => ({
            hour: `${i.toString().padStart(2, '0')}:00`,
            scans: 0
        }));

        pageViews.forEach(v => {
            const hour = new Date(v.created_at).getHours();
            hours[hour].scans++;
        });

        // Slice to relevant business hours if today
        return hours;
    }, [analyticsData]);

    const dailyData = useMemo(() => {
        const { pageViews } = analyticsData;
        if (!pageViews.length) return [];

        const groups: Record<string, number> = {};
        pageViews.forEach(v => {
            const date = new Date(v.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
            groups[date] = (groups[date] || 0) + 1;
        });

        return Object.entries(groups).map(([date, scans]) => ({ date, scans }));
    }, [analyticsData]);

    const busyDaysData = useMemo(() => {
        const { pageViews } = analyticsData;
        const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
        const counts = Array(7).fill(0).map((_, i) => ({ name: dayNames[i], count: 0, order: i === 0 ? 7 : i }));

        pageViews.forEach(v => {
            const day = new Date(v.created_at).getDay();
            counts[day].count++;
        });

        // Filter out zero-count days if no data, or just return all
        return counts.sort((a, b) => b.count - a.count);
    }, [analyticsData]);

    const hotCategoryData = useMemo(() => {
        const { productViews } = analyticsData;
        const counts: Record<string, number> = {};

        productViews.forEach(v => {
            const catName = v.products?.categories?.name || "Diğer";
            counts[catName] = (counts[catName] || 0) + 1;
        });

        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .map(([name, count]) => ({ name, count }))
            .slice(0, 5);
    }, [analyticsData]);

    const topProductData = useMemo(() => {
        const { productViews } = analyticsData;
        const counts: Record<string, { name: string, count: number, category: string }> = {};

        productViews.forEach(v => {
            const name = v.products?.name || "Bilinmeyen Ürün";
            const category = v.products?.categories?.name || "";
            if (!counts[v.product_id]) counts[v.product_id] = { name, count: 0, category };
            counts[v.product_id].count++;
        });

        return Object.values(counts)
            .sort((a, b) => b.count - a.count)
            .slice(0, 8);
    }, [analyticsData]);

    if (!restaurant) return null;

    const isPremium = restaurant.plan_type === 'PLUS' || restaurant.plan_type === 'PRO';

    if (!isPremium) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
                <div className="bg-amber-100 p-6 rounded-full mb-6">
                    <Lock className="h-16 w-16 text-amber-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Gelişmiş QR Analiz Paneli</h1>
                <p className="text-lg text-gray-500 max-w-lg mb-8">
                    QR kodunuzun kaç kez tarandığını, en çok hangi ürünlerin tıklandığını ve saatlik yoğunluk grafiklerini görün. Veriye dayalı restoran yönetimine geçin.
                </p>
                <Button className="bg-black text-white font-bold h-12 px-8 rounded-full flex items-center gap-2">
                    Plus Plan'a Yükselt
                    <ArrowRight className="h-5 w-5" />
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-20 max-w-[1200px] mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
                        <PieChartIcon className="h-8 w-8 text-amber-500" />
                        QR Menü Analitiği
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">QR taramaları, ürün etkileşimleri ve müşteri davranışları.</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                    <Button variant="outline" size="icon" onClick={loadAnalytics} disabled={loading}>
                        <RefreshCcw className={cn("h-4 w-4", loading && "animate-spin")} />
                    </Button>
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value as any)}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white font-medium shadow-sm outline-none focus:ring-2 focus:ring-amber-500"
                    >
                        <option value="today">Bugün</option>
                        <option value="week">Son 7 Gün</option>
                        <option value="month">Son 30 Gün</option>
                        <option value="year">Son 1 Yıl</option>
                    </select>
                </div>
            </div>

            {loading && !analyticsData.pageViews.length ? (
                <div className="flex items-center justify-center min-h-[40vh]">
                    <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                </div>
            ) : (
                <>
                    {/* Key Metrics Dashboard */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="shadow-sm border-none bg-black text-white">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium opacity-70">Toplam QR Tarama</CardTitle>
                                <TrendingUp className="h-4 w-4 text-amber-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{stats.totalHits}</div>
                                <p className="text-xs opacity-50 mt-1">Seçili dönemdeki toplam hit</p>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">Mobil Cihaz Oranı</CardTitle>
                                <Smartphone className="h-4 w-4 text-gray-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900">%{stats.mobileRatio}</div>
                                <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-green-500" /> Müşterileriniz mobil ağırlıklı
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">Ürün İnceleme Oranı</CardTitle>
                                <MousePointerClick className="h-4 w-4 text-gray-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900">%{stats.interactionRate}</div>
                                <p className="text-xs text-gray-400 mt-1 italic">Scan başı tıklama oranı</p>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm border-amber-100 bg-amber-50/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-amber-900">Popüler Saat</CardTitle>
                                <Clock className="h-4 w-4 text-amber-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-amber-600">
                                    {hourlyData.length > 0 ? [...hourlyData].sort((a, b) => b.scans - a.scans)[0].hour : '--:--'}
                                </div>
                                <p className="text-xs text-amber-600 mt-1 font-medium">En yoğun tarama saati</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3 mt-6">
                        {/* Traffic Graph */}
                        <Card className="lg:col-span-2 shadow-sm">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg">Tarama Yoğunluğu</CardTitle>
                                        <CardDescription>QR kodun zaman içindeki tarama trafiği.</CardDescription>
                                    </div>
                                    <div className="flex items-center gap-1 bg-gray-100/80 p-1 rounded-xl shadow-inner">
                                        {[
                                            { id: 'today', label: 'Bugün' },
                                            { id: 'week', label: '7 Gün' },
                                            { id: 'month', label: '30 Gün' }
                                        ].map((p) => (
                                            <button
                                                key={p.id}
                                                onClick={() => setPeriod(p.id as any)}
                                                className={cn(
                                                    "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all",
                                                    period === p.id
                                                        ? "bg-white text-amber-600 shadow-sm"
                                                        : "text-gray-400 hover:text-gray-600"
                                                )}
                                            >
                                                {p.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="h-[300px] mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={period === 'today' ? hourlyData : dailyData}>
                                        <defs>
                                            <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis
                                            dataKey={period === 'today' ? "hour" : "date"}
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="scans"
                                            stroke="#f59e0b"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorScans)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Top Products Interactions */}
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Haftalık Yoğunluk</CardTitle>
                                <CardDescription>Haftanın en yoğun günleri sıralaması.</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px] mt-2">
                                {busyDaysData.some(d => d.count > 0) ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={busyDaysData} layout="vertical">
                                            <XAxis type="number" hide />
                                            <YAxis
                                                dataKey="name"
                                                type="category"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 11, fontWeight: 'bold', fill: '#4b5563' }}
                                                width={90}
                                            />
                                            <Tooltip
                                                cursor={{ fill: 'transparent' }}
                                                contentStyle={{ borderRadius: '12px', border: 'none' }}
                                            />
                                            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                                                {busyDaysData.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={index === 0 ? '#f59e0b' : index < 3 ? '#fbbf24' : '#f3f4f6'}
                                                    />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                        <Calendar className="h-10 w-10 mb-2" />
                                        <p className="text-xs">Henüz haftalık veri yok</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Heatmap & Ranking Section */}
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <Card className="shadow-sm border-amber-100 bg-gradient-to-br from-white to-amber-50/30 overflow-hidden">
                            <CardHeader>
                                <div className="h-6 w-24 bg-amber-500/10 text-amber-600 text-[9px] font-black rounded-full flex items-center justify-center tracking-widest px-4 uppercase mb-2">ISI HARİTASI</div>
                                <CardTitle className="text-xl">En Sıcak Kategoriler</CardTitle>
                                <CardDescription>Müşterilerin menüde en çok vakit geçirdiği alanlar.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {hotCategoryData.map((cat, idx) => {
                                        const maxCount = Math.max(...hotCategoryData.map(c => c.count));
                                        const percentage = (cat.count / maxCount) * 100;
                                        return (
                                            <div key={idx} className="space-y-1.5">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-sm font-bold text-gray-700">{cat.name}</span>
                                                    <span className="text-xs font-black text-amber-600">%{Math.round(percentage)} ilgi</span>
                                                </div>
                                                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200/50 p-[2px]">
                                                    <div
                                                        className={cn(
                                                            "h-full rounded-full transition-all duration-1000",
                                                            idx === 0 ? "bg-gradient-to-r from-orange-400 to-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]" :
                                                                idx === 1 ? "bg-amber-400" : "bg-amber-200"
                                                        )}
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {hotCategoryData.length === 0 && (
                                        <div className="py-10 text-center text-gray-400 text-sm italic">Yeterli veri toplanmadı...</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl">Ürün İlgi Sıralaması</CardTitle>
                                <CardDescription>En çok bakılan ürünlerin detaylı listesi.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="divide-y divide-gray-50">
                                    {topProductData.map((prod, idx) => (
                                        <div key={idx} className="py-3 flex items-center justify-between group hover:bg-gray-50/50 transition-colors rounded-lg px-2 -mx-2">
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black",
                                                    idx < 3 ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-400"
                                                )}>
                                                    #{idx + 1}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-gray-900 group-hover:text-amber-600 transition-colors">{prod.name}</div>
                                                    <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">{prod.category}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="text-sm font-black text-gray-900">{prod.count}</div>
                                                <div className="text-[10px] text-gray-500 mt-1 uppercase font-bold">Göz</div>
                                            </div>
                                        </div>
                                    ))}
                                    {topProductData.length === 0 && (
                                        <div className="py-10 text-center text-gray-400 text-sm italic">Henüz etkileşim yok...</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </>
            )}
        </div>
    );
}
