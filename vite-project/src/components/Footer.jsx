import { Mail, Phone, MapPin, FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-[#987070] via-[#795757] to-[#987070] text-gray-300 py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Contact Us</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm sm:text-base font-medium text-white">Email</p>
                  <a href="mailto:support@ecommerce.com" className="text-sm sm:text-base text-gray-400 hover:text-purple-400 transition-colors break-all">
                    support@ecommerce.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm sm:text-base font-medium text-white">Phone</p>
                  <a href="tel:+1234567890" className="text-sm sm:text-base text-gray-400 hover:text-purple-400 transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
              Legal
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <a 
                href="#terms" 
                className="block text-sm sm:text-base text-gray-400 hover:text-purple-400 transition-colors"
              >
                Terms & Conditions
              </a>
              <a 
                href="#privacy" 
                className="block text-sm sm:text-base text-gray-400 hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="#refund" 
                className="block text-sm sm:text-base text-gray-400 hover:text-purple-400 transition-colors"
              >
                Refund Policy
              </a>
              <a 
                href="#shipping" 
                className="block text-sm sm:text-base text-gray-400 hover:text-purple-400 transition-colors"
              >
                Shipping Policy
              </a>
            </div>
          </div>

          {/* Location / Address */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
              Location
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-[#FFF0D1] leading-relaxed">
                    123 Commerce Street<br />
                    Business District<br />
                    City, State 12345<br />
                    Country
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-xs sm:text-sm text-[#FFF0D1]">
                  Business Hours:<br />
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800">
          <p className="text-center text-xs sm:text-sm text-gray-500">
            © {new Date().getFullYear()} E-Commerce Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
