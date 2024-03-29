import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import Home from '../Screens/Home';
import Important from '../Screens/Important';
import MyDay from '../Screens/MyDay';
import Profile from '../Screens/Profile';

// Icons
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from "react-native-vector-icons/Octicons";
import MainStack from "./MainStack";
import { ColorSpace } from "react-native-reanimated";
import color from "../StyleSheet/color";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
const Tab = createBottomTabNavigator();
const BottomTabBar = ({ navigation }) => {
  return (
    <Tab.Navigator initialRouteName='Home'
      screenOptions={{
        showLabel: false,
        tabBarStyle: {
          height: 65,
          paddingTop: 10,
          borderTopWidth: 0,
          backgroundColor: '#ffffff',
          position: 'absolute',
          elevation: 0,
        },
        tabBarActiveTintColor: color.Primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      }}
      tabBarOptions ={{showLabel: false}}
    >

      <Tab.Screen
        name={'HomeScreen'}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (<Icon name={'home'} color={color} size={32} />),
        }}
      />

      <Tab.Screen
        name={"My Day"}
        component={MyDay}
        options={{
          tabBarIcon: ({ color }) => (<Icon name={'calendar-alt'} color={color} size={29} />)
        }}

      />
      {/* <Tab.Screen
        name={"Important"}
        component={Important}
        options={{
          tabBarIcon: ({color}) => (<Icon name={'star'} color ={color}  size={30} />)
        }}

      /> */}
      <Tab.Screen
        name={"Profile"}
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (<Icon name={'user-alt'} color={color} size={30} />)
        }}

      />
    </Tab.Navigator>

  )

}

export default BottomTabBar;