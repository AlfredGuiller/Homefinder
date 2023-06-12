import React, { useState, useEffect } from 'react';

const ApartmentDetails = () => {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    fetchApartmentDetails();
  }, []);

  const fetchApartmentDetails = async () => {
    try {
      const response = await fetch('http://localhost:3008/v1/test/fetch/apartment-details');
      const data = await response.json();
      setApartments(data.apartments);
    } catch (error) {
      console.error(error);
    }
  };

  const renderImage = (base64Image) => {
    return <img src={`data:image/jpeg;base64,${base64Image}`} alt="Apartment" />;
  };

  return (
    <div className="propertyListing">
      <div className="secpropertyListing">
        {apartments && apartments.length > 0 ? (
          apartments.map((apartment, index) => (
            <div key={index}>
              <div className="container">
                <div className="card">
                  <h2>{apartment.address}</h2>
                  <h2 className="price">₱{apartment.price}</h2>
                  {renderImage(apartment.images[0])}
                  <p>{apartment.landmark}</p>
                  <p className="essen">Bedrooms: {apartment.bedrooms}</p>
                  <p className="essen">Bathrooms: {apartment.bathrooms}</p>
                  <p className="essen">Appliance Amenities: {apartment.applianceAmenities}</p>
                  <p className="essen">Security Amenities: {apartment.securityAmenities}</p>
                  <span>Hover here</span>
                  <div className="pic"></div>
                  <button></button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No apartments found.</p>
        )}
      </div>
      <style jsx>{`

      .secpropertyListing {
        display: flex;
        position: relative;
        left: 30px;
      }
      .propertyListing {
        position: relative;
        left: 40px;
        background: rgba(0, 0, 0, 0.4); 
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
        border-radius: 5px;
      }
      .secpropertyListing .card {
        margin-right: 40px; /* Adjust the margin value as needed */
      }
      .container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 40px;
        align-items: center;
        flex-direction: column;
        background-color: transparent;
      }
      
        .container .card {
          position: relative;
          width: 500px;
          height: 230px;
          padding: 15px;
          background: linear-gradient(60deg, #151516 0%, #1d2229 100%);
          overflow: hidden;
          margin-bottom: 5px;
          border-radius: 20px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
        }
        .container .card h2 {
          z-index: 99;
          position: absolute;
          bottom: 25px;
          right: 130px;
          font-size: 50px;
          font-weight: 700;
          color: #fff;
          pointer-events: none;
          transition: 0.2s ease;
          text-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
        }
        .container .card .price {
          z-index: 99;
          position: absolute;
          bottom: 80px;
          right: 130px;
          font-size: 50px;
          font-weight: 700;
          color: #fff;
          pointer-events: none;
          transition: 0.2s ease;
          text-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
        }
        .container .card p {
          z-index: 99;
          position: absolute;
          bottom: 30px;
          right: 130px;
          width: 150px;
          color: #fff;
          opacity: 0;
          font-size: 12px;
          text-align: right;
          letter-spacing: 1px;
          transition: 0.2s ease;
        }
        .container .card .essen {
            z-index: 99;
            position: absolute;
            bottom: 10px;
            right: 130px;
            width: 150px;
            color: #fff;
            opacity: 0;
            font-size: 12px;
            text-align: right;
            letter-spacing: 1px;
            transition: 0.2s ease;
          }
        .container .card span {
            z-index: 99;
            position: absolute;
            top: 60px;
            right: 35px;
            color: #fff;
            font-size: 12px;
            letter-spacing: 1px;
            writing-mode: vertical-rl;
            transition: 0.2s ease;
            opacity: 0.7;
          }
          

        .container .card .pic {
          z-index: 100;
          width: 395px;
          height: 200px;
         
          background-size: cover;
          border-radius: 12px;
         
          transition: 0.3s ease;
        }
        .container .card button {
            position: absolute;
            right: 30px;
            bottom: 40px;
            width: 30px;
            height: 30px;
          
            border: none;
            border-radius: 30px;
            cursor: pointer;
            outline: none;
            opacity: 1;
            transition: 0.3s ease;
        }
        .container .card:hover button {
            transform:scale(16.5);
            opacity: 0.5;
        }
        .container .card:hover h2 {
           bottom: 80px;
           right: 50px;
        }
        .container .card:hover .price {
          bottom: 130px;
          right: 50px;
       }
        .container .card:hover p {
            opacity: 1;
            right: 60px;
        }
        .container .card:hover span {
            opacity: 0;
            top: 80px;
        }
        .container .card:hover .pic {
            filter: grayscale(0);
            width: 470px;
        }

        
      `}</style>
    </div>
  );
};

export default ApartmentDetails;
