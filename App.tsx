import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Redux
import store from "./src/store/store";
import { Provider } from "react-redux";

// Screens
import HomeScreen from "./src/screens/Home";
import SignInScreen from "./src/screens/SignIn";
import SignUpScreen from "./src/screens/SignUp";

// Types
import { RootStackParamList } from "./src/types/ScreenTypes";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen}></Stack.Screen>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
