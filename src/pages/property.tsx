import { useState, useEffect } from 'react';
import { FaBed, FaBath,  FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { FcFilledFilter, FcHome, FcSalesPerformance, FcMultipleDevices, FcDepartment, FcDocument, FcWebcam, FcCalendar, FcFeedback } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import 'rc-slider/assets/index.css';

import { getPropertyListing } from './api/api';

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null); // Track the selected property
  const [selectedDate, setSelectedDate] = useState(null);
  const [priceRange, setPriceRange] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  



  const [Visit, setVisit] = useState(false);
const [Request, setRequest] = useState(false);

const Visitmodal = () => setVisit(true);
const Requestmodal = () => setVisit(false);


const handleSignupModalOpen = () => {
  setVisit(false);
  setRequest(true);
};

const Visitmodals = () => {
  setVisit(true);
  setRequest(false);
};

const handleSignupModalClose = () => {
  setRequest(false);
  clearSignupForm();
};

const clearSignupForm = () => {
  const form = document.querySelector('#signup-form');
  form.reset();
};

  useEffect(() => {
    getPropertyListing()
      .then(response => {
        const modifiedProperties = response.data.map(property => {
          const imageUrls = property.images?.map(image => `data:image/png;base64,${image}`);
          return { ...property, imageUrls };
        });
        setProperties(modifiedProperties);
        setFilteredProperties(modifiedProperties);
        setLoading(false);
      })
      .catch(error => {
        toast.error('Failed to fetch property listings');
        setLoading(false);
      });
  }, []);

  const handleFilter = () => {
    setLoading(true);

    // Apply filter logic here
    let filteredProperties = properties;

    if (locationFilter) {
      filteredProperties = filteredProperties.filter(property =>
        property.address.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(range => parseInt(range));

      filteredProperties = filteredProperties.filter(property => {
        const propertyPrice = parseFloat(property.price.replace(/[^0-9.]/g, ''));
        return propertyPrice >= minPrice && propertyPrice <= maxPrice;
      });

      filteredProperties.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
        return priceA - priceB;
      });
    }

    setFilteredProperties(filteredProperties);
    setLoading(false);
  };
  const handleClearFilters = () => {
    setLocationFilter('');
    setPriceRange('');
    setFilteredProperties(properties);
  };

  const formatPrice = (price) => {
    if (price === '') {
      return '';
    }
    const formattedPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(formattedPrice).split('.')[0];
  };

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
        Back to Listing
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
       <span className="property-price"> <FcSalesPerformance/>  {selectedProperty.price}/{selectedProperty.paymentMode}</span>
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



<h3  onClick={handleSignupModalOpen} className="button-name" > <FcCalendar/>Request a tour visit</h3>

<h3  onClick={Visitmodals} className="button-name">< FcFeedback/> Request to apply</h3>
 
      </div>

      {Visit && (
           <div className="modal">
           <div className="modal-content">
             <span className="close" onClick={Requestmodal}>
               &times;
             </span>
             <form id="signup-form" className="forms" >
             
             <p className="titles">Ready to apply?</p>
         <p className="messages">Enter your contact details, and we'll let the rental manager know you want to submit an application. If they're interested, they'll contact you with next steps.</p>

         <label >
         <h3>Enter your message</h3>
         <div className="big-placeholder">
              <textarea
              name="message"
              className="request-modal"
              placeholder="Why would you like to apply for this property?"
              />
              </div>
         </label>
         <div className="flexs">
          
           <label>
             <input required placeholder="" name="firstname"type="text" className="inputs" />
             <span>Firstname</span>
           </label>
   
           <label>
             <input required placeholder="" name="lastname" type="text" className="inputs" />
             <span>Lastname</span>
           </label>
         </div>
   
         <label>
           <input required placeholder="" name="email"type="email" className="inputs" />
           <span>Email</span>
         </label>
   
         <label>
         <label htmlFor="phoneNumber">Phone Number (Philippines)</label>
         <input
           type="tel"
           id="phoneNumber"
           name="phoneNumber"
           placeholder="e.g., 09XX-XXX-XXXX"
           pattern="^\d{4}-\d{3}-\d{4}$"
           maxLength="11"
           required
         />
         </label>
   
        
       <p className="messages">You agree to Homefinder's Terms of Use & Privacy Policy. By choosing to contact a property, you also agree that Homefinder Group, landlords, and property managers may call or text you about any inquiries you submit through our services</p>
               <button className="submits">Send Request</button>
             </form>
           </div>
         </div>
        )}

{Request && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={handleSignupModalClose}>
            &times;
          </span>
          <form id="signup-form" className="forms" >
          
          <p className="titles">Schedule your visit</p>
      <p className="messages">The property manager or landlord may use this information to reach out to confirm your tour.</p>
      <div className="flexs">
        <label>
          <input required placeholder="" name="firstname"type="text" className="inputs" />
          <span>Firstname</span>
        </label>

        <label>
          <input required placeholder="" name="lastname" type="text" className="inputs" />
          <span>Lastname</span>
        </label>
      </div>

      <label>
        <input required placeholder="" name="email"type="email" className="inputs" />
        <span>Email</span>
      </label>

      <label>
      <label htmlFor="phoneNumber">Phone Number (Philippines)</label>
      <input
     
        type="tel"
        id="phoneNumber"
        name="phoneNumber"
        placeholder="e.g., 09XX-XXX-XXXX"
        pattern="^\d{4}-\d{3}-\d{4}$"
        maxLength="11"
        required
      />
      </label>

      <div>
      <h2>Select Date and Time to visit</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    </div>
    <p className="messages">You agree to Homefinder's Terms of Use & Privacy Policy. By choosing to contact a property, you also agree that Homefinder Group, landlords, and property managers may call or text you about any inquiries you submit through our services</p>
            <button className="submits">Submit</button>
          </form>
        </div>
      </div>
    )}
    
      
      </div>
    )
  }

  
  

  return (
    <>
       <div className="search-filters">
        <div className="filter-item">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label htmlFor="price-range">Price Range:</label>
          <select
            id="price-range"
            value={priceRange}
            onChange={e => setPriceRange(e.target.value)}
          >
            <option value="">Any</option>
            <option value="0-5000">₱0 - ₱5,000</option>
            <option value="5000-10000">₱5,000 - ₱10,000</option>
            <option value="10000-20000">₱10,000 - ₱20,000</option>
            <option value="20000-50000">₱20,000 - ₱50,000</option>
            <option value="50000-100000">₱50,000 - ₱100,000</option>
            <option value="100000-any">₱100,000 and above</option>
          </select>
        </div>
        <div className="filter-buttons">
          <button onClick={handleFilter}><FaSearch /> Apply Filters</button>
          <button onClick={handleClearFilters}><FcDepartment /> Clear Filters</button>
        </div>
      </div>
     
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="property-listing">
          {filteredProperties.map(property => (
            <div key={property._id} className="propertys-boxs">
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
              </div>
              <button onClick={() => handleViewDetails(property)} className="more-button">View More Details</button>
            </div>
          ))}
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default PropertyListing;
