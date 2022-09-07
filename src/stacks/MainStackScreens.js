import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import WorkoutScreen from "../screens/WorkoutScreen";
import EventForumScreen from "../screens/EventForumScreen";
import PlanScreen from "../screens/PlanScreen";
import MoreScreen from "../screens/MoreScreen";
import WorkoutDetailScreen from "../screens/WorkoutDetailScreen";

export default MainStackScreen = () => {

    const Stack = createStackNavigator();
    const MainStack = createBottomTabNavigator();

    const screenOptions = ({ route }) => ({
        tabBarIcon: ({ focused }) => {
            let iconName = "home"

            switch (route.name) {
                case "Home":
                    iconName = "home";
                    break;
                case "Workout":
                    iconName = "barbell";
                    break;
                case "Plan":
                    iconName = "bar-chart";
                    break;
                case "More":
                    iconName = "ellipsis-horizontal";
                    break;
                default:
                    iconName = "home";
                    break;
            }

            if (route.name === "Event Forum") {
                return <Ionicons name="add-circle" size={36} color="#6f7bc7" />;
            }

            return <Ionicons name={iconName} size={24} border-color={"white"} color={focused ? "#ffffff" : "#6a6a6a"} />
        },
        tabBarShowLabel: false,
        tabBarStyle: {
            backgroundColor: "#222222",
            paddingBottom: 12
        }
    })

    const StackNavigator = () => {
        return (
            <Stack.Navigator initialRouteName={'WorkoutScreen'} headerMode="none">
                <Stack.Screen name="WorkoutHome" component={WorkoutScreen} />
                <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
            </Stack.Navigator>
        );
    }

    return (
        <MainStack.Navigator screenOptions={screenOptions}  >
            <MainStack.Screen name="Home" component={HomeScreen} />
            <MainStack.Screen name="Workout" component={StackNavigator} />
            <MainStack.Screen name="Event Forum" component={EventForumScreen} />
            <MainStack.Screen name="Plan" component={PlanScreen} />
            <MainStack.Screen name="More" component={MoreScreen} />
        </MainStack.Navigator>
    )
}