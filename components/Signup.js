import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font'
import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Platform } from 'react-native';

// importing globals:
import colors from '../globals/Colors';

// get the device's screen height and width
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const MIN_LENGTH_NAME = 3;
const MAX_LENGTH_NAME = 15;
const MIN_LENGTH_PASS = 6;
const isAlphabetic = (text) => /^[a-zA-Z]+$/.test(text);

const generateUniqueId = () => {
  // Generate a random string or use a library like uuid to create a unique ID
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15).toUpperCase();
};

const userId = generateUniqueId();

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
  const [selectedDesignation, setSelectedDesignation] = useState('');

  // state variables for errors
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [employeeIdError, setEmployeeIdError] = useState('');
  const [designationError, setDesignationError] = useState('');
  const [emailExistsError, setEmailExistsError] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Check if the email already exists in the system
    const checkEmailExists = async () => {
      try {
        const response = await fetch("https://itss-2798c-default-rtdb.firebaseio.com/users.json");
        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }

        const userData = await response.json();
        const emailExists = Object.values(userData || {}).some(user => user.email === email);

        if (emailExists) {
          setEmailExistsError('Email already exists. Please use a different email.');
        } else {
          setEmailExistsError('');
        }
      } catch (error) {
        console.error('Error:', error.message);
        alert('Failed to check email existence. Please try again.');
      }
    };

    // Perform the check when the email is changed
    if (email) {
      checkEmailExists();
    }
  }, [email]);

  const goToDesignationScreen = () => {
    setModalVisible(true);
    setDesignation('');
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const saveDesignation = async (selectedDesignation, userId) => {
    try {
      // Create a new user with email and password using Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
  
      // Assume the user is successfully created
      alert('User created successfully.');
  
      // Now, you can navigate to different home screens based on the designation
      switch (selectedDesignation) {
        case 'Paramedics':
          navigation.replace('ParamedicsHomeScreen');
          break;
        case 'Fire Brigade':
          navigation.replace('FireBrigadeHomeScreen');
          break;
        case 'Traffic Police':
          navigation.replace('TrafficPoliceHomeScreen');
          break;
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to create user. Please try again.');
    }
  };
  
  const fetchData = async () => {
    // reset error states
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    setDesignationError('');
    setPhoneNumberError('');
    setEmployeeIdError('');
  
    // validate inputs
    if (!firstName || !lastName || !email || !password || !phoneNumber || !employeeId) {
      alert('Please fill all the fields.');
      return;
    }
  
    // validate individual fields
    if (firstName.length < MIN_LENGTH_NAME || firstName.length > MAX_LENGTH_NAME) {
      setFirstNameError('First Name should be between 3 and 20 characters.');
      return;
    }
  
    if (lastName.length < MIN_LENGTH_NAME || lastName.length > MAX_LENGTH_NAME) {
      setLastNameError('Last Name should be between 3 and 20 characters.');
      return;
    }
  
    // validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Enter a valid email address.');
      return;
    }
  
    // Check if the email already exists in the system
    if (emailExistsError) {
      alert('Email already exists. Please use a different email.');
      return;
    }
  
    // validate password length
    if (password.length < MIN_LENGTH_PASS) {
      setPasswordError(`Password should be at least ${MIN_LENGTH_PASS} characters.`);
      return;
    }
  
    // validate phone number format
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumberError('Enter a valid 10-digit phone number.');
      return;
    }
  
    // validate employee id
    const employeeIdRegex = /^\d+$/;
    if (!employeeIdRegex.test(employeeId)) {
      setEmployeeIdError('Enter your employee ID.');
      return;
    }
  
    try {
      // Save the user's designation and other details
      await saveDesignation(selectedDesignation, userId);
    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to save user data. Please try again.');
    }
  };
  

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.main}>
      <ImageBackground
        source={require('../assets/pictures/signup_bg.jpg')}
        style={styles.backgroundImage}
      >
        {/* ... (existing code) */}
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
              onChangeText={(text) => {
                if (isAlphabetic(text) || text === '') {
                  setFirstName(text);
                }
              }}
              inputMode='text'
            />
            {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}

            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={(text) => {
                if (isAlphabetic(text) || text === '') {
                  setLastName(text);
                }
              }}
              inputMode='text'
            />
            {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              inputMode='email'
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            {emailExistsError ? <Text style={styles.errorText}>{emailExistsError}</Text> : null}

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              inputMode='tel'
            />
            {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}

            <Text style={styles.label}>Employee ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your employee ID"
              value={employeeId}
              onChangeText={(text) => setEmployeeId(text)}
              inputMode='numeric'
            />
            {employeeIdError ? <Text style={styles.errorText}>{employeeIdError}</Text> : null}

            <TouchableOpacity onPress={fetchData} style={styles.signupButton}>
              <Text style={styles.buttonText}>Signup</Text>
              <FontAwesome5 name="user-plus" size={20} color="white" style={styles.icon} />
            </TouchableOpacity>

            <Text style={styles.loginText} onPress={goToLogin}>
              Already have an account? Click to login.
            </Text>
          </View>
        </ScrollView>

        {/* Designation selection modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => closeModal()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.labelDesignation}>Select your designation</Text>
              <Picker
                style={styles.picker}
                selectedValue={designation}
                onValueChange={(itemValue) => setDesignation(itemValue)}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="None" value="None" />
                <Picker.Item label="Paramedics" value="Paramedics" />
                <Picker.Item label="Fire Brigade" value="Fire Brigade" />
                <Picker.Item label="Traffic Police" value="Traffic Police" />
              </Picker>

              <TouchableOpacity onPress={() => saveDesignation(designation, userId)} style={styles.signupButton}>
                <Text style={styles.buttonText}>Continue</Text>
                <FontAwesome5 name="arrow-right" size={20} color="white" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: screenWidth,
    height: screenHeight - 30,
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
    margin: 20,
    width: screenWidth - 40,
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
  labelDesignation: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
    fontFamily: 'Raleway-Regular',
    fontSize: 16
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
    color: 'black',
  },
  picker: {
    color: colors.black_darker,
    fontSize: 20,
    backgroundColor: colors.white, 
  },
  pickerItem: {
    color: colors.black,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
    fontFamily: 'Raleway-Regular',
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
  designationContainer: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 5,
    margin: 20,
    width: screenWidth - 40,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 5,
    padding: 16,
    width: screenWidth - 40,
  },
});

export default Signup;