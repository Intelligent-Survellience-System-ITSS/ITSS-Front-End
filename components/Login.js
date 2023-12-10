// Import the necessary components and libraries
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5

// importing globals:
import colors from '../globals/Colors';

// Get the device's screen height and width
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

function Login({ navigation }) {
    const [fontsLoaded] = useFonts({
        'Raleway-Regular': require('../assets/fonts/Raleway/Raleway-Regular.ttf'),
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Email: ' + email);
        console.log('Password: ' + password);

        // Navigate to the Home screen
        navigation.replace('HomeScreen');
    };

    const goToSignup = () => {
        navigation.navigate('Signup');
    };

    return (
        <SafeAreaView
            style={styles.main}
        >
            <ImageBackground
                source={require('../assets/pictures/courthouse-building.jpg')}
                style={styles.main}>

                <View style={styles.container}>
                    <Text style={styles.signup}>Login</Text>
                    <Text style={styles.provide_details_text}>
                        Please provide these details to login
                    </Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Email</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Password</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <FontAwesome5 name="sign-in-alt" size={20} color="white" style={styles.loginIcon} />
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.signup_text} onPress={goToSignup}>
                        Don't have an account? Click to sign up.
                    </Text>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: screenHeight,
        width: screenWidth,
    },
    signup: {
        fontSize: 36,
        textAlign: 'center',
        margin: 15,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Raleway-Regular'
    },
    container: {
        width: '100%',
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 5,
        margin: 50,
    },
    inputContainer: {
        marginBottom: 16,
    },
    labelContainer: {
        width: '100%',
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Raleway-Regular'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        fontFamily: 'Raleway-Regular'
    },

    provide_details_text: {
        color: 'white',
        margin: 5,
        textAlign: 'center',
        marginBottom: 15,
        fontFamily: 'Raleway-Regular'
    },
    signup_text: {
        color: 'white',
        marginTop: 15,
        textDecorationLine: 'underline',
        textAlign: 'center',
        fontFamily: 'Raleway-Regular'
    },
    loginButton: {
        flexDirection: 'row',
        backgroundColor: colors.primary,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Raleway-Regular'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Raleway-Regular',
    },
    loginIcon: {
        marginRight: 10,
    },
});

export default Login;
