import React, { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground} from "react-native";
import styles from "../StyleSheet/AuthenticationScreen";


const Login = () =>  {

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        // source={{ uri: 'asset:/images/Sky Motivation Quote Phone Wallpaper.jpg' }}
      >
        <View>
          <TouchableOpacity 
            style={styles.signInBtn}

            >
            <Text>
              Login
            </Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>



    </View>
  )
}

export default Login;