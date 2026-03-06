'use client';

import { useMenu } from '@/lib/store';
import {
    Building2,
    Lock,
    ArrowRight,
    PlusCircle,
    Store,
    Loader2,
    Trash2,
    ExternalLink,
    RefreshCw,
    Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import * as Services from '@/lib/services';
import { Restaurant } from '@/lib/data';
import { cn } from '@/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BranchesPage() {
    const { restaurant } = useMenu();
    const [branches, setBranches] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    // Create Branch Form State
    const [newName, setNewName] = useState('');
    const [newSlug, setNewSlug] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isSyncing, setIsSyncing] = useState<string | null>(null);
    const [isGlobalSyncing, setIsGlobalSyncing] = useState(false);

    useEffect(() => {
        if (restaurant?.id && (restaurant.plan_type === 'PLUS')) {
            loadBranches();
        } else {
            setLoading(false);
        }
    }, [restaurant]);

    const loadBranches = async () => {
        try {
            setLoading(true);
            const data = await Services.getBranchesByParentId(restaurant!.id);
            setBranches(data);
        } catch (error) {
            console.error("Error loading branches:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateBranch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName || !newSlug || !newPassword) {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }

        try {
            setIsCreating(true);
            await Services.createBranch(newName, newSlug, newPassword, restaurant!.id);
            setIsCreateOpen(false);
            setNewName('');
            setNewSlug('');
            setNewPassword('');
            await loadBranches();
            alert("Yeni şube başarıyla oluşturuldu.");
        } catch (error) {
            console.error("Error creating branch:", error);
            alert("Şube oluşturulurken bir hata oluştu. Slug (link) kullanımda olabilir.");
        } finally {
            setIsCreating(false);
        }
    };

    const handleDeleteBranch = async (id: string) => {
        if (!confirm("Bu şubeyi ve tüm menü verilerini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) return;

        try {
            await Services.deleteRestaurant(id);
            await loadBranches();
        } catch (error) {
            console.error("Error deleting branch:", error);
            alert("Hata: Şube silinemedi.");
        }
    };

    const handleSwitchToBranch = (branch: Restaurant) => {
        const session = {
            id: branch.id,
            restaurantId: branch.id,
            name: branch.name,
            slug: branch.slug,
            isAdmin: true
        };
        localStorage.setItem('qr_admin_session', JSON.stringify(session));
        window.location.href = '/admin';
    };

    const handleSyncBranch = async (branchId: string) => {
        if (!confirm("Başlangıç şubesindeki (Merkez) tüm ürünler ve kategoriler bu şubeye kopyalanacak. Şubenin mevcut menüsü silinecek. Emin misiniz?")) return;

        try {
            setIsSyncing(branchId);
            await Services.syncBranchData(restaurant!.id, branchId);
            alert("Şube menüsü başarıyla senkronize edildi.");
        } catch (error) {
            console.error("Sync error:", error);
            alert("Senkronizasyon sırasında bir hata oluştu.");
        } finally {
            setIsSyncing(null);
        }
    };

    const handleGlobalSync = async () => {
        if (!confirm("TÜM şubelerinizin menüsü merkez şube ile aynı olacak şekilde güncellenecektir. Bu işlem geri alınamaz. Onaylıyor musunuz?")) return;

        try {
            setIsGlobalSyncing(true);
            await Services.syncAllBranchesData(restaurant!.id);
            alert("Tüm şubeler başarıyla güncellendi.");
        } catch (error) {
            console.error("Global sync error:", error);
            alert("Toplu senkronizasyon sırasında bir hata oluştu.");
        } finally {
            setIsGlobalSyncing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            </div>
        );
    }

    if (!restaurant) return null;

    const isPlus = restaurant.plan_type === 'PLUS';

    if (!isPlus) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
                <div className="bg-amber-100 p-6 rounded-full mb-6">
                    <Lock className="h-16 w-16 text-amber-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Şube Yönetimi Modülü</h1>
                <p className="text-lg text-gray-500 max-w-lg text-center mb-8">
                    Tek bir merkezden tüm şubelerinizin menülerini yönetin, fiyatları otomatik sekronize edin ve bayilik alt yapınızı kurun. Bu özellik sadece <strong>PLUS Plan</strong> kullanıcıları içindir.
                </p>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold h-12 px-8 text-lg rounded-full flex items-center gap-2 shadow-lg shadow-orange-500/30">
                    Hemen PLUS'a Yükseltin
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
                        <Building2 className="h-8 w-8 text-amber-500" />
                        Şubelerim
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Tüm bayilerinizi ve şubelerinizi buradan yönetebilirsiniz.</p>
                </div>

                <div className="mt-4 md:mt-0 flex gap-3 flex-wrap">
                    <Button
                        variant="outline"
                        onClick={handleGlobalSync}
                        disabled={isGlobalSyncing || branches.length === 0}
                        className="flex items-center gap-2 h-11 border-amber-200 text-amber-700 hover:bg-amber-50"
                    >
                        <Zap className={cn("h-4 w-4", isGlobalSyncing && "animate-pulse")} />
                        Tüm Şubeleri Güncelle (Fiyat/Menü)
                    </Button>

                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2 h-11 px-6 shadow-md bg-black text-white hover:bg-gray-800">
                                <PlusCircle className="h-4 w-4" />
                                Yeni Şube Ekle
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Yeni Şube Oluştur</DialogTitle>
                                <DialogDescription>
                                    Yeni bir şube hesabı oluşturur. Şube kendi kullanıcı adı ve şifresiyle giriş yapabilir.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreateBranch} className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Şube Adı</Label>
                                    <Input id="name" placeholder="Örn: Kadıköy Şubesi" value={newName} onChange={e => setNewName(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Şube URL (Slug)</Label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-400 text-sm">/</span>
                                        <Input id="slug" placeholder="kadikoy-sube" value={newSlug} onChange={e => setNewSlug(e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="pass">Giriş Şifresi</Label>
                                    <Input id="pass" type="password" placeholder="******" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={isCreating} className="w-full mt-2">
                                        {isCreating ? "Oluşturuluyor..." : "Şubeyi Kaydet"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {!restaurant.parent_id && (
                    <Card className="border-amber-200 bg-gradient-to-br from-amber-50/50 to-white shadow-sm ring-1 ring-amber-200">
                        <CardHeader className="pb-3 border-b border-gray-100/50">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 text-white bg-black rounded-lg flex items-center justify-center shrink-0">
                                    <Store className="h-5 w-5" />
                                </div>
                                <div className="overflow-hidden">
                                    <CardTitle className="text-lg font-bold truncate">{restaurant.name}</CardTitle>
                                    <CardDescription className="text-xs text-amber-700 font-medium">Ana Yönetim / Merkez</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                Şu an bu şubeyi yönetiyorsunuz
                            </div>
                            <Button disabled variant="outline" className="w-full text-xs opacity-50">
                                Aktif Oturum
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {branches.map(branch => (
                    <Card key={branch.id} className="border-gray-200 bg-white shadow-sm hover:shadow-md transition-all group">
                        <CardHeader className="pb-3 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="h-10 w-10 text-gray-400 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                                        <Building2 className="h-5 w-5" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <CardTitle className="text-lg font-bold truncate group-hover:text-amber-600 transition-colors">{branch.name}</CardTitle>
                                        <CardDescription className="text-xs truncate">/{branch.slug}</CardDescription>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteBranch(branch.id)} className="text-gray-400 hover:text-red-500">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-2">
                            <div className="flex gap-2">
                                <Button onClick={() => handleSwitchToBranch(branch)} className="flex-1 text-xs h-9 font-bold bg-gray-100 text-gray-900 shadow-none hover:bg-black hover:text-white border-none">
                                    Şubeyi Yönet
                                </Button>
                                <a href={`/${branch.slug}`} target="_blank" className="flex items-center justify-center px-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                    <ExternalLink className="h-4 w-4 text-gray-400" />
                                </a>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => handleSyncBranch(branch.id)}
                                disabled={isSyncing === branch.id}
                                className="w-full text-[10px] h-8 flex items-center gap-2 border-dashed border-gray-200 text-gray-400 hover:text-amber-600 hover:border-amber-200 transition-all font-medium"
                            >
                                <RefreshCw className={cn("h-3 w-3", isSyncing === branch.id && "animate-spin")} />
                                Merkez Menüsü ile Eşitle
                            </Button>
                        </CardContent>
                    </Card>
                ))}

                {branches.length === 0 && (
                    <div className="col-span-full py-12 text-center bg-gray-50 border border-dashed rounded-3xl">
                        <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-gray-900">Henüz şube eklenmemiş</h3>
                        <p className="text-sm text-gray-500 mb-6">İşletmenizi büyütmek için ilk şubenizi sağ üstten ekleyin.</p>
                        <Button variant="outline" onClick={() => setIsCreateOpen(true)}>
                            Hemen Başla
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
