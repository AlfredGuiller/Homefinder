import axios from 'axios';

export const getPropertyListing = () => {
  return axios.get('https://cde4-136-158-25-84.ngrok-free.app/v1/test/property-fetching/APPROVED', { headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'ngrok-skip-browser-warning':  true
    }
  });
  };

export const getUser = () => {
  return axios.get ('https://cde4-136-158-25-84.ngrok-free.app/v1/test/User-fetching', { headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'ngrok-skip-browser-warning':  true
  }
});
};