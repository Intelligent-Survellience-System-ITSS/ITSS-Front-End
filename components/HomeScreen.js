import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { Audio } from 'expo-av';
// import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Video } from 'expo-av';

// importing components:
import Header from './Header';
import colors from '../globals/Colors';
import VideoOptions from './VideoOptions';

// conditionally import VideoThumbnail based on the platform
// let VideoThumbnail;
// if (Platform.OS !== 'web') {
//   VideoThumbnail = require('react-native-thumbnail-video').Thumbnail;
// }

const MenuButton = ({ onPress }) => (
  <TouchableOpacity style={styles.menuButton} onPress={onPress}>
    <Ionicons name="menu-outline" size={24} color={colors.white} />
  </TouchableOpacity>
);

const HomeScreen = () => {

  const [fontsLoaded] = useFonts ({
    'Raleway-Regular': require('../assets/fonts/Raleway/Raleway-Regular.ttf')
  })

  const video1 = React.useRef(null);
  const video2 = React.useRef(null);

  // states to handle videos
  const [statusVideo1, setStatusVideo1] = React.useState();
  const [statusVideo2, setStatusVideo2] = React.useState();

  // states to handle video options
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState('');

  // function to handle option selection
  const handleOptionSelection = (option) => {
    console.log('Selected Option: ${option}');
    setIsModalVisible(false);
  }

  return (
    <SafeAreaView
      style={styles.main}
    >
      <View style={styles.main}>
        <Header title ='Footages'/>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Here are the CCTVs</Text>
        </View>
        <ScrollView style={styles.scrollViewContainer}>

          <View style={styles.videoContainer}>
            <MenuButton onPress={() => {setIsModalVisible(true)}} />
            <Video
              ref={video1}
              style={styles.video}
              source={require('../assets/videos/video1.mp4')}
              useNativeControls
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={setStatusVideo1}
            />
          </View>

          <VideoOptions 
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onOptionSelect={handleOptionSelection}
          />

          <View style={styles.videoContainer}>
            <MenuButton onPress={() => {setIsModalVisible(true)}} />
            <Video
              ref={video2}
              style={styles.video}
              source={require('../assets/videos/video2.mp4')}
              useNativeControls
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={setStatusVideo2}
            />
          </View>

          <VideoOptions 
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onOptionSelect={handleOptionSelection}
          />
            
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.black_darker,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    margin: 5,
    fontFamily: 'Raleway-Regular'
  },
  scrollViewContainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.black_darker
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  video: {
    margin: 10,
    width: '95%',
    aspectRatio: 16 / 9,
  },
  videoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
  },

  menuButton: {
    marginHorizontal: 10,
  },
});

export default HomeScreen;
