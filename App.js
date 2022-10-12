import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';


// StackScreens
import StackScreens from './components/Routes/StackScreens';


export default function App() {

  return (
    <NavigationContainer>
      <StackScreens />
    </NavigationContainer>


  )
}