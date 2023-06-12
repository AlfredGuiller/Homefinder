import { useState, useEffect } from 'react';
import { FaBed, FaBath,  FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import {  FcHome, FcSalesPerformance, FcOk, FcMultipleDevices, FcDepartment, FcDocument, FcWebcam, FcCalendar, FcFeedback } from "react-icons/fc";
import { BsFillPersonPlusFill} from 'react-icons/bs'
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
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [priceRange, setPriceRange] = useState('');
  const [guestsFilter, setGuestsFilter] = useState('');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('');
  const [bedroomsFilter, setBedroomsFilter] = useState('');
const [bathroomsFilter, setBathroomsFilter] = useState('');
const [selectedAmenities, setSelectedAmenities] = useState([]);



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

  const handleAmenitiesChange = (amenity) => {
    const updatedAmenities = [...selectedAmenities];
  
    if (updatedAmenities.includes(amenity)) {
      // Remove amenity if already selected
      const index = updatedAmenities.indexOf(amenity);
      updatedAmenities.splice(index, 1);
    } else {
      // Add amenity if not already selected
      updatedAmenities.push(amenity);
    }
  
    setSelectedAmenities(updatedAmenities);
  };
  


  const handleFilter = () => {
    setLoading(true);
  
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
    if (guestsFilter) {
      filteredProperties = filteredProperties.filter(property => {
        return (
          parseInt(property.person) >= parseInt(guestsFilter.split('-')[0]) &&
          parseInt(property.person) <= parseInt(guestsFilter.split('-')[1])
        );
      });
    }

    if (propertyTypeFilter) {
      filteredProperties = filteredProperties.filter(property =>
        property.propertyType.toLowerCase().includes(propertyTypeFilter.toLowerCase())
      );
    }
    if (bedroomsFilter) {
      filteredProperties = filteredProperties.filter((property) =>
        property.numOfBedrooms.toString() === bedroomsFilter
      );
    }
  
    // Apply bathroom filter
    if (bathroomsFilter) {
      filteredProperties = filteredProperties.filter((property) =>
        property.numOfBathrooms.toString() === bathroomsFilter
      );
    }
    if (selectedAmenities.length > 0) {
      filteredProperties = filteredProperties.filter(property => {
        const propertyAmenities = [
          ...property.applianceAmenities.replace(/\s*,\s*/g, ',').split(',').map(amenity => amenity.trim()),
          ...property.facilityAmenities.replace(/\s*,\s*/g, ',').split(',').map(amenity => amenity.trim()),
          ...property.securityAmenities.replace(/\s*,\s*/g, ',').split(',').map(amenity => amenity.trim()),
          ...property.description.replace(/\s*,\s*/g, ',').split(',').map(amenity => amenity.trim())
        ];
        return selectedAmenities.every(amenity => propertyAmenities.includes(amenity));
      });
    }
    
    
    

  
  
    setFilteredProperties(filteredProperties);
    setLoading(false);
  
    if (filteredProperties.length === 0) {
      toast.error("Sorry, we don't have what you're looking for. Please try again.");
    }
  };

  const handleClearFilters = () => {
    setLocationFilter('');
    setPriceRange('');
    setGuestsFilter('');
    setPropertyTypeFilter('');
    setBedroomsFilter('');
    setBathroomsFilter('');
    setFilteredProperties(properties);
    setSelectedAmenities([]);
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
        <span className="property-type"> {selectedProperty.propertyType}</span>
         <span className="property-price">
                  Price: {selectedProperty.price}
                  {selectedProperty.paymentMode !== "N/A" && `/${selectedProperty.paymentMode}`}
                  {selectedProperty.numberdays !== "N/A" && ` For ${selectedProperty.numberdays} `}
                </span>
     
       
       <div className="property-land">{selectedProperty.landmark}</div>

       <span className="property-person">
      <BsFillPersonPlusFill className="icon-bed"/> Maximum Guest{selectedProperty.person} 
        </span>

       <span className="property-bed">
        <FaBed  className="icon-bed"/> {selectedProperty.numOfBedrooms} bedrooms
        </span>

      <div className="property-others">
        <span className="property-bath">
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
  <label className="label-filter" htmlFor="location"><FaSearch />FILTERING</label>

  <div className="flex-filter">

  <div className="filter-loc">

  <label className="label-prop" htmlFor="bedrooms-filter">
  Number of Bedrooms:
</label>
<select
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[300px] p-2.5 outline-none"
  id="bedrooms-filter"
  value={bedroomsFilter}
  onChange={(e) => setBedroomsFilter(e.target.value)}
>
  <option value="">Any</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  {/* Add more options as needed */}
</select>




  <label className="label-prop" htmlFor="property-type-filter">
  <FcDepartment/>Property Type:
</label>
<select
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[300px] p-2.5 outline-none"
  id="property-type-filter"
  value={propertyTypeFilter}
  onChange={e => setPropertyTypeFilter(e.target.value)}
>
  <option value="">Any</option>
  <option value="House for rent">House for rent</option>
  <option value="House for sale">House for sale</option>
  <option value="Apartment">Apartment</option>
  <option value="Condominium">Condominium</option>
  <option value="Townhouse">Townhouse</option>
  <option value="Duplex">Duplex</option>
  <option value="Villa">Villa</option>
  <option value="Cottage">Cottage</option>
  <option value="Bungalow">Bungalow</option>
  <option value="Farmhouse">Farmhouse</option>
  <option value="Penthouse">Penthouse</option>
  <option value="Loft">Loft</option>
  <option value="Studio">Studio</option>
  <option value="Dormitory">Dormitory</option>
  <option value="Mobile home">Mobile home</option>
  <option value="Ranch">Ranch</option>
  <option value="Chalet">Chalet</option>
  <option value="Manor">Manor</option>
  <option value="Castle">Castle</option>
  <option value="Beach house">Beach house</option>
  <option value="Log cabin">Log cabin</option>
  <option value="Treehouse">Treehouse</option>
  <option value="Houseboat">Houseboat</option>
  <option value="Yurt">Yurt</option>
  <option value="Igloo">Igloo</option>
  <option value="Tent">Tent</option>
  <option value="Warehouse conversion">Warehouse conversion</option>
  <option value="Commercial property">Commercial property</option>
  <option value="Office space">Office space</option>
  <option value="Retail space">Retail space</option>
  <option value="Industrial property">Industrial property</option>
</select>




  <label className="label-prop"htmlFor="price-range"><FcHome/>Location:</label>
  <select
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[300px] p-2.5 outline-none"
  id="price-range"
  value={locationFilter}
  onChange={e => setLocationFilter(e.target.value)}
>
  <option value="">Any</option>
  <option value="Caloocan City">Caloocan City</option>
  <option value="Las Piñas City">Las Piñas City</option>
  <option value="Makati City">Makati City</option>
  <option value="Malabon City">Malabon City</option>
  <option value="Mandaluyong City">Mandaluyong City</option>
  <option value="Manila City">Manila City</option>
  <option value="Marikina City">Marikina City</option>
  <option value="Muntinlupa City">Muntinlupa City</option>
  <option value="Navotas City">Navotas City</option>
  <option value="Parañaque City">Parañaque City</option>
  <option value="Pasay City">Pasay City</option>
  <option value="Pasig City">Pasig City</option>
  <option value="Pateros City">Pateros City</option>
  <option value="Quezon City">Quezon City</option>
  <option value="San Juan City">San Juan City</option>
  <option value="Taguig City">Taguig City</option>
  <option value="Valenzuela City">Valenzuela City</option>
</select>

        </div>
        <div className="filter-item">

        <label className="label-prop" htmlFor="bathrooms-filter">
        Number of Bathrooms:
</label>
<select
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[300px] p-2.5 outline-none"
  id="bathrooms-filter"
  value={bathroomsFilter}
  onChange={(e) => setBathroomsFilter(e.target.value)}
>
  <option value="">Any</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  {/* Add more options as needed */}
</select>

        <label className="label-prop" htmlFor="guests-filter">
          <BsFillPersonPlusFill /> Number of Guests:
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[300px] p-2.5 outline-none"
          id="guests-filter"
          value={guestsFilter}
          onChange={e => setGuestsFilter(e.target.value)}
        >
          <option value="">Any</option>
          <option value="1-20">1-3</option>
          <option value="4-20">4-10</option>
          <option value="11-20">11-15</option>
          <option value="16-20">16-20</option>
          <option value="20-30">21-25</option>
          <option value="26-30">26-30</option>
        </select>
          <label className="label-prop"htmlFor="price-range"><FcSalesPerformance/>Price Range:</label>
          <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[300px] p-2.5 outline-none"
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
            <option value="100000-1000000000">₱100,000 and above</option>
          </select>
          

          
        </div>
        <div className="property-filter"> 

        <label className="label-prop"htmlFor="price-range">Choose amenities:</label>

        <div className="checkbox-container">
  <div>
    <input type="checkbox" value="wifi" checked={selectedAmenities.includes('wifi')} onChange={() => handleAmenitiesChange('wifi')} />
    <label htmlFor="wifi">Wi-Fi</label>
  </div>
  <div>
    <input type="checkbox" value="cctv" checked={selectedAmenities.includes('cctv')} onChange={() => handleAmenitiesChange('cctv')} />
    <label htmlFor="cctv">CCTV</label>
  </div>
  <div>
    <input type="checkbox" value="airconditioner" checked={selectedAmenities.includes('airconditioner')} onChange={() => handleAmenitiesChange('airconditioner')} />
    <label htmlFor="airconditioner">Airconditioned</label>
  </div>
  <div>
    <input type="checkbox" value="TV" checked={selectedAmenities.includes('TV')} onChange={() => handleAmenitiesChange('TV')} />
    <label htmlFor="TV">TV</label>
  </div>
  <div>
    <input type="checkbox" value="security guard" checked={selectedAmenities.includes('security guard')} onChange={() => handleAmenitiesChange('security guard')} />
    <label htmlFor="security guard">Security Guard</label>
  </div>
  <div>
    <input type="checkbox" value="gym" checked={selectedAmenities.includes('gym')} onChange={() => handleAmenitiesChange('gym')} />
    <label htmlFor="gym">Gym</label>
  </div>
  <div>
    <input type="checkbox" value="swimming pool" checked={selectedAmenities.includes('swimming pool')} onChange={() => handleAmenitiesChange('swimming pool')} />
    <label htmlFor="swimming pool">swimming pool</label>
  </div>
  <div>
    <input type="checkbox" value="pets allowed" checked={selectedAmenities.includes('pets allowed')} onChange={() => handleAmenitiesChange('pets allowed')} />
    <label htmlFor="pets allowed">Pets allowed</label>
  </div>
  <div>
    <input type="checkbox" value="Free street parking" checked={selectedAmenities.includes('Free street parking')} onChange={() => handleAmenitiesChange('Free street parking')} />
    <label htmlFor="Free street parking">Free street parking</label>
  </div>
</div>
        </div>
        


</div>


        <div className="filter-buttons">
          <button className="button-fil" onClick={handleFilter}> 
          <span >Apply Filters </span></button>
          <button className="button-fil"   onClick={handleClearFilters}> 
          <span>Clear Filters </span></button>
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
                <span className="verified"><FcOk/> Verified</span>
            
              <div className="property-meta">
              <h2 className="usertype">{property.propertyType}</h2>
              <h3 className="addressflex">
                <FaMapMarkerAlt /> {property.address} 
              </h3>
              <span className="guest">
                  <BsFillPersonPlusFill /> Guests:{property.person} 
                </span>
              <div className="details">
                
                <div className="flexs">
                <span>
                  <FaBed /> {property.numOfBedrooms} bedrooms
                </span>
                <span>
                  <FaBath /> {property.numOfBathrooms} bathrooms
                </span>
                   </div>
                    <span>
                  Price: {property.price}
                  {property.paymentMode !== "N/A" && `/${property.paymentMode}`}
                  {property.numberdays !== "N/A" && ` For ${property.numberdays} `}
                </span>

                 <span>Starting: {property.startdate}</span>
                <span>Until: {property.enddate}</span>
                 </div>
              
             
              </div>
              <div className="filter-buttonsnew">
              <button onClick={() => handleViewDetails(property)} className="button-fil"><span> View More Details</span></button>

                 </div>
            </div>
          ))}
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default PropertyListing;
