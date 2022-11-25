import React, { useContext, useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/auth";
import axiosIntance, { updateToken } from "../../apis/axios";
import color from "../StyleSheet/color";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import DialogConfirm from "../ComponentChild/DialogOkCancle";
import { set } from "immer/dist/internal";
const Profile = () => {
  const userCtx = useContext(AuthContext)
  const [name, setName] = useState("")
  const [profession, setProfession] = useState("No Info")
  const [message, setMessage] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [email, setEmail] = useState();
  const [showDialog, setShowDialog] = useState(false);
  const [img, setImg] = useState(require('./img/default.png'))
  const nav = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [isGetting, setIsGetting] = useState(true);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUserInfor();
    wait(2000).then(() => setRefreshing(false));

  }, []);

  const handbleLogout = async () => {
    setMessage("Logout of TodoApp?");
    setShowDialog(true);
  };
  const handleOK = async () => {
    updateToken(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('userid');
    userCtx.setUser(null);
  };
  const getUserInfor = async () => {
    const userid = await AsyncStorage.getItem("userid");
    console.log(userid);
    const res = axiosIntance.get("/user/login/" + userid, {}).then(res => {
      if (res.data.data[0].profession) {
        setProfession(res.data.data[0].profession);
      }
      if (res.data.data[0].username) {
        setName(res.data.data[0].username);
      }
      if (res.data.data[0].email) {
        setEmail(res.data.data[0].email);
      }
      if (res.data.data[0].avatar) {
        setImg({ uri: res.data.data[0].avatar });
        console.log(res.data.data[0].avatar);
      }
      if (res.data.data[0].DateOfBirth) {
        setDateOfBirth(res.data.data[0].DateOfBirth);
      }
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  };

  useEffect(() => {
    getUserInfor();
    setIsGetting(false);
  }, []);

  return (
    <ScrollView style={styles.container}
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      } >
      {isGetting ?
        <View style={{ flex: 1, height: 500 }}>
          <ActivityIndicator size="large" color={color.Secondary} style={{ flex: 1 }} />
        </View> :
      <View >
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
                source={img}
              />
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
              <View style={{ paddingHorizontal: 10 }}>
                <Pressable style={styles.index} onPress={() => { nav.navigate("MyProfile", { email: email, dateofbirth: dateOfBirth, name: name, profession: profession, img: img }) }}>
                  <Icon name="user-alt" size={20} style={styles.icon} />
                  <Text style={styles.text}> Profile </Text>
                </Pressable>
                <Pressable style={styles.index} onPress={() => { nav.navigate('Statistic')}}>
                  
                  <Icon name="chart-pie" size={20} style={styles.icon} />
                  <Text style={styles.text}> Statistic </Text>
                </Pressable>
                <Pressable style={styles.index} onPress={() => { handbleLogout() }}>
                  <Icon name="door-open" size={20} style={styles.icon} />
                  <Text style={styles.text}> Logout </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
      }
      <DialogConfirm
        visible={showDialog}
        onCancle={() => setShowDialog(false)}
        onOk={() => handleOK()}
        title=""
        message={message}
      />
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%"
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
    color: "#000000"
  },
  name: {
    color: color.Primary,
    fontSize: 16
  }
})
export default Profile;

