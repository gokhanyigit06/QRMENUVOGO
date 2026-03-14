'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, QrCode, Smartphone, Zap, Palette, Layers, Globe, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';

export default function SaaSMarketingPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start', 
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans overflow-x-hidden">

      {/* --- NAVIGATION --- */}
      <nav className="sticky top-0 z-50 bg-white px-4 md:px-8 pt-5 pb-3">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl px-4 md:px-8 h-18 flex items-center justify-between shadow-sm border border-black/5" style={{height: 72}}>
          <div className="flex items-center gap-2 cursor-pointer">
            <img src="/logo.png" alt="VOGOPOS Logo" className="w-8 h-8 object-contain" />
            <span className="font-extrabold text-[#1A1A1A] text-xl tracking-tight">VOGOPOS</span>
          </div>

          {/* Center nav */}
          <div className="hidden md:flex items-center gap-8 text-[15px] font-bold text-[#1A1A1A]">
            <Link href="#anasayfa" className="hover:text-black transition-colors">Ana Sayfa</Link>
            <Link href="#demolar" className="hover:text-black transition-colors">Demolar</Link>
            <Link href="#pricing" className="hover:text-black transition-colors">Fiyatlar</Link>
            <Link href="#faq" className="hover:text-black transition-colors">SSS</Link>
            <Link href="#iletisim" className="hover:text-black transition-colors">İletişim</Link>
          </div>

          {/* CTA */}
          <Link href="/register" className="px-7 py-3 rounded-full bg-[#1A1A1A] text-white text-base font-semibold hover:bg-black transition-colors">
            Hemen Başla
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-16 pb-0 px-6 overflow-visible" id="anasayfa">
        <div className="max-w-5xl mx-auto text-center">

          {/* Social proof badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-white rounded-full shadow-sm border border-black/8 mb-10"
          >
            <div className="flex -space-x-2">
              {[
                { bg: '#FBBF24', letter: 'A' },
                { bg: '#60A5FA', letter: 'M' },
                { bg: '#34D399', letter: 'K' },
              ].map((av, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: av.bg }}>
                  {av.letter}
                </div>
              ))}
            </div>
            <span className="text-base font-semibold text-[#1A1A1A]">500+</span>
            <span className="text-base text-gray-500">5 Stars Reviews</span>
          </motion.div>

          {/* Headline with floating badges */}
          <div className="relative">
            {/* Floating badge - left (Charles style) */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="absolute left-0 top-[52%] hidden lg:block"
            >
              <span className="px-4 py-2 bg-[#CAEF45] text-[#1A1A1A] rounded-full text-base font-medium shadow-sm">Burger King</span>
            </motion.div>

            {/* Small triangle left of second line */}
            <div className="absolute left-[18%] top-[56%] hidden lg:block">
              <svg width="14" height="14" viewBox="0 0 14 14"><polygon points="14,7 0,0 0,14" fill="#1A1A1A"/></svg>
            </div>

            {/* Small triangle right of second line */}
            <div className="absolute right-[18%] top-[56%] hidden lg:block">
              <svg width="14" height="14" viewBox="0 0 14 14"><polygon points="0,7 14,0 14,14" fill="#1A1A1A"/></svg>
            </div>

            {/* Floating badge - right (You style) */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="absolute right-0 top-[68%] hidden lg:block"
            >
              <span className="px-4 py-2 bg-[#7C3AED] text-white rounded-full text-base font-medium shadow-sm">Siz</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-[88px] font-bold leading-[1.1] text-[#1A1A1A] max-w-4xl mx-auto"
            >
              Restoranınız için
              <br />
              dijital QR menü
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-7 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            İş akışınızı kolaylaştırın, menünüzü yönetin ve müşterilerinizi etkileyin.<br />VOGOPOS ile hepsi tek bir platformda.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
          >
            <Link href="/register" className="w-full sm:w-auto text-center px-10 py-4 rounded-full bg-[#F5C842] text-[#1A1A1A] font-bold hover:bg-amber-400 transition-colors text-base shadow-sm">
              Ücretsiz Dene
            </Link>
            <Link href="#demolar" className="w-full sm:w-auto text-center px-10 py-4 rounded-full bg-white border border-black/15 text-[#1A1A1A] font-semibold hover:bg-gray-50 transition-colors text-base shadow-sm">
              Temaları İncele
            </Link>
          </motion.div>

          {/* App Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 mx-auto max-w-5xl"
          >
            <div className="rounded-t-3xl border border-black/8 border-b-0 shadow-[0_8px_60px_rgba(0,0,0,0.1)] overflow-hidden bg-white">

              {/* App inner navbar */}
              <div className="bg-white border-b border-black/6 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center">
                    <QrCode className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-extrabold text-[#1A1A1A]">VOGOPOS</span>
                </div>
                <div className="hidden lg:flex items-center gap-1 text-xs text-gray-500">
                  <span className="px-3 py-1.5 rounded-full bg-[#7C3AED] text-white font-semibold">Genel Bakış</span>
                  <span className="px-3 py-1.5 rounded-full hover:bg-gray-100 cursor-pointer">Mesajlar</span>
                  <span className="px-3 py-1.5 rounded-full hover:bg-gray-100 cursor-pointer flex items-center gap-1">Menü Yönetimi <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"/></span>
                  <span className="px-3 py-1.5 rounded-full hover:bg-gray-100 cursor-pointer">Temalar</span>
                  <span className="px-3 py-1.5 rounded-full hover:bg-gray-100 cursor-pointer">Programım</span>
                  <span className="px-3 py-1.5 rounded-full hover:bg-gray-100 cursor-pointer">Analitik</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-xs">🔔</span>
                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full text-[8px] text-white flex items-center justify-center">2</span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-white text-xs font-bold">A</div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-5 bg-[#FAFAFA]" style={{minHeight: 460}}>
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start justify-between mb-5 gap-4">
                  <div>
                    <p className="text-xl font-bold text-[#1A1A1A] leading-tight">VOGOPOS'a hoş geldiniz,</p>
                    <p className="text-xl font-bold text-[#1A1A1A]">Ahmet Yılmaz</p>
                    <p className="text-xs text-gray-400 mt-1">Cumartesi, 14 Mart 2026</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { icon: '+', label: 'Ürün Ekle', dark: true },
                      { icon: '👤', label: 'Üye Davet Et', dark: false },
                      { icon: '⚙️', label: 'Tema Seç', dark: false },
                    ].map((btn, i) => (
                      <button key={i} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold ${btn.dark ? 'bg-[#1A1A1A] text-white' : 'bg-white border border-black/10 text-[#1A1A1A]'}`}>
                        <span>{btn.icon}</span> {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* LEFT column */}
                  <div className="flex flex-col gap-4">
                    {/* Performance card */}
                    <div className="bg-white rounded-2xl p-4 border border-black/6 shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-bold text-[#1A1A1A]">Performans</p>
                        <span className="text-xs text-gray-400 underline cursor-pointer">Tümü</span>
                      </div>
                      <p className="text-xs text-gray-400 mb-3">Aylık Analiz Raporu</p>
                      {/* Semi-circle chart */}
                      <div className="flex justify-center">
                        <div className="relative" style={{width:100,height:56}}>
                          <svg width="100" height="56" viewBox="0 0 100 56">
                            <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#E5E7EB" strokeWidth="10" strokeLinecap="round"/>
                            <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#7C3AED" strokeWidth="10" strokeLinecap="round" strokeDasharray="126" strokeDashoffset="32"/>
                            <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#F5C842" strokeWidth="10" strokeLinecap="round" strokeDasharray="126" strokeDashoffset="107" opacity="0.8"/>
                          </svg>
                          <div className="absolute inset-x-0 bottom-0 text-center">
                            <p className="text-base font-bold text-[#1A1A1A]">85%</p>
                            <p className="text-[10px] text-gray-400">Tamamlandı</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center gap-4 mt-3">
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#7C3AED]"/><span className="text-[10px] text-gray-500">Bitti</span></div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#F5C842]"/><span className="text-[10px] text-gray-500">Devam</span></div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-200"/><span className="text-[10px] text-gray-500">Bekliyor</span></div>
                      </div>
                    </div>

                    {/* Today's task card */}
                    <div className="bg-white rounded-2xl p-4 border border-black/6 shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-bold text-[#1A1A1A]">Bugünün Görevi</p>
                        <span className="text-xs text-gray-400 underline cursor-pointer">Tümü</span>
                      </div>
                      <p className="text-xs text-gray-400 mb-3">Yaklaşan görevler</p>
                      <div className="bg-[#FAFAFA] rounded-xl p-3 border border-black/5">
                        <p className="text-xs font-bold text-[#1A1A1A]">Yeni Sezon Menüsü Hazırla</p>
                        <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">Tüm yeni ürünleri ekle, fiyatları güncelle ve görselleri yükle...</p>
                        <div className="flex -space-x-1.5 mt-2">
                          {['#FBBF24','#60A5FA','#34D399','#F87171'].map((c,i)=>(
                            <div key={i} className="w-5 h-5 rounded-full border-2 border-white" style={{backgroundColor:c}}/>
                          ))}
                        </div>
                        <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#60A5FA] rounded-full" style={{width:'64%'}}/>
                        </div>
                        <div className="flex items-center justify-between mt-1.5">
                          <p className="text-[10px] text-gray-400">Son Tarih: 5 Nisan 2026</p>
                          <span className="text-[10px] font-bold text-[#1A1A1A]">64%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MIDDLE column */}
                  <div className="flex flex-col gap-4">
                    {/* Task card */}
                    <div className="bg-white rounded-2xl p-4 border border-black/6 shadow-sm">
                      <p className="text-sm font-bold text-[#1A1A1A] mb-0.5">Landing Page Güncelle</p>
                      <p className="text-xs text-gray-400 mb-3">3 Görev Tamamlanacak</p>
                      <div className="bg-[#FAFAFA] rounded-xl p-3 border border-black/5">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs font-bold text-[#1A1A1A]">Web tasarımı yenile</p>
                            <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">Son ürün güncellemelerini ve fiyat değişikliklerini yansıt</p>
                          </div>
                          <span className="text-lg font-black text-[#1A1A1A] ml-3">56%</span>
                        </div>
                        <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#60A5FA] rounded-full" style={{width:'56%'}}/>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex gap-1">
                            <span className="text-[10px] px-2 py-1 bg-[#F5C842]/20 text-amber-700 rounded-full font-medium">Menü</span>
                            <span className="text-[10px] px-2 py-1 bg-[#CAEF45]/30 text-green-700 rounded-full font-medium">PRO</span>
                          </div>
                          <div className="flex -space-x-1.5">
                            {['#7C3AED','#F87171','#60A5FA'].map((c,i)=>(
                              <div key={i} className="w-5 h-5 rounded-full border-2 border-white" style={{backgroundColor:c}}/>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Activity chart */}
                    <div className="bg-white rounded-2xl p-4 border border-black/6 shadow-sm flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm font-bold text-[#1A1A1A]">Aktivite</p>
                          <p className="text-xs text-gray-400">Aylık Analiz Raporu</p>
                        </div>
                        <div className="flex gap-1">
                          <button className="text-[10px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 font-medium">Ay</button>
                          <button className="text-[10px] px-2.5 py-1 rounded-full bg-[#1A1A1A] text-white font-medium">Yıl</button>
                        </div>
                      </div>
                      <div className="flex items-end gap-1 h-20 mt-1">
                        {[35,55,42,70,88,72,50,65,78,60,80,95].map((h,i) => (
                          <div key={i} className="flex-1 rounded-lg" style={{
                            height:`${h}%`,
                            backgroundColor: i===4 ? '#CAEF45' : '#D9F99D',
                          }}/>
                        ))}
                      </div>
                      <div className="flex justify-between mt-1.5">
                        {['O','Ş','M','N','M','H','T','A','E','E','K','A'].map((m,i)=>(
                          <span key={i} className="text-[9px] text-gray-400 flex-1 text-center">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT column */}
                  <div className="flex flex-col gap-4">
                    {/* Team card */}
                    <div className="bg-white rounded-2xl p-4 border border-black/6 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex gap-2">
                          {[
                            {c:'#FBBF24',l:'A'},{c:'#60A5FA',l:'M'},{c:'#34D399',l:'K'},{c:'#F87171',l:'S'}
                          ].map((av,i)=>(
                            <div key={i} className="flex flex-col items-center gap-1">
                              <div className="w-9 h-9 rounded-full border-2 border-[#F5F0E8] flex items-center justify-center text-white text-sm font-bold" style={{backgroundColor:av.c}}>{av.l}</div>
                              <span className="text-[9px] text-gray-400">{['Ayşe','Mehmet','Kaan','Selin'][i]}</span>
                            </div>
                          ))}
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-9 h-9 rounded-full bg-gray-100 border-2 border-[#F5F0E8] flex items-center justify-center text-xs font-bold text-gray-500">4+</div>
                            <span className="text-[9px] text-gray-400">Diğer</span>
                          </div>
                        </div>
                        <span className="text-gray-300 text-lg">⋮⋮</span>
                      </div>
                      {/* Chat bubbles */}
                      <div className="space-y-2 mt-1">
                        <div className="flex justify-start">
                          <div className="bg-[#F5C842]/20 rounded-xl rounded-tl-none px-3 py-2 max-w-[80%]">
                            <p className="text-[11px] text-[#1A1A1A]">Menü güncellendi mi?</p>
                            <p className="text-[9px] text-gray-400 mt-0.5">10:25</p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-[#F5F0E8] rounded-xl rounded-tl-none px-3 py-2 max-w-[85%]">
                            <p className="text-[11px] text-[#1A1A1A]">Bugün yeni bir ürün ekleyeceğim. Bitince haber veririm ✅</p>
                            <p className="text-[9px] text-gray-400 mt-0.5">10:32</p>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-[#CAEF45] rounded-xl rounded-tr-none px-3 py-2 max-w-[75%]">
                            <p className="text-[11px] text-[#1A1A1A]">Harika, teşekkürler! 👍</p>
                            <p className="text-[9px] text-gray-500 mt-0.5 text-right">10:32</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- TRUSTED BY --- */}
      <section className="py-12">
        <p className="text-center text-sm text-gray-500 mb-10 tracking-wide">
          Trusted by the world's most innovative teams
        </p>
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <div style={{ display: 'flex', width: 'max-content', animation: 'ticker 28s linear infinite', alignItems: 'center' }}>
            {[
              { icon: '▐▌', name: 'Pulse',    color: '#EC4899', style: 'normal'  },
              { icon: '✦',  name: 'techtide', color: '#7C3AED', style: 'italic'  },
              { icon: '❋',  name: 'innovio',  color: '#374151', style: 'normal'  },
              { icon: '⚡', name: 'ZenZap',   color: '#F59E0B', style: 'normal'  },
              { icon: '◉',  name: 'sparkle',  color: '#111827', style: 'normal'  },
              { icon: '◼',  name: 'LumLabs',  color: '#111827', style: 'normal'  },
              { icon: '⬡',  name: 'ForkHub',  color: '#3B82F6', style: 'normal'  },
              { icon: '▐▌', name: 'Pulse',    color: '#EC4899', style: 'normal'  },
              { icon: '✦',  name: 'techtide', color: '#7C3AED', style: 'italic'  },
              { icon: '❋',  name: 'innovio',  color: '#374151', style: 'normal'  },
              { icon: '⚡', name: 'ZenZap',   color: '#F59E0B', style: 'normal'  },
              { icon: '◉',  name: 'sparkle',  color: '#111827', style: 'normal'  },
              { icon: '◼',  name: 'LumLabs',  color: '#111827', style: 'normal'  },
              { icon: '⬡',  name: 'ForkHub',  color: '#3B82F6', style: 'normal'  },
            ].map((brand, i) => (
              <div key={i} className="flex items-center shrink-0">
                <div className="flex items-center gap-2 px-10 whitespace-nowrap">
                  <span className="text-xl font-bold leading-none" style={{ color: brand.color }}>{brand.icon}</span>
                  <span
                    className="text-[22px] font-semibold text-gray-700 tracking-tight"
                    style={{ fontStyle: brand.style === 'italic' ? 'italic' : 'normal' }}
                  >
                    {brand.name}
                  </span>
                </div>
                <div className="w-px h-6 bg-gray-200 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHAT MAKES US DIFFERENT --- */}
      <section id="features" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="inline-block mb-4 relative">
              <span className="bg-[#FFD95A] text-[#1A1A1A] text-sm font-bold px-4 py-1.5 rounded-full inline-block shadow-sm rotate-[-3deg] transform origin-center">
                Neden biz?
              </span>
            </div>
            <h2 className="text-4xl md:text-[56px] font-bold text-[#1A1A1A] tracking-tight mb-6 mt-2 leading-tight">
              Bizi farklı kılan nedir
            </h2>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
              Menü yönetimini basitleştirin, operasyonu hızlandırın ve müşteri memnuniyetini ikiye katlayın. Hepsi VOGOPOS çözümünde.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="bg-[#FAF8F5] rounded-[32px] p-8 md:p-10 flex flex-col relative group border border-black/[0.03]">
              <div className="w-16 h-16 rounded-[20px] bg-[#FFD95A] flex items-center justify-center mb-8 shrink-0 shadow-sm">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-900"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <h3 className="text-[22px] font-bold text-[#1A1A1A] mb-3">Aktivite takibi & Analiz</h3>
              <p className="text-gray-500 mb-12 flex-1 text-sm md:text-base leading-relaxed">
                VOGOPOS, tüm cihazlarda kusursuz çalışacak şekilde tasarlanmıştır. Müşteri etkileşimlerini anlık takip edin.
              </p>
              
              {/* Widget 1 Mockup */}
              <div className="relative h-64 w-full mt-auto">
                <div className="absolute top-0 w-full bg-white px-5 py-5 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-black/[0.02]">
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <h4 className="font-extrabold text-[#1A1A1A] tracking-tight">Menü etkileşimi</h4>
                      <p className="text-[11px] text-gray-400 mt-1 max-w-[120px] leading-snug">Son güncellemelerin ziyaretçi dönüşümü.</p>
                    </div>
                    <span className="text-3xl font-normal text-[#1A1A1A] tracking-tighter">56%</span>
                  </div>
                  
                  <div className="h-2.5 w-full bg-gray-100 rounded-full mb-6 flex overflow-hidden">
                    <div className="h-full bg-[#5EEAD4] w-[56%] rounded-full"></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-[#FFD95A] text-[11px] font-bold rounded-full text-amber-900">Yemek</span>
                      <span className="px-3 py-1 bg-[#A7F3D0] text-[11px] font-bold rounded-full text-teal-800">İçecek</span>
                    </div>
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs shadow-sm shadow-black/5 z-30">🧑🏻‍🦱</div>
                      <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs shadow-sm shadow-black/5 z-20">👱🏻‍♀️</div>
                      <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs shadow-sm shadow-black/5 z-10">🧔🏽‍♂️</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-[165px] -left-6 w-[115%] bg-white p-4 rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] rotate-[-4deg] flex justify-between items-center border border-black/[0.02] group-hover:rotate-0 transition-transform duration-500">
                  <span className="text-xs font-medium text-gray-400 pl-2">Prş, 23 Eylül, 2026</span>
                  <div className="flex gap-2 items-center">
                    <div className="flex gap-1">
                      <ChevronDown className="w-4 h-4 text-gray-300 rotate-90" />
                      <ChevronDown className="w-4 h-4 text-gray-300 -rotate-90" />
                    </div>
                    <div className="w-8 h-8 rounded-[10px] bg-[#A855F7] flex items-center justify-center shadow-md shadow-purple-500/30">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#FAF8F5] rounded-[32px] p-8 md:p-10 flex flex-col relative group border border-black/[0.03]">
              <div className="w-16 h-16 rounded-[20px] bg-[#7DCEFF] flex items-center justify-center mb-8 shrink-0 shadow-sm">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-sky-900"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
              </div>
              <h3 className="text-[22px] font-bold text-[#1A1A1A] mb-3">Menü önceliklendirme</h3>
              <p className="text-gray-500 mb-12 flex-1 text-sm md:text-base leading-relaxed">
                Kategorilerinizi ve ürünlerinizi öncelik seviyelerine göre düzenleyerek müşterilerinizin en çok satanlara odaklanmasını sağlayın.
              </p>
              
              {/* Widget 2 Mockup */}
              <div className="relative h-64 w-full mt-auto">
                <div className="absolute top-0 w-full bg-white p-5 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-black/[0.02]">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-extrabold text-[#1A1A1A] mb-3 text-[13px]">Kategori Ekibi</h4>
                      <div className="flex items-center">
                        <div className="flex -space-x-2 mr-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-sm z-40">👨🏻‍🍳</div>
                          <div className="w-8 h-8 rounded-full bg-red-100 border-2 border-white flex items-center justify-center text-sm z-30">👩🏼‍💼</div>
                          <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-white flex items-center justify-center text-sm z-20">🧑🏽‍🍳</div>
                          <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center text-sm z-10">👨🏼‍💼</div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#818CF8] text-white flex items-center justify-center text-[16px] font-bold shadow-md shadow-indigo-500/20 cursor-pointer hover:scale-105 transition-transform">+</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-4xl font-normal text-[#1A1A1A] tracking-tighter">84%</span>
                      <div className="h-2.5 w-16 bg-gray-100 rounded-full mt-2 ml-auto overflow-hidden">
                        <div className="h-full bg-[#38BDF8] w-[84%] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pb-2">
                    <div className="bg-[#FAF8F5] p-3 rounded-xl border border-black/[0.03]">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 rounded-[6px] bg-green-200/50 flex items-center justify-center text-[10px] text-green-700">⚑</div>
                        <span className="text-[11px] font-semibold text-gray-500">Bugünkü Ürün</span>
                      </div>
                      <div className="text-xl font-bold text-[#1A1A1A]">15 <span className="text-[11px] font-normal text-gray-500">Adet</span></div>
                    </div>
                    <div className="bg-[#FAF8F5] p-3 rounded-xl border border-black/[0.03]">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 rounded-[6px] bg-amber-200/50 flex items-center justify-center text-[10px] text-amber-700">⏳</div>
                        <span className="text-[11px] font-semibold text-gray-500">Hazırlananlar</span>
                      </div>
                      <div className="text-xl font-bold text-[#1A1A1A]">23 <span className="text-[11px] font-normal text-gray-500">Adet</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FAF8F5] rounded-[32px] p-8 md:p-10 flex flex-col relative group border border-black/[0.03]">
              <div className="w-16 h-16 rounded-[20px] bg-[#A78BFA] flex items-center justify-center mb-8 shrink-0 shadow-sm">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h3 className="text-[22px] font-bold text-[#1A1A1A] mb-3">Anında senkronizasyon</h3>
              <p className="text-gray-500 mb-12 flex-1 text-sm md:text-base leading-relaxed">
                Güncellemeleri anında tüm cihazlara yansıtın. Tekrardan menü yazdırmak veya tarayıcıyı yenilemek zorunda değilsiniz.
              </p>
              
              {/* Widget 3 Mockup */}
              <div className="relative h-64 w-full mt-auto flex flex-col gap-3.5">
                <div className="bg-white p-3 pr-4 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between z-10 border border-black/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-lg">🧔🏻‍♂️</div>
                    <span className="text-[13px] font-extrabold text-[#1A1A1A]">Darrell Steward</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#FFFBEB] flex items-center justify-center cursor-pointer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center cursor-pointer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAF8F5] p-3 pr-4 rounded-[20px] shadow-[0_12px_30px_rgba(0,0,0,0.06)] flex items-center justify-between rotate-[3deg] scale-[1.03] z-20 mx-[-8px] border border-black/[0.04] group-hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-lg">👨🏾‍🦱</div>
                    <span className="text-[13px] font-extrabold text-[#1A1A1A]">Darrell Steward</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 pr-4 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between z-10 w-[92%] mx-auto mt-1 border border-black/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-lg">👦🏻</div>
                    <span className="text-[13px] font-extrabold text-[#1A1A1A]">Darrell Steward</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#FFFBEB] flex items-center justify-center cursor-pointer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center cursor-pointer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- POWERFUL FEATURES BENTO GRID --- */}
      <section className="py-24 px-6 bg-white overflow-hidden border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="inline-block mb-4 relative">
              <span className="bg-[#CAEF45] text-[#1A1A1A] text-sm font-bold px-4 py-1.5 rounded-full inline-block shadow-sm rotate-[-3deg] transform origin-center">
                Özellikler
              </span>
            </div>
            <h2 className="text-4xl md:text-[56px] font-bold text-[#1A1A1A] tracking-tight mb-6 mt-2 leading-tight max-w-3xl">
              İş akışınızı hızlandıracak güçlü özellikler
            </h2>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
              Siparişleri yönetin, menüyü güncelleyin ve takımınızla uyum içinde çalışın. VOGOPOS ihtiyaç duyduğunuz her şeye sahip.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Card 1: Purple (Team Collaboration) */}
            <div className="bg-[#9381FF] rounded-[32px] p-8 md:p-12 flex flex-col relative overflow-hidden group min-h-[500px]">
              <div className="z-10 flex flex-col items-start text-white mb-10 text-left">
                <span className="bg-white text-gray-700 text-[11px] font-bold px-4 py-1.5 rounded-full mb-6">
                  Uygulama içi iletişim
                </span>
                <h3 className="text-3xl md:text-[34px] font-bold text-white mb-4 leading-tight">
                  Kusursuz takım uyumu
                </h3>
                <p className="text-white/80 text-base max-w-sm leading-relaxed">
                  Garsonlar ve mutfak ekibi arasında VOGOPOS üzerinden anlık iletişim kurarak operasyonel hataları sıfıra indirin.
                </p>
              </div>

              {/* Chat Interface Mockup */}
              <div className="relative mt-auto mx-auto w-full max-w-[360px] bg-white rounded-[24px] p-5 shadow-[0_20px_40px_rgba(147,129,255,0.3)] z-10 group-hover:-translate-y-2 transition-transform duration-500">
                {/* Avatars */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                  <div className="flex -space-x-3">
                    {['#FBBF24', '#60A5FA', '#34D399', '#F87171'].map((c, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-11 h-11 rounded-full border-[3px] border-white flex items-center justify-center text-white text-[15px] font-bold shadow-sm" style={{ backgroundColor: c }}>
                          {['A', 'M', 'K', 'S'][i]}
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1.5 font-medium">{['Ahmet', 'Merve', 'Kaan', 'Selin'][i]}</span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center">
                      <div className="w-11 h-11 rounded-full bg-gray-50 border-[3px] border-white flex items-center justify-center text-gray-400 font-bold text-sm shadow-sm relative -left-1">
                        4+
                      </div>
                      <span className="text-[10px] text-gray-500 mt-1.5 font-medium">Diğer</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 flex flex-col gap-1 items-center justify-center cursor-pointer">
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-3">
                  <div className="flex justify-end pr-8 relative">
                    <div className="bg-[#FFF5D1] text-amber-900 rounded-[14px] rounded-tl-sm px-4 py-2.5 text-[13px] font-medium max-w-[95%]">
                      Hey! Nasıl gidiyor? Bugün çok yoğunuz.
                    </div>
                    <span className="text-[9px] text-gray-400 absolute right-0 bottom-1">10:25</span>
                  </div>
                  <div className="flex justify-end pr-8 relative">
                    <div className="bg-[#FFF5D1] text-amber-900 rounded-[14px] px-4 py-2.5 text-[13px] font-medium max-w-[95%]">
                      Masalara yeni menü eklendi. Bittikten sonra kontrol edin lütfen ✅
                    </div>
                    <span className="text-[9px] text-gray-400 absolute right-0 bottom-1">10:32</span>
                  </div>
                  <div className="flex justify-start pl-8 relative mt-1">
                    <span className="text-[9px] text-gray-400 absolute left-0 bottom-1">10:32</span>
                    <div className="bg-[#CAEF45] text-green-900 rounded-[14px] rounded-tr-sm px-4 py-2.5 text-[13px] font-bold">
                      Tabii ki Merve 👍
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Yellow (Performance Overview) */}
            <div className="bg-[#FCD34D] rounded-[32px] p-8 md:p-12 flex flex-col relative overflow-hidden group min-h-[500px]">
              <div className="z-10 flex flex-col items-start text-amber-950 mb-10 text-left">
                <span className="bg-white text-amber-900 text-[11px] font-bold px-4 py-1.5 rounded-full mb-6">
                  İstatistik ve sipariş analizi
                </span>
                <h3 className="text-3xl md:text-[34px] font-bold text-[#1A1A1A] mb-4 leading-tight">
                  Performans özetleri
                </h3>
                <p className="text-amber-900/80 text-base max-w-sm leading-relaxed">
                  Detaylı analizler ve tamamlama oranları ile ekibinizin performansını tek ekrandan kuş bakışı izleyin.
                </p>
              </div>

              {/* Chart Interface Mockup */}
              <div className="relative mt-auto mx-auto w-full max-w-[360px] bg-white rounded-[24px] p-6 shadow-[0_20px_40px_rgba(252,211,77,0.3)] z-10 flex flex-col items-center group-hover:scale-[1.03] transition-transform duration-500">
                {/* Arc Chart */}
                <div className="relative w-48 h-28 my-4 flex items-end justify-center">
                  <svg viewBox="0 0 200 100" className="w-full h-full absolute inset-0">
                    <path d="M 10 90 A 80 80 0 0 1 190 90" fill="none" stroke="#F1F5F9" strokeWidth="20" strokeLinecap="round" />
                    <path d="M 10 90 A 80 80 0 0 1 190 90" fill="none" stroke="#FCD34D" strokeWidth="20" strokeLinecap="round" strokeDasharray="251" strokeDashoffset="50" opacity="0.3" />
                    <path d="M 10 90 A 80 80 0 0 1 190 90" fill="none" stroke="#9381FF" strokeWidth="20" strokeLinecap="round" strokeDasharray="251" strokeDashoffset="40" />
                  </svg>
                  <div className="text-center absolute bottom-0 mb-[-10px]">
                    <div className="text-[38px] font-black text-[#1A1A1A] leading-none mb-1">85%</div>
                    <div className="text-[12px] text-gray-500 font-medium tracking-tight">Sipariş Tamamlandı</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 w-full gap-4 mt-12 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-[#1A1A1A] mb-1">12</span>
                    <span className="text-[10px] text-gray-500 font-semibold">Hazır</span>
                    <div className="w-6 h-1 bg-[#9381FF] rounded-full mt-2" />
                  </div>
                  <div className="flex flex-col items-center border-l border-r border-gray-200">
                    <span className="text-2xl font-bold text-[#1A1A1A] mb-1">28</span>
                    <span className="text-[10px] text-gray-500 font-semibold">Hazırlanıyor</span>
                    <div className="w-6 h-1 bg-[#FCD34D] rounded-full mt-2" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-[#1A1A1A] mb-1">13</span>
                    <span className="text-[10px] text-gray-500 font-semibold">Bekliyor</span>
                    <div className="w-6 h-1 bg-gray-300 rounded-full mt-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Full Width Green (Calendar & Sync) */}
          <div className="bg-[#BFF073] rounded-[32px] p-8 md:p-14 flex flex-col md:flex-row relative overflow-hidden group">
            {/* Context Left */}
            <div className="z-20 flex flex-col items-start w-full md:w-1/2 text-left pr-0 md:pr-10">
              <span className="bg-white text-green-900 text-[11px] font-bold px-4 py-1.5 rounded-full mb-6 mt-2">
                Program ve kampanya planlama
              </span>
              <h3 className="text-4xl md:text-[42px] font-bold text-[#1A1A1A] mb-6 leading-[1.1] tracking-tight">
                Takviminize siparişlerinizi<br />senkronize edin
              </h3>
              <p className="text-green-950/70 text-lg mb-10 max-w-md leading-relaxed font-medium">
                Önceden planlanmış menü indirimleri, özel gün etkinlikleri ve masa rezervasyonlarınızı entegre takvimden kolayca takip edin.
              </p>
              
              <button className="px-8 py-4 bg-[#1A1A1A] text-white rounded-full font-bold text-[15px] hover:bg-black transition-transform hover:scale-105 shadow-xl shadow-black/20 flex items-center gap-2">
                Hemen Demo Talep Et
              </button>
            </div>

            {/* Calendar Mockup Right */}
            <div className="relative w-full md:w-1/2 min-h-[400px] mt-12 md:mt-0 flex justify-end">
              
              {/* Decorative elements */}
              <div className="absolute top-[30%] left-[-20px] md:-left-8 z-30 transform -rotate-12 hidden sm:block delay-100 group-hover:-translate-y-2 transition-transform duration-500">
                <span className="font-writing text-green-900 font-bold text-xl inline-block -rotate-6">Anlık bildirim!</span>
                <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="#14532D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute top-6 left-[80%]"><path d="M2 10 Q 15 2 35 15 L 30 15 M 35 15 L 35 10"/></svg>
              </div>

              {/* Popup Alert over calendar */}
              <div className="absolute top-[45%] md:top-[50%] -left-4 sm:left-[5%] md:-left-[20%] lg:-left-[10%] bg-white rounded-[20px] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.12)] z-30 border border-gray-100 w-64 group-hover:-translate-y-4 transition-transform duration-700 delay-150">
                <div className="absolute -top-3 -right-3 bg-[#9381FF] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md z-40 transform rotate-6">Yeni Sipariş</div>
                <h4 className="font-extrabold text-[#1A1A1A] text-sm mb-1 line-clamp-1">Gökhan'dan Masa 5 Ek</h4>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">👤</div>
                  <span className="text-[11px] text-gray-500">Ahmet V.</span>
                </div>
                
                <div className="flex items-center gap-2 mb-3 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">
                  <div className="w-5 h-5 bg-[#9381FF] rounded-[6px] flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                  <span className="text-[9px] text-gray-500">Prş, 23 Eylül 2026</span>
                </div>

                <div className="flex justify-between items-end">
                  <div className="bg-[#FFF8E6] px-3 py-1.5 rounded-[8px]">
                    <p className="text-[9px] text-amber-900/60 font-semibold mb-0.5">Teslimat</p>
                    <p className="text-[13px] text-amber-900 font-bold">15 Dk</p>
                  </div>
                  <div className="flex -space-x-1.5">
                    <div className="w-6 h-6 rounded-full bg-orange-200 border border-white text-[10px] flex items-center justify-center z-30">🧑🏽‍🍳</div>
                    <div className="w-6 h-6 rounded-full bg-blue-200 border border-white text-[10px] flex items-center justify-center z-20">👱🏻‍♀️</div>
                  </div>
                </div>
              </div>

              {/* Main Calendar Body */}
              <div className="w-[100%] max-w-[380px] bg-white rounded-[32px] p-6 pr-8 shadow-[0_20px_50px_rgba(134,204,36,0.3)] relative z-20 md:-mr-[5%] lg:mr-0 xl:-mr-10 h-full">
                {/* Calendar Header */}
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#EEF2FF] rounded-full flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9381FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </div>
                    <div>
                      <h4 className="text-[#1A1A1A] text-lg font-bold leading-tight">Kasım</h4>
                      <span className="text-gray-400 text-sm">2026</span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-[#1A1A1A]">Takvim</span>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-y-6 gap-x-2 text-center text-sm">
                  {/* Days */}
                  {['P', 'P', 'S', 'Ç', 'P', 'C', 'C'].map((d, i) => (
                    <div key={i} className="text-gray-400 font-semibold text-[13px]">{d}</div>
                  ))}
                  
                  {/* Rows */}
                  {/* Row 1 */}
                  {Array.from({length: 4}).map((_, i) => <div key={`r1d${i}`} className="w-8 h-8 rounded-full bg-gray-50 mx-auto"></div>)}
                  <div className="w-8 h-8 rounded-full bg-[#FCD34D] text-amber-900 font-bold mx-auto flex items-center justify-center cursor-pointer hover:scale-110 shadow-sm">1</div>
                  <div className="w-8 h-8 text-[#1A1A1A] font-bold mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">2</div>
                  <div className="w-8 h-8 text-[#1A1A1A] font-bold mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">3</div>
                  
                  {/* Row 2 */}
                  <div className="w-8 h-8 rounded-full bg-[#CAEF45] text-green-900 font-bold mx-auto flex items-center justify-center cursor-pointer hover:scale-110 shadow-sm relative">4<span className="absolute bottom-1 w-1 h-1 bg-green-700 rounded-full"></span></div>
                  <div className="w-8 h-8 rounded-full bg-[#BFF073] text-green-950 font-bold mx-auto flex items-center justify-center cursor-pointer shadow-md transform scale-110">5</div>
                  <div className="w-8 h-8 text-[#1A1A1A] font-bold mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">6</div>
                  <div className="w-8 h-8 rounded-full bg-[#F87171] text-white font-bold mx-auto flex items-center justify-center cursor-pointer hover:scale-110 shadow-sm">7</div>
                  <div className="w-8 h-8 text-[#1A1A1A] font-bold mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full relative">8<span className="absolute bottom-1 w-1 h-1 bg-gray-400 rounded-full"></span></div>
                  <div className="w-8 h-8 rounded-full bg-[#FCD34D] text-amber-900 font-bold mx-auto flex items-center justify-center cursor-pointer hover:scale-110 shadow-sm relative">9<span className="absolute bottom-1 w-1 h-1 bg-amber-700 rounded-full"></span></div>
                  <div className="w-8 h-8 rounded-full bg-[#CAEF45] text-green-900 font-bold mx-auto flex items-center justify-center cursor-pointer hover:scale-110 shadow-sm">10</div>

                  {/* Row 3 */}
                  <div className="w-8 h-8 text-[#1A1A1A] font-bold mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full relative">12<span className="absolute bottom-1 w-1 h-1 bg-gray-400 rounded-full"></span></div>
                  <div className="w-8 h-8 text-[#1A1A1A] font-bold mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">13</div>
                  <div className="w-8 h-8 text-[#1A1A1A] font-bold mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">14</div>
                  <div className="w-8 h-8 text-[#1A1A1A] font-bold mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">15</div>
                  <div className="w-8 h-8 rounded-full bg-[#CAEF45] text-green-900 font-bold mx-auto flex items-center justify-center cursor-pointer hover:scale-110 shadow-sm">16</div>
                  <div className="w-8 h-8 text-[#1A1A1A] font-bold mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">17</div>
                  <div className="w-8 h-8 text-[#1A1A1A] font-bold mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">18</div>

                  {/* Row 4 */}
                  <div className="w-8 h-8 text-[#1A1A1A] font-bold mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">19</div>
                  <div className="w-8 h-8 rounded-full bg-[#FCD34D] text-amber-900 font-bold mx-auto flex items-center justify-center cursor-pointer hover:scale-110 shadow-sm">20</div>
                  <div className="w-8 h-8 rounded-full bg-[#FCD34D] text-amber-900 font-bold mx-auto flex items-center justify-center cursor-pointer hover:scale-110 shadow-sm relative">21<span className="absolute bottom-1 w-1 h-1 bg-amber-700 rounded-full"></span></div>
                  <div className="w-8 h-8 text-[#1A1A1A] font-bold mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">22</div>
                  <div className="w-8 h-8 text-[#1A1A1A] font-bold mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">23</div>
                  <div className="w-8 h-8 text-[#1A1A1A] font-bold mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">24</div>
                  <div className="w-8 h-8 text-[#1A1A1A] font-bold mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">25</div>

                  {/* Row 5 */}
                  <div className="w-8 h-8 text-[#1A1A1A] font-bold mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">26</div>
                  <div className="w-8 h-8 text-[#1A1A1A] font-bold mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">27</div>
                  <div className="w-8 h-8 text-[#1A1A1A] font-bold mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">28</div>
                  <div className="w-8 h-8 rounded-full bg-[#CAEF45] text-green-900 font-bold mx-auto flex items-center justify-center cursor-pointer hover:scale-110 shadow-sm relative">29<span className="absolute bottom-1 w-1 h-1 bg-green-700 rounded-full"></span></div>
                  <div className="w-8 h-8 text-[#1A1A1A] font-bold mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">30</div>
                  {Array.from({length: 2}).map((_, i) => <div key={`r5d${i}`} className="w-8 h-8 rounded-full bg-gray-50 mx-auto"></div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --- INTEGRATIONS --- */}
      <section className="py-24 px-6 bg-white overflow-hidden border-t border-black/5">
        <div className="max-w-5xl mx-auto text-center">
          {/* Header */}
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="inline-block mb-4 relative">
              <span className="bg-[#7DCEFF] text-[#1A1A1A] text-sm font-bold px-4 py-1.5 rounded-full inline-block shadow-sm rotate-[-3deg] transform origin-center">
                Entegrasyonlar
              </span>
            </div>
            <h2 className="text-4xl md:text-[52px] font-bold text-[#1A1A1A] tracking-tight mb-6 mt-2 leading-[1.1]">
              Favori araçlarınızla<br />entegre çalışır
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Sipariş planlamasını basitleştirin, operasyonu hızlandırın ve verimliliğinizi artırın. Tüm süreçlerinizi VOGOPOS çözümünde birleştirin.
            </p>
          </div>

          {/* Integration Icons Grid */}
          <div className="flex flex-col items-center justify-center gap-4 md:gap-6 mb-16">
            {/* Row 1 */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {[
                { bg: '#A78BFA', icon: <div className="grid grid-cols-2 gap-1 transform rotate-45"><div className="w-3.5 h-3.5 bg-white rounded-sm"/><div className="w-3.5 h-3.5 bg-white rounded-sm"/><div className="w-3.5 h-3.5 bg-white rounded-sm"/><div className="w-3.5 h-3.5 bg-white rounded-sm"/></div> },
                { bg: '#7DCEFF', icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinejoin="round"><polygon points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"/></svg> },
                { bg: '#E879F9', icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="6"><circle cx="12" cy="12" r="7"/></svg> },
                { bg: '#FCD34D', icon: <span className="text-white text-3xl font-black font-sans leading-none">N</span> },
                { bg: '#34D399', icon: <div className="flex gap-1.5"><div className="w-2.5 h-8 bg-white rounded-sm"/><div className="w-4 h-8 border-[3px] border-white rounded-r-full rounded-l-sm"/></div> },
                { bg: '#CAEF45', icon: <span className="text-white text-3xl font-black font-sans leading-none">S</span> },
                { bg: '#FCD34D', icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><path d="M12 2 a10 10 0 1 0 10 10 V12 h-5 a5 5 0 1 1 -5 -5 z"/></svg> },
              ].map((item, i) => (
                <div key={`r1-${i}`} className="w-20 h-20 md:w-[90px] md:h-[90px] min-w-[80px] rounded-[24px] flex items-center justify-center shadow-sm hover:-translate-y-1 transition-transform duration-300 cursor-pointer" style={{ backgroundColor: item.bg }}>
                  {item.icon}
                </div>
              ))}
            </div>
            
            {/* Row 2 */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {[
                { bg: '#34D399', icon: <div className="relative w-8 h-8"><div className="absolute top-0 left-0 w-6 h-6 border-[3px] border-white rounded-sm"/><div className="absolute bottom-0 right-0 w-5 h-5 bg-white rounded-sm"/></div> },
                { bg: '#A78BFA', icon: <span className="text-white text-[32px] font-black font-sans leading-none">C</span> },
                { bg: '#FCD34D', icon: <span className="text-white text-3xl font-black font-sans leading-none">N</span> },
                { bg: '#7DCEFF', icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinejoin="round"><polygon points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"/></svg> },
                { bg: '#C4B5FD', icon: <div className="relative"><span className="text-white text-4xl font-black font-sans leading-none block transform -rotate-45">C</span><div className="w-2.5 h-2.5 rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ml-1"/></div> },
                { bg: '#E879F9', icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="6"><circle cx="12" cy="12" r="7"/></svg> },
              ].map((item, i) => (
                <div key={`r2-${i}`} className="w-20 h-20 md:w-[90px] md:h-[90px] min-w-[80px] rounded-[24px] flex items-center justify-center shadow-sm hover:-translate-y-1 transition-transform duration-300 cursor-pointer" style={{ backgroundColor: item.bg }}>
                  {item.icon}
                </div>
              ))}
            </div>
          </div>

          <button className="px-8 py-3.5 rounded-full border border-gray-200 text-[#1A1A1A] text-[15px] font-bold hover:bg-gray-50 transition-colors shadow-sm">
            Tüm Entegrasyonları İncele
          </button>
        </div>
      </section>
      {/* --- DEMO THEMES SHOWCASE (Design based on Pricing Layout) --- */}
      <section className="py-24 px-6 bg-white border-t border-black/5" id="demolar">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 flex flex-col items-center">
            <div className="inline-block mb-4 relative">
              <span className="bg-[#BFF073] text-green-900 text-sm font-bold px-4 py-1.5 rounded-full inline-block shadow-sm rotate-[-3deg]">
                Temalar
              </span>
            </div>
            <h2 className="text-4xl md:text-[56px] font-bold text-[#1A1A1A] tracking-tight mb-4 mt-2 leading-tight max-w-2xl mx-auto">
              Mükemmel temanızı bulun
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              İşletme konseptinize en uygun olanı seçin. Sonradan dilediğiniz gibi özelleştirebilirsiniz.
            </p>
          </div>

          {/* Toggle Button */}
          <div className="flex justify-center mb-16">
            <div className="bg-[#FAF8F5] p-1.5 rounded-full flex border border-black/[0.04]">
              <button className="px-6 py-2.5 bg-[#FCD34D] text-amber-900 text-[15px] font-bold rounded-full shadow-sm transition-all focus:outline-none">
                Açık Konsept
              </button>
              <button className="px-6 py-2.5 text-gray-500 text-[15px] font-semibold hover:text-black rounded-full transition-colors focus:outline-none">
                Koyu Konsept
              </button>
            </div>
          </div>

          {/* Draggable/Scrollable Cards Carousel with Embla */}
          <div className="relative w-full max-w-[1400px] mx-auto group pb-6">
            <div className="overflow-hidden px-4 md:px-8 py-10" ref={emblaRef}>
              <div className="flex gap-6 touch-pan-y" style={{ WebkitUserSelect: 'none', userSelect: 'none' }}>
                
                {/* Minimal Theme Card */}
            {/* Minimal Theme Card */}
            <div className="flex-[0_0_85vw] sm:flex-[0_0_340px] md:flex-[0_0_380px] bg-[#7DCEFF] rounded-[32px] p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300 cursor-grab active:cursor-grabbing border-0">
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Minimal Tema</h3>
              
              {/* Phone Mockup Area */}
              <div className="w-full aspect-[9/14] bg-white rounded-2xl mb-6 shadow-sm overflow-hidden p-1.5 relative group cursor-pointer border-0">
                <img src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=500&auto=format&fit=crop" className="w-full h-full object-cover rounded-xl" alt="Minimal Tema"/>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                  <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#7DCEFF]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </span>
                </div>
              </div>
              
              <Link href="/demo-minimal" className="w-full mt-auto py-4 text-center rounded-full bg-[#1A1A1A] text-white font-bold hover:bg-black transition-colors shadow-lg shadow-black/10">
                Demoyu İncele
              </Link>
            </div>

            {/* Elegance Theme Card (Highlighted) */}
            <div className="flex-[0_0_85vw] sm:flex-[0_0_340px] md:flex-[0_0_380px] bg-[#9381FF] rounded-[32px] p-8 flex flex-col shadow-[0_20px_40px_rgba(147,129,255,0.25)] hover:-translate-y-2 transition-transform duration-300 cursor-grab active:cursor-grabbing border-0">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white">Elegance Tema</h3>
                <span className="bg-[#FCD34D] text-amber-900 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">Popüler</span>
              </div>
              
              {/* Phone Mockup Area */}
              <div className="w-full aspect-[9/14] bg-white/20 rounded-2xl mb-6 shadow-sm overflow-hidden p-1.5 relative group cursor-pointer border-0">
                <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=500&auto=format&fit=crop" className="w-full h-full object-cover rounded-xl" alt="Elegance Tema"/>
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-xs font-bold">Chef's Special Area</p>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                  <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#9381FF]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </span>
                </div>
              </div>
              
              <Link href="/demo-elegance" className="w-full mt-auto py-4 text-center rounded-full bg-white text-[#9381FF] font-black hover:bg-gray-50 transition-colors shadow-lg shadow-white/20">
                Demoyu İncele
              </Link>
            </div>

            {/* Modern Theme Card */}
            {/* Modern Theme Card */}
            <div className="flex-[0_0_85vw] sm:flex-[0_0_340px] md:flex-[0_0_380px] bg-[#CAEF45] rounded-[32px] p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300 cursor-grab active:cursor-grabbing border-0">
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Modern Tema</h3>
              
              {/* Phone Mockup Area */}
              <div className="w-full aspect-[9/14] bg-white rounded-2xl mb-6 shadow-sm overflow-hidden p-1.5 relative group cursor-pointer border-0">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=500&auto=format&fit=crop" className="w-full h-full object-cover rounded-xl" alt="Modern Tema"/>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                  <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#78a315]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </span>
                </div>
              </div>
              
              <Link href="/demo-modern" className="w-full mt-auto py-4 text-center rounded-full bg-[#1A1A1A] text-[#CAEF45] font-bold hover:bg-black transition-colors shadow-lg shadow-black/10">
                Demoyu İncele
              </Link>
            </div>

            {/* Vibrant Theme Card */}
            {/* Vibrant Theme Card */}
            <div className="flex-[0_0_85vw] sm:flex-[0_0_340px] md:flex-[0_0_380px] bg-[#FCD34D] rounded-[32px] p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300 cursor-grab active:cursor-grabbing border-0">
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Vibrant Tema</h3>
              
              {/* Phone Mockup Area */}
              <div className="w-full aspect-[9/14] bg-white rounded-2xl mb-6 shadow-sm overflow-hidden p-1.5 relative group cursor-pointer border-0">
                <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=500&auto=format&fit=crop" className="w-full h-full object-cover rounded-xl" alt="Vibrant Tema"/>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                  <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#d97706]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </span>
                </div>
              </div>
              
              <Link href="/demo-vibrant" className="w-full mt-auto py-4 text-center rounded-full bg-white text-[#d97706] font-bold hover:bg-gray-50 transition-colors shadow-lg shadow-black/5">
                Demoyu İncele
              </Link>
            </div>

            {/* Neon Theme Card */}
            {/* Neon Theme Card */}
            <div className="flex-[0_0_85vw] sm:flex-[0_0_340px] md:flex-[0_0_380px] bg-[#E879F9] rounded-[32px] p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300 cursor-grab active:cursor-grabbing border-0">
              <h3 className="text-2xl font-bold text-white mb-4">Neon Tema</h3>
              
              {/* Phone Mockup Area */}
              <div className="w-full aspect-[9/14] bg-white/20 rounded-2xl mb-6 shadow-sm overflow-hidden p-1.5 relative group cursor-pointer border-0">
                <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=500&auto=format&fit=crop" className="w-full h-full object-cover rounded-xl" alt="Neon Tema"/>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                  <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#c026d3]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </span>
                </div>
              </div>
              
              <Link href="/demo-neon" className="w-full mt-auto py-4 text-center rounded-full bg-white text-[#c026d3] font-bold hover:bg-gray-50 transition-colors shadow-[0_10px_20px_rgba(232,121,249,0.3)]">
                Demoyu İncele
              </Link>
            </div>

            {/* Rustic Theme Card */}
            {/* Rustic Theme Card */}
            <div className="flex-[0_0_85vw] sm:flex-[0_0_340px] md:flex-[0_0_380px] bg-[#FDBA74] rounded-[32px] p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300 cursor-grab active:cursor-grabbing border-0">
              <h3 className="text-2xl font-bold text-[#431407] mb-4">Rustic Tema</h3>
              
              {/* Phone Mockup Area */}
              <div className="w-full aspect-[9/14] bg-white rounded-2xl mb-6 shadow-sm overflow-hidden p-1.5 relative group cursor-pointer border-0">
                <img src="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=500&auto=format&fit=crop" className="w-full h-full object-cover rounded-xl" alt="Rustic Tema"/>
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-xs font-bold">Wooden Elements</p>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                  <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#c2410c]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </span>
                </div>
              </div>
              
              <Link href="/demo-rustic" className="w-full mt-auto py-4 text-center rounded-full bg-white text-[#c2410c] font-bold hover:bg-orange-50 transition-colors shadow-lg shadow-black/5">
                Demoyu İncele
              </Link>
            </div>

              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={scrollPrev}
              className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-xl border border-black/5 items-center justify-center text-black hover:scale-110 hover:bg-gray-50 transition-all z-30"
              aria-label="Previous Theme"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={scrollNext}
              className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-xl border border-black/5 items-center justify-center text-black hover:scale-110 hover:bg-gray-50 transition-all z-30"
              aria-label="Next Theme"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

          </div>

          {/* Social Proof Marquee below sizing area */}
          <div className="mt-20 pt-10 border-t border-black/5">
            <p className="text-center text-[#1A1A1A] font-medium mb-10 text-[15px]">
              Tüm favori platformlarınızda <span className="text-[#9381FF] font-bold">yüksek puan</span> almıştır
            </p>
            <div style={{ overflow: 'hidden', width: '100%' }} className="relative">
              {/* Fade out edges */}
              <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
              
              <div style={{ display: 'flex', width: 'max-content', animation: 'ticker 25s linear infinite', alignItems: 'center' }}>
                {[
                  { icon: '▐▌', name: 'Pulse',    color: '#EC4899', style: 'normal'  },
                  { icon: '✦',  name: 'techtide', color: '#7C3AED', style: 'italic'  },
                  { icon: '❋',  name: 'innovio',  color: '#374151', style: 'normal'  },
                  { icon: '⚡', name: 'ZenZap',   color: '#FCD34D', style: 'normal'  },
                  { icon: '◉',  name: 'sparkle',  color: '#1A1A1A', style: 'normal'  },
                  { icon: '◼',  name: 'LumLabs',  color: '#1A1A1A', style: 'normal'  },
                  { icon: '▐▌', name: 'Pulse',    color: '#EC4899', style: 'normal'  },
                  { icon: '✦',  name: 'techtide', color: '#7C3AED', style: 'italic'  },
                  { icon: '❋',  name: 'innovio',  color: '#374151', style: 'normal'  },
                  { icon: '⚡', name: 'ZenZap',   color: '#FCD34D', style: 'normal'  },
                  { icon: '◉',  name: 'sparkle',  color: '#1A1A1A', style: 'normal'  },
                  { icon: '◼',  name: 'LumLabs',  color: '#1A1A1A', style: 'normal'  },
                ].map((brand, i) => (
                  <div key={i} className="flex items-center shrink-0">
                    <div className="flex items-center gap-2 px-10 whitespace-nowrap">
                      <span className="text-xl font-bold leading-none" style={{ color: brand.color }}>{brand.icon}</span>
                      <span className="text-xl font-bold text-[#1A1A1A] tracking-tight" style={{ fontStyle: brand.style === 'italic' ? 'italic' : 'normal' }}>
                        {brand.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="py-24 px-6 bg-white border-t border-black/5" id="pricing">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="bg-[#CAEF45] text-[#435212] text-sm font-bold px-4 py-1.5 rounded-full inline-block mb-6 shadow-sm">
              Paketler
            </span>
            <h2 className="text-5xl md:text-[56px] font-bold text-[#1A1A1A] tracking-tight mb-6">
              Size uygun paketi seçin
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              İşletmenizi dijitalleştirin, siparişleri hızlandırın ve müşteri memnuniyetini en üst seviyeye taşıyın. VOGOPOS ile restoran yönetimi artık çok daha kolay.
            </p>

            {/* Toggle */}
            <div className="mt-10 bg-[#FAF8F5] p-1.5 rounded-full inline-flex border border-black/[0.04]">
              <button className="px-8 py-3 bg-[#FCD34D] text-[#78350F] text-[15px] font-bold rounded-full shadow-sm transition-all focus:outline-none">
                Aylık
              </button>
              <button className="px-8 py-3 text-gray-500 text-[15px] font-semibold hover:text-black rounded-full transition-colors focus:outline-none">
                Yıllık
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-[1100px] mx-auto">
            
            {/* Starter Plan */}
            <div className="bg-[#FAF8F5] rounded-[32px] p-2 flex flex-col border border-black/[0.04]">
              {/* Inner Card */}
              <div className="bg-white rounded-[24px] p-8 mb-6 shadow-sm border border-black/[0.02]">
                <h3 className="text-[#1A1A1A] font-semibold text-[17px] mb-4">Başlangıç Paketi</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] tracking-tight">$ 19.99</span>
                  <span className="text-gray-500 font-medium text-[13px]">/ aylık</span>
                </div>
                <p className="text-gray-500 text-[13px] leading-relaxed pr-4">
                  Dijital yolculuğunuza başlayın ve yeni özellikleri keşfedin.
                </p>
              </div>

              {/* Features list */}
              <div className="flex flex-col gap-4 px-6 flex-1 mb-6">
                {[
                  "5 Kullanıcıya Kadar",
                  "Sınırsız Kategori & Ürün",
                  "Temel QR Menü Görünümü",
                  "WhatsApp Sipariş Alma",
                  "Standart E-posta Desteği"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-700 text-[14px] font-medium">
                    <div className="w-[20px] h-[20px] rounded-full bg-[#FCD34D] flex items-center justify-center shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button className="mx-4 mb-4 py-4 rounded-full bg-[#1A1A1A] text-white font-bold hover:bg-black transition-colors">
                Paketi Seç
              </button>
            </div>

            {/* Growth Plan */}
            <div className="bg-[#9381FF] rounded-[32px] p-2 flex flex-col relative transform md:-translate-y-4 shadow-[0_20px_40px_rgba(147,129,255,0.25)] border border-[#9381FF]">
              {/* Inner Card */}
              <div className="bg-white rounded-[24px] p-8 mb-6 shadow-sm relative border border-white/20">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[#1A1A1A] font-semibold text-[17px]">Büyüme Paketi</h3>
                  <span className="bg-[#FCD34D] text-[#78350F] text-[11px] font-extrabold px-3 py-1 rounded-full">Popüler</span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] tracking-tight">$ 59.99</span>
                  <span className="text-gray-500 font-medium text-[13px]">/ aylık</span>
                </div>
                <p className="text-gray-500 text-[13px] leading-relaxed pr-4">
                  İşletmenizi büyütmek için gereken tüm gelişmiş özellikler.
                </p>
              </div>

              {/* Features list */}
              <div className="flex flex-col gap-4 px-6 flex-1 mb-6">
                {[
                  "25 Kullanıcıya Kadar",
                  "Başlangıç Paketindeki Her Şey",
                  "Gelişmiş POS Entegrasyonu",
                  "Öncelikli 7/24 Canlı Destek",
                  "Detaylı Satış Analizleri"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 text-white text-[14px] font-medium">
                    <div className="w-[20px] h-[20px] rounded-full bg-white flex items-center justify-center shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9381FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button className="mx-4 mb-4 py-4 rounded-full bg-white text-[#1A1A1A] font-bold hover:bg-gray-50 transition-colors shadow-lg">
                Paketi Seç
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-[#FAF8F5] rounded-[32px] p-2 flex flex-col border border-black/[0.04]">
              {/* Inner Card */}
              <div className="bg-white rounded-[24px] p-8 mb-6 shadow-sm border border-black/[0.02]">
                <h3 className="text-[#1A1A1A] font-semibold text-[17px] mb-4">Kurumsal Paket</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] tracking-tight">$ 129.99</span>
                  <span className="text-gray-500 font-medium text-[13px]">/ aylık</span>
                </div>
                <p className="text-gray-500 text-[13px] leading-relaxed pr-4">
                  Zincir restoranlar ve büyük işletmeler için gelişmiş çözümler.
                </p>
              </div>

              {/* Features list */}
              <div className="flex flex-col gap-4 px-6 flex-1 mb-6">
                {[
                  "Sınırsız Kullanıcı",
                  "Özel Görev Otomasyonu",
                  "Özel Müşteri Temsilcisi",
                  "Çoklu Şube Yönetimi",
                  "Yerinde Teknik Destek"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-700 text-[14px] font-medium">
                    <div className="w-[20px] h-[20px] rounded-full bg-[#FCD34D] flex items-center justify-center shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button className="mx-4 mb-4 py-4 rounded-full bg-[#1A1A1A] text-white font-bold hover:bg-black transition-colors">
                Paketi Seç
              </button>
            </div>

          </div>

          {/* Detailed Features Comparison Table */}
          <div className="mt-32 max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] tracking-tight mb-4">
                Paketleri karşılaştırın
              </h2>
              <p className="text-gray-500 text-[17px] max-w-2xl mx-auto">
                Tüm restoran yönetim süreçlerinizi optimize edin, ekibinizi güçlendirin ve işletmeniz için en uygun VOGOPOS paketini bulun.
              </p>
            </div>

            <div className="relative overflow-x-auto pb-8">
              <div className="min-w-[800px]">
                {/* Header Row */}
                <div className="grid grid-cols-4 gap-4 mb-4 items-end px-6">
                  <div className="col-span-1 text-[17px] font-semibold text-[#1A1A1A]">Plan Özellikleri</div>
                  <div className="col-span-1 text-center text-[17px] font-semibold text-[#1A1A1A]">Başlangıç</div>
                  <div className="col-span-1 text-center text-[17px] font-semibold text-[#1A1A1A]">Büyüme</div>
                  <div className="col-span-1 text-center text-[17px] font-semibold text-[#1A1A1A]">Kurumsal</div>
                </div>

                {/* Background highlight for center column */}
                <div className="absolute top-[60px] bottom-0 left-[50%] w-[25%] -translate-x-1/2 bg-[#FAF8F5] rounded-[32px] -z-10 pointer-events-none"></div>

                {/* Features Rows */}
                <div className="flex flex-col gap-0 px-6">
                  {[
                    { category: "Temel Menü ve Ürün Özellikleri" },
                    { label: "Sınırsız Kategori Ekleme", starter: true, growth: true, ent: true },
                    { label: "Sınırsız Ürün Ekleme", starter: true, growth: true, ent: true },
                    { label: "Ürün Görseli Yükleme", starter: true, growth: true, ent: true },
                    { label: "Ürün Açıklaması ve İçerik Detayı Ekleme", starter: true, growth: true, ent: true },
                    { label: "İndirimli Fiyat / Çizgili Fiyat Gösterimi", starter: true, growth: true, ent: true },
                    { label: "Kategori İkonları ve Renklendirme", starter: true, growth: true, ent: true },
                    { label: "Kategorilere Göre Sıralama (Order)", starter: true, growth: true, ent: true },
                    { label: "Alerjen Uyarı Modülü Ekleme", starter: true, growth: true, ent: true },
                    
                    { category: "Tasarım ve Kişiselleştirme (Tema Özellikleri)" },
                    { label: "Standart Kutu (Grid) Görünümü", starter: true, growth: true, ent: true },
                    { label: "Standart Liste (List) Görünümü", starter: true, growth: true, ent: true },
                    { label: "Görselsiz Liste (Minimal) Görünümü", starter: true, growth: true, ent: true },
                    { label: "Elite Şablon (Pürüzsüz / Masonry) Görünümü", starter: null, growth: true, ent: true },
                    { label: "Dinamik Renk Motoru (Sınırsız Renk Seçimi)", starter: null, growth: true, ent: true },
                    { label: "Markaya Özel Font Atama (Tipografi)", starter: null, growth: true, ent: true },
                    { label: "Dark Mode (Karanlık Mod) Desteği", starter: null, growth: true, ent: true },
                    { label: "Komponent Köşe Yuvarlatma (Border-Radius)", starter: null, growth: true, ent: true },
                    { label: "Karakter Boşluğu ve Tipografi Ayarları", starter: null, growth: true, ent: true },
                    { label: "Dinamik Harf Dönüşümleri", starter: null, growth: true, ent: true },

                    { category: "Müşteri Deneyimi (Frontend Özellikleri)" },
                    { label: "Detaylı Ürün İnceleme Odası (Modal)", starter: true, growth: true, ent: true },
                    { label: "Footer Sosyal Medya İkonları ve Bağlantıları", starter: true, growth: true, ent: true },
                    { label: "Akıllı Kaydırma (Accordion / Tabs)", starter: true, growth: true, ent: true },
                    { label: "Özel Karşılama Ekranı (Hero Banner) Yükleme", starter: null, growth: true, ent: true },
                    { label: "Yönlendirmeli Pop-up (Açılır Bildirim) Modülü", starter: null, growth: true, ent: true },
                    { label: "Yabancı Dil için Anlık Google Translate", starter: null, growth: null, ent: true },
                    { label: "Telefon Diline Göre Otomatik Dil Algılama", starter: null, growth: null, ent: true },
                    { label: "Google Maps (Harita) ve Lokasyon", starter: null, growth: null, ent: true },
                    { label: "Müşteriye Özel Mesai Dışı Ekranı", starter: null, growth: null, ent: true },

                    { category: "Yönetim ve İstatistik (Backend Özellikleri)" },
                    { label: "Kendi Özel Alan Adınızı (Domain) Bağlama", starter: null, growth: true, ent: true },
                    { label: "QR Kod Oluşturucu ve Tasarım Aracı", starter: null, growth: true, ent: true },
                    { label: "Toplu Fiyat ve Kategori Güncelleme (Bulk Edit)", starter: null, growth: true, ent: true },
                    { label: "Basıma Hazır PDF Menü Çıktısı Alma (Export)", starter: null, growth: null, ent: true },
                    { label: "Toplam Ziyaretçi Analizi (Hits/Page Views)", starter: null, growth: null, ent: true },
                    { label: "Ürün Bazlı Görüntülenme (Tıklanma) İstatistikleri", starter: null, growth: null, ent: true },
                    { label: "Çoklu Şube Açma ve Veri Kopyalama", starter: null, growth: null, ent: true }
                  ].map((row, idx) => (
                    row.category ? (
                      <div key={idx} className="grid grid-cols-4 gap-4 py-4 items-center mt-4 border-b border-black/10">
                        <div className="col-span-4 text-[#1A1A1A] text-[18px] font-extrabold text-left bg-gradient-to-r from-gray-50 to-transparent p-2 rounded-r-xl border-l-4 border-[#FCD34D]">
                          {row.category}
                        </div>
                      </div>
                    ) : (
                    <div key={idx} className="grid grid-cols-4 gap-4 py-5 items-center border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <div className="col-span-1 text-[#1A1A1A] text-[15px] font-medium flex items-center gap-2">
                        {row.label}
                      </div>
                      
                      {/* Starter Column */}
                      <div className="col-span-1 flex justify-center text-[15px] font-medium text-gray-600">
                        {row.starter === true ? (
                          <div className="w-[20px] h-[20px] rounded-full bg-[#FCD34D] flex items-center justify-center shadow-sm">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                        ) : row.starter === null ? (
                          <span className="text-gray-300 text-2xl font-light">–</span>
                        ) : (
                          row.starter
                        )}
                      </div>

                      {/* Growth Column */}
                      <div className="col-span-1 flex justify-center text-[15px] font-medium text-gray-600">
                        {row.growth === true ? (
                          <div className="w-[20px] h-[20px] rounded-full bg-[#FCD34D] flex items-center justify-center shadow-sm">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                        ) : row.growth === null ? (
                          <span className="text-gray-300 text-2xl font-light">–</span>
                        ) : (
                          row.growth
                        )}
                      </div>

                      {/* Enterprise Column */}
                      <div className="col-span-1 flex justify-center text-[15px] font-medium text-gray-600">
                        {row.ent === true ? (
                          <div className="w-[20px] h-[20px] rounded-full bg-[#FCD34D] flex items-center justify-center shadow-sm">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                        ) : row.ent === null ? (
                          <span className="text-gray-300 text-2xl font-light">–</span>
                        ) : (
                          row.ent
                        )}
                      </div>
                    </div>
                    )
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS / TRUSTED BY SECTION --- */}
      <section className="py-24 px-6 bg-white border-t border-black/5" id="testimonials">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-[44px] font-bold text-[#1A1A1A] tracking-tight mb-4">
              İşletmeler tarafından güveniliyor
            </h2>
            <p className="text-gray-500 text-[17px] max-w-2xl mx-auto leading-relaxed">
              Masa yönetimini basitleştirin, siparişleri hızlandırın ve üretkenliğinizi artırın. Bütün bunlar VOGOPOS akıllı restoran sistemi ile çok kolay.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            
            {/* Left Dark Card - Stats */}
            <div className="w-full md:w-[40%] bg-[#1A1A1A] rounded-[32px] p-10 md:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <h3 className="text-5xl font-bold text-white mb-3">90%</h3>
                <p className="text-white font-semibold text-[15px] mb-2 tracking-wide">
                  Sipariş verimliliği
                </p>
                <p className="text-gray-400 text-[13px] leading-relaxed pr-4">
                  VOGOPOS kullanmaya başladıktan sonra ekibimizin verimliliği inanılmaz derecede arttı. Gerçekten harika bir sistem!
                </p>
              </div>
              
              <div className="h-px w-full bg-white/10 mb-8"></div>
              
              <div>
                <h3 className="text-5xl font-bold text-white mb-3">5/5</h3>
                <p className="text-white font-semibold text-[15px] mb-2 tracking-wide">
                  Müşteri memnuniyeti skoru
                </p>
                <p className="text-gray-400 text-[13px] leading-relaxed pr-4">
                  Ekibimiz basitleştirilmiş QR menü ve anlık iletişim özelliklerine adeta bayılıyor.
                </p>
              </div>
            </div>

            {/* Right Light Card - Testimonial */}
            <div className="w-full md:w-[60%] bg-[#FAF8F5] rounded-[32px] p-10 md:p-12 flex flex-col relative overflow-hidden">
              {/* Abstract decorative shapes inside */}
              <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-white/60 blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-[-20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-white/40 blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Logo Top */}
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-8 h-8 rounded-full bg-[#374151] flex items-center justify-center text-white shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  </div>
                  <span className="text-[17px] font-bold text-[#374151] tracking-tight">Codelink</span>
                </div>
                
                <h3 className="text-2xl md:text-[26px] font-medium text-[#1A1A1A] leading-snug mb-6 pr-4">
                  "VOGOPOS, ekibimizin işbirliği yapma ve süreçleri yönetme şeklini tamamen değiştirdi. Kullanımı çok kolay ve inanılmaz esnek."
                </h3>
                
                <p className="text-gray-500 text-[15px] leading-relaxed mb-12 flex-1 pr-6">
                  Büyüyen bir işletme olarak bizimle birlikte ölçeklenebilecek bir araca ihtiyacımız vardı. VOGOPOS'un gelişmiş özellikleri ve sorunsuz entegrasyonları sayesinde geçiş sürecimiz son derece pürüzsüz oldu. Artık tüm masaları çok daha kolay kontrol edebiliyoruz.
                </p>
                
                {/* User Info Bottom */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-[#E879F9] flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" className="w-full h-full object-cover" alt="Avatar" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1A1A] text-[14px]">Ashley P.</h4>
                    <p className="text-gray-500 text-[13px]">İşletme Yöneticisi</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 md:py-32 px-6 bg-white border-t border-black/5" id="faq">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
          
          {/* Left - Title & Description */}
          <div className="w-full md:w-[40%] flex flex-col">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] tracking-tight mb-6 leading-tight">
              Sıkça sorulan<br/>sorular
            </h2>
            <p className="text-gray-500 text-[16px] leading-relaxed">
              Cevabını bulamadığınız sorularınız için destek ekibimizle e-posta üzerinden iletişime geçebilirsiniz. Size en kısa sürede yardımcı olacağız.
            </p>
          </div>

          {/* Right - Questions List */}
          <div className="w-full md:w-[60%] flex flex-col">
            <div className="border-b border-black/5"></div>
            {[
              "VOGOPOS nedir?",
              "VOGOPOS'u diğer araçlarla entegre edebilir miyim?",
              "VOGOPOS mobil cihazlarla uyumlu mu?",
              "VOGOPOS ne tür destek seçenekleri sunuyor?",
              "VOGOPOS'u ücretsiz deneyebilir miyim?"
            ].map((question, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="flex items-center justify-between py-6 border-b border-black/5 group-hover:border-black/20 transition-colors">
                  <h3 className="text-[17px] font-semibold text-[#1A1A1A] pr-4">{question}</h3>
                  <div className="w-6 h-6 flex items-center justify-center text-gray-400 group-hover:text-black transition-colors shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- CTA SECTION (OVERLAPPING FIX) --- */}
      <div className="relative w-full">
        {/* Background Split */}
        <div className="absolute inset-0 z-0 pointer-events-none flex flex-col">
          <div className="h-1/2 w-full bg-white"></div>
          <div className="h-1/2 w-full bg-[#111111]"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6">
          <div className="bg-[#FCD34D] rounded-[32px] md:rounded-[48px] p-8 md:p-14 lg:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
            {/* Abstract Decorative Lines */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] border-[40px] border-white/20 rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute bottom-[-10%] right-[30%] w-[300px] h-[300px] border-[30px] border-white/20 rounded-full translate-y-1/4 pointer-events-none mix-blend-overlay"></div>

            {/* Content Left */}
            <div className="w-full md:w-[55%] relative z-10 mb-12 md:mb-0">
              <span className="bg-white text-[#1A1A1A] text-[13px] font-bold px-5 py-2 rounded-full inline-block mb-6 shadow-sm">
                Hemen Başlayın
              </span>
              <h2 className="text-4xl md:text-[48px] lg:text-[56px] font-extrabold text-[#1A1A1A] leading-[1.05] tracking-tight mb-6">
                Restoranınızı haftalar değil, dakikalar içinde dijitalleştirin!
              </h2>
              <p className="text-[#845f21] font-medium text-[17px] mb-8 pr-4 leading-relaxed">
                VOGOPOS, büyüyen işletmeler ve modern restoranlar için tasarlanmış en kapsamlı QR Menü & Yönetim sistemidir.
              </p>
              <button className="px-8 py-4 bg-[#1A1A1A] text-white font-bold rounded-full hover:bg-black transition-colors shadow-xl">
                Ücretsiz Denemeye Başla
              </button>
            </div>

            {/* Decorative Mockups Right */}
            <div className="w-full md:w-[45%] relative z-10 flex flex-col gap-4 h-[250px] md:h-[350px] items-end justify-center perspective-[1000px]">
              
              {/* Floating Card 1 */}
              <div className="bg-white rounded-[24px] p-6 shadow-xl w-[260px] absolute right-[5%] top-0 lg:top-[-20px] transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-gray-500 text-[12px] font-bold">Müşteri Memnuniyeti</span>
                  <span className="text-2xl font-bold text-[#1A1A1A]">98.5%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                  <div className="w-[98%] h-full bg-[#7DCEFF] rounded-full"></div>
                </div>
                <div className="flex -space-x-3">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop" className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="User" />
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop" className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="User" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="User" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#9381FF] text-white flex items-center justify-center text-[10px] font-bold">
                    +1k
                  </div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="bg-white rounded-[24px] p-6 shadow-xl w-[240px] absolute right-[35%] bottom-[10px] transform -rotate-3 hover:rotate-0 transition-transform duration-300 z-10 hidden sm:block">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#CAEF45] flex items-center justify-center text-[#435212] flex-shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#1A1A1A] font-bold text-[14px]">Yeni Sipariş</h4>
                    <p className="text-gray-400 text-[12px]">Masa 14</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center text-sm">
                  <span className="font-semibold text-gray-600">Toplam:</span>
                  <span className="font-bold text-[#1A1A1A]">$45.00</span>
                </div>
              </div>

              {/* Curved Arrow Vector (Visual flair) */}
              <svg className="absolute w-24 h-24 top-[-40px] right-[250px] text-amber-900/40 hidden lg:block transform -rotate-12" viewBox="0 0 100 100" fill="none">
                <path d="M10 90C10 50 40 20 80 10M80 10V30M80 10H60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <text x="0" y="40" className="text-[12px] font-bold" fill="currentColor">Hızlı Kurulum</text>
              </svg>

            </div>
          </div>
        </div>
      </div>

      {/* --- DARK FOOTER INNER --- */}
      <footer className="bg-[#111111] pt-16 md:pt-24 pb-12 w-full relative" id="iletisim">
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 border-b border-white/10 pb-16">
            
            {/* Logo & Description */}
            <div className="lg:col-span-4 flex flex-col">
              <div className="flex items-center gap-3 mb-6 text-white w-max">
                <div className="bg-[#9381FF] p-2 rounded-xl flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-2xl tracking-tight">VOGOPOS</span>
              </div>
              <p className="text-gray-400 text-[15px] leading-relaxed pr-6">
                İş akışınızı kolaylaştırın, siparişleri yönetin ve VOGOPOS hepsi bir arada QR menü & POS çözümleriyle işletmenizi dijitalleştirin.
              </p>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2 text-[15px]">Hızlı Linkler</h4>
              <ul className="flex flex-col gap-4">
                {["Ana Sayfa", "Fiyatlandırma", "Güncellemeler", "Gizlilik Politikası", "SSS"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2 text-[15px]">Firma</h4>
              <ul className="flex flex-col gap-4">
                {["Hakkımızda", "İletişim", "Müşteri Yorumları", "Özellikler", "Blog"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-4">
              <h4 className="text-white font-semibold mb-4 text-[15px]">En yeni ipuçları ve haberler için takipte kalın!</h4>
              
              <div className="relative mt-6 max-w-sm">
                <input 
                  type="email" 
                  placeholder="E-posta adresiniz" 
                  className="w-full bg-white text-black text-[14px] rounded-full px-6 py-4 outline-none focus:ring-4 ring-[#9381FF]/30 transition-all shadow-lg shadow-white/5"
                />
                <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#9381FF] text-white px-6 rounded-full font-bold text-[14px] hover:bg-[#8371ef] transition-colors">
                  Abone Ol
                </button>
              </div>
            </div>
            
          </div>

          {/* Bottom Copyright & Socials */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-10">
            <p className="text-gray-500 text-[14px]">
              © 2026 VOGOPOS Inc. Tüm hakları saklıdır.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors" aria-label="X (Twitter)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
          
          
        </div>
      </footer>
    </div>
  );
}
