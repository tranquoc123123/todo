import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import Home from '../Screens/Home';
import Important from '../Screens/Important';
import MyDay from '../Screens/MyDay';
import Profile from '../Screens/Profile';

// Icons
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from "react-native-vector-icons/Octicons";


const Tab = createBottomTabNavigator();

const BottomTabBar = () => {

  return (
    <Tab.Navigator initialRouteName='Home'>

      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarIcon: () => (<MaterialIcons name={'home-filled'} color={'gray'} size={32} />)
        }}

      />

      <Tab.Screen
        name={"My Day"}
        component={MyDay}
        options={{
          tabBarIcon: (color) => (<Icon name={'sun-o'} color={color} size={29} />)

        }}

      />
      <Tab.Screen
        name={"Important"}
        component={Important}
        options={{
          tabBarIcon: (color) => (<Octicons name={'star'} color={color} size={30} />)
        }}

      />
      <Tab.Screen
        name={"Profile"}
        component={Profile}
        options={{
          tabBarIcon: (color) => (<MaterialIcons name={'face'} color={color} size={30} />)
        }}

      />
    </Tab.Navigator>

  )

}

export default BottomTabBar;