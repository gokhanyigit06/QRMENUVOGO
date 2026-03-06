
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
import EliteTheme from '@/components/EliteTheme';

export default function Home({ initialData }: { initialData?: any }) {
  const { products: storeProducts, categories: storeCategories, settings: storeSettings, restaurant: storeRestaurant, setInitialData } = useMenu(); // Use global state

  // Choose data source (Prop if provided, otherwise store)
  const categories = initialData?.categories || storeCategories;
  const products = initialData?.products || storeProducts;
  const settings = initialData?.settings || storeSettings;
  const restaurant = initialData?.restaurant || storeRestaurant;

  const [loading, setLoading] = useState(!initialData);
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const [viewTracked, setViewTracked] = useState(false);
  const [isAllergenModalOpen, setIsAllergenModalOpen] = useState(false);

  // Sync initial data to store if provided
  useEffect(() => {
    if (initialData && setInitialData) {
      setInitialData(initialData);
    }
  }, [initialData, setInitialData]);

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

  const accentColor = themeColors[settings.themeColor || 'black'] || 'text-gray-900';

  return (
    <div className={cn(
      "min-h-screen pb-24 transition-colors duration-500",
      settings.darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900',
      settings.themeId === 'elite' && !settings.darkMode ? 'bg-white' : '',
      settings.themeId === 'elite' ? 'font-minister-sans' : 'font-sans'
    )}>
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
      <div className={`bg-white px-4 pb-4 pt-8 shadow-sm sticky top-0 z-30 ${settings.darkMode ? 'dark:bg-gray-900 dark:border-b dark:border-gray-800' : ''}`}>
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
                  <h1 className={`text-2xl font-black tracking-tight ${settings.darkMode ? 'dark:text-white' : 'text-gray-900'}`}>
                    {settings.siteName || restaurant?.name || "LOGO"} <span className={`${accentColor} text-3xl leading-3`}>.</span>
                  </h1>
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
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
              className="text-xs font-bold text-gray-900 uppercase tracking-wide hover:text-amber-600 transition-colors hidden sm:block"
            >
              {language === 'en' ? 'Allergens' : 'Alerjenler'}
            </button>
            <button
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wide hover:text-amber-600 transition-colors"
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

      {settings.themeId === 'elite' ? (
        <EliteTheme
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
                  <p className="text-xs font-medium text-gray-500 text-center w-full uppercase tracking-wider py-2">
                    {settings.menuTitleText}
                  </p>
                ) : (
                  <h2 className="text-lg font-bold text-gray-800">
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
              ) : (settings.menuLayout === 'list' || settings.menuLayout === 'grid') ? (
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

    </div>
  );
}
