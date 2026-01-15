import { useEffect } from 'react';
import Hero from './Hero';
import Middle from './Middle';
import NewArrivalSection from './NewArrivalSection';
import TrendingSection from './TrendingSection';
import DiscountSection from './DiscountSection';
import Footer from './Footer';

const Home = () => {
  useEffect(() => {
    // Hide scrollbars on body/html when Home component mounts
    const originalBodyOverflowX = document.body.style.overflowX;
    const originalHtmlOverflowX = document.documentElement.style.overflowX;
    const originalBodyScrollbarWidth = document.body.style.scrollbarWidth;
    const originalBodyMsOverflowStyle = document.body.style.msOverflowStyle;
    
    // Hide horizontal scrollbar
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.scrollbarWidth = 'none';
    document.body.style.msOverflowStyle = 'none';
    
    // Hide webkit scrollbars (vertical and horizontal)
    const styleId = 'home-scrollbar-hide';
    let style = document.getElementById(styleId);
    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        body::-webkit-scrollbar,
        html::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      // Restore original styles when component unmounts
      document.body.style.overflowX = originalBodyOverflowX;
      document.documentElement.style.overflowX = originalHtmlOverflowX;
      document.body.style.scrollbarWidth = originalBodyScrollbarWidth;
      document.body.style.msOverflowStyle = originalBodyMsOverflowStyle;
      if (style && style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-secondary" style={{ overflowX: 'hidden' }}>
      <Hero />
      <Middle />
      <NewArrivalSection />
      <TrendingSection />
      <DiscountSection />
      <Footer />
    </div>
  );
};

export default Home;