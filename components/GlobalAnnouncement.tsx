'use client';

import { useEffect, useState } from 'react';
import * as Services from '@/lib/services';
import { Megaphone, X, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function GlobalAnnouncement() {
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await Services.getGlobalAnnouncements();
                setAnnouncements(data || []);
            } catch (error) {
                console.error("Announcement fetch error", error);
            }
        };
        fetchAnnouncements();
    }, []);

    if (!isVisible || announcements.length === 0) return null;

    const current = announcements[currentIndex];

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={cn(
                    "relative border-b shadow-sm overflow-hidden",
                    current.type === 'warning' ? "bg-[#8F6CD9]/10 border-[#8F6CD9]/20" :
                    current.type === 'success' ? "bg-emerald-50 border-emerald-200" :
                    "bg-[#5A37A6]/5 border-[#5A37A6]/10"
                )}
            >
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className={cn(
                            "p-1.5 rounded-lg flex-shrink-0",
                            current.type === 'warning' ? "bg-[#8F6CD9]/20 text-[#5A37A6]" :
                            current.type === 'success' ? "bg-emerald-100 text-emerald-600" :
                            "bg-[#5A37A6]/10 text-[#5A37A6]"
                        )}>
                            {current.type === 'warning' ? <AlertCircle className="h-4 w-4" /> :
                             current.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> :
                             <Megaphone className="h-4 w-4" />}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                            <span className="font-bold text-sm text-[#402814] whitespace-nowrap">{current.title}:</span>
                            <span className="text-sm text-[#402814]/70 truncate">{current.content}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {announcements.length > 1 && (
                             <button 
                                onClick={() => setCurrentIndex((prev) => (prev + 1) % announcements.length)}
                                className="text-[10px] font-black uppercase text-[#402814]/40 hover:text-[#5A37A6] bg-white/50 px-2 py-1 rounded-md transition-all border border-[#CCCFD9]/30"
                             >
                                Sonraki ({currentIndex + 1}/{announcements.length})
                             </button>
                        )}
                        <button 
                            onClick={() => setIsVisible(false)}
                            className="p-1.5 rounded-lg hover:bg-[#402814]/5 text-[#402814]/30 hover:text-[#A60D0D] transition-all"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
