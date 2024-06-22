import axios from './index';

export const fetchNotice = async () => {
  try {
    const data = await axios.get('/v1/api/menu/get-notice');
    return data;
  } catch (error) {}
};

export const fetchTimeTable = async () => {
  try {
    const data = await axios.get('/v1/api/menu/get-time-table');
    return data.data;
  } catch (error) {}
};
export const fetchCourse = async () => {
  try {
    const data = await axios.get('/v1/api/course/get-course');
    return data.data;
  } catch (error) {
    console.log('Error ' + error);
  }
};

export const uploadQuery = async payload => {
  try {
    const data = await axios.post('/v1/api/menu/upload-contact', payload);
    return data;
  } catch (error) {
    console.log('Error ' + error);
  }
};

export const fetchUserDetails = async payload => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${payload}`,
      },
    };
    const data = await axios.get('/v1/api/course/get-user-course', config);
    return data.data;
  } catch (error) {
    console.log('Error ' + error);
  }
};

export const fetchUserChat = async payload => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${payload}`,
      },
    };
    const data = await axios.get('/v1/api/menu/userChat', config);
    return data.data;
  } catch (error) {
    console.log('Error ' + error);
  }
};

export const saveUserChat = async payload => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${payload.userId}`,
      },
    };
    const data = await axios.post(
      '/v1/api/menu/saveUserChat',
      {payload},
      config,
    );
    return data.data;
  } catch (error) {
    console.log('Error ' + error);
  }
};


