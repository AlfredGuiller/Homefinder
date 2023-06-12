import axios from 'axios';

export const getPropertyListing = () => {
  return axios.get('http://localhost:3001/v1/test/property-fetching/APPROVED');
};

export const getUser = () => {
  return axios.get ('http://localhost:3001/v1/test/User-fetching');
};




