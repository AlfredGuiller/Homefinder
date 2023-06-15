import axios from 'axios';

export const getPropertyListing = () => {
  return axios.get('https://0ca3-175-176-33-143.ngrok-free.app/v1/test/property-fetching/APPROVED', { headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'ngrok-skip-browser-warning':  true
    }
  });
  };

export const getUser = () => {
  return axios.get ('https://0ca3-175-176-33-143.ngrok-free.app/v1/test/User-fetching', { headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'ngrok-skip-browser-warning':  true
  }
});
};