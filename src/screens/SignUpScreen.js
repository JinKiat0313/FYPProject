import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, TextInput, Keyboard, TouchableOpacity, ActivityIndicator, Platform, PermissionsAndroid } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { FirebaseContext } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";

export default SignInScreen = ({ navigation }) => {

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState();
    const firebase = useContext(FirebaseContext);
    const [_, setUser] = useContext(UserContext);

    const getPermission = async () => {
        if (Platform.OS !== "web") {
            // const { status } = await Permissions.askAsync(PERMISSIONS.CAMERA_ROLL);
            // const { status } = await Location.requestForegroundPermissionsAsync();
            const { status } = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION);

            return status;
        }
    }

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: { 1: 1 },
                quality: 0.5
            })

            if (!result.cancelled) {
                setProfilePhoto(result.uri)
            }

        } catch (error) {
            console.log("Error @pickImage: ", error)
        }
    }

    const addProfilePhoto = async () => {
        const status = await getPermission();

        if (status !== "granted") {
            alert("We need permission to access your camera roll.");

            return;
        }

        pickImage();
    };

    const signUp = async () => {
        setLoading(true);

        const user = { username, email, password, profilePhoto };

        try {
            const createdUser = await firebase.createUser(user);

            setUser({ ...createdUser, isLoggedIn: true });
        } catch (error) {
            console.log("Error @signUp: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.container}>
                <View style={styles.main}>
                    <Text style={styles.title}>Sign up to get started.</Text>
                </View>
                <TouchableOpacity style={styles.profilePhotoContainer} onPress={addProfilePhoto}>
                    {profilePhoto ? (
                        <Image style={styles.profilePhoto} source={{ uri: profilePhoto }} />
                    ) : (
                        <View style={styles.defaultProfilePhoto}>
                            <AntDesign name="plus" size={24} color="#ffffff" />
                        </View>
                    )}
                </TouchableOpacity>
                <View style={styles.auth}>
                    <View style={styles.authContainer}>
                        <Text style={styles.authTitle}>Username</Text>
                        <TextInput style={styles.authField}
                            autoCapitalize="none"
                            autoCompleteType="username"
                            autoCorrect={false}
                            onChangeText={username => setUsername(username.trim())}
                            value={username}
                        />
                    </View>
                    <View style={styles.authContainer}>
                        <Text style={styles.authTitle}>Email Address</Text>
                        <TextInput style={styles.authField}
                            autoCapitalize="none"
                            autoCompleteType="email"
                            autoCorrect={false}
                            keyboardType={"email-address"}
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
                    <TouchableOpacity style={styles.signUpContainer} onPress={signUp} disabled={loading} >
                        {loading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text style={styles.signUpTitle}>Sign Up</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signIn} onPress={() => navigation.navigate("SignIn")}>
                        <Text style={styles.signInTitle}>Already have an account?
                            <Text style={styles.signInText}> Sign In</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        marginTop: 90
    },
    title: {
        fontSize: 36,
        fontWeight: "300",
        textAlign: "center"
    },
    auth: {
        marginTop: 16,
        marginRight: 32,
        marginBottom: 16,
        marginLeft: 32,
    },
    authContainer: {
        marginBottom: 16,
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
    signUpContainer: {
        marginVertical: 0,
        marginHorizontal: 32,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2b2b2b",
        borderRadius: 6
    },
    signUpTitle: {
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    signIn: {
        marginTop: 16
    },
    signInTitle: {
        textAlign: "center",
        color: "4d4e4f",
        fontWeight: "300"
    },
    signInText: {
        fontWeight: "bold",
        color: "#707070"
    },
    profilePhotoContainer: {
        backgroundColor: "#acacac",
        width: 80,
        height: 80,
        borderRadius: 40,
        alignSelf: "center",
        marginTop: 16,
        overflow: "hidden",
    },
    defaultProfilePhoto: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    profilePhoto: {
        flex: 1,
    },
});