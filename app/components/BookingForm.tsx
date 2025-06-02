"use client";

import React, { useState, useEffect } from 'react';
import { FaRegClock, FaUser, FaBolt } from 'react-icons/fa';

// Интерфейс пропсов для BookingForm
interface BookingFormProps {
  selectedMassage: string;
}

export default function BookingForm({ selectedMassage }: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    date: '', 
    timing: 'specific', // 'specific' или 'asap'
    massage: selectedMassage 
  });
  const [message, setMessage] = useState('');

  // Обновляем поле massage, если selectedMassage меняется
  useEffect(() => {
    setFormData((prev) => ({ ...prev, massage: selectedMassage }));
  }, [selectedMassage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: value,
      ...(name === 'timing' && value === 'asap' ? { date: '' } : {})
    }));
  };

  // Обработка изменения чекбокса "Как можно скорее"
  const handleAsapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isAsap = e.target.checked;
    setFormData((prev) => ({ 
      ...prev, 
      timing: isAsap ? 'asap' : 'specific',
      date: isAsap ? '' : prev.date
    }));
  };

  // Автоматическое добавление "+7" при фокусе на поле телефона
  const handlePhoneFocus = () => {
    if (!formData.phone.startsWith('+7')) {
      setFormData((prev) => ({ ...prev, phone: '+7' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submissionData = {
        ...formData,
        name: formData.timing === 'asap' ? `${formData.name} КАК МОЖНО СКОРЕЕ` : formData.name
      };
      const res = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      if (res.ok) {
        setMessage('Ваша заявка успешно отправлена!');
        setFormData({ name: '', phone: '', date: '', timing: 'specific', massage: selectedMassage });
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
      className="w-full max-w-md mx-auto bg-stone-600 p-8 rounded-xl shadow-2xl transform transition-all hover:scale-105 animate-fadeIn text-white min-h-[450px] flex flex-col justify-center"
    >
      <h1 className="text-3xl font-extrabold mb-6 text-center tracking-tight">Запись на массаж</h1>
      {selectedMassage && (
        <p className="mb-6 text-lg text-center bg-stone-700 py-2 px-4 rounded-lg text-white font-medium">
          Вы выбрали: {selectedMassage}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-200 mb-2">
            Ваше имя
          </label>
          <div className="flex items-center border-2 border-stone-500 rounded-lg bg-stone-700 transition-all focus-within:border-stone-400 focus-within:ring-2 focus-within:ring-stone-300">
            <FaUser className="ml-3 text-gray-300" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 outline-none bg-transparent text-white placeholder-gray-400 focus:placeholder-gray-500"
              placeholder="Введите ваше имя"
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-200 mb-2">
            Телефон
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onFocus={handlePhoneFocus}
            required
            className="w-full p-3 border-2 border-stone-500 rounded-lg bg-stone-700 text-white placeholder-gray-400 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-300 transition-all"
            placeholder="+7 (___) ___-__-__"
            pattern="[0-9+]{7,14}"
            title="Номер телефона должен содержать от 7 до 14 цифр"
          />
        </div>

        <div className="relative">
          <label className="flex items-center justify-between w-full p-3 bg-stone-700 rounded-lg border-2 border-stone-500 hover:border-stone-400 transition-all cursor-pointer">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="asap"
                checked={formData.timing === 'asap'}
                onChange={handleAsapChange}
                className="w-5 h-5 text-stone-400 bg-stone-800 border-stone-500 rounded focus:ring-stone-400 focus:ring-2"
              />
              <span className="text-sm font-semibold text-gray-200 flex-1">Как можно скорее</span>
            </div>
            <FaBolt className="text-gray-300" />
          </label>
        </div>

        {formData.timing !== 'asap' && (
          <div className="relative">
            <label htmlFor="date" className="block text-sm font-semibold text-gray-200 mb-2">
              Дата
            </label>
            <div className="flex items-center border-2 border-stone-500 rounded-lg bg-stone-700 transition-all focus-within:border-stone-400 focus-within:ring-2 focus-within:ring-stone-300">
              <FaRegClock className="ml-3 text-gray-300" />
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 outline-none bg-transparent text-white placeholder-gray-400 focus:placeholder-gray-500"
              />
            </div>
            <p className="text-xs text-gray-300 mt-2 italic">Не обязательно, мы перезвоним вам</p>
          </div>
        )}

        <input type="hidden" name="massage" value={formData.massage} />
        <input type="hidden" name="timing" value={formData.timing} />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {loading ? (
            <>
              <span>Отправка...</span>
              <FaBolt className="animate-pulse" />
            </>
          ) : (
            <>
              <span>Записаться</span>
              <FaBolt />
            </>
          )}
        </button>
      </form>

      {message && (
        <p className={`mt-6 text-center text-lg font-medium ${message.includes('Ошибка') ? 'text-red-300' : 'text-green-300'} animate-pulse`}>
          {message}
        </p>
      )}

      {loading && <div className="mt-6 mx-auto animate-spin w-8 h-8 border-4 border-t-transparent border-white rounded-full" />}
    </div>
  );
}