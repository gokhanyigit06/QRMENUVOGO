import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MenuProvider } from "@/lib/store";
import FontLoader from "@/components/FontLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QR Menu - Lezzetli Seçenekler",
  description: "Dijital menümüzden siparişinizi verin. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} antialiased`}>
        <MenuProvider>
          <FontLoader />
          {children}
        </MenuProvider>
      </body>
    </html>
  );
}
