import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import kurtiImage from '../assets/herosection/kutabanner.png';
import sariImage from '../assets/herosection/skincarebanner.png';
import watchesImage from '../assets/herosection/watchbanner.png';
import MiddleBottom from './MiddleBottom';

const Middle = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      image: kurtiImage,
      fallbackBg: "bg-gradient-to-r from-pink-400 to-purple-500"
    },
    {
      id: 2,
      image: sariImage,
      fallbackBg: "bg-gradient-to-r from-blue-400 to-indigo-500"
    },
    {
      id: 3,
      image: watchesImage,
      fallbackBg: "bg-gradient-to-r from-gray-600 to-gray-800"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

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
    if (distance > minSwipeDistance) nextSlide();
    if (distance < -minSwipeDistance) prevSlide();
  };

  return (
    <section className="relative w-screen overflow-hidden mt-20">


      {/* Desktop Carousel */}
      <div className="hidden lg:block relative w-screen h-[50vh] overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-screen h-full flex-shrink-0 relative">
              <div className={`w-full h-full ${slide.fallbackBg} relative`}>
                <img
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  className="w-full h-full object-cover object-center
"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="absolute inset-0 hidden items-center justify-center text-white">
                  <h2 className="text-4xl font-bold">Image {slide.id}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#E6D8C3] hover:bg-white/30 text-white p-3 rounded-full backdrop-blur z-10 focus:outline-none focus:ring-0 active:outline-none"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#E6D8C3] hover:bg-white/30 text-white p-3 rounded-full backdrop-blur z-10 focus:outline-none focus:ring-0 active:outline-none"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full  focus:outline-none focus:ring-0
             focus-visible:outline-none focus-visible:ring-0 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-[#E6D8C3]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="lg:hidden relative w-screen h-[50vh] overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-screen h-full flex-shrink-0">
              <img
                src={slide.image}
                alt={`Slide ${slide.id}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 text-white p-2 rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 text-white p-2 rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <MiddleBottom />
    </section>
  );
};

export default Middle;
