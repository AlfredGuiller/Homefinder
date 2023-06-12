import { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaBed, FaBath, FaCar, FaMapMarkerAlt } from 'react-icons/fa';
import { AiFillApi, AiFillAppstore, AiFillAlert } from 'react-icons/ai';
import Image from 'next/image';

import styles from '../styles/PropertyListing.module.css';

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3008/v1/test/property-listing')
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch property listings:', error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Display four apartments on each slide
    slidesToScroll: 4, // Scroll four apartments at a time
    autoplay: true,
    autoplaySpeed: 4000,
  };
  

  return (
    <div className="propertyListing">
      <Slider {...settings}>
        {properties.map((property) => (
          <div key={property._id}>
            <div className="propertyBox">
              <Image
                src="/list.jpg"
                alt={property.address}
                width={800}
                height={500}
              />
              <div className="propertyDetails">
                <h2>{property.address}</h2>
                <p>
                  <FaMapMarkerAlt /> {property.location}
                </p>
                <div className="propertyMeta">
                  <span>
                    <FaBed /> {property.numBedrooms} bedrooms
                  </span>
                  <span>
                    <FaBath /> {property.numBathrooms} bathrooms
                  </span>
                 

                  <button className="viewDetailsButton">View More Details</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PropertyListing;
