// React
import { useEffect } from "react";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Redux
import store from "./src/store/store";
import { Provider, useSelector } from "react-redux";

// Screens
import HomeScreen from "./src/screens/Home";
import SignInScreen from "./src/screens/SignIn";
import SignUpScreen from "./src/screens/SignUp";
import GroupDetails from "./src/screens/group/GroupDetails";
import MeetDetails from "./src/screens/MeetDetails";

// Types
import { RootStackParamList } from "./src/types/ScreenTypes";

// Fonts
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";


const Stack = createNativeStackNavigator<RootStackParamList>();
SplashScreen.preventAutoHideAsync();

export default function App() {

  const [loaded, error] = useFonts({
    "Comic-Sans": require("./src/assets/fonts/ComicSansMS3.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen}></Stack.Screen>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="GroupDetails"
            component={GroupDetails}
            options={({ route }) => ({
              headerShown: true,
              title: route.params.groupName,
              headerTitleStyle: {
                fontFamily: "Comic-Sans",
              },
              
            })}
          />
          <Stack.Screen
            name="MeetDetails"
            component={MeetDetails}
            options={({ route }) => ({
              headerShown: true,
              title: route.params.meetName,
              headerTitleStyle: {
                fontFamily: "Comic-Sans",
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
