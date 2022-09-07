import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default PlanScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Plan Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});