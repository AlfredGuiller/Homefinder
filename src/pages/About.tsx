  import React from 'react';
  import logo from '/public/home.png'
  import Image from 'next/image';



  function About() {
  return (
  <main className="main" id="about">
  <div className="container">
  <div className="row">
  <div className="colMd6">
    <h1 id="about-us">About Us</h1>
    <p>
      Finding a home online can be overwhelming. There are countless websites and apps to choose from, each with their own unique features and listings. At Our Home, we believe that finding your dream home should be easy and stress-free.
    </p>
    <p>
      Our Home is a platform that connects renters with landlords and property managers. We make it easy to browse listings, schedule viewings, and apply for apartments all in one place. Our goal is to simplify the rental process and help you find the perfect home for your needs.
    </p>
    <p>
      We're committed to providing a seamless experience for renters and landlords alike. Our platform is designed to be user-friendly and efficient, with features like online rent payments and maintenance requests. With Our Home, you can spend less time worrying about the logistics of renting and more time enjoying your new home.
    </p>
  </div>
  <div className="colMd6">
    <Image src={logo} alt="About Us Image" />
  </div>
  </div>
  </div>


  <style jsx>{`

  .container {
    background-color: rgba(255, 255, 255, 0.9);
  }

 `}</style>


  
  </main>

  );
  }

  export default About;
