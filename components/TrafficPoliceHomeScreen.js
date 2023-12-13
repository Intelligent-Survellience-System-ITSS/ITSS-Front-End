import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

// Importing components:
import Header from './Header';
import colors from '../globals/Colors';
import VideoOptions from './VideoOptions';

const TrafficPoliceHomeScreen = () => {
  const [fontsLoaded] = useFonts({
    'Raleway-Regular': require('../assets/fonts/Raleway/Raleway-Regular.ttf'),
  });

  const videos = [
    require('../assets/videos/video1.mp4'),
    require('../assets/videos/video2.mp4'),
    require('../assets/videos/video3.mp4'),
    require('../assets/videos/video4.mp4'),
    // Add more video paths as needed
  ];

  const [status, setStatus] = useState({});
  const [shouldPlay, setShouldPlay] = useState(Array(videos.length).fill(false));
  const [capitalizedVideos, setCapitalizedVideos] = useState([]);
  const flatListRef = useRef(null);

  const [optionsModalVisible, setOptionsModalVisible] = useState(false);

  const openOptionsModal = () => {
    setOptionsModalVisible(true);
  };

  const closeOptionsModal = () => {
    setOptionsModalVisible(false);
  };

  const capitalizeVideo = (index) => {
    setCapitalizedVideos((prevCapitalizedVideos) => {
      const updatedVideos = [...prevCapitalizedVideos];
      const videoIndex = updatedVideos.indexOf(index);
      if (videoIndex === -1) {
        updatedVideos.push(index);
      } else {
        updatedVideos.splice(videoIndex, 1);
      }
      return updatedVideos;
    });
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    const visibleIndices = viewableItems.map((item) => item.index);
    setShouldPlay((prevShouldPlay) => {
      const newShouldPlay = [...prevShouldPlay];
      prevShouldPlay.forEach((shouldPlay, index) => {
        if (!visibleIndices.includes(index)) {
          newShouldPlay[index] = false;
        }
      });
      return newShouldPlay;
    });
  }).current;

  const renderVideoItem = ({ item, index }) => (
    <View style={styles.videoContainer}>
      <TouchableOpacity
        onDoublePress={() => capitalizeVideo(index)}
        style={styles.videoTouchable}
      >
        <Video
          key={index}
          style={styles.video}
          source={item}
          resizeMode="contain"
          isLooping
          isMuted={true}
          shouldPlay={shouldPlay[index]}
          onPlaybackStatusUpdate={(playbackStatus) => setStatus({ ...status, [index]: playbackStatus })}
        />
      </TouchableOpacity>
      <MenuButton onPress={() => openOptionsModal()} />
    </View>
  );

  return (
    <SafeAreaView style={styles.main}>
      <Header />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Here are the CCTVs</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(_, index) => index.toString()}
        numColumns={1}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />
      <Modal
        visible={optionsModalVisible}
        transparent={true}
        onRequestClose={() => closeOptionsModal()}
      >
        <VideoOptions onClose={() => closeOptionsModal()} />
      </Modal>
    </SafeAreaView>
  );
};

const MenuButton = ({ onPress }) => (
  <TouchableOpacity style={styles.menuButton} onPress={onPress}>
    <Ionicons name="menu-outline" size={24} color={colors.white} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.black_darker,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    margin: 15,
    fontFamily: 'Raleway-Regular',
  },
  video: {
    width: '95%',
    aspectRatio: 16 / 9,
  },
  videoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
    position: 'relative',
  },
  videoTouchable: {
    width: '100%',
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

export default TrafficPoliceHomeScreen;
