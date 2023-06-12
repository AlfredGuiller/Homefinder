import axios from 'axios';

export const getPropertyListing = () => {
  return axios.get('https://9c92-136-158-25-84.ngrok-free.app/v1/test/property-fetching/APPROVED');
};

export const getUser = () => {
  return axios.get ('https://9c92-136-158-25-84.ngrok-free.app/v1/test/User-fetching');
};




