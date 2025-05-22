// components/YandexMetrika.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import ym, { YMInitializer } from "react-yandex-metrika";

const YM_COUNTER_ID = 102069331; // Удаляем кавычки, чтобы ID был числом

const YandexMetrika = () => {
  const pathname = usePathname();

  // Отправляем событие hit при изменении маршрута
  useEffect(() => {
    if (pathname) {
      ym("hit", pathname);
    }
  }, [pathname]);

  return (
    <YMInitializer
      accounts={[YM_COUNTER_ID]}
      options={{
        defer: true, // Отключаем автоматическую отправку просмотров
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      }}
      version="2"
    />
  );
};

export default YandexMetrika;