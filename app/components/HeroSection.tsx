// components/HeroSection.tsx
import React from 'react';
import Image from 'next/image';
import { FaRegClock } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <section className="w-full max-w-5xl mx-auto my-8 p-6 bg-stone-600 rounded-lg shadow-lg flex flex-col md:flex-row items-center animate-fadeIn">
      <div className="md:w-1/2 relative w-full" style={{ aspectRatio: '16/9' }}>
        <Image
          src="/image/massage.webp"
          alt="спа-Массаж"
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-lg shadow-md"
          priority
        />
      </div>
      <div className="md:w-1/2 mt-6 md:mt-0 md:pl-8 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Расслабьтесь с нашим спа-массажем</h2>
        <p className="mb-4 text-white">
          Наслаждайтесь профессиональным спа-массажем, который помогает снять напряжение, улучшить кровообращение и общее самочувствие. Опытные специалисты применяют современные методики для вашего комфорта.
        </p>
        <div className="flex items-center mb-4">
          <FaRegClock className="text-blue-600 mr-2" />
          <span className='text-white'>Более 10 лет опыта</span>
        </div>
        <a
          href="#massageSlider"
          className="mt-4 inline-block text-center py-2 px-4 bg-stone-900 text-white rounded hover:bg-stone-700 transition-colors"
        >
          Подробнее
        </a>
      </div>
    </section>
  );
}
