import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Home from '../Screens/Home';
import Important from "../Screens/Important";
import DailyTask from "../Screens/DailyTask";
import PriorityTask from "../Screens/PriorityTask";
import EditTask from "../Screens/EditTask";


// Bottom Tab
import BottomTabBar from "../Routes/BottomTabBar";
const Stack = createNativeStackNavigator();
const StackAuth = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  )
}
export default StackAuth;