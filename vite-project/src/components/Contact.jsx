import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import Footer from './Footer';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowModal(true);
    }, 500);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/home');
  };

  return (
    <>
      <Hero />

<div className="min-h-screen bg-gray-50 pt-24 bg-gradient-to-br from-[#EDDFE0] to-[##F4C2C2 ] rounded-xl">





        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">

            {/* Heading moved slightly up */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold -mt-2 mb-4 text-center bg-gradient-to-r from-[#8D493A] via-gray-700 to-[#8D493A] bg-clip-text text-transparent tracking-wide">
              Contact Us
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#835151] mb-4">Get in Touch</h2>
                  <p className="text-gray-600 mb-6">
                    We'd love to hear from you! Reach out to us through any of the
                    following channels.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#7D5A50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#835151] mb-1">Email</h3>
                      <a href="mailto:support@ecommerce.com" className="text-[#7D5A50] font-bold">
                        support@bloom.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#7D5A50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <a href="tel:+1234567890" className="text-[#7D5A50] font-bold">
                        918234590
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-xl font-bold text-[#835151] mb-4">Send us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />

                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />

                  {/* Reduced message height */}
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#7D5A50] hover:bg-[#B4846C] text-white font-semibold py-2.5 rounded-lg"
                  >
                    {loading ? 'Sending...' : 'Send'}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
