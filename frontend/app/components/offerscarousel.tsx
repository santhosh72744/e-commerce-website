"use client";
import { useEffect, useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Offer = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  cta?: string;
};

export default function OffersCarousel() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/offers")
      .then((r) => r.json())
      .then((data) => setOffers(Array.isArray(data) ? data : []))
      .catch(() => setOffers([]));
  }, []);

  // autoplay
  useEffect(() => {
    if (offers.length <= 1) return;
    startAuto();
    return stopAuto;
  }, [offers]);

  function startAuto() {
    stopAuto();
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % offers.length);
    }, 4000);
  }

  function stopAuto() {
    if (timerRef.current) clearInterval(timerRef.current);
  }

  function prev() {
    stopAuto();
    setIndex((i) => (i - 1 + offers.length) % offers.length);
  }

  function next() {
    stopAuto();
    setIndex((i) => (i + 1) % offers.length);
  }

  if (!offers.length) return null;

  return (
    <div className="w-full bg-[#e5ad2c] py-6">

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Carousel window */}
        <div className="overflow-hidden rounded-lg shadow">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {offers.map((o) => (
              <div key={o.id} className="min-w-full flex-shrink-0">
                <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
                  <img
                    src={o.image ?? "/placeholder.jpg"}
                    alt={o.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Text overlay */}
                  <div className="absolute left-4 bottom-4 bg-white/90 px-4 py-2 rounded-md shadow">
                    <h3 className="font-semibold">{o.title}</h3>
                    {o.subtitle && (
                      <p className="text-sm text-gray-600">{o.subtitle}</p>
                    )}
                  </div>

                  {/* CTA */}
                  {o.cta && (
                    <a
                      href={o.cta}
                      className="absolute right-4 bottom-4 bg-[#ff6a3d] text-white px-4 py-2 rounded-md shadow text-sm"
                    >
                      Shop Now
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow rounded-full p-2"
        >
          <FiChevronLeft className="text-xl" />
        </button>

        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow rounded-full p-2"
        >
          <FiChevronRight className="text-xl" />
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {offers.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                stopAuto();
                setIndex(i);
              }}
              className={`w-3 h-3 rounded-full ${
                index === i ? "bg-gray-800" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
