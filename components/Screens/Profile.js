import React, { useContext, useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/auth";
import axiosIntance, { updateToken } from "../../apis/axios";
import color from "../StyleSheet/color";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
const Profile = () => {
  const userCtx = useContext(AuthContext)
  const [name, setName] = useState("Phillip Williamson")
  const [profession, setProfession] = useState("UI UX Designer")
  const [img, setImg] = useState(require('./img/image3.png'))
  const nav = useNavigation();
  const handbleLogout = async () => {
    console.log('Logout');
    await updateToken(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('userid');
    await userCtx.setUser(null);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: "#ffffff", marginTop: 10, marginLeft: 10 }}>
          Profile
        </Text>
      </View>
      <View style={styles.containerSub}>
        <View style={styles.body}>
          <View style={styles.img}>
          <Image
                    style={{ width: 100, height: 100, borderRadius: 100 }}
                    source={img} />
          </View>
          <View style={styles.info}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.name}>
                {name}
              </Text>
              <Text>
                {profession}
              </Text>
            </View>
            <View style={{paddingHorizontal: 10}}>
              <Pressable style={styles.index} onPress={()=>{nav.navigate("MyProfile")}}>
                <Icon name="user-alt" size={20} style={styles.icon}/>
                <Text style={styles.text}> Profile </Text>
              </Pressable>
              <Pressable style={styles.index} onPress={()=>{handbleLogout()}}>
                <Icon name="door-open" size={20} style={styles.icon}/>
                <Text style={styles.text}> Logout </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <Button title="log" onPress={handbleLogout} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSub: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    backgroundColor: color.Primary,
    position: 'absolute',
    height: '20%',
    width: '100%',
    zIndex: 0,
    backgroundColor: color.Primary,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  body: {
    backgroundColor: color.Primary,
    height: '100%',
    width: '90%',
    marginTop: '70%',
    zIndex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    alignItems: "center"
  },
  img: {
    width: 100,
    height: 100,
    zIndex: 2,
    backgroundColor: "#ffffff",
    borderWidth: 0.2,
    borderRadius: 100,
    marginTop: -50,
  },
  info: {
    width: "100%",
    height: "100%",
  },
  index: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 15
  },
  icon: {
    color: color.Primary,
    flex: 1
  },
  text: {
    paddingLeft: 20,
    flex: 9,
    color:"#000000"
  },
  name:{
    color:color.Primary,
    fontSize: 16
  }
})
export default Profile;

