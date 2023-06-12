import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '/public/Finder.png';
import LOGIN from './login';



const Navbar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleIconClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogoutClick = () => {
    // Perform logout action
    console.log('Logout clicked');
  };

 

  return (

  
    <div>

<LOGIN/>

  <nav>
  <button data-text="Awesome" className="button">
    <span className="actual-text">&nbsp;HOMEFINDER&nbsp;</span>
    <span className="hover-text" aria-hidden="true">&nbsp;HOMEFINDER&nbsp;</span>
</button>
     
      <style jsx>{`
     

       
        /* Navbar */
        nav {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          height: 120px;
          transition: background-color 0.3s ease;
        }
        
        nav.fixed {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
          z-index: 999;
          background-color: rgba(0, 0, 0, 0.3); /* Change the background color to fully opaque */
        }

        /* Rest of the styles remain the same */

        /* Image */
        .reverse {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          width: 200px;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          top: 10px;
        }

        .image-container {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
    
          .image-container :global(img) {
           
            transition: 0.5s ease;
            cursor: pointer;
          }
    
          .image-container :global(img:hover) {
            transform: scale(1.3);
            filter: grayscale(0%);
          }
          /* Login section */
          .login-section {
            margin-left: auto;
            display: flex;
            align-items: center;
          }
  
          .button-login,
          .button-signup {
            margin-left: 20px;
            padding: 8px 16px;
            border-radius: 4px;
            background-color: transparent;
            border: 1px solid black;
            color: black;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
  
          .button-login:hover,
          .button-signup:hover {
            background-color: red;
            color: #0f1923;
          }


          /*AHAHAHAHA*/
         
.button {
  margin: 0;
  height: auto;
  background: transparent;
  padding: 0;
  border: none;
}

/* button styling */
.button{
  --border-right: 6px;
  --text-stroke-color: rgba(255,255,255,0.6);
  --animation-color: #37FF8B;
  --fs-size: 2em;
  letter-spacing: 3px;
  text-decoration: none;
  font-size: var(--fs-size);
  font-family: "Arial";
  position: relative;
  text-transform: uppercase;
  color: black;
  -webkit-text-stroke: 1px var(--text-stroke-color);
}
/* this is the text, when you hover on button */
.hover-text {
  position: absolute;
  box-sizing: border-box;
  content: attr(data-text);
  color: var(--animation-color);
  width: 0%;
  inset: 0;
  border-right: var(--border-right) solid var(--animation-color);
  overflow: hidden;
  transition: 0.5s;
  -webkit-text-stroke: 1px var(--animation-color);
}
/* hover */
.button:hover .hover-text {
  width: 100%;
  filter: drop-shadow(0 0 23px var(--animation-color))
}
      `}</style>
    </nav>
  </div>
    
  );
};
export default Navbar;
