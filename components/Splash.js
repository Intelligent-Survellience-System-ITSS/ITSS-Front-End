import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
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
      navigation.replace('Login');
    }, 10000);

    return () => clearTimeout(timeoutId); // Clear the timeout if the component unmounts
  }, [navigation]);

  return (
    <SafeAreaView style={styles.splashView}>
      <View style={styles.splashView}>
        <Image source={require('../assets/pictures/logoSplash.png')} style={styles.logo} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  splashView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  logo: {
    width: 300,
    height: 300,
  },
});

export default SplashScreen;
