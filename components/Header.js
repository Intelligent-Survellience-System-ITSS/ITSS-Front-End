import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

// importing globals:
import colors from '../globals/Colors';

export default function Header() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter/Inter-Regular.ttf'),
    'Raleway-Regular': require('../assets/fonts/Raleway/Raleway-Regular.ttf'),
  });

  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const handleProfileClick = () => {
    navigation.navigate('ProfileScreen');
  };

  const handleITSSClick = () => {
    navigation.navigate('HomeScreen');
  };

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const goToLogin = () => {
    navigation.replace('Login');
  };

  const goToAbout = () => {
    navigation.navigate('AboutUs');
  }

  const goToSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity style={styles.headerItem} onPress={handleProfileClick}>
        <Ionicons name="person-outline" size={24} color={colors.white} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleITSSClick}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/pictures/logoITSS.png')} style={styles.logoImage} resizeMode="contain" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.headerItem} onPress={toggleMenu}>
        <Ionicons name="menu-outline" size={24} color={colors.white} style={styles.icon} />
      </TouchableOpacity>

      <Modal isVisible={isMenuVisible} onBackdropPress={toggleMenu}>
        <View style={styles.modalContainer}>

          <TouchableOpacity style={styles.menuItem} onPress={goToAbout}>
            <Ionicons name="information-circle-outline" size={24} color={colors.white} style={styles.menuIcon} />
            <Text style={styles.menuItemText}>About Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={goToSettings}>
            <Ionicons name="settings-outline" size={24} color={colors.white} style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={goToLogin}>
            <Ionicons name="log-out-outline" size={24} color={colors.white} style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Log out</Text>
          </TouchableOpacity>

        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  headerItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  icon: {
    fontWeight: 'bold',
  },
  logoContainer: {
    width: 90, // Increased width for the circle
    height: 50, // Increased height for the circle
    borderBottomLeftRadius: 80, // Adjusted radius for the semicircle
    borderBottomRightRadius: 80, // Adjusted radius for the semicircle
    overflow: 'hidden',
    backgroundColor: colors.white,
    marginTop: -5,
    paddingBottom: 5
  },
  logoImage: {
    width: '100%', // Occupy the entire space of the container
    height: '100%', // Occupy the entire space of the container 
  },
  modalContainer: {
    backgroundColor: colors.black,
    padding: 20,
    borderRadius: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'center',
  },
  menuIcon: {
    marginRight: 10,
  },
  menuItemText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
  },
});