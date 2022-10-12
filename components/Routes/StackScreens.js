import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Home from '../Screens/Home';

// Bottom Tab
import BottomTabBar from "../Routes/BottomTabBar";


const Stack = createNativeStackNavigator();

const StackScreens = () => {

  return (

    <Stack.Navigator>
      <Stack.Screen name="BottomTab" component={BottomTabBar} options={{headerShown: false}} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />

    </Stack.Navigator>

  )

}

export default StackScreens;