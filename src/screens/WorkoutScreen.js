import React from "react";
import { View, Text, StyleSheet, FlatList, StatusBar, Image, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";

let workouts = [
    {
        title: 'Full Body Strength',
        image: require('../assets/fullBodyStrength.jpg'),
        subTitle: '',
        durationAndLevel: '20 MIN, Intermediate'
    },
    {
        title: 'Basic Burner',
        image: require('../assets/fatBurner.jpg'),
        subTitle: '',
        durationAndLevel: '20 MIN, Begineer'
    },
    {
        title: 'HIIT',
        image: require('../assets/HIIT.jpg'),
        subTitle: '',
        durationAndLevel: '45 MIN, Advanced'
    },
    {
        title: 'YOGA',
        image: require('../assets/yoga.jpg'),
        subTitle: '',
        durationAndLevel: '20 MIN, Begineer'
    },
    {
        title: 'Recovery Workout',
        image: require('../assets/recovery.jpg'),
        subTitle: '',
        durationAndLevel: '20 MIN, Intermediate'
    },
    {
        title: 'Core Workout',
        image: require('../assets/core.jpg'),
        subTitle: '',
        durationAndLevel: '20 MIN, Intermediate'
    },
]

export default WorkoutScreen = ({ navigation }) => {

    const WorkoutItem = ({ workout }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('WorkoutDetail', { workout: workout })}
                activeOpacity={0.8} style={styles.workoutButton}>
                <Image source={workout.image} style={styles.workoutImage} />
                <Text style={styles.workoutText}>{workout.title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style={styles.statusBar} barStyle={'dark-content'} animated={true} />
            <View style={styles.mainContainer}>
                <Image style={styles.backgroundImage} source={require('../assets/background.jpg')} />
                <View style={styles.workoutContainer}>
                    <View style={styles.smallContainer}>
                        <View style={styles.tinyContainer1}>
                        </View>
                        <View style={styles.tinyContainer2}>
                        </View>
                    </View>
                </View>
            </View>
            <Text style={styles.titleText}>TOP CHOICES FOR YOU</Text>
            <Text>
                Build strength and improve your flexibility throughout the next weeks as
                you discover new ways to tune in to your body as mind.
            </Text>
            <FlatList
                data={workouts}
                style={styles.workoutContentContainer}
                contentContainerStyle={{
                    flex: 1,
                    alignItems: 'center'
                }}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                keyExtractor={item => item.title}
                renderItem={({ item }) => <WorkoutItem workout={item} />}
                scrollEnabled={true}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    statusBar: {
        backgroundColor: 'white',
    },
    mainContainer: {
        width: '100%',
        height: 45,
        padding: 30,
        backgroundColor: 'white',
        position: 'relative',
    },
    backgroundImage: {
        position: 'absolute',
        top: 60,
        left: -50,
        height: 100
    },
    workoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    smallContainer: {
        width: 60,
        height: 60,
        backgroundColor: 'lightgrey',
        marginRight: 0,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tinyContainer1: {
        height: 3,
        backgroundColor: 'white',
        width: '40%',
        marginBottom: 8,
        marginLeft: -5
    },
    tinyContainer2: {
        height: 3,
        backgroundColor: 'white',
        width: '40%',
        marginBottom: 8,
        marginLeft: 5
    },
    titleText: {
        fontSize: 30,
        lineHeight: 45,
    },
    workoutContentContainer: {
        paddingHorizontal: 20,
        paddingTop: 30
    },
    workoutButton: {
        backgroundColor: 'white',
        width: 180,
        margin: 10,
        height: 150,
        borderRadius: 10,
        padding: 15,
        shadowColor: '#9e9898',
        elevation: 5,
    },
    workoutImage: {
        width: '100%',
        resizeMode: 'cover',
        flex: 1,
        margin: 5
    },
    workoutText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16
    }

});