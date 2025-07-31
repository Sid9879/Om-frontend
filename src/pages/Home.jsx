import React from 'react';
import { Link } from 'react-router-dom';
import agri from '../assets/agri.jpg';
import seed from '../assets/seed.jpg';
import fertilizer from '../assets/fertilizer.jpeg';
import pesticides from '../assets/pesticides.jpg';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import { motion } from 'framer-motion';
import Footer from './Footer';

const Home = () => {
  const userStore = useSelector((state) => state.user);
  const [isVisible, setIsVisible] = useState(false);
  const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);

  const categories = [
    {
      name: 'Seeds',
      description: 'High-quality seeds for diverse crops, ensuring strong growth from the start.',
      imageUrl: seed,
      link: '/seed',
    },
    {
      name: 'Pesticides',
      description: 'Effective and safe solutions to protect your crops from pests and diseases.',
      imageUrl: pesticides,
      link: '/pesticide',
    },
    {
      name: 'Fertilizers',
      description: 'Nutrient-rich fertilizers to nourish soil and boost crop yield naturally.',
      imageUrl: fertilizer,
      link: '/fertilizer',
    },
  ];

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const categoryCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className='flex flex-col gap-8 bg-white'>
      <div className='min-h-screen bg-gradient-to-br from-green-50 to-lime-50 font-inter antialiased text-gray-800 '>
       <section className='bg-gradient-to-br from-green-500 to-lime-700 py-20 md:py-32 text-center relative overflow-hidden shadow-2xl'>
      <div className='container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16'>
        <motion.div
          className='text-left lg:w-1/2 text-white order-2 lg:order-1'
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h2
            className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 leading-tight tracking-wide'
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            Cultivating Growth, Harvesting Success.
          </motion.h2>
          <motion.p
            className='text-lg sm:text-xl md:text-2xl font-light opacity-90 mb-8 md:mb-12'
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          >
            Your trusted source for premium agricultural products and expert guidance.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.05 }}
          >
            <Link
              to='/'
              className='bg-white text-green-800 px-8 py-3 md:px-14 md:py-5 rounded-full text-lg md:text-2xl font-bold hover:bg-gray-100 transition duration-300 transform inline-block shadow-xl'
            >
              Shop Now <i className='fas fa-arrow-right ml-2 md:ml-3'></i>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className='lg:w-1/2 flex justify-center order-1 lg:order-2'
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <img
            src={agri}
            alt='Bountiful Harvest'
            className='rounded-3xl shadow-3xl w-full max-w-sm md:max-w-md lg:max-w-xl border-4 border-white'
          />
        </motion.div>
      </div>
    </section>
        <section className='py-24 text-center bg-white'>
          <div className='container mx-auto px-6'>
            <motion.h2
              className='text-5xl font-bold text-green-800 mb-16'
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
            >
              Explore Our Product Range
            </motion.h2>
            <motion.div
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'
              variants={containerVariants}
              initial='hidden'
              whileInView='show'
              viewport={{ once: true, amount: 0.3 }}
            >
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  className='bg-white rounded-3xl shadow-xl p-8 cursor-pointer border border-gray-100 flex flex-col items-center'
                  variants={categoryCardVariants}
                  whileHover='hover'
                 
                >
                  <motion.img
                    src={category.imageUrl}
                    alt={category.name}
                    className='w-full h-56 object-cover rounded-2xl mb-8 shadow-md border-2 border-gray-50'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                  <h3 className='text-3xl font-bold text-gray-900 mb-4'>{category.name}</h3>
                  <p className='text-gray-700 text-lg leading-relaxed mb-8'>{category.description}</p>
                  <Link
                    to={category.link}
                    className='inline-block bg-green-600 text-white px-9 py-4 rounded-full text-xl font-semibold hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-lg'
                  >
                    View All {category.name} <i className='fas fa-angle-right ml-2'></i>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

             <Footer/>

      </div>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className='fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition h-18 w-18 text-3xl flex items-center justify-center'
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          &uarr;
        </motion.button>
      )}
      {showPrivacyPolicyModal && (
        <motion.div
          className='fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className='relative bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8'
            initial={{ y: '-100vh', opacity: 0 }}
            animate={{ y: '0', opacity: 1 }}
            exit={{ y: '100vh', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          >
            <button
              onClick={() => setShowPrivacyPolicyModal(false)}
              className='absolute top-4 right-4 bg-red-600 text-white rounded-full h-10 w-10 flex items-center justify-center text-xl font-bold hover:bg-red-700 transition duration-300 focus:outline-none'
              aria-label='Close'
            >
              &times;
            </button>
            <PrivacyPolicyPage />
            <div className='text-center mt-8'>
              <button
                onClick={() => setShowPrivacyPolicyModal(false)}
                className='bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 shadow-lg'
              >
                OK
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Home;