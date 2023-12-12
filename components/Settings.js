import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../globals/Colors';
import Header from './Header';

const Settings = () => {
  const [isDarkTheme, setDarkTheme] = useState(true);

  const handleToggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
    // Handle theme toggle logic here
    console.log('Theme switched to:', isDarkTheme ? 'Light' : 'Dark');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkTheme ? colors.black : colors.white }]}>
      <Header />
      <View style={styles.main}>
        <Text style={[styles.settingsText, { color: isDarkTheme ? colors.orange : colors.black }]}>Settings</Text>
        <TouchableOpacity onPress={handleToggleTheme} style={styles.themeButton}>
            <Ionicons name={isDarkTheme ? 'moon' : 'sunny'} size={24} color={isDarkTheme ? colors.black : colors.black} />
            <Text style={[styles.themeButtonText, { color: isDarkTheme ? colors.black : colors.black }]}>
            {isDarkTheme ? 'Dark Theme' : 'Light Theme'}
            </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    margin: 20
  },
  settingsText: {
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
    margin: 10,
  },
  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.orange,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  themeButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Raleway-Regular',
    marginLeft: 10,
    color: colors.black
  },
});

export default Settings;
