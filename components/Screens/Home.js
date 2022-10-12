import * as React from "react";
import { View, Text, TouchableOpacity, } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
 
  const navigation = useNavigation();

  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text>
            Register
          </Text>
        </TouchableOpacity>
      </View>
      

    </View>
  )
}

export default Home;