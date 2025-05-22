// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import YandexMetrika from "./components/YandexMetrika";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grelka SPA & Bany | Массаж и банные ритуалы в GAGAR1N, Симферополь",
  description:
    "Grelka SPA&Bany — первый банный SPA‑клуб в Симферополе, расположенный внутри фитнес‑парка GAGAR1N. Откройте для себя хаммам, русскую баню, соляную комнату, ледяную купель, джакузи и профессиональные массажные программы (классический, лимфодренажный, спортивный и SPA‑ритуалы) для полного расслабления и восстановления здоровья.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}