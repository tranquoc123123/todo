import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens

import Home from '../Screens/Home';
import DailyTask from "../Screens/DailyTask";
import PriorityTask from "../Screens/PriorityTask";




const Stack = createNativeStackNavigator();

const MainStack = () => {

  return (

    <Stack.Navigator initialRouteName='login' >

      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DailyTask" component={DailyTask} />
      <Stack.Screen name="PriorityTask" component={PriorityTask} />


    </Stack.Navigator>

  )

}



export default MainStack;