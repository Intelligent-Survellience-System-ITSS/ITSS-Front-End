import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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