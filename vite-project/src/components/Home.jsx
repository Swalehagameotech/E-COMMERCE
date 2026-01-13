import Hero from './Hero';
import Middle from './Middle';
import NewArrivalSection from './NewArrivalSection';
import TrendingSection from './TrendingSection';
import DiscountSection from './DiscountSection';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FEEAC9' }}>
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