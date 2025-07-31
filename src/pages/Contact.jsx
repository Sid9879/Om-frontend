import React from "react";
import Footer from "./Footer";

const Contact = () => {
  
  const contactInfo = {
    address: "Bargadawa Sumergarh Maharajganj, Uttar Pradesh, India 273306",
    phone: "+91 9889079086",
    email: "quickhirehub143@gmail.com",
  };

  return (
 <div>
     <div className="max-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h2>

        <div className="space-y-4 text-lg text-gray-700">
          <div>
            <strong>📍 Address:</strong> <span>{contactInfo.address}</span>
          </div>
          <div>
            <strong>📞 Phone:</strong>{" "}
            <a href={`tel:${contactInfo.phone}`} className="text-blue-500">
              {contactInfo.phone}
            </a>
          </div>
          <div>
            <strong>📧 Email:</strong>{" "}
            <a href={`mailto:${contactInfo.email}`} className="text-blue-500">
              {contactInfo.email}
            </a>
          </div>
        </div>
      </div>
    </div>
      <Footer/>
 </div>
  );
};

export default Contact;
