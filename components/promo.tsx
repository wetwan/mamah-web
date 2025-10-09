"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Timer, Zap, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";

import image1 from "@/public/image3.png";
import Link from "next/link";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const diff = +new Date(targetDate) - +new Date();
  if (diff <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
};

const formatValue = (value: number) => String(value).padStart(2, "0");
const Promo = () => {
  const DAYS_TO_RUN = 12;
  const targetDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + DAYS_TO_RUN);
    return d;
  }, []);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(
      () => setTimeLeft(calculateTimeLeft(targetDate)),
      1000
    );
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: "DAYS", value: formatValue(timeLeft.days) },
    { label: "HOURS", value: formatValue(timeLeft.hours) },
    { label: "MINUTES", value: formatValue(timeLeft.minutes) },
    { label: "SECONDS", value: formatValue(timeLeft.seconds) },
  ];
  return (
    <>
      <div className="h-screen lg:h-[calc(100vh-250px)] p-4 bg-white flex items-center justify-center max-sm:mt-10">
        <div className="flex flex-col lg:flex-row w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden bg-white">
          <div className="w-full lg:w-1/2 min-h-[300px] lg:min-h-[600px] flex items-center justify-center bg-red-200">
            <Image
              src={image1}
              alt="Promo Product"
              className="w-full h-full object-cover sm:object-contain transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>

          <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-red-600 space-y-8">
            <header className="space-y-3">
              <h1 className="flex items-center text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                <Zap className="w-8 h-8 mr-3 animate-pulse" />
                FLASH SALE ENDS SOON!
              </h1>
              <p className="text-lg sm:text-xl text-red-100 font-semibold">
                <span className="bg-white text-red-600 px-3 py-1 rounded-full inline-block mr-2 shadow-inner">
                  50% OFF
                </span>
                on all items storewide! This massive discount won’t last.
              </p>
            </header>

            <div className="flex flex-col items-start bg-red-700/50 p-6 rounded-xl shadow-inner w-full">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-yellow-300 mr-2" />
                <h2 className="text-2xl font-bold text-white">
                  Time Remaining:
                </h2>
              </div>

              {timeLeft.expired ? (
                <p className="text-yellow-300 text-3xl font-extrabold w-full text-center py-4">
                  SALE HAS ENDED!
                </p>
              ) : (
                <div className="flex justify-between w-full">
                  {timeUnits.map((unit) => (
                    <div
                      key={unit.label}
                      className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white/20 rounded-xl shadow-lg backdrop-blur-sm mx-1 sm:mx-2 w-1/4"
                    >
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={unit.value}
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white"
                        >
                          {unit.value}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-xs sm:text-sm text-gray-100 font-medium mt-1">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link href='/shop' className="flex items-center justify-center w-full py-4 text-xl font-bold text-red-600 bg-yellow-300 rounded-lg shadow-xl hover:bg-yellow-400 transition duration-300 transform hover:scale-[1.02]">
              Shop Now & Claim Your Discount
              <Timer className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Promo;
