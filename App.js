import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
// StackScreens
import StackScreens from './components/Routes/StackScreens';
import BottomTabBar from './components/Routes/BottomTabBar';
import { AuthContext } from './context/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from 'react-native';
import PriorityTask from './components/Screens/PriorityTask';
import LoginScreen from './components/Screens/Login';
import Register from './components/Screens/Register';
const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs()
export default function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    getInit();
  }, [user]);

  const getInit = async () => {
    // await AsyncStorage.setItem("user", "quoctk");
    await AsyncStorage.getItem("username").then((value) => {
      setUser(value);
    });
    // const user = await AsyncStorage.getItem("user");
    // console.log(user);
  }
  return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      <NavigationContainer>
      <Stack.Navigator>
        {user && <Stack.Screen name="Home" component={BottomTabBar} /> }
        {!user && <Stack.Screen name="Login" component={LoginScreen} />}
        <Stack.Screen name="PriorityTask" component={PriorityTask} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
        {/* {user && <BottomTabBar navigation={{ headerShown: false }} />}
        {!user && <StackScreens />} */}
        {/* <StackScreens/> */}
      </NavigationContainer>
    </AuthContext.Provider>

  )
}