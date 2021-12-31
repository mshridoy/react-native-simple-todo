import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./pages/Home";
import CompletedTask from "./pages/CompletedTask";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ title: "My Todo List!" }}
          component={Home}
        />
        <Stack.Screen
          name="CompletedTask"
          options={{ title: "Completed Task List" }}
          component={CompletedTask}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
