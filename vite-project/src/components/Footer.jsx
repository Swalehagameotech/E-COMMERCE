import { Mail, Phone, MapPin, Truck, ShieldCheck, RefreshCw, Star } from 'lucide-react';
const logo = 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1768745498/bloom-removebg-preview_s6namb.png';
const Footer = () => {
  return (
    <footer className="w-full bg-secondary text-primary pt-16 pb-10 border-t-4 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">

        {/* Why Choose Us Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 pb-12 border-b border-primary/10">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Truck className="w-6 h-6 text-accent" />
            </div>
            <h4 className="font-serif font-bold text-lg">Free Shipping</h4>
            <p className="text-sm text-primary/70 max-w-xs">On all orders over $100. Delivered safely to your doorstep.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-6 h-6 text-accent" />
            </div>
            <h4 className="font-serif font-bold text-lg">Secure Payment</h4>
            <p className="text-sm text-primary/70 max-w-xs">100% secure payment processing with top-tier encryption.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <RefreshCw className="w-6 h-6 text-accent" />
            </div>
            <div className="flex flex-col">
              <h4 className="font-serif font-bold text-lg">Easy Returns</h4>
              <p className="text-sm text-primary/70 max-w-xs">Love it or return it within 30 days. No questions asked.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <img src={logo} alt="LUXE" className="h-10 w-auto" />
            <p className="text-primary/70 text-sm leading-relaxed max-w-xs">
              Redefining contemporary fashion with timeless elegance. Quality craftsmanship for the modern woman.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-accent hover:text-white transition-colors cursor-pointer shadow-sm text-primary">
                <span className="text-xs font-bold">IG</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-accent hover:text-white transition-colors cursor-pointer shadow-sm text-primary">
                <span className="text-xs font-bold">FB</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-accent hover:text-white transition-colors cursor-pointer shadow-sm text-primary">
                <span className="text-xs font-bold">TW</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-serif font-bold text-primary">Shop</h4>
            <ul className="space-y-4">
              <li><a href="/products" className="text-primary/70 hover:text-accent transition-colors text-sm">New Arrivals</a></li>
              <li><a href="/products" className="text-primary/70 hover:text-accent transition-colors text-sm">Best Sellers</a></li>
              <li><a href="/products" className="text-primary/70 hover:text-accent transition-colors text-sm">Accessories</a></li>
              <li><a href="/products" className="text-primary/70 hover:text-accent transition-colors text-sm">Sale</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-6">
            <h4 className="text-lg font-serif font-bold text-primary">Customer Care</h4>
            <ul className="space-y-4">
              <li><a href="/contact" className="text-primary/70 hover:text-accent transition-colors text-sm">Contact Us</a></li>
              <li><a href="#" className="text-primary/70 hover:text-accent transition-colors text-sm">Shipping & Returns</a></li>
              <li><a href="#" className="text-primary/70 hover:text-accent transition-colors text-sm">Size Guide</a></li>
              <li><a href="#" className="text-primary/70 hover:text-accent transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-serif font-bold text-primary">Contact</h4>
            <div className="space-y-4 text-sm text-primary/70">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5" />
                <span>123 Fashion Ave, <br />New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <span>care@luxe.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary/60">
            © {new Date().getFullYear()} Luxe Store. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-primary/60 hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-primary/60 hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
