import React from "react";
import { View, Text, StyleSheet, StatusBar, FlatList, Image } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import tempdata from "../tempdata";

export default HomeScreen = () => {

    const renderPost = ({ item }) => (
        <View style={styles.postContainer}>
            <View style={styles.postHeaderContainer}>
                <Image style={styles.postProfilePhoto}
                    source={{ uri: item.user.profilePhotoUrl }} />
                <View style={styles.postInfoContainer}>
                    <Text>{item.user.username}</Text>
                    <Text>{item.postedAt}</Text>
                </View>
                <View style={styles.options}>
                    <Entypo name="dots-three-horizontal" size={16} color="#7378ab" />
                </View>
            </View>
            <View style={styles.post}>
                <Text>{item.post}</Text>
                <Image style={styles.postPhoto}
                    source={{ uri: item.photoUrl }} />
                <View style={styles.postDetails}>
                    <View style={styles.postLikes}>
                        <Ionicons name="heart-outline" size={24} color="#73788b" />
                        <Text>{item.likes}</Text>
                    </View>
                    <View style={styles.postComments}>
                        <Ionicons name="chatbox-ellipses-outline" size={24} color="#73788b" />
                        <Text>{item.comments}</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.feedContainer}>
                <Text style={styles.feedTitle}>Feed</Text>
                <FlatList data={tempdata} renderItem={renderPost} keyExtractor={item => item.id.toString()} />
            </View>
            <StatusBar barStyle={"dark-content"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
        backgroundColor: "#ebecf3",
    },
    feedContainer: {

    },
    statusBar: {

    },
    feedTitle: {
        fontSize: 28,
        fontWeight: "200",
        textAlign: "center"
    },
    postContainer: {
        marginTop: 16,
        marginHorizontal: 16,
        marginBottom: 0,
        backgroundColor: "white",
        borderRadius: 6,
        padding: 8
    },
    postHeaderContainer: {
        flexDirection: "row",
        marginBottom: 16,
        alignItems: "center"
    },
    postProfilePhoto: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    postInfoContainer: {
        flex: 1,
        marginVertical: 0,
        marginHorizontal: 16,
    },
    options: {
        marginRight: 16
    },
    post: {
        marginLeft: 64
    },
    postPhoto: {
        width: "100%",
        height: 150,
        borderRadius: 6,
    },
    postDetails: {
        flexDirection: "row",
        marginTop: 8,
    },
    postLikes: {
        flexDirection: "row",
        alignItems: "center",
    },
    postComments: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 16,
    }
});