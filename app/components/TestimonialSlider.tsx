// app/components/TestimonialSlider.tsx
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";

const reviews = [
  `Банный СПА комплекс "Грелка" порадовал меня высоким уровнем сервиса и отличным отдыхом...`,
  `Место очень уютное и стильное, сразу создаёт атмосферу расслабления...`,
  `Банный спа-клуб «Грелка» оставил у меня только положительные впечатления!...`,
  `Посетил новый СПА-комплекс и остался в полном восторге!...`,
  `В банном комплексе мне понравилась обстановка, сама парилка, комната отдыха...`,
  `Очень уютное атмосферное место. Островок тишины и покоя...`,
  `Потрясающие пармастера, уютное расположение в одном здании с фитнес-парком GAGAR1N...`,
];

export default function TestimonialSlider() {
  return (
    <section id="testimonials" className="my-16">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Отзывы клиентов</h2>
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
        {reviews.map((text, idx) => (
          <SwiperSlide key={idx}>
            <a
              href="https://yandex.ru/maps/org/grelka/44516003904/reviews/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-600 rounded-lg shadow-lg p-6 flex flex-col justify-between h-full transform transition duration-300 hover:scale-105"
            >
              <div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 mr-1" />
                  ))}
                </div>
                <p className="text-white text-sm leading-relaxed">&ldquo;{text}&rdquo;</p>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="text-center mt-8">
        <a
          href="https://yandex.ru/maps/org/grelka/44516003904/reviews/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block py-2 px-6 bg-stone-900 text-white rounded-lg hover:bg-stone-700 transition-colors"
        >
          Подробнее о всех отзывах
        </a>
      </div>
    </section>
  );
}
