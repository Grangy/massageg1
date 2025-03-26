// app/components/BookingForm.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import { FaRegClock, FaUser } from 'react-icons/fa';

interface BookingFormProps {
  selectedMassage: string;
}

export default function BookingForm({ selectedMassage }: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', massage: selectedMassage });
  const [message, setMessage] = useState('');

  // Обновляем поле massage, если selectedMassage меняется
  useEffect(() => {
    setFormData((prev) => ({ ...prev, massage: selectedMassage }));
  }, [selectedMassage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setMessage('Ваша заявка успешно отправлена!');
        setFormData({ name: '', phone: '', date: '', massage: '' });
      } else {
        setMessage('Ошибка при отправке заявки.');
      }
    } catch {
        setMessage('Ошибка при отправке заявки.');
    }
    setLoading(false);
  };

  return (
    <div
      id="bookingForm"
      className="w-full max-w-md mx-auto bg-stone-600 p-6 rounded-lg shadow-lg transform transition hover:scale-105 animate-fadeIn text-white"
    >
      <h1 className="text-4xl font-bold mb-6 text-center">Запись на массаж</h1>
      <form onSubmit={handleSubmit}>
      {selectedMassage && <p className="mb-4 text-lg text-white">Вы выбрали {selectedMassage}</p>}

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Ваше имя
          </label>
          <div className="flex items-center border rounded-md mt-1">
            <FaUser className="ml-2 text-gray-400" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 outline-none border-none bg-transparent text-white placeholder-gray-300"
              placeholder="Введите ваше имя"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium">
            Телефон
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:border-blue-300 bg-transparent text-white placeholder-gray-300"
            placeholder="+7 (___) ___-__-__"
          />
        </div>
        <div className="mb-4">
  <label htmlFor="date" className="block text-sm font-medium">
    Дата
  </label>
  <div className="flex items-center border rounded-md mt-1">
    <FaRegClock className="ml-2 text-gray-400" />
    <input
      type="date"
      id="date"
      name="date"
      value={formData.date}
      onChange={handleChange}
      className="w-full p-2 outline-none border-none bg-transparent text-white placeholder-gray-300"
      placeholder="Выберите дату"
    />
  </div>
  <p className="text-xs text-gray-300 mt-1">Не обязательно, мы перезвоним вам</p>
</div>

        {/* Невидимое поле для выбранного массажа */}
        <input type="hidden" name="massage" value={formData.massage} />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-stone-900 text-white rounded-md hover:bg-stone-700 transition-colors"
        >
          {loading ? 'Отправка...' : 'Записаться'}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-400">{message}</p>}
      {loading && <Loader />}
    </div>
  );
}
