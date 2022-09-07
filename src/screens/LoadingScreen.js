import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

export default LoadingScreen = () => {

    const [_, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        setTimeout(async () => {
            const user = firebase.getCurrentUser();

            if (user) {
                const userInfo = await firebase.getUserInfo(user.uid);

                setUser({
                    isLoggedIn: true,
                    email: userInfo.email,
                    uid: user.uid,
                    username: userInfo.username,
                    profilePhotoUrl: userInfo.profilePhotoUrl
                })
            } else {
                setUser((state) => ({ ...state, isLoggedIn: false }));
            }
        }, 1500)
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sportify</Text>
            <LottieView source={require("../assets/loading-animation.json")}
                autoPlay
                loop
                style={{ width: "100%" }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    title: {
        fontSize: 48,
        fontWeight: "300",
        textAlign: "center",
        color: "#222222"
    }
});