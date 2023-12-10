import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

// importing globals:
import colors from '../globals/Colors';

export default function Header({ title }) {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter/Inter-Regular.ttf'),
    'Raleway-Regular': require('../assets/fonts/Raleway/Raleway-Regular.ttf'),
  });

  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const handleProfileClick = () => {
    // navigate to ProfileScreen
    navigation.navigate('ProfileScreen');
  };

  const handleITSSClick = () => {
    // assume this takes the user to the home screen
    navigation.navigate('HomeScreen');
  };

  const toggleMenu = () => {
    // toggle the menu visibility
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

      <TouchableOpacity style={styles.headerItem} onPress={handleITSSClick}>
        <Text style={styles.ITSS}>ITSS</Text>
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
    width: '100%',
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
  ITSS: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.orange,
    fontFamily: 'Inter-Regular',
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
