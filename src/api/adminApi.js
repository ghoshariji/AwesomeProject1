import axios from './index';
import axiosForm from './formIndex';
export const handleTimeTable1 = async payload => {
  try {
    const data = await axios.post('/v1/api/menu/upload-time-table', payload);
    return data;
  } catch (error) {
    console.log('Error ' + error);
  }
};

export const handleAddCourse1 = async payload => {
  try {
    const data = await axiosForm.post('/v1/api/course/upload-course', payload);
    return data;
  } catch (error) {
    console.log('Error ' + error);
  }
};

export const handleNoticeSubmit1 = async payload => {
  try {
    const data = await axiosForm.post('/v1/api/menu/upload-notice', payload);
    return data;
  } catch (error) {
    console.log('Error' + error);
  }
};

export const fetchQuery = async () => {
  try {
    const data = await axios.get('/v1/api/menu/get-contact');
    return data.data;
  } catch (error) {}
};

export const handleAddLecture = async payload => {
  try {
    const data = await axiosForm.post('/v1/api/course/upload-lecture', payload);
    return data.data;
  } catch (error) {
    console.log('Error' + error);
  }
};

export const verifyPayment = async payload => {
  try {
    const data = await axios.post('/v2/api/auth/verify-paymnet', payload);
    return data.data;
  } catch (error) {
    console.log('Error' + error);
  }
};
