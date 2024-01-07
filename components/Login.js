import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { FontAwesome5 } from '@expo/vector-icons';

// Importing globals
import { useUser } from '../globals/UserContext';
import colors from '../globals/Colors';
import { useUserData } from '../globals/Variables'; // Import the new hook

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

function Login({ navigation }) {
  const { login } = useUser();
  const { updateUserData } = useUserData(); // Destructure the new function

  const [fontsLoaded] = useFonts({
    'Raleway-Regular': require('../assets/fonts/Raleway/Raleway-Regular.ttf'),
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');
  
    try {
      const response = await fetch("https://itss-2798c-default-rtdb.firebaseio.com/users.json");
  
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const data = await response.json();
  
      const user = Object.values(data).find((user) => user.email === email && user.password === password);

      
      if (user) {
        // console.log("Logged-in user:", user);
        // Set the global state with the logged-in user data
        login(user);

        // Update the user's data (excluding password) using the new hook
        updateUserData({
          email: user.email,
          designation: user.designation,
          employeeId: user.employeeId,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber
          // Add other user-related fields as needed
        });
  
        // Navigate to the home screen based on designation
        switch (user.designation) {
          case 'Paramedics':
            navigation.replace('ParamedicsHomeScreen');
            console.log("Logged-in user:", user);
            break;
          case 'Fire Brigade':
            navigation.replace('FireBrigadeHomeScreen');
            console.log("Logged-in user:", user); 
            break;
          case 'Traffic Police':
            navigation.replace('TrafficPoliceHomeScreen');
            console.log("Logged-in user:", user);
            break;
        }
      } else {
        alert("Invalid email or password");
  
        setEmail('');
        setPassword('');
  
        console.log("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const goToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaView style={styles.main}>
      <ImageBackground
        source={require('../assets/pictures/courthouse-building.jpg')}
        style={styles.main}
      >
        <View style={styles.container}>
          <Text style={styles.signup}>Login</Text>
          <Text style={styles.provide_details_text}>
            Please provide these details to login
          </Text>
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Email</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              inputMode="email"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Password</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <FontAwesome5 name="sign-in-alt" size={20} color="white" style={styles.loginIcon} />
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.signup_text} onPress={goToSignup}>
            Don't have an account? Click to sign up.
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: screenHeight,
        width: screenWidth,
    },
    signup: {
        fontSize: 36,
        textAlign: 'center',
        margin: 15,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Raleway-Regular'
    },
    container: {
        width: '100%',
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 5,
        margin: 50,
    },
    inputContainer: {
        marginBottom: 16,
    },
    labelContainer: {
        width: '100%',
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Raleway-Regular'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        fontFamily: 'Raleway-Regular'
    },
    provide_details_text: {
        color: 'white',
        margin: 5,
        textAlign: 'center',
        marginBottom: 15,
        fontFamily: 'Raleway-Regular'
    },
    signup_text: {
        color: 'white',
        marginTop: 15,
        textDecorationLine: 'underline',
        textAlign: 'center',
        fontFamily: 'Raleway-Regular'
    },
    loginButton: {
        flexDirection: 'row',
        backgroundColor: colors.primary,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Raleway-Regular'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Raleway-Regular',
    },
    loginIcon: {
        marginRight: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 5,
        fontFamily: 'Raleway-Regular',
    },
});

export default Login;