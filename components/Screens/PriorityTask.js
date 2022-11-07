import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, RefreshControl, ActivityIndicator, Pressable } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import styles from "../StyleSheet/PriorityTaskStyle";
import { useNavigation, useRoute } from '@react-navigation/native';
import axiosIntance from "../../apis/axios";
import axios from "axios";
import { server } from "../../apis/server";
import IndexTask from "../ComponentChild/IndexTask";
import color from "../StyleSheet/color";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { parseToIcon } from "../ComponentChild/CommonFunction";
import DialogCustom from "../ComponentChild/Dialog";
import { updateStatusItem } from "../ComponentChild/CommonFunction";

const parseToLevelColor = (text) => {
  let color = "#006EE9"
  switch (text) {
    case 'NORMAL':
      color = '#006EE9';
      break;

    case 'URGENCY':
      color = '#311F65';
      break;

    case 'IMPORTANT':
      color = '#D92C2C';
      break;

    default:
      color = '#006EE9';
  }
  return color;
}

const PriorityTask = ({ navigation }) => {
  const route = useRoute();
  const [idTask, setIdTask] = useState();
  const [isGetting, setIsGetting] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [listItem, setlistItem] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [levelColor, setLevelColor] = useState();
  const nav = useNavigation();
  const [process, setProcess] = useState(0);
  const [months, setMonth] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [icon, setIcon] = useState("briefcase");
  const [isOK, setOK] = useState(false);
  const [message, setMessage] = useState("");
  const gotoHome = () => {
    nav.navigate("Home");
  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const setHeader = async () => {
    return {"id": route.params.id}
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  setDeadLineTime = async (end) => {
    const nowdate = new Date();
    const endate = new Date(end);
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
    } else {
      setMonth(0);
      setDays(0);
      setHours(0);
    }
  }

  const getDetail = async () => {
    setIsGetting(true);
    const config = await setHeader();
    // console.log(route.params.id);
    const res = await axios.create({ baseURL: server, headers:config }).get("/todo/", {
    }, {}).then(res => {
      setTitle(res.data[0].title);
      setDescription(res.data[0].description);
      if (res.data[0].startdate) {
        setStartDate(new Date(res.data[0].startdate).toDateString());
      }
      if (res.data[0].enddate) {
        setEndDate(new Date(res.data[0].enddate).toDateString());
      }
      let color = parseToLevelColor(res.data[0].level.toUpperCase());
      setLevelColor(color);
      setlistItem(res.data[0].list_item)
      if (res.data[0].list_item) {
        setProcess(setProcessFunc(res.data[0].list_item));
      }
      if (res.data[0].enddate) {
        setDeadLineTime(res.data[0].enddate);
      }
      setIcon(parseToIcon(res.data[0].icontype.toUpperCase()));
      // console.log(icon);
    }
    ).catch(error => {
      console.log(error)
    }).finally(() => {
      // setIsLoading(false)
      setIsGetting(false)
      setIsLoading(false)
    });
  };
  const paseStatus = (isComplete) => {
    if (isComplete.toUpperCase() === "YES") {
      return true;
    } else {
      return false;
    }
  }
  const setProcessFunc = (array) => {
    let progress = 0;
    if (array) {
      let totalItem = array.length;
      let totalItemFinished = array.filter(item => {
        if (item.isComplete.toUpperCase() === "YES") {
          return true;
        }
      }).length;
      progress = ((totalItemFinished / totalItem) * 100).toFixed(2);
    };
    return progress;
  }

  const UppdateArr = async (id, status) => {
    let items = [...listItem];
    let item = listItem.find(i => {
      if (i._id === id) return true;
    });
    if (status) {
      item.isComplete = "Yes"
    } else {
      item.isComplete = "No"
    }
    let index = items.findIndex(item => item._id === id);
    items[index] = item;
    setlistItem(items);
    setProcess(setProcessFunc(listItem));
    // console.log(prs);
  }
  
  const UpdateState = async() =>{
      listItem.map(item=>{
        const res = updateStatusItem(item._id, item.isComplete);
      })
      setOK(true);
      setMessage("Update is successfully");
  }


  useEffect(() => {
    // navigation.setOptions({
    //   headerShown: false,
    //   tabBarVisible: false
    // });
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
        {isLoading ?
          <View style={{ flex: 1, height: 500 }}>
            <ActivityIndicator size="large" color={color.Secondary} style={{ flex: 1 }} />
          </View> :
          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 20 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name={icon} color={color.Primary} size={30} />
                <Text style={styles.title}>
                  {" "}{title}
                </Text>
              </View>
              <View>
                <Pressable onPress={() => gotoHome()}>
                  <Icon name="backspace" color={color.Primary} size={30} />
                </Pressable>
              </View>
            </View>
            <View style={styles.timeTitle} >
              <View>
                <Text style={styles.indexText}>
                  Start
                </Text>
                <Text>
                  {startDate}
                </Text>
              </View>
              <View>
                <Text style={styles.indexText}>
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
                    {months}
                  </Text>
                  <Text style={{ color: 'white' }}>
                    months
                  </Text>
                </View>
              </View>
              <View>
                <View style={styles.timeBlock}>
                  <Text style={styles.textBlock} >
                    {days}
                  </Text>
                  <Text style={{ color: 'white' }}>
                    days
                  </Text>
                </View>
              </View>
              <View >
                <View style={styles.timeBlock}>
                  <Text style={styles.textBlock}>
                    {hours}
                  </Text>
                  <Text style={{ color: 'white' }}>
                    Hours
                  </Text>
                </View>
              </View>

            </View>
            <View>
              <Text style={styles.indexText}>
                Description
              </Text>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
              <Text>
                {description}
              </Text>
            </View>
            <View style={styles.progressComponent}>
              <View>
                <Text style={styles.indexText}>
                  Progress
                </Text>
                <View >
                  <ProgressBar progress={process / 100} color={color.Primary} style={styles.progressBar} />
                  <Text style={{ alignSelf: "center", color: "#FFFFFF", position: "absolute", marginTop: 5 }}>{process}%</Text>
                </View>
              </View>
            </View>
            <View>
              <View>
                <Text style={styles.indexText} >To do list</Text>
              </View>
            </View>
            <View>
              <ScrollView>
                {listItem.map(
                  (item) =>
                    <IndexTask id={item._id} setState={true} key={item._id} updateFunc={(id, status) => UppdateArr(id, status)} title={item.titleItem} status={paseStatus(item.isComplete)} />
                )}
              </ScrollView>
            </View>
            <Pressable style={styles.finishBtn} onPress={() => UpdateState()}>
              <Text style={styles.textBtn}>
                Update 
              </Text>
            </Pressable>
          </View>
        }
        <DialogCustom
            visible={isOK}
            onPressHandle={() => setOK(false)}
            title=""
            message={message}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default PriorityTask;