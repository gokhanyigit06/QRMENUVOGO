
'use client';

// Removed CategoryNav import as we are switching to Accordion + Banner layout
// import CategoryNav from '@/components/CategoryNav'; 
import CategoryAccordion from '@/components/CategoryAccordion';
import HeroBanner from '@/components/HeroBanner';
import PromoPopup from '@/components/PromoPopup';
import AllergenModal from '@/components/AllergenModal';
import { Skeleton } from '@/components/ui/skeleton';
import { useMenu } from '@/lib/store'; // Import context hook
import { trackPageView } from '@/lib/services';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import GoogleTranslate from '@/components/GoogleTranslate';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import CategoryTabs from '@/components/CategoryTabs';
import CategoryList from '@/components/CategoryList';
import EliteLayout from '@/components/EliteLayout'; 
import DynamicThemeProvider from '@/components/DynamicThemeProvider';

export default function Home({ initialData }: { initialData?: any }) {
  const { products, categories, settings, restaurant, setInitialData } = useMenu();

  const [loading, setLoading] = useState(!initialData);
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const [viewTracked, setViewTracked] = useState(false);
  const [isAllergenModalOpen, setIsAllergenModalOpen] = useState(false);

  // Sync initial SSR data into store immediately (runs before any refreshData from slug init)
  useEffect(() => {
    if (initialData && setInitialData) {
      setInitialData(initialData);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  // Apply Dark Mode to body
  useEffect(() => {
    if (settings.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [settings.darkMode]);

  // Track Page View
  useEffect(() => {
    if (restaurant?.id && !viewTracked) {
      trackPageView(restaurant.id).catch(console.error);
      setViewTracked(true);
    }
  }, [restaurant?.id, viewTracked]);

  useEffect(() => {
    // Otomatik dil tespiti: Telefon dili Türkçe değilse İngilizce'ye çevir
    const browserLang = navigator.language.split('-')[0].toLowerCase();
    if (browserLang !== 'tr') {
      setLanguage('en');
    }
  }, []);

  useEffect(() => {
    if (initialData) {
      setLoading(false);
      return;
    }
    // Simulate data fetching fallback
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [initialData]);

  // Back to Top Logic
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic Theme Colors
  const themeColors: Record<string, string> = {
    black: 'text-gray-900',
    white: 'text-gray-900',
    blue: 'text-blue-600',
    orange: 'text-orange-600',
    red: 'text-red-700',
    green: 'text-green-700'
  };

  const accentColor = 'text-[var(--theme-primary)]'; // Use variables

  return (
    <DynamicThemeProvider settings={settings} className="min-h-screen pb-24">
      {/* 
         Pop-up Component 
         Checks 'popupActive' from settings
      */}
      <PromoPopup
        imageUrl={settings.popupUrl}
        isActive={settings.popupActive}
      />

      <AllergenModal
        isOpen={isAllergenModalOpen}
        onClose={() => setIsAllergenModalOpen(false)}
        language={language}
      />

      {/* Header / Brand Area */}
      <div className="px-4 pb-4 pt-8 shadow-sm sticky top-0 z-30 transition-colors duration-500 border-b border-[var(--theme-border)]" style={{ backgroundColor: 'var(--theme-card-bg)', color: 'var(--theme-card-text)' }}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {loading ? (
              <div className="h-12 w-32 bg-gray-200 animate-pulse rounded-md"></div>
            ) : (
              settings.logoUrl ? (
                <img
                  src={settings.logoUrl}
                  alt="Logo"
                  style={{ width: settings.logoWidth ? `${settings.logoWidth}px` : '150px' }}
                  className="object-contain mb-1 h-auto max-h-20 bg-transparent"
                />
              ) : (
                <>
                  <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--theme-text)' }}>
                    {settings.siteName || restaurant?.name || "LOGO"} <span className="text-3xl leading-3" style={{ color: 'var(--theme-primary)' }}>.</span>
                  </h1>
                  <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">
                    {settings.siteDescription || "QR Menü Sistemi"}
                  </span>
                </>
              )
            )}
          </div>

          <div className="flex items-center gap-4">
            <GoogleTranslate />
            <div className="w-[1px] h-4 bg-gray-200 hidden xs:block" />
            <button
              onClick={() => setIsAllergenModalOpen(true)}
              className="text-xs font-bold uppercase tracking-wide hover:opacity-70 transition-colors hidden sm:block opacity-80"
            >
              {language === 'en' ? 'Allergens' : 'Alerjenler'}
            </button>
            <button
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide hover:opacity-70 transition-colors opacity-80"
            >
              {language === 'tr' ? (
                <><span className="text-sm">🇬🇧</span></>
              ) : (
                <><span className="text-sm">🇹🇷</span></>
              )}
            </button>
          </div>
        </div>
      </div>

      {settings.storeActive === false || restaurant?.is_active === false ? (
        <main className="px-4 py-32 max-w-xl mx-auto text-center flex flex-col items-center justify-center min-h-[50vh]">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 bg-[var(--theme-card-bg)] shadow-md border border-[var(--theme-border)]">
            <span className="text-4xl opacity-80">😴</span>
          </div>
          <h2 className="text-3xl font-black mb-4 tracking-tight" style={{ color: 'var(--theme-primary)' }}>Şu an kapalıyız.</h2>
          <p className="opacity-70 text-sm max-w-xs mx-auto leading-relaxed">
            Mağazamız şu anda hizmet vermemektedir. Lütfen daha sonra tekrar ziyaret ediniz.
          </p>
        </main>
      ) : settings.menuLayout === 'elite' ? (
        <EliteLayout
          categories={categories}
          products={products}
          language={language}
        />
      ) : (
        <main className="px-2 pt-4 max-w-3xl mx-auto md:max-w-4xl">
          {loading ? (
            <div className="space-y-6">
              {/* Banner Skeleton */}
              <Skeleton className="h-64 w-full rounded-xl" />

              {/* Accordion Skeletons */}
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-2xl" />
              ))}
            </div>
          ) : (
            <>
              {/* Banner Section */}
              {settings.bannerActive && (
                <HeroBanner
                  bannerUrls={settings.bannerUrls}
                  mobileBannerUrls={settings.mobileBannerUrls}
                  overlayVisible={settings.bannerOverlayVisible}
                  tag={settings.bannerTag}
                  title={settings.bannerTitle}
                  subtitle={settings.bannerSubtitle}
                />
              )}

              {/* Title before list */}
              <div className="mb-4 flex items-center justify-between px-1">
                {settings.menuTitleText ? (
                  <p className="text-xs font-medium opacity-60 text-center w-full uppercase tracking-wider py-2">
                    {settings.menuTitleText}
                  </p>
                ) : (
                  <h2 className="text-lg font-bold">
                    {language === 'en' ? 'Menu' : 'Menü'}
                  </h2>
                )}
              </div>

              {/* Conditional Menu Layout Rendering */}
              {settings.menuLayout === 'tabs' ? (
                <CategoryTabs
                  categories={categories}
                  products={products}
                  language={language}
                />
              ) : ['list', 'grid', 'masonry', 'cards', 'minimal-list', 'paper'].includes(settings.menuLayout || '') ? (
                <CategoryList
                  categories={categories}
                  products={products}
                  language={language}
                />
              ) : (
                <CategoryAccordion
                  categories={categories}
                  products={products}
                  language={language}
                />
              )}
            </>
          )}
        </main>
      )}

      {/* Footer Component */}
      <Footer />

      {/* Floating Action / Cart Button */}

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-[999] rounded-full bg-black/80 p-3 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-black ${showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
          }`}
        aria-label="Back to Top"
      >
        <ArrowUp className="h-6 w-6" />
      </button>

    </DynamicThemeProvider>
  );
}
