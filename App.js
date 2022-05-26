import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";

import Details from "./screens/Details";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import BottomTabs from "./components/BottomTabs";
import ReportLitter from "./screens/ReportLitter";
import Issue from "./screens/Issue";
import Event from "./screens/Event";
import Community from "./screens/Community";
import CreateCommunity from "./screens/CreateCommunity";
import CreateEvent from "./screens/CreateEvent";
import CreateCampaign from "./screens/CreateCampaign";
import Campaign from "./screens/Campaign";
import Donate from "./screens/Donate";
import DonateCommunity from "./screens/DonateCommunity";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const Stack = createStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
    PoppinsExtraLight: require("./assets/fonts/Poppins-ExtraLight.ttf"),
  });

  if (!loaded) return null;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="ReportLittering" component={ReportLitter} />
        <Stack.Screen name="Issue" component={Issue} />
        <Stack.Screen name="Event" component={Event} />
        <Stack.Screen name="CreateEvent" component={CreateEvent} />
        <Stack.Screen name="Community" component={Community} />
        <Stack.Screen name="CreateCommunity" component={CreateCommunity} />
        <Stack.Screen name="CreateCampaign" component={CreateCampaign} />
        <Stack.Screen name="Campaign" component={Campaign} />
        <Stack.Screen name="Donate" component={Donate} />
        <Stack.Screen name="DonateCommunity" component={DonateCommunity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
