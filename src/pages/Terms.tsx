import React from 'react';

const TermsModal = ({ isOpen, onClose }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      {isOpen && (
        
        <div className="modal-overlay">
            <span className="close" onClick={onClose}>
              &times;
            </span>
          <div className="modal-content">
            
            <h2>Terms and Conditions</h2>
            <div className="terms-content">
              <h1>Home Finder</h1>
              <p>
                <strong>Terms of Use:</strong>
              </p>
              <p>
                
                <h2 className="line"> Acceptance of Terms</h2><br />
                By accessing or using the Home Finder website, you agree to be bound by these Terms of Use, our Privacy Policy, and any additional terms and conditions that may apply. If you do not agree to these terms, you should not use the service.
              </p>
              <p>
              <h2 className="line">Service Description </h2><br />
                Home Finder provides an online platform for users to search for residential apartments based on their specific requirements. The Service offers property information, including images, floor plans, and descriptions, as well as contact details for property owners and listing agents. Home Finder may also assist purchasers in exploring financing options and comparing residences in the same location.
              </p>
              <p>
              <h2 className="line"> Limitations and Disclaimers</h2> <br />
                Home Finder does not guarantee the availability, accuracy, or completeness of all property listings or the most up-to-date information. Home Finder is not comprehensive and may not include all available homes or provide detailed information on specific properties. It focuses solely on residential homes and does not cover commercial or industrial properties.
              </p>
              <p>
              <h2 className="line">No Legal Advice </h2> <br />
                Home Finder does not provide legal advice or recommendations. Home Finder does not offer an exhaustive list of property owners or other services. It does not provide extensive information on the condition of houses or structural flaws. The information displayed on the website is limited to homes currently on the market. Home Finder does not provide information on neighborhood or local factors that may influence a buyer's decision.
              </p>
              <p>
              <h2 className="line">Information Accuracy and Updates </h2> <br />
                While Home Finder strives to provide accurate and up-to-date information, there may be errors or omissions. Users are responsible for verifying the accuracy of the information displayed on the website. Home Finder is not liable for any damages resulting from reliance on inaccurate or outdated information.
              </p>
              <p>
              <h2 className="line"> User Obligations</h2><br />
                Users agree to use the Service in compliance with applicable laws and regulations. You are solely responsible for any content you post or transmit through the Home Finder website and must not engage in unlawful, harmful, or disruptive behavior. All property-related inquiries should be directed to the respective property owner.
              </p>
              <p>
              <h2 className="line">Modifications to the Home Finder </h2> <br />
                Home Finder reserves the right to modify, suspend, or discontinue the website at any time without prior notice. We may also update or modify these Terms of Use at our discretion. Continued use of Home Finder after any modifications to the terms constitutes acceptance of the changes.
              </p>
              <p>
                <strong>Privacy Policy:</strong>
              </p>
              <p>
              <h2 className="line">  Information Collection</h2><br />
                Home Finder collects personal information, such as name, email address, and contact details, when voluntarily provided by users. Home Finder may also collect non-personal information, including IP address, browser type, and device information, for analytical and statistical purposes.
              </p>
              <p>
              <h2 className="line">Use of Information </h2> <br />
                The information collected by Home Finder is used to enhance the user experience, respond to inquiries or requests, and provide relevant updates and promotional materials. We do not sell, rent, or lease personal information to third parties unless permitted by law or with user consent.
              </p>
              <p>
              <h2 className="line"> Security Measures</h2>  <br />
                Home Finder implements reasonable security measures to protect personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and Home Finder cannot guarantee absolute security.
              </p>
              <p>
              <h2 className="line"> Cookies and Tracking Technologies </h2> <br />
                Home Finder may use cookies and similar technologies to enhance user experience and collect information about user interactions with the Service. Users can modify browser settings to disable cookies, but this may affect the functionality of Home Finder.
              </p>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
      .line {
        color:blue;
      }
         .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
  
          .modal.open {
            display: block;
          }
  
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
          }
  
          .modal-content {
            background-color: rgba(0, 0, 0, 0.7);
            padding: 20px;
            border-radius: 5px;
            max-width: 800px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
          }
  
          .close {
            position: relative;
           bottom: 400px;
            left: 300px;
            font-size: 30px;
            color: white;
            cursor: pointer;
          }
  
          .terms-content {
            color: white;
          }
      `}</style>
    </div>
  );
};

export default TermsModal;
