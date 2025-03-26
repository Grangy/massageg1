// app/components/ContactSection.tsx
"use client";

import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section id="contact" className="relative bg-stone-700 text-white py-16 px-6 overflow-hidden mt-12">
      {/* Decorative SVG shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-stone-900 to-stone-600 rounded-full mix-blend-overlay opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-blue-700 to-stone-500 rounded-full mix-blend-overlay opacity-25 translate-x-1/2 translate-y-1/2"></div>

      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-6">Свяжитесь с нами</h2>
        <p className="mb-12 text-lg text-gray-200">
          Мы всегда готовы ответить на ваши вопросы и помочь выбрать лучший вариант массажа для вас.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaPhoneAlt size={32} />,
              title: "Позвоните нам",
              detail: "+7 (978) 337 95-74",
              href: "tel:+79783379574",
            },
            {
              icon: <FaEnvelope size={32} />,
              title: "Напишите нам",
              detail: "sales@gagar1n.ru",
              href: "mailto:sales@gagar1n.ru",
            },
            {
              icon: <FaMapMarkerAlt size={32} />,
              title: "Наш адрес",
              detail: "г. Симферополь, ул. Киевская 115",
              href: "https://yandex.ru/maps/-/CHF-nQzo",
              external: true,
            },
          ].map(({ icon, title, detail, href, external }) => (
            <a
              key={title}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="flex flex-col items-center p-6 bg-stone-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="p-4 bg-stone-600 rounded-full mb-4">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-300">{detail}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
