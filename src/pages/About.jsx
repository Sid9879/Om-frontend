import React from 'react';

const About = () => {
  return (
    <div className="about-page" style={{ backgroundColor: '#F7F4E1' }}>
      <header style={{ backgroundColor: '#8B9467', padding: '20px', color: '#FFFFFF' }}>
        <h1>About Om Agro Center</h1>
      </header>
      <section className="about-content" style={{ padding: '40px' }}>
        <p style={{ color: '#333333' }}>Welcome to Om Agro Center, your one-stop online platform for all your agricultural needs. We are dedicated to providing farmers, gardeners, and agricultural enthusiasts with a wide range of high-quality products and services to help them grow and thrive.</p>
        <p style={{ color: '#333333' }}>Our mission is to make agriculture easier, more efficient, and more sustainable. We believe that by providing access to the right products and resources, we can empower farmers and gardeners to produce healthy and abundant crops, while also promoting environmentally friendly practices.</p>
        <img src="about-image.jpg" alt="About Image" style={{ maxWidth: '100%', height: 'auto', margin: '20px 0' }} />
      </section>
      <section className="our-story" style={{ backgroundColor: '#8B9467', padding: '20px', color: '#FFFFFF' }}>
        <h2>Our Story</h2>
        <p style={{ color: '#FFFFFF' }}>Om Agro Center was founded by a team of passionate agricultural professionals who saw an opportunity to bridge the gap between farmers and suppliers. We recognized that traditional agricultural supply chains were often inefficient, expensive, and limited in their offerings. So, we set out to create a platform that would connect farmers directly with suppliers, providing them with a wider range of products, competitive pricing, and exceptional customer service.</p>
      </section>
      <section className="our-values" style={{ padding: '40px' }}>
        <h2>Our Values</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <strong style={{ color: '#34C759' }}>Quality</strong>: We are committed to providing high-quality products that meet the highest standards of excellence.
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong style={{ color: '#34C759' }}>Customer Service</strong>: We are dedicated to providing exceptional customer service, ensuring that our customers receive the support they need to succeed.
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong style={{ color: '#34C759' }}>Sustainability</strong>: We believe in promoting environmentally friendly practices and sustainable agriculture, and we strive to minimize our impact on the environment.
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong style={{ color: '#34C759' }}>Innovation</strong>: We are committed to staying at the forefront of agricultural innovation, providing our customers with the latest products and technologies to help them succeed.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;