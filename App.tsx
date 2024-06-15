import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./src/screens/Welcome";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Homeuser from "./src/userpage/Homeuser";
import Userdash from "./src/userpage/Userdash";
import { StyleSheet, View } from "react-native";
import Profile from "./src/userpage/Profile";
import Result from "./src/userpage/Result";
import Resultdetails from "./src/userpage/Resultdetails";
import Contact from "./src/userpage/Contact";
import Mycourse from "./src/userpage/Mycourse";
import Timetable from "./src/userpage/Timetable";
import Notice from "./src/userpage/Notice";
import Explore from "./src/userpage/Explore";
import Adminhome from "./src/adminpage/Adminhome";
import Admindash from "./src/adminpage/Admindash";
import Lecturevideo from "./src/adminpage/Lecturevideo";
import Addlecture from "./src/adminpage/Addlecture";
import Adminprofile from "./src/adminpage/Adminprofile";
// import Examwrite from "./src/userpage/Examwrite";
import Chatwithadmin from "./src/userpage/Chatwithadmin";
import Allresult from "./src/adminpage/Allresult";
import Updatepage from "./src/adminpage/Updatepage";
import Admintimetable from "./src/adminpage/Admintimetable";
import Noticeadmin from "./src/adminpage/Noticeadmin";
import Admincontact from "./src/adminpage/Admincontact";
import WatchLecture from "./src/userpage/WatchLecture";
import Chatlist from "./src/adminpage/Chatlist";
import Viewpdf from "./src/adminpage/Viewpdf";
import ChatWithUser from "./src/adminpage/ChatwithUser";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
         <Stack.Screen name="Userdash" component={Userdash} />
        <Stack.Screen name="homeuser" component={Homeuser} />
       <Stack.Screen
          name="Profileuser"
          component={Profile}
          options={{
            headerShown: true,
          }}
        />
         <Stack.Screen
          name="Result"
          component={Result}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Resultdetails"
          component={Resultdetails}
          options={{
            headerShown: true,
          }}
        />
       <Stack.Screen
          name="Contact"
          component={Contact}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="My course"
          component={Mycourse}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Time-Table"
          component={Timetable}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Notice"
          component={Notice}
          options={{
            headerShown: true,
          }}
        /> 
        <Stack.Screen
          name="Explore"
          component={Explore}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Adminhome"
          component={Adminhome}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Admindash"
          component={Admindash}
          options={{
            headerShown: true,
          }}
        /> 
      <Stack.Screen
          name="Add Lecture"
          component={Lecturevideo}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Add Video"
          component={Addlecture}
          options={{
            headerShown: true,
          }}
        />
          <Stack.Screen
          name="Admin-Profile"
          component={Adminprofile}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Class"
          component={WatchLecture}
        />
         {/* <Stack.Screen
          name="Write-Exam"
          component={Examwrite}
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name="Chat Us"
          component={Chatwithadmin}
          options={{
            headerShown: true,
          }}
        />
         <Stack.Screen
          name="Update"
          component={Updatepage}
          options={{
            headerShown: false,
          }}
        />
          <Stack.Screen
          name="Admin Result"
          component={Allresult}
          options={{
            headerShown: true,
          }}
        />
          <Stack.Screen
          name="Admin Timetable"
          component={Admintimetable}
          options={{
            headerShown: true,
          }}
        />
         <Stack.Screen
          name="Admin Notice"
          component={Noticeadmin}
          options={{
            headerShown: true,
          }}
        />
         <Stack.Screen
          name="All Query"
          component={Admincontact}
          options={{
            headerShown: true,
          }}
        />
         <Stack.Screen
          name="Chat List"
          component={Chatlist}
          options={{
            headerShown: true,
          }}
        />
          <Stack.Screen
          name="Pdf View"
          component={Viewpdf}
        />
        <Stack.Screen
          name="Admin Reply"
          component={ChatWithUser}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // Set the background color to white
  },
});
