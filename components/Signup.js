import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';

// importing globals:
import colors from '../globals/Colors';

// importing components:

// Get the device's screen height and width
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

function Signup() {
  const [fontsLoaded] = useFonts({
    'Raleway-Regular': require('../assets/fonts/Raleway/Raleway-Regular.ttf'),
  });

  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [designation, setDesignation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  // const signUp = () => {
  //   firstName,
  //   lastName,
  //   email,
  //   password,
  //   designation,
  //   phoneNumber,
  //   employeeId
  // }
  const fetchData = async () => {
    const response =  await fetch("https://itss-2798c-default-rtdb.firebaseio.com/users.json", {
      method:"POST",
      headers: {
        'Content-Type':" application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        designation,
        phoneNumber,
        employeeId
      }),
    })
    alert("Registered successfully.")
    console.log(response)
    if(!response) {
      throw new Error("Failed.")
    }
    const data = await response.json();
    console.log("Data sent: ", data);
    navigation.replace('Login');
  }

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.main}>
      <ImageBackground
        source={require('../assets/pictures/signup_bg.jpg')}
        style={styles.backgroundImage}
      >
        <ScrollView style={styles.scrollContainer}>

        <View style={styles.container}>
          <Text style={styles.signup}>Sign Up</Text>
          <Text style={styles.normalText}>
            Please provide these details to create an account
          </Text>

          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            inputMode='text'
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            inputMode='text'
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            inputMode='email'
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <Text style={styles.label}>Designation</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your designation"
            value={designation}
            onChangeText={(text) => setDesignation(text)}
            inputMode='text'
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            inputMode='tel'
          />

          <Text style={styles.label}>Employee ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your employee ID"
            value={employeeId}
            onChangeText={(text) => setEmployeeId(text)}
            inputMode='numeric'
          />

          <TouchableOpacity onPress={fetchData} style={styles.signupButton}>
            <Text style={styles.buttonText}>Signup</Text>
            <FontAwesome5 name="user-plus" size={20} color="white" style={styles.icon} />
          </TouchableOpacity>

          <Text style={styles.loginText} onPress={goToLogin}>
            Already have an account? Click to login.
          </Text>
        </View>

      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  backgroundImage: {
    width: screenWidth,
    height: screenHeight,
  },
  signup: {
    fontSize: 36,
    textAlign: 'center',
    margin: 15,
    color: 'white',
    fontFamily: 'Raleway-Regular'
  },
  signupButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    fontFamily: 'Raleway-Regular',
  },
  normalText: {
    color: 'white',
    margin: 10,
    textAlign: 'center',
    fontFamily: 'Raleway-Regular'
  },
  container: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 5,
    margin: 20,  // Adjust margin to provide spacing from screen edges
    width: screenWidth - 40,  // Adjust width to provide spacing on both sides
  },
  scrollContainer: {
    flexGrow: 1,
  },  
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
    fontFamily: 'Raleway-Regular'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    fontFamily: 'Raleway-Regular',
    color: 'black',  // Set the text color to ensure visibility
  },

  loginText: {
    color: 'white',
    marginTop: 15,
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontFamily: 'Raleway-Regular'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    margin: 10
},
  icon: {
    marginLeft: 5,
  },
  loginText: {
    color: 'white',
    marginTop: 15,
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
  },
});

export default Signup;
