import React, { useState } from "react";
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
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from "../componets/Button";
import COLORS from "../constants/colors";
// import { WebView } from "react-native-webview";

// import { YouTubeStandaloneAndroid, YouTubeStandaloneIOS } from "react-native-youtube";

// import {
//   faYoutube,
//   faTelegram,
//   faInstagram,
// } from "@fortawesome/free-brands-svg-icons"; // Importing specific brand icons

const Homeuser = ({ navigation }) => {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  const callNumber = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const youtubeVideos = [
    {
      id: "VIDEO_ID_1",
      title: "Introduction to React Native",
      thumbnail:
        "https://fastly.picsum.photos/id/1050/200/300.jpg?hmac=mMZp1DAD5EpHCZh-YBwfvrg5w327V3DoJQ8CmRAKF70",
      embedUrl:
        "https://www.youtube.com/watch?v=MYAWZQ_YOpQ&ab_channel=BarasatAcademicAssociation",
    },
    {
      id: "VIDEO_ID_1",
      title: "Introduction to React Native",
      thumbnail:
        "https://fastly.picsum.photos/id/1050/200/300.jpg?hmac=mMZp1DAD5EpHCZh-YBwfvrg5w327V3DoJQ8CmRAKF70",
      embedUrl:
        "https://www.youtube.com/watch?v=MYAWZQ_YOpQ&ab_channel=BarasatAcademicAssociation",
    },
    {
      id: "VIDEO_ID_1",
      title: "Introduction to React Native",
      thumbnail:
        "https://fastly.picsum.photos/id/1050/200/300.jpg?hmac=mMZp1DAD5EpHCZh-YBwfvrg5w327V3DoJQ8CmRAKF70",
      embedUrl:
        "https://www.youtube.com/watch?v=MYAWZQ_YOpQ&ab_channel=BarasatAcademicAssociation",
    },

    // Add more YouTube video IDs here
  ];

  const [currentVideo, setCurrentVideo] = useState(null);

  // Function to play the video
  const playVideo = (videoId) => {
    setCurrentVideo(videoId);
  };
  const openYoutube = (videoId) => {
    // const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    Linking.openURL(videoId);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Ionicons name="home" size={24} color="black" /> */}

      {/* Header */}
      <View style={styles.header}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={require("../assets/welcome.jpg")}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Hey, John Doe</Text>
        </View>
        {/* Settings Icon */}
        <Pressable onPress={() => navigation.navigate("Profileuser")}>
          <Ionicons name="settings-outline" size={28} color="black" />
        </Pressable>
      </View>

      {/* <TouchableOpacity onPress={()=>handlePayment("da","das","das","das","das","wdasddsaw")}>
        <Text>Open</Text>
      </TouchableOpacity> */}

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Institution Picture Slider Section */}
        <View style={styles.section}>
          <ScrollView horizontal={true}>
            <Image
              source={require("../assets/welcome.jpg")}
              style={styles.institutionImage}
            />
            <Image
              source={require("../assets/welcome.jpg")}
              style={styles.institutionImage}
            />
            <Image
              source={require("../assets/welcome.jpg")}
              style={styles.institutionImage}
            />
            <Image
              source={require("../assets/welcome.jpg")}
              style={styles.institutionImage}
            />
            <Image
              source={require("../assets/welcome.jpg")}
              style={styles.institutionImage}
            />
            {/* Add more institution images here */}
          </ScrollView>
        </View>
        <View style={styles.specialOffer}>
          <Text style={styles.sectionTitle}>#Coming Soon</Text>
          <Image
            source={require("../assets/welcome.jpg")}
            style={styles.specialOfferImage}
          />
        </View>

        {/* free course */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Free courses available on YouTube
          </Text>
          <ScrollView horizontal={true}>
            {youtubeVideos.map((video, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => openYoutube(video.embedUrl)}
              >
                {/* {console.log(video.embedUrl)} */}
                <View style={styles.videoContainer}>
                  {currentVideo === video.id ? (
                    <WebView
                      javaScriptEnabled={true}
                      domStorageEnabled={true}
                      source={{ uri: video.embedUrl }}
                      style={styles.webView}
                    />
                  ) : (
                    <>
                      <Image
                        source={{ uri: video.thumbnail }}
                        style={styles.thumbnail}
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
              <Image
                source={require("../assets/welcome.jpg")}
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
                style={{
                  marginTop: 15,
                  width: "100%",
                  color: "#4b52db",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </View>
            <View style={styles.courseCard}>
              <Image
                source={require("../assets/welcome.jpg")}
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
                style={{
                  marginTop: 15,
                  width: "100%",
                  color: "#4b52db",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </View>
            <View style={styles.courseCard}>
              <Image
                source={require("../assets/welcome.jpg")}
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
                style={{
                  marginTop: 15,
                  width: "100%",
                  color: "#4b52db",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </View>
            <View style={styles.courseCard}>
              <Image
                source={require("../assets/welcome.jpg")}
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
                style={{
                  marginTop: 15,
                  width: "100%",
                  color: "#4b52db",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </View>
            <View style={styles.courseCard}>
              <Image
                source={require("../assets/welcome.jpg")}
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
                style={{
                  marginTop: 15,
                  width: "100%",
                  color: "#4b52db",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </View>
            {/* Add more course cards here */}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Faculties</Text>
          <ScrollView horizontal={true}>
            <Image
              source={require("../assets/welcome.jpg")}
              style={styles.institutionImage1}
            />
            <Image
              source={require("../assets/welcome.jpg")}
              style={styles.institutionImage1}
            />
            <Image
              source={require("../assets/welcome.jpg")}
              style={styles.institutionImage1}
            />
            <Image
              source={require("../assets/welcome.jpg")}
              style={styles.institutionImage1}
            />
            <Image
              source={require("../assets/welcome.jpg")}
              style={styles.institutionImage1}
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
                <Text style={styles.successTitle}>Success Story Title</Text>
                <Text style={styles.successText}>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  venenatis, justo eu cursus venenatis, lorem nisi fringilla
                </Text>
              </View>
            </View>
            {/* Add more success story cards here */}
          </ScrollView>
        </View>

        {/* query section */}
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "#fff",
            elevation: 5,
            borderRadius: 8,
            padding: 8,
            margin: 15,
          }}
        >
           
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
              <Image
                source={require("../assets/welcome.jpg")}
                style={styles.circularImage} // Updated style here
              />
            </View>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Button
              title="Call us +917439120030"
              onPress={() => callNumber("+917439120030")}
              style={{
                marginTop: 22,
                width: "100%",
                color: COLORS.primary,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <View style={{ justifyContent: "space-between" }}>
            <View style={styles.socialLinks}>
              <TouchableOpacity
                style={{ padding: 8 }}
                onPress={() => openLink("https://www.youtube.com")}
              >
                <Icon name="youtube" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openLink("https://telegram.me")}
                style={{ padding: 8 }}
              >
                <Icon name="telegram" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ padding: 8 }}
                onPress={() => openLink("https://www.instagram.com")}
              >
                <Icon name="instagram" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactText}>Name: John Doe</Text>
            <Text style={styles.contactText}>Phone: +1234567890</Text>
            <Text style={styles.contactText}>Contact Us: 24x7</Text>
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
    backgroundColor: "#fff",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  videoContainer: {
    marginRight: 20,
    alignItems: "center",
  },
  thumbnail: {
    width: 220,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color:'black'
  },
  webView: {
    width: 160,
    height: 90,
  },
  container1: {
    flexDirection: "column",
    paddingHorizontal: 20,
    marginTop: 20,
  },

  container2: {
    flexDirection: "row",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  leftSection: {
    flex: 1,
    marginRight: 10,
    flexDirection: "column",
  },
  rightSection: {
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color:'black'
  },
  goodJobText: {
    fontSize: 16,
    color: "gray",
  },
  callButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  callButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
  },
  circularImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    paddingTop: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileName: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color:'black'
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color:'black'
  },
  institutionImage: {
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
  specialOfferImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
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
    fontSize: 16,
    color:'black'
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
     color:'black'
  },
  discountPrice: {
    fontSize: 16,
    fontWeight: "bold",
     color:'black'
  },
  originalPrice: {
    fontSize: 16,
    marginLeft: 5,
    textDecorationLine: "line-through",
    color: "#888",
     color:'black'
  },
  discountTag: {
    backgroundColor: "green",
    marginLeft: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  discountTagText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buyNowButton: {
    backgroundColor: "blue",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buyNowButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  successCard: {
    marginRight: 20,
    width: 300,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  successCardContent: {
    color:'black'
  },
  successTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color:'black'
  },
  successText: {
    fontSize: 14,
    color:'black'
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "black",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
  },
  footerText: {
    fontSize: 14,
    color: "white",
  },
  contactInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  contactText: {
    fontSize: 14,
    marginBottom: 5,
    color: "white",
  },
  socialLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Align items vertically
    marginRight: 20, // Add some right margin to the container
  },
});

export default Homeuser;
