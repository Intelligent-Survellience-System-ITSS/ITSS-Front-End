import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../globals/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserData } from '../globals/Variables';

export default function ProfileScreen({ navigation }) {
  const { userData, updateUserData } = useUserData();

  const [localFirstName, setLocalFirstName] = useState('');
  const [localLastName, setLocalLastName] = useState('');
  const [localDesignation, setLocalDesignation] = useState('');
  const [localEmployeeId, setLocalEmployeeId] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [emailModalVisible, setEmailModalVisible] = useState(true);
  const [enteredEmail, setEnteredEmail] = useState('');

  useEffect(() => {
    if (userData && userData.firstName) {
      setLocalFirstName(userData.firstName);
      setLocalLastName(userData.lastName || '');
      setLocalDesignation(userData.designation || '');
      setLocalEmployeeId(userData.employeeId || '');
    } else {
      console.log("User data is missing or undefined");
      setLocalFirstName('');
      setLocalLastName('');
      setLocalDesignation('');
      setLocalEmployeeId('');
    }
  }, [userData]);

  const logUserData = () => {
    if (Array.isArray(fetchedData)) {
      fetchedData.forEach((user) => {
        console.log(user.firstName);
      });
    } else {
      console.log("Fetched data is not an array");
    }
  };

  const handleUpdateProfile = () => {
    updateUserData({
      ...userData,
      firstName: localFirstName,
      lastName: localLastName,
      designation: localDesignation,
      employeeId: localEmployeeId,
    });
  };

  const handleEmailModalClose = () => {
    setEmailModalVisible(false);
  };

  const handleEmailSubmit = async () => {
    
      try {
        const response = await fetch("https://itss-2798c-default-rtdb.firebaseio.com/users.json");
    
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
    
        const data = await response.json();
        const user = Object.values(data).find((user) => user.email === enteredEmail);
        console.log(user);
        if(user) {
          setLocalFirstName(user.firstName || '');
          setLocalLastName(user.lastName || '');
          setLocalDesignation(user.designation || '');
          setLocalEmployeeId(user.employeeId || '');
          // alert("Checked!");
          handleEmailModalClose();
        } else {
          alert("Wrong Email");
          alert("For the user's safety, we're logging you out!.");
          navigation.replace("Login");
        }
        
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {logUserData()}
      </View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>ITSS</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.headerLine} />

        <View style={styles.content}>
          <Text style={styles.profileHeading}>Profile</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={localFirstName}
              onChangeText={(text) => setLocalFirstName(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={localLastName}
              onChangeText={(text) => setLocalLastName(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Department</Text>
            <TextInput
              style={styles.input}
              value={localDesignation}
              onChangeText={(text) => setLocalDesignation(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Employee ID</Text>
            <TextInput
              style={styles.input}
              value={localEmployeeId}
              onChangeText={(text) => setLocalEmployeeId(text)}
            />
          </View>

          {/* <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </TouchableOpacity> */}
        </View>

        {/* Email Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={emailModalVisible}
          onRequestClose={handleEmailModalClose}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Please enter your Email:</Text>
              <TextInput
                style={styles.modalInput}
                value={enteredEmail}
                onChangeText={(text) => setEnteredEmail(text)}
              />
              <Button title="Submit" onPress={handleEmailSubmit} />
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.itssContainer}
          onPress={() => navigation.replace('HomeScreen')}
        >
          <ImageBackground
            source={require('../assets/pictures/logoITSS.png')}
            style={{ width: 100, height: 50 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black_darker,
    padding: 20,
  },
  icon: {
    color: 'white',
    marginLeft: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.black,
    flex: 0.075,
    borderBottomColor: colors.orange
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.orange,
    marginLeft: 10,
    fontFamily: 'Raleway-Regular'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.orange,
    marginBottom: 30,
    fontFamily: 'Inter-Black'
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
    fontFamily: 'Raleway-Regular'
  },
  label: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 8,
    fontFamily: 'Raleway-Regular'
  },
  input: {
    height: 40,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: colors.white,
    fontFamily: 'Raleway-Regular'
  },
  updateButton: {
    backgroundColor: colors.orange,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Raleway-Regular'
  },
  itssContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Raleway-Regular'
  },
  modalInput: {
    height: 40,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    fontFamily: 'Raleway-Regular'
  },
});
