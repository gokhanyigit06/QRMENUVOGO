'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/branding/vogolab-logo.png" alt="VOGOPOS" width={140} height={40} className="object-contain" />
        </Link>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-10 text-[15px] font-medium text-gray-600">
          <button className="flex items-center gap-1.5 hover:text-black transition-colors">
            Çözümler <ChevronDown className="w-4 h-4" />
          </button>
          <Link href="#features" className="hover:text-black transition-colors">Özellikler</Link>
          <Link href="#themes" className="hover:text-black transition-colors">Temalar</Link>
          <Link href="#pricing" className="hover:text-black transition-colors">Fiyatlandırma</Link>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block text-[15px] font-semibold text-gray-600 hover:text-black transition-colors">
            Giriş Yap
          </Link>
          <Link href="/register" className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white text-[15px] font-semibold hover:bg-black transition-all hover:scale-105 shadow-md shadow-black/10">
            Hemen Başla
          </Link>
        </div>
      </div>
    </nav>
  );
}
