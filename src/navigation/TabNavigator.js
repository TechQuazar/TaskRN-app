import { Ionicons } from "@expo/vector-icons";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import { SCREENS } from "../shared/constants";
import Prescription from "../screens/Prescription";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabHeader from "../components/TabHeader";
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  console.log("Inside tab");
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === SCREENS.HOME) {
            if (focused) {
              return <Ionicons name="home-sharp" size={24} color="#EF5B5E" />;
            }
            return <Ionicons name="home-outline" size={24} color="#9098AC" />;
          }
          if (route.name === SCREENS.PRESCRIPTION) {
            if (focused) {
              return (
                <Ionicons
                  name="document-text-sharp"
                  size={24}
                  color="#EF5B5E"
                />
              );
            }
            return (
              <Ionicons
                name="document-text-outline"
                size={24}
                color="#EF5B5E"
              />
            );
          }
        },
        tabBarActiveTintColor: "#EF5B5E",
        tabBarInactiveTintColor: "#9098AC",
      })}
    >
      <Tab.Screen
        name={SCREENS.HOME}
        component={HomeScreen}
        options={{
          headerShown: true,
          header: () => <TabHeader name={"Home"} />,
        }}
      />
      <Tab.Screen
        name={SCREENS.PRESCRIPTION}
        component={Prescription}
        options={{
          headerShown: true,
          header: () => <TabHeader name={"Prescription"} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
