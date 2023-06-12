import React from 'react';
import Link from 'next/link';

export default function ApartmentForm() {
  return (
    <div className="container">
      <div className="animated-word">
        <div className="letter">H</div>
        <div className="letter">O</div>
        <div className="letter">M</div>
        <div className="letter">E</div>
        <div className="letter">F</div>
        <div className="letter">I</div>
        <div className="letter">N</div>
        <div className="letter">D</div>
        <div className="letter">E</div>
        <div className="letter">R</div>
      </div>
      <p className="description">Finding a new home has never been easier. Experience the convenience and efficiency of HomeFinder, where tenants and landlords connect seamlessly.
      Find your perfect home or promote your apartment. HomeFinder is the ultimate platform for tenants and landlords.</p>
     
      <div className="button-container">
  
      <button className="button">
        <span className="button_lg">
          <span className="button_sl"></span>
          <span className="button_text">FIND YOUR DREAM APARTMENT</span>
        </span>
      </button>
        
      </div>
      

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          
          
          min-width: 100vw; /* Updated property */
          background-image: url('/city.png');
          background-size: 100%; /* Updated property */
          background-position: center;
        }

        .animated-word {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .letter {
          transition: 0.4s;
          transform: translateY(0);
          cursor: grab;
          color: white;
          font-size: 200px;
          animation: bounce 1.5s infinite alternate;
        }

        .letter:hover {
          transform: translateY(-1rem);
          background: -webkit-linear-gradient(120deg, hsl(19, 90%, 52%), hsl(56, 100%, 50%));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .description {
          margin-bottom: 20px;
          color: white;
          text-align: center;
        }

        @keyframes bounce {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-1rem);
          }
        }

        /* BUTTON */
        .button-container {
          display: flex;
          position: relative;
          right: 35px;
        }
        .button {
          -moz-appearance: none;
          -webkit-appearance: none;
          appearance: none;
          border: none;
          background: none;
          color: #0f1923;
          cursor: pointer;
          position: relative;
          padding: 8px;
          margin-bottom: 20px;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 14px;
          transition: all .15s ease;
          display: flex;
          left: 100px;
          justify-content: center;
          align-items: center;
          margin-right: 70px;
          flex-shrink: 0;
        }

        .button::before,
        .button::after {
          content: '';
          display: block;
          position: absolute;
          right: 0;
          left: 0;
          height: calc(50% - 5px);
          border: 1px solid #7D8082;
          transition: all .15s ease;
        }
        
        .button::before {
          top: 0;
          border-bottom-width: 0;
        }
        
        .button::after {
          bottom: 0;
          border-top-width: 0;
        }
        
        .button:active,
        .button:focus {
          outline: none;
        }
        
        .button:active::before,
        .button:active::after {
          right: 3px;
          left: 3px;
        }
        
        .button:active::before {
          top: 3px;
        }
        
        .button:active::after {
          bottom: 3px;
        }
        
        .button_lg {
          position: relative;
          display: block;
          padding: 10px 20px;
          color: #fff;
          background-color: #0f1923;
          overflow: hidden;
          box-shadow: inset 0px 0px 0px 1px transparent;
        }
        
        .button_lg::before {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 2px;
          height: 2px;
          background-color: #0f1923;
        }
        
        .button_lg::after {
          content: '';
          display: block;
          position: absolute;
          right: 0;
          bottom: 0;
          width: 4px;
          height: 4px;
          background-color: #0f1923;
          transition: all .2s ease;
        }
        
        .button_sl {
          display: block;
          position: absolute;
          top: 0;
          bottom: -1px;
          left: -8px;
          width: 0;
          background-color: #ff4655;
          transform: skew(-15deg);
          transition: all .2s ease;
        }
        
        .button_text {
          position: relative;
        }
        
        .button:hover {
          color: #0f1923;
        }
        
        .button:hover .button_sl {
          width: calc(100% + 15px);
        }
        
        .button:hover .button_lg::after {
          background-color: #fff;
        }
      `}</style>
    </div>
  );
}
