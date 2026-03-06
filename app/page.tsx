'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, QrCode, Smartphone, Zap, Palette, Layers, Globe } from 'lucide-react';

export default function SaaSMarketingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-amber-500/30 font-sans overflow-x-hidden">

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">QRSaaS</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="#features" className="hover:text-white transition-colors">Özellikler</Link>
            <Link href="#themes" className="hover:text-white transition-colors">Temalar</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Fiyatlandırma</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden md:block">
              Giriş Yap
            </Link>
            <Link href="/register" className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors">
              Hemen Başla
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6">
        {/* Background effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/20 rounded-full blur-[120px] opacity-50 -z-10" />

        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-400 text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Yeni Nesil QR Menü Platformu
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 leading-tight max-w-4xl mx-auto"
          >
            Mekanınızın Dijital Yüzünü Yeniden Tasarlayın
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Pahalı POS sistemlerine ve karmaşık altyapılara son. Sadece saniyeler içinde büyüleyici, çok temalı QR menünüzü oluşturun ve müşterilerinizi etkileyin.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/register" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)]">
              Ücretsiz Dene <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#themes" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              Temaları İncele
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 bg-black/50 border-y border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Neden Bizi Seçmelisiniz?</h2>
            <p className="text-gray-400">İşletmenizi bir üst seviyeye taşıyacak özellikler.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Palette />, title: "4 Farklı Premium Tema", desc: "Ürünlerinizi bir kez girin, tüm temalarla anında kusursuz çalışsın." },
              { icon: <Zap />, title: "Anında Güncelleme", desc: "Fiyat veya içerik değişiklikleriniz anında QR menünüze yansır." },
              { icon: <Smartphone />, title: "Kusursuz Mobil Deneyim", desc: "Uygulama indirmeye gerek kalmadan tüm tarayıcılarda muazzam hız." },
              { icon: <Layers />, title: "Pratik Yönetim", desc: "Toplu işlem ve hızlı kategori yönetimi ile menünüzü saniyeler içinde düzenleyin." },
              { icon: <QrCode />, title: "Sonsuz QR Okutma", desc: "Müşterileriniz menüyü sınırsız görüntüleyebilir. Limitsiz trafik." },
              { icon: <Globe />, title: "Otomatik Çeviri", desc: "Turist müşterileriniz için menünüzü dilediğiniz dillere otomatik çevirir." },
            ].map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- THEMES SHOWCASE --- */}
      <section id="themes" className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-20 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Tek Menü, 4 Mükemmel Tasarım</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Ürünlerinizi girdikten sonra dilediğiniz zaman tasarımınızı değiştirebilirsiniz. Temalar sadece bir tık uzağınızda.</p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Minimal", color: "from-zinc-900 to-zinc-800", img: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=500&auto=format&fit=crop" },
            { name: "Elegance", color: "from-rose-950 to-red-950", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=500&auto=format&fit=crop" },
            { name: "Modern", color: "from-blue-950 to-indigo-950", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=500&auto=format&fit=crop" },
            { name: "Vibrant", color: "from-amber-500/20 to-orange-500/20", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=500&auto=format&fit=crop" },
          ].map((theme, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-[9/16] rounded-3xl overflow-hidden group cursor-pointer border border-white/10"
            >
              <img src={theme.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={theme.name} />
              <div className={`absolute inset-0 bg-gradient-to-t ${theme.color} opacity-80`} />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-3 inline-block">Tema {i + 1}</span>
                <h3 className="text-2xl font-bold">{theme.name}</h3>
                <p className="text-sm text-white/80 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Demoyu İncele <ArrowRight className="inline w-4 h-4" /></p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- PRICING --- */}
      <section id="pricing" className="py-24 bg-black/50 px-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Basit ve Net Fiyatlandırma</h2>
            <p className="text-gray-400">Gizli ücret, kurulum bedeli veya komisyon yok.</p>
          </div>

          <div className="p-1 rounded-3xl bg-gradient-to-br from-amber-500/40 via-orange-500/40 to-transparent">
            <div className="bg-[#0A0A0A] rounded-[22px] p-8 md:p-12 text-center md:text-left md:flex items-center justify-between">
              <div className="space-y-6 mb-8 md:mb-0">
                <h3 className="text-3xl font-bold">QR Menü Paketi</h3>
                <div className="flex flex-col gap-3">
                  {[
                    "Tüm 4 Premium Tema",
                    "Sınırsız Kategori & Ürün",
                    "Kendi Logonuz ve Renkleriniz",
                    "Öncelikli Destek",
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-amber-500" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end justify-center min-w-[200px]">
                <div className="text-5xl font-bold text-white mb-2">₺499<span className="text-lg text-gray-500 font-medium">/ay</span></div>
                <p className="text-sm text-amber-500 font-medium mb-6">Yıllık alımda %20 indirim</p>
                <Link href="/register" className="w-full text-center px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
                  Satın Al
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 px-6 border-t border-white/5 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            <span className="font-bold text-white">QRSaaS</span>
          </div>
          <p>© 2026 QRSaaS Platform. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
