import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// importing components:
import Login from './components/Login';
import Signup from './components/Signup';
import HomeScreen from './components/HomeScreen';
import SplashScreen from './components/Splash';
import ProfileScreen from './components/ProfileScreen';
import Settings from './components/Settings';
import AboutUs from './components/AboutUs';
import { UserProvider } from './components/UserContext';

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
            name="HomeScreen"
            component={HomeScreen}
          />
          <Stack.Screen
            name="AboutUs"
            component={AboutUs}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
          />
          <Stack.Screen
            name='ProfileScreen'
            component={ProfileScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
