import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import Header from './headerlogin';



const ApartmentForm = () => {
  const [startdate, setStartdate] = useState('');
  const [enddate, setEnddate] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [person, setPerson] = useState('');
  const [price, setPrice] = useState('');
  const [files, setFiles] = useState([]);
  const [applianceAmenities, setApplianceAmenities] = useState('');
  const [securityAmenities, setSecurityAmenities] = useState('');
  const [facilityAmenities, setFacilityAmenities] = useState('');
  const [description, setDescription] = useState('');
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [propertyType, setPropertyType] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [numberdays, setNumberDays] = useState('');
  const [user, setUser] = useState(null);


const fetchUserData = async () => {
  try {
    const response = await fetch('http://localhost:3001/v1/test/User-fetching', { headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'ngrok-skip-browser-warning':  'true'}
    });
    const data = await response.json();
    setUser(data[0]); 
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
};
    const handleChange = (event:any) => {
    setDescription(event.target.value);
    };

    useEffect(() => {
    fetchUserData();
    }, []);
  
    const [Uploadedby, setUploadedby] = useState('');
  
    useEffect(() => {
      if (user) {
        setUploadedby(`${user.email}`);
      }
    }, [user]);


    const citiesInPhilippines = [
      'Caloocan City',
      'Las Piñas City',
      'Makati City',
      'Malabon City',
      'Mandaluyong City',
      'Manila City',
      'Marikina City',
      'Muntinlupa City',
      'Navotas City',
      'Parañaque City',
      'Pasay City',
      'Pasig City',
      'Pateros City',
      'Quezon City',
      'San Juan City',
      'Taguig City',
      'Valenzuela City',
      ];

  const property = [
    'House for rent',
    'House for sale',
    'Apartment',
    'Condominium',
    'Townhouse',
    'Duplex',
    'Villa',
    'Cottage',
    'Bungalow',
    'Farmhouse',
    'Penthouse',
    'Loft',
    'Studio',
    'Dormitory',
    'Mobile home',
    'Ranch',
    'Chalet',
    'Manor',
    'Castle',
    'Beach house',
    'Log cabin',
    'Treehouse',
    'Houseboat',
    'Yurt',
    'Igloo',
    'Tent',
    'Warehouse conversion',
    'Commercial property',
    'Office space',
    'Retail space',
    'Industrial property',
  ];

  const payment = [
    'Per Month',
    'Per Week',
    'Per Year',
    'Lump Sum',
    'Installments',
    'Bi-monthly',
    'Quarterly',
    'Bi-annually',
    'N/A',
  
  ];


  const stay = [
    'N/A',
    '1 day',
    '2 days',
    '3 days',
    '4 days',
    '5 days',
    '6 days',
    '1 week',
    '2 weeks',
    '1 month',
    '2 months',
    '3 months',
    '6 months',
    '1 year',

  ];
  
  const handlePriceChange = (e) => {
    const inputPrice = e.target.value;
  
    const sanitizedPrice = inputPrice.replace(/[^\d.]/g, '');
  
    const parts = sanitizedPrice.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];
  
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    let formattedPrice = decimalPart !== undefined ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
    formattedPrice = `₱${formattedPrice}`;
  
    setPrice(formattedPrice);
  };
  
  const fileInputRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('address', address);
    formData.append('landmark', landmark);
    formData.append('numOfBedrooms', bedrooms);
    formData.append('numOfBathrooms', bathrooms);
    formData.append('price', price);
    formData.append('applianceAmenities', applianceAmenities || 'No appliance amenities selected');
    formData.append('securityAmenities', securityAmenities || 'No security amenities selected');
    formData.append('facilityAmenities', facilityAmenities || 'No facility amenities selected');
    formData.append('propertyType', propertyType);
    formData.append('paymentMode', paymentMode);
    formData.append('description', description || 'No description');
    formData.append('Uploadedby', Uploadedby); 
    formData.append('enddate', enddate);
    formData.append('startdate', startdate);
    formData.append('person', person); 
    formData.append('numberdays', numberdays); 
    files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });
    try {
      const response = await fetch('https://cde4-136-158-25-84.ngrok-free.app/v1/test/add/property', {
        method: 'POST',
        body: formData,
        headers: {
          'Access-Control-Allow-Origin': '*',
          
          'Access-Control-Allow-Methods': '*',
          'ngrok-skip-browser-warning':  'true'},
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setAddress('');
        setLandmark('');
        setPropertyType('');
        setPaymentMode('');
        setBedrooms('');
        setBathrooms('');
        setPrice('');
        setPerson('');
        setApplianceAmenities('');
        setSecurityAmenities('');
        setFacilityAmenities('');
        setDescription('');
        setFiles([]);
        fileInputRef.current.value = null;
      } else {
        toast.error(data.error || 'Failed to submit apartment details');
      }
    } catch (error) {
      console.error('Failed to connect to the backend API', error);
      toast.error('Failed to connect to the backend API');
    }
  };
  const toggleAmenitiesModal = (e) => {
    e.preventDefault();
    setShowAmenitiesModal((prevShowAmenitiesModal) => !prevShowAmenitiesModal);
  };
  const handleAmenitySelection = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      if (value === 'cctv' || 
          value === 'security guard' || 
          value === 'smoke alarm' || 
          value === 'fire extinguisher' || 
          value === 'first aid kit'  || 
          value === 'secure bike storage areas') {
        setSecurityAmenities((prevSecurityAmenities) =>
          prevSecurityAmenities ? prevSecurityAmenities + ', ' + value : value
        );
      } else if (value === 'tv' || 
                 value === 'wifi' || 
                 value === 'couch' || 
                 value === 'microwave' || 
                 value === 'rice cooker' || 
                value === 'airconditioner') {
        setApplianceAmenities((prevApplianceAmenities) =>
          prevApplianceAmenities ? prevApplianceAmenities + ', ' + value : value
        );
      }
      else {
        setFacilityAmenities((prevFacilityAmenities) =>
        prevFacilityAmenities ? prevFacilityAmenities + ', ' + value : value
      );
      }
    } else {
      if (value === 'cctv' || 
          value === 'security guard' || 
          value === 'smoke alarm' || 
          value === 'fire extinguisher' || 
          value === 'first aid kit'  || 
          value === 'secure bike storage areas') {
        setSecurityAmenities((prevSecurityAmenities) =>
          prevSecurityAmenities
            .split(', ')
            .filter((amenity) => amenity !== value)
            .join(', ')
        );
      } else if (value === 'tv' || 
                 value === 'wifi' || 
                 value === 'couch' || 
                 value === 'microwave' || 
                 value === 'rice cooker' || 
                 value === 'airconditioner') {
        setApplianceAmenities((prevApplianceAmenities) =>
          prevApplianceAmenities
            .split(', ')
            .filter((amenity) => amenity !== value)
            .join(', ')
        );
      } else {
        setFacilityAmenities((prevFacilityAmenities) =>
        prevFacilityAmenities
            .split(', ')
            .filter((amenity) => amenity !== value)
            .join(', ')
        );
      }
    }
  };

  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  return (
    <div>
      
      <Header />
    
      <ToastContainer />
      <form id="signup-form" className="forms" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flexs"> 
        <section> 

<p className="titles">List your apartment</p>
<p className="messages">
  List your apartment on our website and reach thousands of potential renters or buyers.
</p>
<div className="flexs"> 
<label>
<select
  required
  name="address"
  className="inputs"
  defaultValue={address}
  onChange={(e) => setAddress(e.target.value)}
>
  <option value=""></option>

  {citiesInPhilippines.map((city, index) => (
    <option key={index} value={city}>
      {city}
    </option>
  ))}
</select>
  <span>Select a city</span>
</label>

<label>
  <input
    required
    placeholder=""
    name="landmark"
    type="text"
    className="inputs"
    value={landmark}
    onChange={(e) => setLandmark(e.target.value)}
  />
  <span>Enter the full address</span>
  <small>This will help renters find your apartment</small>
</label>
</div>


<label>
<select
  required
  name="propertyType"
  className="inputs"
  defaultValue={propertyType}
  onChange={(e) => setPropertyType(e.target.value)}
>
  <option value=""></option>
  {property.map((property, index) => (
    <option key={index} value={property}>
      {property}
    </option>
  ))}
</select>
  <span>Property Type</span>
</label>

<label>
<select
  required
  name="paymentMode"
  className="inputs"
  defaultValue={paymentMode}
  onChange={(e) => setPaymentMode(e.target.value)}
>
  <option value=""></option>
  {payment.map((payment, index) => (
    <option key={index} value={payment}>
      {payment}
    </option>
  ))}
</select>
  <span>Mode of payment</span>
</label>




<div className="flexs">


  <label>
    <input
      required
      placeholder=""
      name="bedrooms"
      type="number"
      className="inputs"
      value={bedrooms}
      onChange={(e) => setBedrooms(e.target.value)}
    />
    <span>Number of Bedroom</span>
  </label>
  
  <label>
    <input
      required
      placeholder=""
      name="bathrooms"
      type="number"
      className="inputs"
      value={bathrooms}
      onChange={(e) => setBathrooms(e.target.value)}
    />
    <span>Number of Bathroom</span>
  </label>

</div>
<div className="flexs"> 
<label>
    <input
      required
      placeholder=""
      name="person"
      type="number"
      className="inputs"
      value={person}
      onChange={(e) => setPerson(e.target.value)}
    />
    <span>Max of person allowed</span>
  </label>

  <label>
  <input
      required
      placeholder=""
      name="price"
      type="text" 
      className="inputs"
      value={price}
      onChange={handlePriceChange}
    />
    <span>Price</span>
  </label>
</div>
<div> 
  
<label>
<select
  required
  name="numberdays"
  className="inputs"
  defaultValue={numberdays}
  onChange={(e) => setNumberDays(e.target.value)}
>
  <option value=""></option>
  {stay.map((stay, index) => (
    <option key={index} value={stay}>
      {stay}
    </option>
  ))}
</select>
  <span>For how many days (Select N/A if your property is for sale or for rent)</span>
</label>





<label className="background-container">
<h3>Please provide at least 3 pictures of your property</h3>
<input
  required
  className="file"
  type="file"
  id="file"
  name="file"
  accept="image/*"
  multiple
  onChange={handleImageUpload}
  ref={fileInputRef}
/>

</label>

</div>



</section>

<section>


<label className="background-container">
  <button className="learn-more" onClick={toggleAmenitiesModal}>
  <span className="circle" aria-hidden="true">
  <span className="icon arrow"></span>
  </span>
  <span className="button-text">Select Amenities</span>
</button>
  <div className="selected-amenities">
    <div className="appliance-amenities">
      <h3>Appliances</h3>
      {applianceAmenities ? (
        <span className="selected-amenity">{applianceAmenities}</span>
      ) : (
        <span className="selected-amenity">No appliance amenities selected</span>
      )}
    </div>
    <div className="security-amenities">
      <h3>Security</h3>
      {securityAmenities ? (
        <span  className="selected-amenity">{securityAmenities}</span>
      ) : (
        <span className="selected-amenity">No security amenities selected</span>
      )}
    </div>

    <div className="facility-amenities">
      <h3>Facility Amenities</h3>
      {facilityAmenities ? (
        <span className="selected-amenity">{facilityAmenities}</span>
      ) : (
        <span className="selected-amenity">No facility amenities selected</span>
      )}
    </div>

  </div>
  </label>
  
  <label>
    <h3>Please provide the other amenities that you would like to add, which are not listed on the dashboard.</h3>
    <div className="big-placeholder">
<textarea
name="description"
className="big-textarea"
placeholder="Enter your amenities..."
value={description}
onChange={handleChange}
/>
</div>
    </label>
    <h3 className="date">Select start date</h3>
    <label>
  <input
    required
    placeholder=""
    name="startdate"
    type="date"
    className="inputs"
    value={startdate}
    onChange={(e) => setStartdate(e.target.value)}
  />
  
</label>
<h3 className="date">Select end date</h3>
<label>
  <input
    required
    placeholder=""
    name="enddate"
    type="date"
    className="inputs"
    value={enddate}
    onChange={(e) => setEnddate(e.target.value)}
  />
</label>

    <label>
  <input
    name="useremail"
    type="text"
    placeholder="Placeholder Text"
    value={Uploadedby}
    className="input-field"
  />
</label>
</section>
        </div>
        {showAmenitiesModal && (
            <div className="modal" style={{ display: 'block' }}>
              <div className="modal-content" style={{ width: '700px' }}>
                <h2>Select Amenities</h2>
    <h3>Security</h3>
    <div className="flexsecu">
      <label>
        <input
          type="checkbox"
          value="cctv"
          checked={securityAmenities.includes('cctv')}
          onChange={handleAmenitySelection}
        />
        CCTV
      </label>
      <label>
        <input
          type="checkbox"
          value="security guard"
          checked={securityAmenities.includes('security guard')}
          onChange={handleAmenitySelection}
        />
        Security Guard
      </label>
      <label>
        <input
          type="checkbox"
          value="smoke alarm"
          checked={securityAmenities.includes('smoke alarm')}
          onChange={handleAmenitySelection}
        />
        Smoke Alarm
      </label>
    </div>
    <div className="flexsecu">
      <label>
        <input
          type="checkbox"
          value="fire extinguisher"
          checked={securityAmenities.includes('fire extinguisher')}
          onChange={handleAmenitySelection}
        />
        Fire Extinguisher
      </label>
      <label>
        <input
          type="checkbox"
          value="first aid kit"
          checked={securityAmenities.includes('first aid kit')}
          onChange={handleAmenitySelection}
        />
        First Aid Kit
      </label>
      <label>
        <input
          type="checkbox"
          value="secure bike storage areas"
          checked={securityAmenities.includes('secure bike storage areas')}
          onChange={handleAmenitySelection}
        />
        Secure Bike Storage Areas
      </label>
      </div>
                <h3>Appliances</h3>
                <div className="flexsecu">
                <label>
                  <input
                    type="checkbox"
                    value="tv"
                    checked={applianceAmenities.includes('tv')}
                    onChange={handleAmenitySelection}
                  />
                  TV
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="wifi"
                    checked={applianceAmenities.includes('wifi')}
                    onChange={handleAmenitySelection}
                  />
                  WiFi
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="couch"
                    checked={applianceAmenities.includes('couch')}
                    onChange={handleAmenitySelection}
                  />
                  Couch
                </label>
                </div>

                <div className="flexsecu">
                <label>
                  <input
                    type="checkbox"
                    value="microwave"
                    checked={applianceAmenities.includes('microwave')}
                    onChange={handleAmenitySelection}
                  />
                  microwave
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="rice cooker"
                    checked={applianceAmenities.includes('rice cooker')}
                    onChange={handleAmenitySelection}
                  />
                  rice cooker
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="airconditioner"
                    checked={applianceAmenities.includes('airconditioner')}
                    onChange={handleAmenitySelection}
                  />
                  airconditioner
                </label>


                </div>
              
              
                <h3>Facility Amenities</h3>
                <div className="flexsecu">
                <label>
                  <input
                    type="checkbox"
                    value="swimming pool"
                    checked={facilityAmenities.includes('swimming pool')}
                    onChange={handleAmenitySelection}
                  />
                  Swimming Pool
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="gym"
                    checked={facilityAmenities.includes('gym')}
                    onChange={handleAmenitySelection}
                  />
                  Gym
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Free street parking"
                    checked={facilityAmenities.includes('Free street parking')}
                    onChange={handleAmenitySelection}
                  />
                  Free street parking
                </label>
                </div>
              
                <button className="modal-close" onClick={toggleAmenitiesModal}>
                  Close
                </button>
              </div>
            </div>
          )}
        <button className="submits">Submit</button>
  <style jsx>{`

.input-field::placeholder {
  visibility: hidden;
}


.input-field {
  visibility: hidden;
  color: transparent;
  text-indent: -9999px;
}


.background-container {
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 20px;
}

.big-textarea {
  height: 150px; 
  width: 500px;
  resize: vertical; 
}

    .appliance-amenities h3 {
    color: white;
    }
    .security-amenities h3 {
    color: white;
    }
    .facility-amenities h3 {
      color: white;
      }
    

      .flexsecu {
        display: flex;
        position: relative;
        margin-right: 60px;
        justify-content: space-between;
      }
      
      .flexsecu label {
        flex-basis: calc(33.33% - 20px); /* Adjust this value as needed */
      }
    .flexapp {
      display: flex;
      position: relative;
      align-items: center;
      margin-right: 50px;
      padding: 8px;
      justify-content: space-between;
    }
    /* MODAL*/

    .modal {
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
      background-color: #fff;
      padding: 20px;
      max-width: 100%;
      width: 100%;
      border-radius: 4px;
    }
    
    .modal h2 {
      margin-top: 0;
    }
    
    .modal h3 {
      margin-top: 20px;
    }
    
    .modal label {
      display: block;
      margin-bottom: 10px;
    }
    
    .modal input[type="checkbox"] {
      margin-right: 5px;
    }




    .modal-content label {
      display: block;
      margin-bottom: 10px;
    }

    .modal-close {
      margin-top: 10px;
      background-color: #ccc;
      border: none;
      padding: 8px 16px;
      border-radius: 5px;
      cursor: pointer;
    }

    .modal-close:hover {
      background-color: #999;
    }

    .selected-amenities {
      margin-top: 10px;
      color: white;
      flex-wrap: wrap;
    }
    .selected-amenities h3{
      color: black;
    }
    .selected-amenity {
      background-color: black;
      border-radius: 4px;
      padding: 4px 8px;
      margin-right: 5px;
      margin-bottom: 5px;
    }
    
    /* FORMSS */
    small {
      color: black;
    }
    .forms {
      display: flex;
      flex-direction: column;
      gap: 10px;
      justify-content: center;
      max-width: 100%;
      padding: 20px;
      background: none;
      border: hidden;
      position: relative;
      overflow: hidden;
    }
    .titles {
      font-size: 28px;
      color: black;
      font-weight: 600;
      letter-spacing: -1px;
      position: relative;
      display: flex;
      align-items: center;
      padding-left: 30px;
    }
    
    .titles::before,.titles::after {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      border-radius: 50%;
      left: 0px;
      background-color: royalblue;
    }
    
    .titles::before {
      width: 18px;
      height: 18px;
      background-color: royalblue;
    }
    
    .titles::after {
      width: 18px;
      height: 18px;
      animation: pulse 1s linear infinite;
    }
    
    .messages, .signin {
      color: black;
      font-size: 14px;
    }
    
    .signin {
      text-align: center;
    }
    
    .signin a {
      color: royalblue;
    }
    
    .signin a:hover {
      text-decoration: underline royalblue;
    }
    
    .flexs {
      display: flex;
      width: 100%;
      gap: 6px;
    }
    .flexes {
      display: flex;
      width: 50%;
      gap: 6px;
    }
    
    .forms label {
      position: relative;
    }
    
    .forms label .inputs {
      width: 100%;
      padding: 10px 10px 20px 10px;
      outline: 0;
      border: 1px solid rgba(105, 105, 105, 0.397);
      border-radius: 10px;
    }

    .file {
      color: black;
      
    }
    
    
    
    .forms label .inputs + span {
      position: absolute;
      left: 10px;
      top: 15px;
      color: grey;
      font-size: 0.9em;
      cursor: text;
      transition: 0.3s ease;
    }
    
    .forms label .inputs:placeholder-shown + span {
      top: 15px;
      font-size: 0.9em;
    }
    
    .forms label .input:focus + span,.forms label .inputs:valid + span {
      top: 30px;
      font-size: 0.7em;
      font-weight: 600;
    }
    
    .forms label .inputs:valid + span {
      color: green;
    }
    
    .submits {
      border: none;
      outline: none;
      background-color: royalblue;
      padding: 10px;
      border-radius: 10px;
      color: #fff;
      font-size: 16px;
      transform: .3s ease;
    }
    
    .submits:hover {
      background-color: rgb(56, 90, 194);
    }
    
    @keyframes pulse {
      from {
        transform: scale(0.9);
        opacity: 1;
      }
    
      to {
        transform: scale(1.8);
        opacity: 0;
      }
    }

    button {
      position: relative;
      display: inline-block;
      cursor: pointer;
      outline: none;
      border: 0;
      vertical-align: middle;
      text-decoration: none;
      background: transparent;
      padding: 0;
      font-size: inherit;
      font-family: inherit;
    }
    
    button.learn-more {
      width: 12rem;
      height: auto;
    }
    
    button.learn-more .circle {
      transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
      position: relative;
      display: block;
      margin: 0;
      width: 3rem;
      height: 3rem;
      background: #282936;
      border-radius: 1.625rem;
    }
    
    button.learn-more .circle .icon {
      transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      background: #fff;
    }
    
    button.learn-more .circle .icon.arrow {
      transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
      left: 0.625rem;
      width: 1.125rem;
      height: 0.125rem;
      background: none;
    }
    
    button.learn-more .circle .icon.arrow::before {
      position: absolute;
      content: "";
      top: -0.29rem;
      right: 0.0625rem;
      width: 0.625rem;
      height: 0.625rem;
      border-top: 0.125rem solid #fff;
      border-right: 0.125rem solid #fff;
      transform: rotate(45deg);
    }
    
    button.learn-more .button-text {
      transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
      position: absolute;
      width: 100%;
      top: 0;
      left: 10px;
      right: 0;
      bottom: 0;
      padding: 0.75rem 0;
      margin: 0 0 0 1.85rem;
      color: #282936;
      font-weight: 700;
      line-height: 1.6;
      text-align: center;
      text-transform: uppercase;
    }
    
    button:hover .circle {
      width:  250px;
    }
    
    button:hover .circle .icon.arrow {
      background: #fff;
      transform: translate(1rem, 0);
    }
    
    button:hover .button-text {
      color: #fff;
    }
    
  `}</style>
</form>

</div>

);
};

export default ApartmentForm;


