import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '/public/Finder.png';
import TermsModal from './Terms';

import { useRouter } from 'next/router';

const Navbar = () => {
  /*FOR MODAL SIGNIN AND SIGNUP */
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [userType, setUserType] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const router = useRouter();
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const handleLoginModalOpen = () => setShowLoginModal(true);
  const handleLoginModalClose = () => setShowLoginModal(false);

  const handleTermsModalOpen = (e) => {
    e.preventDefault();
    setIsTermsModalOpen(true);
  };
  
  const handleTermsModalClose = () => {
    setIsTermsModalOpen(false);
  };
  

  const handleSignupModalOpen = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleLoginModalOpens = () => {
    setShowLoginModal(true);
    setShowSignupModal(false);
  };

  const handleSignupModalClose = () => {
    setShowSignupModal(false);
    clearSignupForm();
  };

  const clearSignupForm = () => {
    const form = document.querySelector('#signup-form');
    form.reset();
  };

  /* ----------------------------------------------------------------------------------------- */

  /*FOR CALLING API TO SUBMIT SIGNUP */

  const showErrorMessage = (message) => {
    alert(message);
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    if (!termsChecked) {
      alert('Please accept the terms and conditions.');
      return;
    }

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    data.gender = formData.get("gender"); // Add gender field
    data.age = parseInt(formData.get("age"));

    try {
      const response = await fetch('https://0ca3-175-176-33-143.ngrok-free.app/v1/test/add/user', {
        method: 'POST',
        headers: {

          'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'ngrok-skip-browser-warning':  'true'

        
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log(result);

      if (result.message === 'User registered successfully.') {
        showSuccessMessage(result.message);
        handleSignupModalClose();
        handleLoginModalOpen();
      } else {
        showErrorMessage(result.message);
      }
    } catch (error) {
      console.error(error);
      showErrorMessage('An error occurred while registering. Please try again later.');
    }
  };

  const showSuccessMessage = (message) => {
    alert(message);
  };

  /* FOR CALLING LOGIN API */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target && e.target.email ? e.target.email.value : "";
    const password = e.target && e.target.password ? e.target.password.value : "";

    const response = await fetch('https://0ca3-175-176-33-143.ngrok-free.app/v1/test/login/user', {
      method: 'POST',
      headers: { 
        'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'ngrok-skip-browser-warning':  'true'
         
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
      alert(data.message);
      setUserType(data.userType); // Set the user type
      // Redirect to appropriate landing page based on user type
      if (data.userType === "landlord") {
        // Redirect to landlord landing page
        window.location.replace("../landlord");
      } else if (data.userType === "tenant") {
        // Redirect to tenant landing page
        window.location.replace("../tenant");
      }
      else if (data.userType === "admin") {
        // Redirect to tenant landing page
        window.location.replace("../dashboard");
      }
    } else  {
      alert(data.message);
    }
  };

  useEffect(() => {
    if (userType) {
      if (userType === "landlord") {
        // Redirect to landlord landing page
        router.replace("/landlord");
      } else if (userType === "tenant") {
        // Redirect to tenant landing page
        router.replace("/tenant");
      }
    }
  }, [userType]);

  const handleTermsChange = () => {
    setTermsChecked(!termsChecked);
  };

  return (
    <div>
      {showLoginModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleLoginModalClose}>
              &times;
            </span>
            <form className="forms" onSubmit={handleSubmit}>
              <p className="titles">Login</p>
              <p className="messages">
                Sign in now and get full access to our website.
              </p>
              <div className="flexs"></div>

              <label>
                <input
                  required
                  placeholder=""
                  name="email"
                  type="email"
                  className="inputs"
                />
                <span>Email</span>
              </label>

              <label>
                <input
                  required
                  placeholder=""
                  name="password"
                  type="password"
                  className="inputs"
                />
                <span>Password</span>
              </label>
              <button className="submits">Login</button>
              <p className="signin">
                Don't have an account?{" "}
                <a onClick={handleSignupModalOpen} href="#">
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      )}

      {showSignupModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleSignupModalClose}>
              &times;
            </span>
            <form id="signup-form" className="forms" onSubmit={handleSignupSubmit}>
              <p className="titles">Register</p>
              <p className="messages">
                Signup now and get full access to our app.
              </p>
              <div className="flexs">
                <label>
                  <input
                    required
                    placeholder=""
                    name="firstname"
                    type="text"
                    className="inputs"
                  />
                  <span>Firstname</span>
                </label>

                <label>
                  <input
                    required
                    placeholder=""
                    name="lastname"
                    type="text"
                    className="inputs"
                  />
                  <span>Lastname</span>
                </label>
              </div>
              <div className="flexs">
                <label>
                  <div className="flexs-gender">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                      />
                      Female
                    </label>
                  </div>
                </label>

                <label>
                  <input
                    required
                    placeholder=""
                    name="age"
                    type="number"
                    className="inputs"
                  />
                  <span>Age:</span>
                </label>
              </div>

              <label>
                <input
                  required
                  placeholder=""
                  name="email"
                  type="email"
                  className="inputs"
                />
                <span>Email</span>
              </label>

              <label>
                <input
                  required
                  placeholder=""
                  name="password"
                  type="password"
                  className="inputs"
                />
                <span>Password</span>
              </label>

              <label>
                <div>
                  User Type:
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="tenant"
                    />
                    Tenant
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="landlord"
                    />
                    landlord
                  </label>
                </div>
              </label>

              <label>
  <input
    type="checkbox"
    required
    checked={termsChecked}
    onChange={handleTermsChange}
  />
  <span>I agree to the</span>
  <a className="terms-modal" onClick={handleTermsModalOpen} href="#">
    Terms and Conditions
  </a>
</label>
{isTermsModalOpen && (
  <TermsModal isOpen={true} onClose={handleTermsModalClose} />
)}

              <button className="submits" disabled={!termsChecked}>
                Submit
              </button>
              <p className="signin">
                Already have an account?{" "}
                <a onClick={handleLoginModalOpens} href="#">
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      )}
   

      <nav>
        <button data-text="Awesome" className="button">
          <span className="actual-text">&nbsp;HOMEFINDER&nbsp;</span>
          <span className="hover-text" aria-hidden="true">
            &nbsp;HOMEFINDER&nbsp;
          </span>
        </button>
        <div className="login-section">
          <button onClick={handleLoginModalOpen} className="button-login">
            Login
          </button>
          <button onClick={handleSignupModalOpen} className="button-signup">
            Sign Up
          </button>
        </div>
       
     
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
