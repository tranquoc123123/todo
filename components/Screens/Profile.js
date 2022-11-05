import React, {useContext} from "react";
import { View, Text, Button} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/auth";
import axiosIntance, { updateToken } from "../../apis/axios";
export default function Profile() {
  const userCtx = useContext(AuthContext)


const handbleLogout = async () => {
  console.log('Logout');
    await updateToken(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('userId');
    await userCtx.setUser(null);
};
  return (
    <View>
      <Text>
        Profile
      </Text>
      <Button title="LOGOUT" onPress={handbleLogout}/>
    </View>
  )
}

