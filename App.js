import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";

import ContextProvider from "./components/Provider";

import Home from "./pages/Home";
import CompletedTask from "./pages/CompletedTask";
import Developer from "./pages/Developer";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="My Todo List!"
            options={{
              tabBarLabel: "Active Task",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="tasks" color={color} size={size} />
              ),
            }}
            component={Home}
          />
          <Tab.Screen
            name="Completed Task!"
            options={{
              tabBarLabel: "Completed Task",
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="md-checkmark-done-circle"
                  color={color}
                  size={size}
                />
              ),
            }}
            component={CompletedTask}
          />
          <Tab.Screen
            name="Developers Info"
            options={{
              tabBarLabel: "Developers",
              tabBarIcon: ({ color, size }) => (
                <Entypo name="code" color={color} size={size} />
              ),
            }}
            component={Developer}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
