import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Scale, CreditCard, Truck, RefreshCw, AlertTriangle } from 'lucide-react';
import Hero from './Hero';
import Footer from './Footer';

const TermsOfService = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Arrow */}
      <button
        onClick={handleBackClick}
        className="fixed top-20 left-4 z-[110] bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <Hero />
      
      <div className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
            
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using Bloom Store's website and services, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            {/* Use License */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Use License</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  Permission is granted to temporarily download one copy of the materials on Bloom Store's website for 
                  personal, non-commercial transitory viewing only.
                </p>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">This license shall automatically terminate if you violate any of these restrictions:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for commercial purposes or public display</li>
                    <li>Attempt to reverse engineer any software on the website</li>
                    <li>Remove any copyright or proprietary notations</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Account Terms */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Terms</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>You must be 18 years or older to create an account</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You are responsible for all activities that occur under your account</li>
                <li>You must provide accurate and complete information</li>
                <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
              </ul>
            </section>

            {/* Orders and Payment */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Orders and Payment</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Acceptance</h3>
                  <p className="text-gray-600">
                    All orders are subject to acceptance and availability. We reserve the right to refuse or cancel 
                    any order for any reason, including but not limited to product availability, errors in pricing, 
                    or suspected fraudulent activity.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing</h3>
                  <p className="text-gray-600">
                    All prices are in Indian Rupees (INR) and include applicable taxes unless otherwise stated. 
                    Prices are subject to change without notice. We reserve the right to correct pricing errors.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment</h3>
                  <p className="text-gray-600">
                    Payment is due at the time of purchase. We accept major credit cards, debit cards, UPI, 
                    net banking, and cash on delivery (where available).
                  </p>
                </div>
              </div>
            </section>

            {/* Shipping and Delivery */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Truck className="h-6 w-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">Shipping and Delivery</h2>
              </div>
              
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Delivery times are estimates and not guaranteed</li>
                <li>Risk of loss passes to you upon delivery to the carrier</li>
                <li>You are responsible for providing accurate delivery information</li>
                <li>Additional charges may apply for remote locations</li>
                <li>We are not responsible for delays caused by customs or other authorities</li>
              </ul>
            </section>

            {/* Returns and Refunds */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="h-6 w-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Returns and Refunds</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Return Policy</h3>
                  <p className="text-gray-600">
                    Items may be returned within 30 days of delivery in original condition with tags attached. 
                    Some items such as intimate wear, customized products, and perishables are not returnable.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Refund Process</h3>
                  <p className="text-gray-600">
                    Refunds will be processed within 5-7 business days after we receive your returned item. 
                    Refunds will be credited to your original payment method. Shipping charges are non-refundable.
                  </p>
                </div>
              </div>
            </section>

            {/* Prohibited Uses */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h2 className="text-2xl font-bold text-gray-900">Prohibited Uses</h2>
              </div>
              
              <p className="text-gray-600 mb-4">You may not use our service:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property Rights</h2>
              <p className="text-gray-600">
                The service and its original content, features, and functionality are and will remain the exclusive 
                property of Bloom Store and its licensors. The service is protected by copyright, trademark, and 
                other laws. Our trademarks and trade dress may not be used without our prior written consent.
              </p>
            </section>

            {/* Disclaimer */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, 
                  this Company excludes all representations, warranties, conditions and terms whether express or implied, 
                  statutory or otherwise.
                </p>
              </div>
            </section>

            {/* Limitations */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitations of Liability</h2>
              <p className="text-gray-600">
                In no event shall Bloom Store, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                be liable for any indirect, incidental, special, consequential, or punitive damages, including without 
                limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-600">
                These Terms shall be interpreted and governed by the laws of India. Any disputes relating to these 
                terms shall be subject to the exclusive jurisdiction of the courts of Bangalore, Karnataka.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-600">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> legal@bloom.com</p>
                <p><strong>Phone:</strong> 91824559</p>
                <p><strong>Address:</strong> 103 Bloom Store, Bangalore, INDIA</p>
              </div>
              
              <div className="mt-6">
                <a 
                  href="/contact" 
                  className="inline-block bg-[#A02E4C]  hover:bg-[#cb4d6f] text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;