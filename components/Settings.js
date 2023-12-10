import React, { useState } from 'react';
import { View, Text, SafeAreaView, Switch, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

// importing components:
import Header from './Header';

// importing globals:
import colors from '../globals/Colors';

const Settings = () => {
    const [fontsLoaded] = useFonts({
        'Raleway-Regular': require('../assets/fonts/Raleway/Raleway-Regular.ttf'),
    });
    const [isSwitchOn, setSwitchOn] = useState(true); // Set the switch to be on by default

    const toggleSwitch = () => setSwitchOn((prevState) => !prevState);

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <Text style={styles.settingsText}>
                Settings
            </Text>
            <View style={styles.content}>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Dark Mode</Text>
                    <Switch
                        trackColor={{ false: colors.orange, true: colors.orange }}
                        thumbColor={isSwitchOn ? colors.white : colors.black}
                        ios_backgroundColor={colors.dark_black}
                        onValueChange={toggleSwitch}
                        value={isSwitchOn}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    settingsText: {
        fontSize: 32,
        color: colors.orange,
        textAlign: 'center',
        backgroundColor: colors.black,
        fontFamily: 'Raleway-Regular',
        margin: 10
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    switchLabel: {
        fontSize: 24,
        color: colors.white,
        marginRight: 20,
    },
});

export default Settings;
