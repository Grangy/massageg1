import React from 'react';
import { FaRegClock } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <section className="w-full max-w-5xl mx-auto my-8 p-6 rounded-lg shadow-lg flex justify-center items-center animate-fadeIn">
      {/* Контейнер для видео и текста */}
      <div className="relative w-full max-w-xs md:max-w-sm" style={{ aspectRatio: '9/16' }}>
        {/* Видео */}
        <video
          src="/video/video2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain rounded-lg animate-slideInLeft"
        />
        {/* Текстовый блок с полупрозрачной подложкой */}
        <div
          className="absolute inset-0 flex flex-col justify-center items-center bg-stone-600/50 rounded-lg p-4 animate-slideInRight"
          style={{ animationDelay: '0.2s' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white text-center">
            Расслабьтесь с нашим прогревочным-массажем
          </h2>
          <p className="mb-3 text-sm md:text-base text-white text-center">
            Наслаждайтесь профессиональным спа-массажем, который помогает снять напряжение и улучшить самочувствие.
          </p>
          <div className="flex items-center mb-3">
            <FaRegClock className="text-blue-600 mr-2" />
            <span className="text-white text-sm md:text-base">Более 10 лет опыта</span>
          </div>
          <a
            href="#massageSlider"
            className="inline-block text-center py-2 px-4 bg-stone-900 text-white rounded hover:bg-stone-700 transition-colors text-sm md:text-base"
          >
            Подробнее
          </a>
        </div>
      </div>
    </section>
  );
}