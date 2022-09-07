import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FirebaseContext } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";

export default MoreScreen = () => {

    const [user, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const logOut = async () => {
        const loggedOut = await firebase.logOut();

        if (loggedOut) {
            setUser((state) => ({ ...state, isLoggedIn: false }));
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.profilePhoto}
                source={
                    user.profilePhotoUrl === "default"
                        ? require("../assets/default-profilePhoto.jpg")
                        : { uri: user.profilePhotoUrl }
                }
            />
            <Text style={styles.username} >{user.username}</Text>
            <View style={styles.statsContainer}>
                <View style={styles.stats}>
                    <Text>2</Text>
                    <Text>Posts</Text>
                </View>
                <View style={styles.stats}>
                    <Text>528</Text>
                    <Text>Followers</Text>
                </View>
                <View style={styles.stats}>
                    <Text>313</Text>
                    <Text>Following</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.logout} onPress={logOut}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 32,
        alignItems: "center"
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 0,
        marginHorizontal: 32,
        flex: 1,
    },
    stats: {
        alignItems: "center",
        flex: 1
    },
    logout: {
        marginBottom: 32
    },
    profilePhoto: {
        width: 96,
        height: 96,
        borderRadius: 64,
    },
    username: {
        margin: 16,
        fontSize: 20,
    }
});