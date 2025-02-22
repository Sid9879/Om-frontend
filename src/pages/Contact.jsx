import React from "react";

const Contact = () => {
  
  const contactInfo = {
    address: "Gorakhpur 273001, Uttar Pradesh, India",
    phone: "+91 1234567890",
    email: "support@omagro.com",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
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
  );
};

export default Contact;
