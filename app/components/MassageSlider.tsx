// app/components/MassageSlider.tsx
"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaRegClock, FaRubleSign } from 'react-icons/fa';

const massages = [
  {
    id: 1,
    title: "Экспресс спа-массаж одной зоны",
    time: "от 10 мин",
    price: "500 ₽",
    description: "Быстрая процедура для одной зоны с акцентом на релаксацию.",
  },
  {
    id: 2,
    title: "Релаксационная процедура для лица",
    time: "20 мин",
    price: "1 200 ₽",
    packagePrice: "Пакет на 5 услуг: 5 400 ₽",
    description: "Уход за лицом для восстановления свежести и красоты кожи.",
  },
  {
    id: 3,
    title: "Спа-массаж одной зоны (на выбор)",
    time: "20 мин",
    price: "1 350 ₽",
    packagePrice: "Пакет на 5 услуг: 6 400 ₽",
    description: "Процедура для головы, рук, ног или шейно-воротниковой зоны с индивидуальным подходом.",
  },
  {
    id: 4,
    title: "Релаксационная процедура лицо + декольте",
    time: "30 мин",
    price: "1 700 ₽",
    packagePrice: "Пакет на 5 услуг: 7 650 ₽",
    description: "Комплексный уход за лицом и декольте для омоложения и релаксации.",
  },
  {
    id: 5,
    title: "Процедура «Интенсив» (ноги + спина)",
    time: "40 мин",
    price: "2 000 ₽",
    packagePrice: "Пакет на 5 услуг: 9 000 ₽",
    description: "Интенсивная проработка задней поверхности ног и спины для глубокого расслабления.",
  },
  {
    id: 6,
    title: "Спортивный/лимфодренажный/миофасциальный массаж",
    time: "60 мин",
    price: "2 650 ₽",
    packagePrice: "Пакет на 5 услуг: 11 925 ₽",
    description: "Процедура для восстановления мышц после тренировок и устранения болей.",
  },
  {
    id: 7,
    title: "Антицеллюлитный спа-массаж",
    time: "45 мин",
    price: "3 000 ₽",
    packagePrice: "Пакет на 5 услуг: 13 500 ₽",
    description: "Процедура для борьбы с целлюлитом и улучшения тонуса кожи.",
  },
  {
    id: 8,
    title: "Общий спа-массаж",
    time: "80 мин",
    price: "3 750 ₽",
    packagePrice: "Пакет на 5 услуг: 16 800 ₽",
    description: "Комплексный массаж для полного расслабления и восстановления организма.",
  },
];

export default function MassageSlider({ setSelectedMassage }: { setSelectedMassage: (massage: string) => void }) {
    return (
      <section id="massageSlider" className="my-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Наши виды спа-массажа</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {massages.map((massage) => (
            <SwiperSlide key={massage.id}>
              <div className="bg-stone-600 rounded-lg shadow-lg p-6 flex flex-col justify-between h-full min-h-[300px] transform transition duration-300 hover:scale-105">
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-white">{massage.title}</h3>
                  <p className="text-white mb-4">{massage.description}</p>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaRegClock className="mr-2 text-white" />
                    <span className='text-white'>{massage.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-white">
                    <FaRubleSign className="mr-2 text-gray-300" />
                    <span className='text-gray-300'>{massage.price}</span>
                  </div>
                  {massage.packagePrice && (
                    <div className="text-sm text-gray-300 mt-1">
                      {massage.packagePrice}
                    </div>
                  )}
                </div>
                <div className="mt-4 flex space-x-2">
                  <a
                    href="#bookingForm"
                    onClick={() => setSelectedMassage(massage.title)}
                    className="flex-1 text-center py-2 px-4 bg-stone-900 text-white rounded hover:bg-stone-700 transition-colors"
                  >
                    Записаться
                  </a>
                  <a
                    href="#bookingForm"
                    className="flex-1 text-center py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    Подробнее
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
  }
