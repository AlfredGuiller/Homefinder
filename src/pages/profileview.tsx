import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from './headerlogin';
import Letter from './letterlogin';
import { FcFilledFilter, FcHome, FcSalesPerformance, FcMultipleDevices, FcDepartment, FcDocument, FcWebcam, FcCalendar, FcFeedback } from "react-icons/fc";


import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBed, FaBath, FaMapMarkerAlt } from 'react-icons/fa';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';



const ProfileView = () => {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null); 
  const [updatedUser, setUpdatedUser] = useState({});

  const getPropertyListing = async () => {
    try {
      const response = await axios.get(`https://c868-136-158-25-84.ngrok-free.app/v1/test/property/${encodeURIComponent(user.email)}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch property listings:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://c868-136-158-25-84.ngrok-free.app/v1/test/User-fetching');
      const data = await response.json();
      setUser(data[0]); // Assuming the response contains a single user document
      setUpdatedUser(data[0]); // Set the initial updated user data
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

 const handleSubmit = async (updatedUser) => {
  try {
    console.log("UPDATE USER DATA:", JSON.stringify(updatedUser));
    console.log("UPDATE USER DATA:", JSON.stringify(user));
    if (!updatedUser || !updatedUser.uuid) {
      throw new Error("Invalid selected user");
    } else {
      const response = await axios.patch(
        `https://c868-136-158-25-84.ngrok-free.app/v1/test/update/user/${updatedUser.uuid}`,
        {
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          age: updatedUser.age,
          userType: updatedUser.userType,
          gender: updatedUser.gender
        }
      );
      toast.success("User updated successfully");
      window.location.reload(); 
    }
  } catch (error) {
    toast.error("Failed to update information");
    console.error("Error updating information:", error);
  }
};

  
  

  

  useEffect(() => {
    if (user) {
      getPropertyListing()
        .then(data => {
          const modifiedProperties = data.map(property => {
            const imageUrls = property.images?.map(image => `data:image/png;base64,${image}`);
            return { ...property, imageUrls };
          });
          setProperties(modifiedProperties);
          setLoading(false);
        })
        .catch(error => {
          toast.error('Failed to fetch property listings');
          setLoading(false);
        });
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
  };

  const handleBackToListing = () => {
    setSelectedProperty(null);
  };

  if (selectedProperty) {
  
    return (
      <div className="property-details">
      <button onClick={handleBackToListing} className="back-button">
        Back to profile dashboard
      </button>
     
      <h2 className="property-address"><FcHome/>{selectedProperty.address}</h2>

      
      {selectedProperty.imageUrls && (
        <div className="property-images-container">
          {selectedProperty.imageUrls.map((imageUrl, index) => (
            <div key={index} className="single-image">
              <Image src={imageUrl} alt={selectedProperty.address} width={200} height={300} />
            </div>
          ))}
        </div>
      )}
       <span className="property-price"> <FcSalesPerformance/> {selectedProperty.price}/{selectedProperty.paymentMode}</span>
       <span className="property-price"> Property Type: {selectedProperty.propertyType}</span>
       
       <div className="property-land">{selectedProperty.landmark}</div>

       <span className="property-bed">
        <FaBed  className="icon-bed"/> {selectedProperty.numOfBedrooms} bedrooms
        </span>


      <div className="property-others">
        <span className="property-bed">
          <FaBath className="icon-bath" /> {selectedProperty.numOfBathrooms} bathrooms
        </span>
        <div className="property-app">
          <div className="flexdev">
          <FcMultipleDevices className="icon-app"/> 
        <h2> Appliances & Amenities:</h2>
            </div> 
       {selectedProperty.applianceAmenities}
        </div>

        <div className="property-app">
          <div className="flexdev">
          <FcDepartment className="icon-fac"/> 
        <h2> Facility Amenities:</h2>
            </div> 
            {selectedProperty.facilityAmenities}
        </div>

        <div className="property-app">
          <div className="flexdev">
          <FcWebcam className="icon-sec"/> 
        <h2> Security Amenities:</h2>
            </div> 
            {selectedProperty.securityAmenities}
        </div>

        <div className="property-app">
          <div className="flexdev">
          <FcDocument className="icon-sec"/> 
        <h2> Other Amenities:</h2>
            </div> 
            {selectedProperty.description}
        </div>

<h3 className="button-name" onClick={() => handleApprove(selectedProperty)} >Change it to unavailable</h3>


 
      </div>

    
    
      
      </div>
    )
  }

  return (
    <div>
      <Header />
      <Letter />
      <div className="profile-container">
        <div className="profile-details">
          <div className="profile-picture">
            {/* Replace with your profile picture */}
            <Image src="/maynard.jpg" alt="Profile Picture" width={150} height={150} />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{user.firstName} {user.lastName}</h1>
            <span className="stat-label">{user.email}</span>
            <ul className="profile-stats">
              <li>
                <span className="stat-label">Usertype:</span>
                <span className="stat-value">{user.userType}</span>
              </li>
              {/* Add more list items for other user information */}
            </ul>

 <form className="update-form" >

  <h2>Update User Information</h2>
  <div className="flexi"> 
  <label>
    First Name: 
    <input
      type="text"
      value={updatedUser.firstName || ''}
      onChange={(event) =>
        setUpdatedUser({ ...updatedUser, firstName: event.target.value })
      }
    />
  </label>
  <label>
    Last Name:
    <input
      type="text"
      value={updatedUser.lastName || ''}
      onChange={(event) =>
        setUpdatedUser({ ...updatedUser, lastName: event.target.value })
      }
    />
  </label>
 
  </div>
  <div className="flexi"> 
  <label>
    Gender:
    <select
      value={updatedUser.gender || ''}
      onChange={(event) =>
        setUpdatedUser({ ...updatedUser, gender: event.target.value })
      }
    >
      
      <option value="tenant">Male</option>
      <option value="landlord">Female</option>
    </select>
</label>
  
  <label>
    Usertype:
    <select
      value={updatedUser.userType || ''}
      onChange={(event) =>
        setUpdatedUser({ ...updatedUser, userType: event.target.value })
      }
    >
      <option value="" disabled hidden>Select User Type</option>
      <option value="tenant">Tenant</option>
      <option value="landlord">Landlord</option>
    </select>
</label>
  </div> 

  <div className="flexi"> 

  <label>
    Email:
    <input
      type="text"
      value={updatedUser.email || ''}
      onChange={(event) =>
        setUpdatedUser({ ...updatedUser, email: event.target.value })
      }
    />
  </label>
 
  <label>
    Gender:
    <input
      type="number"
      value={updatedUser.age || ''}
      onChange={(event) =>
        setUpdatedUser({ ...updatedUser, age: event.target.value })
      }
    />
  </label>
 
 
  </div> 
 
  <button type="submit" onClick={() => handleSubmit(updatedUser)}>Update</button>

</form>
            <h2 className="list-profile">LIST OF YOUR PROPERTY:</h2>
          </div>
        </div>
      </div>

      <div className="property-list">
        {loading ? (
          <div>Loading properties...</div>
        ) : (
          properties.map(property => (
            <div key={property._id} className="property-box">
              {property.imageUrls ? (
                <div className="property-image">
                  <Carousel>
                    {property.imageUrls.map((imageUrl, index) => (
                      <div key={index} className="single-image">
                        <Image src={imageUrl} alt={property.address} width={500} height={700} />
                      </div>
                    ))}
                  </Carousel>
                </div>
              ) : null}
              <h2 className="addressflex">
                <FaMapMarkerAlt /> {property.address}
              </h2>
              <div className="property-meta">
                <span>
                  <FaBed /> {property.numOfBedrooms} bedrooms
                </span>
                <span>
                  <FaBath /> {property.numOfBathrooms} bathrooms
                </span>
                <span>Price: {property.price}/{property.paymentMode}</span>
                <span>Property Type: {property.propertyType}</span>
                <span>Status: {property.status}</span>
              </div>
              <button onClick={() => handleViewDetails(property)} className="more-button">View More Details</button>
            </div>
          ))
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default ProfileView;
