import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import kurtiImage from '../assets/herosection/kutabanner.png';
import sariImage from '../assets/herosection/skincarebanner.png';
import watchesImage from '../assets/herosection/watchbanner.png';
import MiddleBottom from './MiddleBottom';

const Middle = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentMobileSlide, setCurrentMobileSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobileAutoPlaying, setIsMobileAutoPlaying] = useState(true);

  // Desktop slides
  const slides = [
    {
      id: 1,
      image:"https://res.cloudinary.com/dvkxgrcbv/image/upload/v1771571197/Untitled_1920_x_600_px_11_dfmjzx.png",
      fallbackBg: "bg-gradient-to-r from-pink-400 to-purple-500"
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dvkxgrcbv/image/upload/v1768649601/Black_and_Gold_Elegant_Special_New_Year_s_Watch_Promo_Banner_Design_1920_x_600_px_1_z7rvvq.png",
      fallbackBg: "bg-gradient-to-r from-blue-400 to-indigo-500"
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/dvkxgrcbv/image/upload/v1768647590/White_Modern_Simple_Minimalist_Beauty_Skincare_Products_Presentation_1920_x_600_px_1920_x_600_px_nzlpou.png",
      fallbackBg: "bg-gradient-to-r from-gray-600 to-gray-800"
    },
  ];

  // Mobile slides
  const mobileSlides = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dvkxgrcbv/image/upload/v1771571221/Untitled_1920_x_600_px_1080_x_1080_px_ajdodt.png",
      fallbackBg: "bg-gradient-to-r from-pink-400 to-purple-500"
    },
    {
      id: 2,
      image:"https://res.cloudinary.com/dvkxgrcbv/image/upload/v1768650831/White_Modern_Simple_Minimalist_Beauty_Skincare_Products_Presentation_1920_x_600_px_1920_x_600_px_1080_x_1080_px_1080_x_1080_px_1080_x_1080_px_qvhejd.png",
      fallbackBg: "bg-gradient-to-r from-blue-400 to-indigo-500"
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/dvkxgrcbv/image/upload/v1768649490/White_Modern_Simple_Minimalist_Beauty_Skincare_Products_Presentation_1920_x_600_px_1920_x_600_px_1080_x_1080_px_1080_x_1080_px_l6kzhw.png",
    },
  ];

  // Desktop carousel auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Mobile carousel auto-play
  useEffect(() => {
    if (!isMobileAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentMobileSlide((prev) => (prev + 1) % mobileSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobileAutoPlaying, mobileSlides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Mobile slide navigation
  const goToMobileSlide = (index) => {
    setCurrentMobileSlide(index);
    setIsMobileAutoPlaying(false);
    setTimeout(() => setIsMobileAutoPlaying(true), 10000);
  };

  const nextMobileSlide = () => {
    setCurrentMobileSlide((prev) => (prev + 1) % mobileSlides.length);
    setIsMobileAutoPlaying(false);
    setTimeout(() => setIsMobileAutoPlaying(true), 10000);
  };

  const prevMobileSlide = () => {
    setCurrentMobileSlide((prev) => (prev - 1 + mobileSlides.length) % mobileSlides.length);
    setIsMobileAutoPlaying(false);
    setTimeout(() => setIsMobileAutoPlaying(true), 10000);
  };

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) nextMobileSlide();
    if (distance < -minSwipeDistance) prevMobileSlide();
  };

  return (
<section className="relative w-full overflow-hidden mt-24 lg:mt-28">

      {/* Desktop Carousel */}
      <div className="hidden lg:block relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-full flex-shrink-0 relative">
              <div className="w-full relative">
                <img
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 bg-secondary flex items-center justify-center">
                  <span className="text-gray-400">Image not available</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition-colors duration-200 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition-colors duration-200 z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Mobile Carousel */}
      <div className="lg:hidden relative w-full h-auto overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentMobileSlide * 100}%)` }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {mobileSlides.map((slide) => (
            <div key={slide.id} className="w-screen h-full flex-shrink-0">
              <img
                src={slide.image}
                alt={`Slide ${slide.id}`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden absolute inset-0 bg-secondary flex items-center justify-center">
                <span className="text-gray-400">Image not available</span>
              </div>
            </div>
          ))}
        </div>

        {mobileSlides.length > 1 && (
          <>
            <button
              onClick={prevMobileSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-colors duration-200 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={nextMobileSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-colors duration-200 z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      <MiddleBottom />
    </section>
  );
};

export default Middle;
