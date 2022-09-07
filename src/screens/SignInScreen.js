import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, TextInput, Keyboard, TouchableOpacity, ActivityIndicator } from "react-native";

import { FirebaseContext } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";

export default SignInScreen = ({ navigation }) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const firebase = useContext(FirebaseContext);
    const [_, setUser] = useContext(UserContext);

    const signIn = async () => {
        setLoading(true);

        try {
            await firebase.signIn(email, password);

            const uid = firebase.getCurrentUser().uid;

            const userInfo = await firebase.getUserInfo(uid);

            setUser({
                username: userInfo.username,
                email: userInfo.email,
                uid,
                profilePhotoUrl: userInfo.profilePhotoUrl,
                isLoggedIn: true,
            });

        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.container}>
                <View style={styles.main}>
                    <Text style={styles.title}>Sportify</Text>
                </View>
                <View style={styles.auth}>
                    <View style={styles.authContainer}>
                        <Text style={styles.authTitle}>Email Address</Text>
                        <TextInput style={styles.authField}
                            autoCapitalize="none"
                            autoCompleteType="email"
                            autoCorrect={false}
                            onChangeText={email => setEmail(email.trim())}
                            value={email}
                        />
                    </View>
                    <View style={styles.authContainer}>
                        <Text style={styles.authTitle}>Password</Text>
                        <TextInput style={styles.authField}
                            autoCapitalize="none"
                            autoCompleteType="password"
                            autoCorrect={false}
                            secureTextEntry={true}
                            onChangeText={password => setPassword(password.trim())}
                            value={password}
                        />
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.signInContainer} onPress={signIn} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text style={styles.signInTitle}>Sign In</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signUp} onPress={() => navigation.navigate("SignUp")}>
                        <Text style={styles.signUpTitle}>Don't have an account?
                            <Text style={styles.signUpText}> Sign Up</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        marginTop: 96
    },
    title: {
        fontSize: 42,
        fontWeight: "300",
        textAlign: "center"
    },
    auth: {
        marginTop: 48,
        marginRight: 32,
        marginBottom: 16,
        marginLeft: 32,
    },
    authContainer: {
        marginBottom: 32,
    },
    authTitle: {
        color: "#4d4e4f",
        fontSize: 14,
        textTransform: "uppercase",
        fontWeight: "300",
    },
    authField: {
        borderBottomColor: "#d4d4d4",
        borderBottomWidth: 1,
        borderRightColor: "#4d4e4f",
        borderRightWidth: 0.8,
        height: 48
    },
    signInContainer: {
        marginVertical: 0,
        marginHorizontal: 32,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2b2b2b",
        borderRadius: 6
    },
    signInTitle: {
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    signUp: {
        marginTop: 16
    },
    signUpTitle: {
        textAlign: "center",
        color: "4d4e4f",
        fontWeight: "300"
    },
    signUpText: {
        fontWeight: "bold",
        color: "#707070"
    },
});