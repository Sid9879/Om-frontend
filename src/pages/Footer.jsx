import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import { motion } from 'framer-motion';

export default function Footer() {
  const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);

  return (
    <div>
      <footer className='bg-gray-900 text-gray-300 py-6'>
        <div className='container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className='text-white text-3xl font-bold mb-6 tracking-wide'>Om Agro Center</h3>
            <p className='text-sm leading-relaxed text-gray-400'>
              Your trusted partner for all agricultural needs. Providing quality seeds, pesticides, and fertilizers to
              empower farmers.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className='text-white text-2xl font-bold mb-6'>Quick Links</h3>
            <ul>
              <li className='mb-3'>
                <Link to='/' className='hover:text-white transition duration-200 flex items-center'>
                  <i className='fas fa-chevron-right mr-3 text-green-500 text-base'></i> Home
                </Link>
              </li>
              <li className='mb-3'>
                <Link to='/seed' className='hover:text-white transition duration-200 flex items-center'>
                  <i className='fas fa-chevron-right mr-3 text-green-500 text-base'></i> Seeds
                </Link>
              </li>
              <li className='mb-3'>
                <Link to='/pesticide' className='hover:text-white transition duration-200 flex items-center'>
                  <i className='fas fa-chevron-right mr-3 text-green-500 text-base'></i> Pesticides
                </Link>
              </li>
              <li className='mb-3'>
                <Link to='/fertilizer' className='hover:text-white transition duration-200 flex items-center'>
                  <i className='fas fa-chevron-right mr-3 text-green-500 text-base'></i> Fertilizers
                </Link>
              </li>
              <li className='mb-3'>
                <Link to='/about' className='hover:text-white transition duration-200 flex items-center'>
                  <i className='fas fa-chevron-right mr-3 text-green-500 text-base'></i> About Us
                </Link>
              </li>
              <li className='mb-3'>
                <Link to='/contact' className='hover:text-white transition duration-200 flex items-center'>
                  <i className='fas fa-chevron-right mr-3 text-green-500 text-base'></i> Contact Us
                </Link>
              </li>
              <li className='mb-3'>
                <button
                  onClick={() => setShowPrivacyPolicyModal(true)}
                  className='bg-transparent border-none text-gray-300 hover:text-white transition duration-200 flex items-center cursor-pointer text-left p-0'
                >
                  <i className='fas fa-chevron-right mr-3 text-green-500 text-base'></i> Privacy Policy
                </button>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className='text-white text-2xl font-bold mb-6'>Contact Us</h3>
            <p className='mb-4 flex items-start leading-relaxed'>
              <i className='fas fa-map-marker-alt mr-3 text-green-500 text-xl mt-1'></i> Bargadawa Sumergarh
              Maharajganj,
              <br /> Uttar Pradesh, India 273306,
            </p>
            <p className='mb-4 flex items-center'>
              <i className='fas fa-phone mr-3 text-green-500 text-xl'></i> +91 9889079086
            </p>
            <p className='flex items-center'>
              <i className='fas fa-envelope mr-3 text-green-500 text-xl'></i> quickhirehub143@gmail.com
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className='text-white text-2xl font-bold mb-6'>Follow Us</h3>
            <div className='flex space-x-6 text-4xl'>
              <Link to='#' target='_blank' className='hover:text-white transition duration-200 transform hover:scale-110'>
                <i className='fab fa-facebook-f'></i>
              </Link>
              <Link to='#' target='_blank' className='hover:text-white transition duration-200 transform hover:scale-110'>
                <i className='fab fa-instagram'></i>
              </Link>
              <Link to='#' target='_blank' className='hover:text-white transition duration-200 transform hover:scale-110'>
                <i className='fab fa-youtube'></i>
              </Link>
            </div>
          </motion.div>
        </div>
        <div className='border-t border-gray-700 mt-16 pt-8 text-center text-sm text-gray-400'>
          <p>&copy; 2023 Om Agro Center. All Rights Reserved.</p>
        </div>
      </footer>
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
}