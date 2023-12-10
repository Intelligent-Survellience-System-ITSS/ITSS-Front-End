// VideoOptions.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import colors from '../globals/Colors';

const VideoOptions = ({ visible, onClose, onOptionSelect }) => {
  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => onOptionSelect('Option 1')}>
          <Text style={styles.menuItemText}>Option 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => onOptionSelect('Option 2')}>
          <Text style={styles.menuItemText}>Option 2</Text>
        </TouchableOpacity>
        {/* Add more options as needed */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.black,
    padding: 20,
    borderRadius: 10,
  },
  menuItem: {
    paddingVertical: 15,
    // borderBottomWidth: 0.5,
    // borderBottomColor: colors.white,
  },
  menuItemText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
  },
});

export default VideoOptions;
