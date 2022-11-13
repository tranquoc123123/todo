import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, RefreshControl, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../StyleSheet/DailyTaskStyle";
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from "axios";
import { server } from "../../apis/server";
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from "../StyleSheet/color";
import { updateStatusItem } from "../ComponentChild/CommonFunction";
import DialogCustom from "../ComponentChild/Dialog";
import { updateStatusTask } from "../ComponentChild/CommonFunction";
import DialogBack from "../ComponentChild/DialogBack";
const DailyTask = ({ navigation }) => {
  const [idTask, setIdTask] = useState();
  const [isGetting, setIsGetting] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [listItem, setlistItem] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [levelColor, setLevelColor] = useState();
  const nav = useNavigation();
  const [process, setProcess] = useState(0);
  const [months, setMonth] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [icon, setIcon] = useState("briefcase");
  const [isOK, setOK] = useState(false);
  const [message, setMessage] = useState("");
  const route = useRoute();
  const [isOkBack, setOkBack] = useState(false);
  const [isComplete, setIsComplete] = useState(true);

  const UpdateState = async () => {
    setIsLoading(true);
    console.log(idTask);
    const res = await updateStatusTask(idTask, "yes").then(res => {
      setMessage("Update is successfully");
      setOkBack(true);
    }).catch(err => {
      setMessage("Have an error when update, try again");
      setOK(true);
    }).finally(() => { });
    setIsLoading(false)

  }

  const gotoHome = () => {
    nav.navigate("Home");
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getDetail();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const setHeader = async () => {
    console.log(route.params.id);
    return { "id": route.params.id }
  }

  setDeadLineTime = async (end) => {
    const nowdate = new Date();
    const endate = new Date(end);
    console.log(nowdate);
    console.log(end);

    if (nowdate.getTime() < endate.getTime()) {
      let msDiff = endate.getTime() - nowdate.getTime();
      let months = Math.floor(msDiff / (1000 * 60 * 60 * 24 * 30));
      setMonth(months);
      if (months > 0) {
        msDiff = msDiff - months * (1000 * 60 * 60 * 24 * 30)
      }
      let day = Math.floor(msDiff / (1000 * 60 * 60 * 24));
      setDays(day)
      if (day > 0) {
        msDiff = msDiff - day * (1000 * 60 * 60 * 24)
      }
      let hour = Math.floor(msDiff / (1000 * 60 * 60));
      setHours(hour);
      if (hour > 0) {
        msDiff = msDiff - hour * (1000 * 60 * 60)
      }
      let minute = Math.floor(msDiff / (1000 * 60));
      setMinutes(minute);
    } else {
      setMonth(0);
      setDays(0);
      setHours(0);
    }
  }

  const getDetail = async () => {
    setIsGetting(true);
    const config = await setHeader();
    setIdTask(route.params.id);
    const res = await axios.create({ baseURL: server, headers: config }).get("/todo/", {
    }, {}).then(res => {
      setTitle(res.data[0].title);
      setDescription(res.data[0].description);
      if (res.data[0].startdate) {
        setStartDate(new Date(res.data[0].startdate).toDateString());
      }
      if (res.data[0].enddate) {
        setEndDate(new Date(res.data[0].enddate).toDateString());
        setDeadLineTime(res.data[0].enddate)
      }
      if (res.data[0].complete) {
        if (res.data[0].complete.toUpperCase() === "NO") {
          setIsComplete(false)
        }
      }

    }
    ).catch(error => {
      console.log(error)
    }).finally(() => {
      // setIsLoading(false)
      setIsGetting(false)
      setIsLoading(false)
    });
  };

  useEffect(() => {
    getDetail();
  }
    , [])
  return (
    <SafeAreaView style={styles.body}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {isGetting ?
          <View style={{ flex: 1, height: 500 }}>
            <ActivityIndicator size="large" color={color.Secondary} style={{ flex: 1 }} />
          </View> :
          <View>
            <View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 20 }}>
                <Text style={styles.title}>
                  {title}
                </Text>
                <View>
                  <Pressable onPress={() => gotoHome()}>
                    <Icon name="backspace" color={color.Primary} size={30} />
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={styles.timeTitle} >
              <View>
                <Text>
                  Start
                </Text>
                <Text>
                  {startDate}
                </Text>
              </View>
              <View>
                <Text>
                  End
                </Text>
                <Text>
                  {endDate}
                </Text>
              </View>
            </View>
            <View style={styles.timeInHour}>
              <View>
                <View style={styles.timeBlock}>
                  <Text style={styles.textBlock} >
                    {hours}
                  </Text>
                  <Text style={{ color: 'white' }}>
                    hours
                  </Text>
                </View>
              </View>
              <View >
                <View style={styles.timeBlock}>
                  <Text style={styles.textBlock}>
                    {minutes}
                  </Text>
                  <Text style={{ color: 'white' }}>
                    minutes
                  </Text>
                </View>
              </View>

            </View>
            <View>
              <Text>
                Description
              </Text>
            </View>
            <View>
              <Text>
                {description}
              </Text>
            </View>
            {!isComplete &&
              <Pressable style={styles.finishBtn} onPress={() => UpdateState()}>
                {isLoading ?
                  <ActivityIndicator size="large" color="#90EE90" /> :
                  <Text style={styles.textBtn}>
                    Finish
                  </Text>
                }
              </Pressable>
            }
            <DialogCustom
              visible={isOK}
              onPressHandle={() => setOK(false)}
              title=""
              message={message}
            />
            <DialogBack
              visible={isOkBack}
              onPressBack={() => nav.navigate("HomeScreen")}
              title=""
              message={message} />
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default DailyTask;