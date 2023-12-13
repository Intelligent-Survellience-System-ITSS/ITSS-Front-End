import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../globals/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

// importing globals:
import { useUser } from '../globals/UserContext';

export default function ProfileScreen({ navigation }) {
  const { userData } = useUser();
  console.log('User Data:', userData);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [fontsLoaded] = useFonts({
    'Raleway-Regular': require('../assets/fonts/Raleway/Raleway-Regular.ttf'),
    'Inter-Black': require('../assets/fonts/Inter/Inter-Black.ttf')
  });

  const [localFirstName, setLocalFirstName] = useState('');
  const [localLastName, setLocalLastName] = useState('');
  const [localDesignation, setLocalDesignation] = useState('');
  const [localEmployeeId, setLocalEmployeeId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate data fetching delay (e.g., 3 seconds)
        await new Promise(resolve => setTimeout(resolve, 3000));

        if (userData) {
          setUser(userData);
          setLocalFirstName(userData.firstName || 'couldnt fetch data...');
          setLocalLastName(userData.lastName || '');
          setLocalDesignation(userData.designation || '');
          setLocalEmployeeId(userData.employeeId || '');
        } else {
          console.log("User data is undefined");
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userData]);

  useEffect(() => {
    // Additional check to handle changes in userData
    if (userData) {
      setLocalFirstName(userData.firstName || 'couldnt fetch data...');
      setLocalLastName(userData.lastName || '');
      setLocalDesignation(userData.designation || '');
      setLocalEmployeeId(userData.employeeId || '');
      setLoading(false);
    }
  }, [userData]);

  const goBack = () => {
    navigation.goBack();
  };

  const goToHomeScreen = () => {
    if (user && user.designation) {
      switch (user.designation) {
        case 'Paramedics':
          navigation.replace('ParamedicsHomeScreen');
          break;
        case 'Fire Brigade':
          navigation.replace('FireBrigadeHomeScreen');
          break;
        case 'Traffic Police':
          navigation.replace('TrafficPoliceHomeScreen');
          break;
        default:
          // Navigate to a default home screen if no designation matches
          navigation.replace('DefaultHomeScreen');
          break;
      }
    } else {
      // Handle the case when user or designation is undefined
      console.log("User or designation is undefined");
    }
  };

  const handleUpdateProfile = () => {
    // console.log('Updated Profile:');
    // console.log('First Name:', localFirstName);
    // console.log('Last Name:', localLastName);
    // console.log('Designation:', localDesignation);
    // console.log('Employee ID:', localEmployeeId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
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

        <TouchableOpacity
          style={styles.itssContainer}
          onPress={goToHomeScreen}
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
  itssText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.orange,
    fontFamily: 'Raleway-Regular'
  },
});
