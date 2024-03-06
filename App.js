import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initializeApp } from '@react-native-firebase/app';

// importing components:
import Login from './components/Login';
import Signup from './components/Signup';
import SplashScreen from './components/Splash';
import ProfileScreen from './components/ProfileScreen';
import Settings from './components/Settings';
import AboutUs from './components/AboutUs';
import { UserProvider } from './globals/UserContext';
import TrafficPoliceHomeScreen from './components/TrafficPoliceHomeScreen';
import FireBrigadeHomeScreen from './components/FireBrigadeHomeScreen';
import ParamedicsHomeScreen from './components/ParamedicsHomeScreen';

const Stack = createStackNavigator();

const App = () => {

  // initializing firebase
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyBfC9KVdEXqB7vyAWeBnj_UsA7aQj-Zpms",
      authDomain: "itss-92d25.firebaseapp.com",
      projectId: "itss-92d25",
      storageBucket: "itss-92d25.appspot.com",
      messagingSenderId: "122559505125",
      appId: "1:122559505125:web:bd7c7bfdffd8489c52ea0c",
      measurementId: "G-EZBWZ3PJF2"
    };

    // initializing the app
    initializeApp(firebaseConfig);

  }, []);

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
          />
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
          />
          <Stack.Screen
            name='ProfileScreen'
            component={ProfileScreen}
          />
          <Stack.Screen
            name="TrafficPoliceHomeScreen"
            component={TrafficPoliceHomeScreen}
          />
          <Stack.Screen
            name="ParamedicsHomeScreen"
            component={ParamedicsHomeScreen}
          />
          <Stack.Screen
            name="FireBrigadeHomeScreen"
            component={FireBrigadeHomeScreen}
          />
          <Stack.Screen
            name="AboutUs"
            component={AboutUs}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;