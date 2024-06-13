import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ionicons3 from 'react-native-vector-icons/MaterialIcons';
import Ionicons1 from 'react-native-vector-icons/Entypo';
import Ionicons2 from 'react-native-vector-icons/FontAwesome';
import Ionicons4 from 'react-native-vector-icons/AntDesign';
import Ionicons5 from 'react-native-vector-icons/MaterialIcons';
const Updatepage = ({ navigation }) => {
  const goToExaminationProgress = () => {
    // Navigate to the examination progress page
    // You can implement the navigation logic here
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Academic Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Academic</Text>
          <View style={styles.academicHeader}>
            <Ionicons1
              name="progress-one"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text
              style={styles.sectionTitle}
              onPress={() => navigation.navigate("Admin Result")}
            >
              Examination progress
            </Text>
            <View style={styles.arrowContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("Admin Result")}>
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
            <Text style={styles.sectionTitle} onPress={()=>navigation.navigate("Admin Timetable")}>Time Table</Text>
            <View style={styles.arrowContainer}>
              <TouchableOpacity onPress={()=>navigation.navigate("Admin Timetable")}>
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
            <Text style={styles.sectionTitle}>Resource</Text>
            <View style={styles.arrowContainer}>
              <TouchableOpacity onPress={goToExaminationProgress}>
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
            <Text style={styles.sectionTitle} onPress={()=>navigation.navigate("Admin Notice")}>Notice</Text>
            <View style={styles.arrowContainer}>
              <TouchableOpacity onPress={()=>navigation.navigate("Admin Notice")}>
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
          <View style={styles.academicHeader} >
            <Ionicons5
              name="contact-support"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.sectionTitle} onPress={()=>navigation.navigate("All Query")}>All Query Details</Text>
            <View style={styles.arrowContainer}>
              <TouchableOpacity  onPress={()=>navigation.navigate("All Query")}>
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.line} />
          <TouchableOpacity style={styles.academicHeader} onPress={()=>navigation.navigate("Chat List")}>
            <Ionicons5
              name="wechat"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.sectionTitle}>Chat List</Text>
            <View style={styles.arrowContainer}>
              <TouchableOpacity onPress={()=>navigation.navigate("Chat List")}>
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
    backgroundColor: "#e0e0e0", // Grey background color
    paddingTop: 20, // Adjusted top padding to provide space for the header
    paddingHorizontal: 20, // Add horizontal padding to the container
  },
  section: {
    backgroundColor: "#fff", // White background color
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 6,
    color:'black'
  },
  academicHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Adjusted to space between
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  arrowContainer: {
    marginLeft: "auto", // Moves the arrow to the right side
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    marginBottom: 20,
  },
});

export default Updatepage;
