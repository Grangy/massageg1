// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedBackground from "@/app/components/AnimatedBackground";
import HeroSection from "@/app/components/HeroSection";
import MassageSlider from "@/app/components/MassageSlider";
import BookingForm from "@/app/components/BookingForm";
import Navbar from "@/app/components/Navbar";
import ContactSection from "@/app/components/ContactSection";
import TestimonialSlider from "@/app/components/TestimonialSlider";

const leftToRightVariant = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const rightToLeftVariant = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function HomePage() {
  const [selectedMassage, setSelectedMassage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closePopup = () => setIsPopupOpen(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsPopupOpen(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target as HTMLFormElement;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Промо", phone, date: new Date().toISOString() }),
      });
      const data = await res.json();

      if (data.success) {
        setFormStatus("success");
        setTimeout(() => {
          closePopup();
          setFormStatus("idle");
          setIsSubmitting(false);
        }, 3000);
      } else {
        setFormStatus("error");
        setIsSubmitting(false);
      }
    } catch {
      setFormStatus("error");
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedBackground>
      <Navbar />
      <div className="container mx-auto p-4">
        <motion.div initial="hidden" animate="visible" variants={leftToRightVariant} transition={{ delay: 0 }}>
          <HeroSection />
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={rightToLeftVariant} transition={{ delay: 1.5 }}>
          <MassageSlider setSelectedMassage={setSelectedMassage} />
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={leftToRightVariant} transition={{ delay: 3 }}>
          <BookingForm selectedMassage={selectedMassage} />
          <TestimonialSlider />
        </motion.div>
      </div>
      <ContactSection />

      {/* Попап */}
      {isPopupOpen && (
        <motion.div
          className="popup fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closePopup}
        >
          <div
            className="popup-content bg-stone-200 rounded-lg shadow-lg p-6 w-full max-w-lg mx-4 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button absolute top-2 right-2 text-stone-900 text-2xl cursor-pointer hover:text-stone-600 transition-colors z-10"
              onClick={closePopup}
            >
              ×
            </button>
            <div className="image-container relative w-full" style={{ aspectRatio: "16/9" }}>
              <Image
                src="/image/massage.webp"
                alt="Акция"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="text-content mt-4">
              <h2 className="text-2xl font-bold text-stone-900 mb-2">Специальное предложение!</h2>
              <p className="text-stone-800 mb-4">Получите 20% скидку на первую сессию массажа!</p>
            </div>
            <form className="contact-form flex flex-col" onSubmit={handleSubmit}>
              {formStatus === "idle" && (
                <>
                  <label htmlFor="phone" className="text-stone-900 mb-2 font-medium">
                    Ваш номер телефона:
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="mb-4 p-2 border border-stone-300 bg-stone-100 text-stone-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 transition-all"
                    placeholder="+7 (___) ___-__-__"
                    required
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    className="py-2 px-4 bg-stone-700 text-white rounded-lg hover:bg-stone-600 transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    ) : null}
                    {isSubmitting ? "Отправка..." : "Запросить звонок"}
                  </button>
                </>
              )}
              {formStatus === "success" && (
                <motion.div
                  className="p-4 bg-green-100 text-green-800 rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="font-semibold">Спасибо! Мы скоро свяжемся с вами.</p>
                </motion.div>
              )}
              {formStatus === "error" && (
                <motion.div
                  className="p-4 bg-red-100 text-red-800 rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="font-semibold">Ошибка. Попробуйте снова.</p>
                  <button
                    className="mt-2 text-sm underline hover:text-red-600"
                    onClick={() => setFormStatus("idle")}
                  >
                    Повторить
                  </button>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      )}
    </AnimatedBackground>
  );
}