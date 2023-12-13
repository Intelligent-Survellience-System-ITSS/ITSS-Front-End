import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { StyleSheet } from 'react-native';
import Header from './Header';
import colors from '../globals/Colors';

export default function FireBrigadeHomeScreen() {
    const notifications = [
        { id: 1, message: 'Fire emergency reported'.toUpperCase(), location: 'Intersection A', coordinates: '30.3753° N, 69.3451° E' },
        { id: 2, message: 'Fire emergency reported'.toUpperCase(), location: 'Intersection B', coordinates: '31.5825° N, 72.2779° E' },
        { id: 3, message: 'Fire emergency reported'.toUpperCase(), location: 'Intersection C', coordinates: '33.6844° N, 73.0479° E' },
        // Add more notifications as needed
    ];

    const handleNotificationPress = (coordinates, location) => {
        // Open Google Maps with the specified coordinates and provide navigation options
        const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}&travelmode=driving`;
        Linking.openURL(url);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView style={styles.content}>
                {notifications.map((notification) => (
                    <TouchableOpacity
                        key={notification.id}
                        style={styles.notification}
                        onPress={() => handleNotificationPress(notification.coordinates, notification.location)}
                    >
                        <Text style={styles.largeText}>{notification.message}</Text>
                        <Text style={styles.smallText}>{notification.location}</Text>
                        <Text style={styles.smallText}>{notification.coordinates}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        backgroundColor: colors.black_darker,
        padding: 10
    },
    notification: {
        padding: 16,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: colors.black,
        borderRadius: 10
    },
    largeText: {
        fontSize: 20,
        color: 'red',
    },
    smallText: {
        fontSize: 14,
        color: colors.orange
    },
});