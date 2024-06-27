import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ionicons3 from 'react-native-vector-icons/MaterialIcons';
import Ionicons1 from 'react-native-vector-icons/Entypo';
import Ionicons2 from 'react-native-vector-icons/FontAwesome';
import Ionicons4 from 'react-native-vector-icons/AntDesign';
import Ionicons5 from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validateTokenUser} from '../api/authApi';
import ToastManager, {Toast} from 'toastify-react-native';

const Menu = ({navigation}) => {
  const goToExaminationProgress = () => {};

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState(null);

  const fetchRegisterUser = async token => {
    try {
      const data = await validateTokenUser(token);
      setUserData(data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setToken(token);
        fetchRegisterUser(token);
      } else {
        setLoading(false); // Set loading to false if no token is found
      }
    };
    getToken();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Academic Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Academic</Text>

          <ToastManager />

          <View style={styles.academicHeader}>
            <Ionicons1
              name="progress-one"
              size={24}
              color="black"
              style={styles.icon}
            />
            {userData.isInstitute ? (
              <Text
                style={styles.sectionTitle}
                onPress={() => navigation.navigate('Institute')}>
                Institute Class
              </Text>
            ) : (
              <Text
                style={styles.sectionTitle}
                onPress={() => Toast.error('No access')}>
                Institute Class
              </Text>
            )}
            <View style={styles.arrowContainer}>
              {userData.isInstitute ? (
                <TouchableOpacity onPress={() => navigation.navigate('Institute')}>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => Toast.error('No access')}>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.line} />

          <View style={styles.academicHeader}>
            <Ionicons1
              name="progress-one"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text
              style={styles.sectionTitle}
              onPress={() => navigation.navigate('Result')}>
              Examination progress
            </Text>
            <View style={styles.arrowContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Result')}>
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.line} />

          <View style={styles.academicHeader}>
            <Ionicons3
              name="schedule"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text
              style={styles.sectionTitle}
              onPress={() => navigation.navigate('Time-Table')}>
              Time Table
            </Text>
            <View style={styles.arrowContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Time-Table')}>
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
          </View>
          <View style={styles.line} />
          <View style={styles.academicHeader}>
            <Ionicons3
              name="co-present"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.sectionTitle}>Attendence</Text>
            <View style={styles.arrowContainer}>
              <TouchableOpacity onPress={goToExaminationProgress}>
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
          </View>
          {/* Content related to academic */}
          {/* For example, attendance, results, etc. */}
        </View>

        {/* Line */}

        {/* Communication Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Communication</Text>
          {/* Content related to communication */}
          {/* For example, banners, resources, etc. */}
          <View style={styles.academicHeader}>
            <Ionicons
              name="book-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text
              style={styles.sectionTitle}
              onPress={() => navigation.navigate('Resource')}>
              Resource
            </Text>
            <View style={styles.arrowContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Resource')}>
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.academicHeader}>
            <Ionicons2
              name="file-pdf-o"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text
              style={styles.sectionTitle}
              onPress={() => navigation.navigate('Notice')}>
              Notice
            </Text>
            <View style={styles.arrowContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Notice')}>
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help Desk</Text>
          {/* Content related to communication */}
          {/* For example, banners, resources, etc. */}
          <View style={styles.academicHeader}>
            <Ionicons5
              name="contact-support"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text
              style={styles.sectionTitle}
              onPress={() => navigation.navigate('Contact')}>
              Contact Us
            </Text>
            <View style={styles.arrowContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.line} />
          <TouchableOpacity
            style={styles.academicHeader}
            onPress={() => navigation.navigate('Chat Us')}>
            <Ionicons4
              name="wechat"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.sectionTitle}>Chat with Us</Text>
            <View style={styles.arrowContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Chat Us')}>
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e0e0e0',
    paddingTop: 10,
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  section: {
    backgroundColor: '#fff', // White background color
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
    color: 'black',
  },
  academicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Adjusted to space between
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  arrowContainer: {
    marginLeft: 'auto', // Moves the arrow to the right side
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginBottom: 20,
  },
});

export default Menu;
