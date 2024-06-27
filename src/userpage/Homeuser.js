import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  openLink,
  Linking,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../componets/Button';
import COLORS from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastManager, {Toast} from 'toastify-react-native';
import Ionicons2 from 'react-native-vector-icons/AntDesign';
import Ionicons12 from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';
const Homeuser = ({navigation}) => {
  const openLink = url => {
    Linking.openURL(url);
  };
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const callNumber = phoneNumber => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  useEffect(() => {
    setName(AsyncStorage.getItem('name'));
    setModalVisible(true);
  }, []);
  const youtubeVideos = [
    {
      id: 'VIDEO_ID_3',
      title: 'WBCS 24 ব্যাচে G.I. ক্লাস চলছে ......',
      thumbnail: require('../assets/baa=class3.png'),
      embedUrl:
        'https://www.youtube.com/watch?v=pTRkV_Rl21Q&ab_channel=BarasatAcademicAssociation',
    },
    {
      id: 'VIDEO_ID_4',
      title: 'WBCS -24 ব্যাচে ইকোনমিক্স ক্লাস চলছে ...',
      thumbnail: require('../assets/baa-class4.png'),
      embedUrl:
        'https://www.youtube.com/watch?v=Wd0wR7NMXQQ&ab_channel=BarasatAcademicAssociation',
    },
    {
      id: 'VIDEO_ID_1',
      title: 'CGL/CHSL/MTS-24 ব্যাচে ম্যাথ ক্লাস চলছে ......',
      thumbnail: require('../assets/baa-class1.png'),
      embedUrl:
        'https://www.youtube.com/watch?v=5uyi385gkxY&ab_channel=BarasatAcademicAssociation',
    },
    {
      id: 'VIDEO_ID_2',
      title: 'POLICE-24 ব্যাচে ম্যাথ ক্লাস চলছে ...',
      thumbnail: require('../assets/baa-class2.png'),
      embedUrl:
        'https://www.youtube.com/watch?v=fs8qoeNNwyA&ab_channel=BarasatAcademicAssociation',
    },
    {
      id: 'VIDEO_ID_5',
      title: 'CLERKSHIP -24 ব্যাচে ম্যাথেমেটিক্স ক্লাস চলছে.',
      thumbnail: require('../assets/baa-class5.png'),
      embedUrl:
        'https://www.youtube.com/watch?v=dlM2TT9Wd5Y&ab_channel=BarasatAcademicAssociation',
    },
    // Add more YouTube video IDs here
  ];
  const closeModal = () => {
    setModalVisible1(false);
  };
  const [currentVideo, setCurrentVideo] = useState(null);
  const openYoutube = videoId => {
    Linking.openURL(videoId);
  };
  const openWhatsApp = () => {
    const phoneNumber = '+917439120030';
    const url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(url).catch(() => {
      Toast.success('Make sure whatapp Installed');
    });
  };
  const [modalVisible1, setModalVisible1] = useState(true);
  const handleSubscribe = () => {
    setModalVisible1(false);
  };

  const openMap = () => {
    const url = 'https://www.google.com/maps/dir/22.743858,88.4888183/Barasat+Academic+Association,+Som+Tower,+Pioneer+Park,+Barasat,+Kolkata,+West+Bengal+700124/@22.7308775,88.4763834,15z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x39f8990ded9a6743:0xaf83d63222e27d18!2m2!1d88.4798694!2d22.7248653?entry=ttu';
    Linking.openURL(url);
  };
  

  const scrollViewRef = useRef(null);
  let scrollPosition = 0;
  const scrollInterval = 2000;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: scrollPosition,
          animated: true,
        });
        scrollPosition += 300;
        if (scrollPosition >= scrollViewContentWidth) {
          scrollPosition = 0;
        }
      }
    }, scrollInterval);
    return () => clearInterval(intervalId);
  }, []);

  const scrollViewContentWidth = 300 * 5;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <FastImage
            priority={FastImage.priority.normal}
            resizeMode={FastImage.resizeMode.contain}
            source={require('../assets/baa-profile.jpeg')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>
            Hey,{' '}
            <Text style={{color: 'white', fontFamily: 'Rowdies-Regular'}}>
              {name}
            </Text>
          </Text>
        </View>

        <Pressable onPress={openWhatsApp} style={styles.icon}>
          <Ionicons name="logo-whatsapp" size={28} color="green" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Profileuser')}>
          <Ionicons name="settings-outline" size={28} color="white" />
        </Pressable>
      </View>

      <ToastManager />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(!modalVisible);
        }}>
        <View style={styles.centeredViewm}>
          <TouchableOpacity
            onPress={closeModal}
            style={{
              alignSelf: 'flex-end',
              marginRight: 20,
              marginTop: 50,
            }}>
            <Ionicons12 name="circle-with-cross" color="red" size={30} />
          </TouchableOpacity>
          <View style={styles.modalViewm}>
            <Text style={styles.titlem}>Ready to unlock success?</Text>
            <Text style={styles.subtitle}>
              Get flat <Text style={styles.boldTextm}>maxium % off</Text> on all
              COURSE Subscriptions
            </Text>
            <Text style={styles.limitedOfferm}>✔️ Limited Period Offer</Text>
            <TouchableOpacity style={styles.buttonm} onPress={handleSubscribe}>
              <Text style={styles.buttonTextm}>ENROLL NOW</Text>
            </TouchableOpacity>
            <Text style={styles.termsm}>
              *T&C apply, as available on the platform.
            </Text>
            {/* <Image source={require('./path/to/c1.jpg')} style={styles.image} /> */}
          </View>
        </View>
      </Modal>

      {/* Content */}
      <ScrollView style={styles.content}>
        <View>
          <Text style={styles.title12}>Ready to start your prep?</Text>
          <Text style={styles.subtitle}>
            Join more than 1K+ learners preparing with BAA
          </Text>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => callNumber('+919073587432')}>
            <Text style={styles.callButtonText}>Call us on +91-9073587432</Text>
          </TouchableOpacity>
          <View style={styles.cardsContainer}>
            <TouchableOpacity style={styles.card1}>
              <Image
                source={{
                  uri: 'https://www.geneo.in/blog/wp-content/uploads/2022/05/5-Benefits-of-Online-Coaching-Classes-for-Students.jpg',
                }}
                style={styles.cardImage1}
              />
              <Text style={styles.cardText1}>Online coaching</Text>
              <Text style={styles.cardSubText}>At your home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card1} onPress={openMap}>
              <Image
                source={{
                  uri: 'https://thumbs.dreamstime.com/z/business-meeting-seminar-speaker-doing-presentation-flat-illustration-training-offline-conference-personnel-cource-cartoon-214608719.jpg',
                }}
                style={styles.cardImage1}
              />
              <Text style={styles.cardText1}>Offline centres</Text>
              <Text style={styles.cardSubText}>Find a centre nearby</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Institution Picture Slider Section */}
        <View style={styles.section}>
          <ScrollView
            ref={scrollViewRef}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <FastImage
              priority={FastImage.priority.normal}
              resizeMode={FastImage.resizeMode.stretch}
              source={require('../assets/baa1.jpg')}
              style={styles.institutionImage123}
              PlaceholderContent={<ActivityIndicator color="black" />}
            />
            <FastImage
              priority={FastImage.priority.normal}
              resizeMode={FastImage.resizeMode.stretch}
              source={require('../assets/baa.jpg')}
              style={styles.institutionImage123}
              PlaceholderContent={<ActivityIndicator color="black" />}
            />
            <FastImage
              priority={FastImage.priority.normal}
              resizeMode={FastImage.resizeMode.stretch}
              source={require('../assets/baa15.jpg')}
              style={styles.institutionImage123}
              PlaceholderContent={<ActivityIndicator color="black" />}
            />
            <FastImage
              priority={FastImage.priority.normal}
              resizeMode={FastImage.resizeMode.stretch}
              source={require('../assets/baa14.jpg')}
              style={styles.institutionImage123}
              PlaceholderContent={<ActivityIndicator color="black" />}
            />
            <FastImage
              priority={FastImage.priority.normal}
              resizeMode={FastImage.resizeMode.stretch}
              source={require('../assets/baa6.jpg')}
              style={styles.institutionImage123}
              PlaceholderContent={<ActivityIndicator color="black" />}
            />
            {/* Add more institution images here */}
          </ScrollView>
        </View>

        {/* #coming soon */}
        <View style={styles.specialOffer}>
          <View style={styles.specialOffer1}>
          <Ionicons2
              name="pushpin"
              size={30}
              color="black"
              style={{marginLeft: 5,marginTop:5}}
            />
            <Text style={styles.specialOfferText}>#Coming Soon</Text>
           
          </View>
          <FastImage
            priority={FastImage.priority.normal}
            resizeMode={FastImage.resizeMode.stretch}
            source={require('../assets/baa-native2.jpg')}
            style={styles.specialOfferImage12}
            PlaceholderContent={<ActivityIndicator color="black" />}
          />
        </View>

        {/* free course */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Free Content</Text>
          <ScrollView horizontal={true}>
            {youtubeVideos.map((video, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => openYoutube(video.embedUrl)}>
                {/* {console.log(video.embedUrl)} */}
                <View style={styles.videoContainer}>
                  {currentVideo === video.id ? (
                    <WebView
                      javaScriptEnabled={true}
                      domStorageEnabled={true}
                      source={{uri: video.embedUrl}}
                      style={styles.webView}
                    />
                  ) : (
                    <>
                      <FastImage
                        priority={FastImage.priority.normal}
                        resizeMode={FastImage.resizeMode.contain}
                        source={video.thumbnail}
                        style={styles.thumbnail}
                        PlaceholderContent={<ActivityIndicator color="black" />}
                      />
                      <Text style={styles.videoTitle}>{video.title}</Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* Popular Courses Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Popular Courses</Text>
          {/* Course Cards */}
          <ScrollView horizontal={true}>
            {/* Course Card 1 */}
            <View style={styles.courseCard}>
              <FastImage
                priority={FastImage.priority.normal}
                resizeMode={FastImage.resizeMode.stretch}
                source={require('../assets/welcome.jpg')}
                style={styles.courseImage}
                PlaceholderContent={<ActivityIndicator color="black" />}
              />
              <Text style={styles.courseTitle}>Course Title</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.discountPrice}>₹ 99</Text>
                <Text style={styles.originalPrice}>₹ 129</Text>
                <View style={styles.discountTag}>
                  <Text style={styles.discountTagText}>20% OFF</Text>
                </View>
              </View>
              <Button
                title="Buy now"
                filled
                onPress={() => navigation.navigate('Course')}
                style={{
                  marginTop: 15,
                  width: '100%',
                  color: '#4b52db',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
            <View style={styles.courseCard}>
              <FastImage
                priority={FastImage.priority.normal}
                resizeMode={FastImage.resizeMode.stretch}
                source={require('../assets/welcome.jpg')}
                style={styles.courseImage}
              />
              <Text style={styles.courseTitle}>Course Title</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.discountPrice}>$99</Text>
                <Text style={styles.originalPrice}>$129</Text>
                <View style={styles.discountTag}>
                  <Text style={styles.discountTagText}>20% OFF</Text>
                </View>
              </View>
              <Button
                title="Buy now"
                filled
                onPress={() => navigation.navigate('Course')}
                style={{
                  marginTop: 15,
                  width: '100%',
                  color: '#4b52db',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
            <View style={styles.courseCard}>
              <FastImage
                priority={FastImage.priority.normal}
                resizeMode={FastImage.resizeMode.stretch}
                source={require('../assets/welcome.jpg')}
                style={styles.courseImage}
              />
              <Text style={styles.courseTitle}>Course Title</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.discountPrice}>$99</Text>
                <Text style={styles.originalPrice}>$129</Text>
                <View style={styles.discountTag}>
                  <Text style={styles.discountTagText}>20% OFF</Text>
                </View>
              </View>
              <Button
                title="Buy now"
                filled
                onPress={() => navigation.navigate('Course')}
                style={{
                  marginTop: 15,
                  width: '100%',
                  color: '#4b52db',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
            {/* Add more course cards here */}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Gallaries</Text>
          <ScrollView horizontal={true}>
            <FastImage
              priority={FastImage.priority.normal}
              resizeMode={FastImage.resizeMode.contain}
              source={require('../assets/baa2.jpg')}
              style={styles.institutionImage1}
              PlaceholderContent={<ActivityIndicator color="black" />}
            />
            <FastImage
              priority={FastImage.priority.normal}
              resizeMode={FastImage.resizeMode.contain}
              source={require('../assets/baa7.jpg')}
              style={styles.institutionImage1}
              PlaceholderContent={<ActivityIndicator color="black" />}
            />
            <FastImage
              priority={FastImage.priority.normal}
              resizeMode={FastImage.resizeMode.contain}
              source={require('../assets/baa13.jpg')}
              style={styles.institutionImage1}
              PlaceholderContent={<ActivityIndicator color="black" />}
            />
            <FastImage
              priority={FastImage.priority.normal}
              resizeMode={FastImage.resizeMode.contain}
              source={require('../assets/baa4.jpg')}
              style={styles.institutionImage1}
              PlaceholderContent={<ActivityIndicator color="black" />}
            />
            <FastImage
              priority={FastImage.priority.normal}
              resizeMode={FastImage.resizeMode.contain}
              source={require('../assets/welcome.jpg')}
              style={styles.institutionImage1}
              PlaceholderContent={<ActivityIndicator color="black" />}
            />
            {/* Add more institution images here */}
          </ScrollView>
        </View>

        {/* Success Stories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Success Stories</Text>
          <ScrollView horizontal={true}>
            {/* Success Story Cards */}
            <View style={styles.successCard}>
              <View style={styles.successCardContent}>
                <Text style={styles.successTitle}>CHANDRA BISWAS</Text>
                <Text style={styles.successTitle}>WBCS-Gr-B (DSP)</Text>
                <Text style={styles.successText}>
                  “For me WBCS is not an examination, but a journey that
                  requires patience, perseverance, discipline, emotional and
                  personal sacrifices .I enjoyed every bit of my 4 years long
                  journey and reached my Destination. Thank you Barasat Academic
                  Association for being a part of my journey.”
                </Text>
              </View>
            </View>

            <View style={styles.successCard}>
              <View style={styles.successCardContent}>
                <Text style={styles.successTitle}>DEBABRATA PRAMANIK</Text>
                <Text style={styles.successTitle}>WBCS-Gr-C (Joint BDO)</Text>
                <Text style={styles.successText}>
                  “Everyone said to me aiming for WBCS service is a wild goose
                  chase, but today I proved them wrong. In this battle, apart
                  form my family. Barasat Aademic Association helped me a lot
                  and Samirul sir guided me & instilled inside me the passion
                  for WBCS Exe service. Thank you Barasat Academic Association &
                  Samirul sir.”
                </Text>
              </View>
            </View>

            <View style={styles.successCard}>
              <View style={styles.successCardContent}>
                <Text style={styles.successTitle}>MRIGANKA SHEKAR DAS</Text>
                <Text style={styles.successTitle}>Jt BDO</Text>
                <Text style={styles.successText}>
                  “The journey from an aspirant to administrator gets partially
                  fulfilled, when I was selected for the post Jt. BDO in
                  WBCS-19, Gr-C service. In this long journey where hard work,
                  perseverance, pain takes a toll on physical as well as mental
                  well being, family support & expert guidance shines like a
                  guiding light for the troubled souls like me. Thank you
                  Barasat Academic Association for nurturing the administrator
                  within me and making me realise my true potential, when all
                  hopes seemed to have lost.”
                </Text>
              </View>
            </View>
            {/* Add more success story cards here */}
          </ScrollView>
        </View>

        {/* query section */}
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: '#fff',
            elevation: 5,
            borderRadius: 8,
            padding: 8,
            margin: 15,
          }}>
          <View style={styles.container2}>
            {/* Left Section */}
            <View style={styles.leftSection}>
              <View style={styles.container1}>
                <Text style={styles.questionText}>Have any questions?</Text>
                <Text style={styles.goodJobText}>
                  Our experts can answer all your call questions over a phone
                  call
                </Text>
                {/* Call Button */}
              </View>
            </View>

            {/* Right Section */}
            <View style={styles.rightSection}>
              <FastImage
                priority={FastImage.priority.normal}
                resizeMode={FastImage.resizeMode.contain}
                source={require('../assets/baa-call.png')}
                style={styles.circularImage}
                PlaceholderContent={<ActivityIndicator color="black" />} // Updated style here
              />
            </View>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
        onPress={() => callNumber('+919073587432')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Call us +91-9073587432 / +91-9073345862 / +91-9073099301
        </Text>
      </TouchableOpacity>
          </View>
        </View>

        <View style={styles.headerTextFooter}>
          <Text style={styles.contactText1}>Why BAA ?</Text>
          <Text style={styles.contactText123}>
            Barasat Academic Association is a house of all competitive Exams
            coaching centre at Barasat, North 24 Parganas.We provide coaching in
            WBCS, Police, Combined, Rail, Primary TET, SSC-TET and also Mock
            Interview and Mock test of various Govt Exams.
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={{justifyContent: 'space-between'}}>
            <Text style={styles.contactText2}>connect us. through</Text>
            <View style={styles.socialLinks}>
              <TouchableOpacity
                style={{padding: 8}}
                onPress={() =>
                  openLink(
                    'https://www.youtube.com/@BarasatAcademicAssociation',
                  )
                }>
                <Icon name="youtube" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  openLink(
                    'https://www.youtube.com/@BarasatAcademicAssociation',
                  )
                }
                style={{padding: 8}}>
                <Icon name="telegram" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{padding: 8}}
                onPress={() =>
                  openLink(
                    'https://www.youtube.com/@BarasatAcademicAssociation',
                  )
                }>
                <Icon name="instagram" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactText1234}>BARASAT ACADEMIC </Text>
            <Text style={styles.contactText1234}>ASSOCIATION</Text>
            <Text style={styles.contactText}>Phone : +91-9073587432</Text>
            <Text style={styles.contactText}>+91-9073099301 </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
              <Text style={styles.contactText}>Contact Us: 24x7</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.headerTextFooter1}>
          <Text style={styles.contactText3}>Dream big and dare to fail.</Text>

          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 22,
              fontFamily:'JosefinSans-Italic-VariableFont_wght copy'
            }}>
            – Norman Vaughan
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 1,
            }}>
            <Ionicons name="remove-outline" color="black" size={60} />
            <Ionicons name="remove-outline" color="black" size={60} />
            <Ionicons name="remove-outline" color="black" size={60} />
            <Ionicons name="remove-outline" color="black" size={60} />
          </View>

          <View style={styles.appInfoContainer}>
            <Text
              style={{textAlign: 'center', color: 'black', fontWeight: 'bold'}}>
              Powered by
            </Text>
            <Text style={styles.appInfoText}>
              version: 1.0.0 | contact@example.com
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    marginHorizontal: 4,
    marginLeft: 60,
  },
  appInfoContainer: {
    padding: 16,
    borderRadius: 10,
    marginTop: 1,
  },
  appInfoText: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },

  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  videoContainer: {
    marginRight: 20,
    alignItems: 'center',
  },
  thumbnail: {
    width: 270,
    height: 150,
    borderRadius: 25,
    marginBottom: 8,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  offerImage: {
    width: 250,
    height: 200,
    borderRadius: 10,
    marginBottom: 2,
  },
  closeButton: {
    marginTop: 10,
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  webView: {
    width: 160,
    height: 90,
  },
  container1: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    marginTop: 20,
  },

  container2: {
    flexDirection: 'row',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  leftSection: {
    flex: 1,
    marginRight: 10,
    flexDirection: 'column',
  },
  rightSection: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
    fontFamily:'Rowdies-Regular',
    textAlign:'center'
  },
  goodJobText: {
    fontSize: 16,
    color: 'gray',
  },
  button: {
    marginTop: 22,
    width: '100%',
    padding: 15,
    backgroundColor: '#E0F7FA', // Replace with your primary color if different
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#007BFF', 
  },
  buttonText: {
    color: '#007BFF',
    fontSize: 16,
    fontFamily: 'Rowdies-Regular',
    textAlign: 'center',
  },
  callButton: {
    backgroundColor: '#5184fc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    
  },
  callButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  circularImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    paddingTop: 8,
    backgroundColor: '#1f1e1e',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileName: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Rowdies-Bold',
  },
  settingsIcon: {
    width: 30,
    height: 30,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
    fontFamily: 'RubikMonoOne-Regular',
  },
  sectionTitle1: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
    fontFamily: 'Rowdies-Regular',
  },
  institutionImage123: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  institutionImage1: {
    width: 85,
    height: 65,
    borderRadius: 10,
    marginRight: 10,
  },
  specialOffer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  specialOffer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  specialOfferText: {
    fontSize: 25,
    marginBottom: 5,
    color: '#4682B4',
    fontFamily: 'Rowdies-Bold',
  },
  specialOfferImage12: {
    width: '100%', // Full width of the container
    height: 400, // Fixed height, adjust as needed
    borderRadius: 10, // Rounded corners
    overflow: 'hidden', // Ensure content stays within rounded corners
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Elevation for Android shadow
  },
  courseCard: {
    marginRight: 10,
  },
  courseImage: {
    width: 250,
    height: 200,
    borderRadius: 10,
  },
  courseTitle: {
    marginTop: 10,
    fontSize: 18,
    color: 'black',
    fontFamily:'Rowdies-Regular'
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    color: 'black',
  },
  discountPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  originalPrice: {
    fontSize: 16,
    marginLeft: 5,
    textDecorationLine: 'line-through',
    color: '#888',
    color: 'black',
  },
  discountTag: {
    backgroundColor: 'green',
    marginLeft: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  discountTagText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buyNowButton: {
    backgroundColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buyNowButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successCard: {
    marginRight: 20,
    width: 300,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  successCardContent: {
    color: 'black',
  },
  successTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  successText: {
    fontSize: 14,
    color: 'black',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'black',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    margin: 10,
    borderRadius: 10,
  },
  footerText: {
    fontSize: 14,
    color: 'white',
  },
  contactInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: 10,
    textAlign: 'justify',
  },
  contactText: {
    fontSize: 14,
    marginBottom: 5,
    color: 'white',
  },
  contactText123: {
    fontSize: 15,
    marginBottom: 5,
    color: 'black',
     fontFamily:'Rowdies-Light'
  },
  contactText1234: {
    fontSize: 15,
    marginBottom: 5,
    color: 'white',
     fontFamily:'Rowdies-Light'
  },
  contactText3: {
    fontSize: 25,
    marginBottom: 5,
    color: 'black',
    textAlign: 'center',
    marginTop: 15,
    fontFamily:'JosefinSans-VariableFont_wght'
  },
  contactText1: {
    fontSize: 20,
    marginBottom: 5,
    color: 'black',
    fontFamily:'Rowdies-Regular'
  },
  contactText2: {
    fontSize: 13,
    marginBottom: 5,
    color: 'white',
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Align items vertically
    marginRight: 20, // Add some right margin to the container
  },
  headerTextFooter: {
    backgroundColor: '#d9e3ff',
    padding: 10,
    margin: 10,
    textAlign: 'justify',
    borderRadius: 10,
  },
  headerTextFooter1: {
    backgroundColor: 'white',
    padding: 8,
    marginBottom: 60,
  },

  header12: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#000',
  },
  headerText12: {
    color: '#fff',
    fontSize: 18,
  },
  giftIconContainer: {
    padding: 8,
  },
  giftIcon: {
    color: '#fff',
    fontSize: 20,
  },
  searchContainer: {
    margin: 16,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  searchText: {
    color: '#888',
  },
  title12: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 14,
    color: 'black',
  },
  subtitle: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 16,
    fontFamily: 'Rowdies-Regular',
  },
  callButton: {
    backgroundColor: '#5184fc',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  callButtonText: {
    fontSize:16,
    color: '#fff',
    fontFamily: 'Rowdies-Light',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  card1: {
    width: '45%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  cardImage1: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  cardText1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
    fontFamily: 'Rowdies-Bold',
  },
  cardSubText: {
    color: '#888',
    fontFamily: 'Rowdies-Light',
  },
  sectionTitle1: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: 'black',
  },

  centeredViewm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalViewm: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'black',
  },
  titlem: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitlem: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  boldTextm: {
    fontWeight: 'bold',
  },
  limitedOfferm: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'JosefinSans-Italic-VariableFont_wght copy',
  },
  codeTextm: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  codem: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  buttonm: {
    backgroundColor: '#00c853',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  buttonTextm: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Rowdies-Regular',
  },
  termsm: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
  },
  imagem: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

export default Homeuser;
