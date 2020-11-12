//@refresh reset
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

import AuthScreen from "./screens/AuthScreen";
import ChatScreen from "./screens/ChatScreen";
import { UserContext } from "./Contexts";

export default function App() {
  const [user, setUser] = React.useState(null);

  const Stack = createStackNavigator();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="StinkyChat SignIn/Up" component={AuthScreen} />
          <Stack.Screen name="StinkyChat" component={ChatScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
