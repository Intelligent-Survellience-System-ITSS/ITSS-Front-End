import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

// importing components:
import colors from '../globals/Colors';

const SplashScreen = () => {

  const [fontsLoaded] = useFonts({
    'Inter-ExtraBold': require('../assets/fonts/Inter/Inter-ExtraBold.ttf'),
  });

  const navigation = useNavigation();
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.replace("Login");
    }, 2000);
  
    return () => clearTimeout(timeoutId); // Clear the timeout if the component unmounts
  }, [navigation]);
  
  return (
    <SafeAreaView
      style={styles.splashView}
    >
      <View style={styles.splashView}>
        <Text style={styles.splashText}>ITSS</Text>
      </View>
    </SafeAreaView>
  );
};

  const styles = StyleSheet.create({
    splashView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.black,
    },
    splashText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.orange,
      fontFamily: 'Inter-ExtraBold'
    },
  });

export default SplashScreen;