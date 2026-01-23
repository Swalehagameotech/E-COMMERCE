import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import Hero from './Hero';
import Footer from './Footer';

const FAQ = () => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState({});

  const handleBackClick = () => {
    navigate('/');
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const faqData = {
    'Orders & Shipping': [
      {
        question: 'How long does shipping take?',
        answer: 'Standard shipping takes 5-7 business days, Express shipping takes 2-3 business days, and Same Day delivery is available in select cities.'
      },
      {
        question: 'What are the shipping charges?',
        answer: 'Standard shipping is free on orders above ₹1,000, otherwise ₹99. Express shipping costs ₹199, and Same Day delivery costs ₹299.'
      },
      {
        question: 'Can I change or cancel my order?',
        answer: 'You can change or cancel your order within 1 hour of placing it. After that, please contact our customer service team for assistance.'
      },
      {
        question: 'How do I track my order?',
        answer: 'Once your order is shipped, you\'ll receive a tracking number via email and SMS. You can also track your order through your account dashboard.'
      }
    ],
    'Returns & Refunds': [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy. Items must be in original condition with tags attached. Some items like intimate wear and customized products are not returnable.'
      },
      {
        question: 'How do I return an item?',
        answer: 'Log into your account, go to your orders, and select the item you want to return. Follow the instructions to schedule a pickup or print a return label.'
      },
      {
        question: 'How long does it take to process a refund?',
        answer: 'Refunds are processed within 5-7 business days after we receive your returned item. The amount will be credited to your original payment method.'
      },
      {
        question: 'Do you offer exchanges?',
        answer: 'Yes, we offer exchanges for different sizes or colors within 30 days of purchase, subject to availability.'
      }
    ],
    'Products & Sizing': [
      {
        question: 'How do I find my size?',
        answer: 'Each product page has a detailed size chart. You can also use our virtual fitting tool or contact customer service for personalized sizing advice.'
      },
      {
        question: 'Are your products authentic?',
        answer: 'Yes, all our products are 100% authentic. We source directly from brands and authorized distributors.'
      },
      {
        question: 'Do you offer gift wrapping?',
        answer: 'Yes, we offer complimentary gift wrapping for orders above ₹2,000. You can select this option during checkout.'
      },
      {
        question: 'What if an item is out of stock?',
        answer: 'You can sign up for restock notifications on the product page. We\'ll email you when the item is back in stock.'
      }
    ],
    'Payment & Security': [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit/debit cards, UPI, net banking, digital wallets, and cash on delivery for eligible orders.'
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Yes, we use industry-standard SSL encryption and comply with PCI DSS standards to protect your payment information.'
      },
      {
        question: 'Do you offer installment plans?',
        answer: 'Yes, we offer EMI options through select credit cards and buy-now-pay-later services like Simpl and LazyPay.'
      },
      {
        question: 'I was charged twice. What should I do?',
        answer: 'Double charges are usually temporary holds that get released automatically. If the issue persists after 3-5 business days, please contact us.'
      }
    ],
    'Account & Support': [
      {
        question: 'How do I create an account?',
        answer: 'Click on "Sign Up" at the top of any page and fill in your details. You can also create an account during checkout.'
      },
      {
        question: 'I forgot my password. How do I reset it?',
        answer: 'Click on "Forgot Password" on the login page and enter your email. We\'ll send you a link to reset your password.'
      },
      {
        question: 'How can I contact customer service?',
        answer: 'You can reach us through our Contact Us page, email us at support@bloom.com, or call us at 91824559.'
      },
      {
        question: 'Do you have a loyalty program?',
        answer: 'Yes, our Bloom Rewards program offers points for every purchase, exclusive discounts, and early access to sales.'
      }
    ]
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600">
              Find answers to common questions about shopping with us.
            </p>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-6">
            {Object.entries(faqData).map(([section, questions]) => (
              <div key={section} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleSection(section)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <h2 className="text-xl font-semibold text-gray-900">{section}</h2>
                  {openSections[section] ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                {openSections[section] && (
                  <div className="px-6 py-4 space-y-4">
                    {questions.map((faq, index) => (
                      <div key={index} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                        <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Please get in touch with our friendly team.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-[#A02E4C]  hover:bg-[#cb4d6f] text-white font-semibold  py-3 px-8 rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;