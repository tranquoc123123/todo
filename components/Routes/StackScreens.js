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

const StackScreens = ({navigation, route}) => {

  return (

    <Stack.Navigator initialRouteName='Login'>
      {/* <Stack.Screen name="BottomTab" component={BottomTabBar} options={{headerShown: false}} /> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      {/* <Stack.Screen name="Important" component={Important} />
      <Stack.Screen name="DailyTask" component={DailyTask} />
      <Stack.Screen name="PriorityTask" component={PriorityTask} />
      <Stack.Screen name="EditTask" component={EditTask} /> */}
    </Stack.Navigator>

  )

}



export default StackScreens;