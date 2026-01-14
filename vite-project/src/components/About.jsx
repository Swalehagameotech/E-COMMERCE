import Hero from './Hero';
import Footer from './Footer';

const About = () => {
  return (
    <>
      <Hero />
      <div className="min-h-screen bg-gray-50 pt-20 bg-gradient-to-br from-[#EDDFE0] to-[#FFECC8] rounded-xl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#8D493A] via-gray-700 to-[#8D493A]
                           bg-clip-text text-transparent tracking-wide mb-6 text-center">
            About Us
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <p className="text-lg leading-relaxed">
              Welcome to our e-commerce platform, where fashion meets quality and trust. 
              We are passionate about providing you with the finest selection of products 
              that combine style, comfort, and affordability.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#835151] mt-8 mb-4">Our Mission</h2>
              <p className="leading-relaxed">
                Our mission is to deliver exceptional fashion products that empower you to 
                express your unique style. We believe that everyone deserves access to 
                high-quality, trendy products at affordable prices.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#835151] mt-8 mb-4">Quality First</h2>
              <p className="leading-relaxed">
                Quality is at the heart of everything we do. We carefully curate our 
                product selection, ensuring that each item meets our strict standards for 
                durability, design, and craftsmanship. Every product in our collection 
                reflects our commitment to excellence.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#835151] mt-8 mb-4">Trust & Reliability</h2>
              <p className="leading-relaxed">
                We understand that trust is earned through consistent, reliable service. 
                Our team is dedicated to providing you with a seamless shopping experience, 
                from browsing our catalog to receiving your order. Your satisfaction is our 
                top priority, and we stand behind every product we sell.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#835151] mt-8 mb-4">Fashion Forward</h2>
              <p className="leading-relaxed">
                Stay ahead of trends with our constantly updated collection. We bring you 
                the latest styles in accessories, footwear, fashion, and more. Whether you're 
                looking for everyday essentials or statement pieces, we have something special 
                for everyone.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-600 italic">
                Thank you for choosing us. We're honored to be part of your fashion journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default About;
