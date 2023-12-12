import { SafeAreaView, View, Text, StyleSheet } from 'react-native'

export default function FireBrigadeHomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>
                FireBrigadeHomeScreen
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});