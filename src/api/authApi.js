import axios from './index';
export const handleLogin1 = async payload => {
  try {
    const data = await axios.post('/v1/api/auth/login', payload);
    return data;
  } catch (error) {
    console.log('Error ' + error);
  }
};

export const handleSignup1 = async payload => {
  try {
    const data = await axios.post('/v1/api/auth/signup', payload);
    return data.data;
  } catch (error) {
    console.log('Error ' + error);
  }
};

export const handlePayment1 = async (payload) => {
  try {
    const data = await axios.post('/v2/api/auth/create-order', payload);
    return data;
  } catch (error) {
    console.log('Error ' + error);
  }
};
