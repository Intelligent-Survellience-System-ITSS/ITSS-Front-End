import { SafeAreaView, View, Text, StyleSheet } from 'react-native'

export default function ParamedicsHomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>
                ParamedicsHomeScreen
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});