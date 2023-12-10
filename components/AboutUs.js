import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

// Importing globals:
import colors from '../globals/Colors';
import Header from './Header';

const AboutUs = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.content}>
        <Text style={styles.title}>About ITSS</Text>
        <Text style={styles.description}>
          ITSS (Intelligent Traffic Surveillance System) is an advanced traffic monitoring and management system. 
          Our system leverages cutting-edge technologies to analyze traffic patterns, monitor congestion, and provide 
          real-time insights for efficient traffic flow.
        </Text>
        <Text style={styles.description}>
          Key Features:
        </Text>
        <Text style={styles.feature}>- Real-time Traffic Monitoring</Text>
        <Text style={styles.feature}>- Intelligent Congestion Analysis</Text>
        <Text style={styles.feature}>- Automated Traffic Alerts</Text>
        <Text style={styles.feature}>- Historical Traffic Data Analytics</Text>
        <Text style={styles.feature}>- User-Friendly Interface</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.orange,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 10,
    textAlign: 'justify'
  },
  feature: {
    fontSize: 16,
    color: colors.orange,
    marginLeft: 10,
    marginBottom: 5,
  },
});

export default AboutUs;
