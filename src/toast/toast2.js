import Toast, { BaseToast } from 'react-native-toast-message';

const toastConfig = {
  success: (internalState) => (
    <BaseToast
      {...internalState}
      style={{ borderLeftColor: 'green', backgroundColor: 'white' }} // Customize the background color here
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 20,
        fontWeight: '400',
        color:'black',
        fontWeight:800
      }}
      text2Style={{
        fontSize: 13,
        color: 'white',
      }}
    />
  ),
};

export default toastConfig;
