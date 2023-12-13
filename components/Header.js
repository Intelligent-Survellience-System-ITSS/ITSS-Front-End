import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

// importing globals:
import colors from '../globals/Colors';
import { useUser } from '../globals/UserContext';

export default function Header() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter/Inter-Regular.ttf'),
    'Raleway-Regular': require('../assets/fonts/Raleway/Raleway-Regular.ttf'),
  });

  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const { user, loading } = useUser();
  // console.log(user)

  const handleProfileClick = () => {
    navigation.navigate('ProfileScreen');
  };

  const handleITSSClick = () => {
    if (!loading && user) {
      if (user.designation) {
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
            console.log("User designation is not recognized");
        }
      } else {
        console.log("User or designation is undefined");
      }
    }
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
    width: 90,
    height: 50,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    overflow: 'hidden',
    backgroundColor: colors.white,
    marginTop: -5,
    paddingBottom: 5
  },
  logoImage: {
    width: '100%',
    height: '100%',
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
