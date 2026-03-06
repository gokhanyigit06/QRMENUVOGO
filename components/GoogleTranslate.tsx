'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        google: any;
        googleTranslateElementInit: () => void;
    }
}

export default function GoogleTranslate() {
    useEffect(() => {
        // Prevent multiple initializations
        if (document.getElementById('google-translate-script')) return;

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'tr',
                    includedLanguages: 'en,de,fr,it,es,ru,ar,zh-CN,ja,nl', // Focus on popular languages
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false,
                },
                'google_translate_element'
            );
        };

        const addScript = () => {
            const script = document.createElement('script');
            script.id = 'google-translate-script';
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);
        };

        addScript();
    }, []);

    return (
        <div className="flex items-center gap-2">
            <div id="google_translate_element" className="google-translate-container" />
            <style jsx global>{`
        .google-translate-container {
          height: 32px;
          overflow: hidden;
        }
        .goog-te-gadget-simple {
          background-color: rgba(255, 255, 255, 0.8) !important;
          border: 1px solid #e5e7eb !important;
          padding: 4px 8px !important;
          border-radius: 8px !important;
          font-family: inherit !important;
          font-size: 12px !important;
          display: flex !important;
          align-items: center !important;
          gap: 4px !important;
          cursor: pointer !important;
        }
        .goog-te-gadget-simple span {
          color: #374151 !important;
          font-weight: 600 !important;
        }
        .goog-te-gadget-simple img {
          display: none !important;
        }
        .goog-te-menu-value span:nth-child(3) {
          border-left: none !important;
        }
        .goog-te-menu-value span:nth-child(5) {
          display: none !important;
        }
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        } 
        body {
          top: 0px !important;
        }
        .goog-te-menu-frame {
           box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1) !important;
           border-radius: 12px !important;
           border: 1px solid #e5e7eb !important;
        }
      `}</style>
        </div>
    );
}
