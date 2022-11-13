
import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, AnimatedFlatList, SafeAreaView, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TaskCard from "../ComponentChild/TaskCard";
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from "../StyleSheet/color";
import IndexTask from "../ComponentChild/IndexTask";
import axiosIntance from '../../apis/axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { parseToIcon } from "../ComponentChild/CommonFunction";
// import { parseToLevelColor } from "../ComponentChild/CommonFunction";
import { ProgressBar, MD3Colors } from 'react-native-paper';
import IndexTaskView from "../ComponentChild/IndexTaskView";
import axios from "axios";
import { server } from "../../apis/server";
const parseToIcon =   (text) => {
  let icon = "briefcase"
  switch (text) {
    case 'WORKING':
      icon = 'briefcase';
      break;

    case 'READING':
      icon = 'book';
      break;

    case 'DESIGN':
      icon = 'pencil-ruler';
      break;
    case 'CODING':
      icon = 'code';
      break;
    case 'LEARNING':
      icon = 'book-open';
      break;
    default:
      icon = 'briefcase';
  }
  return icon;
}
const parseToLevelColor = ( text ) => {
  let color = "#006EE9"
  console.log("text:" + text); 
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

const taskCard = ({ item }) => {
  let bgc = '#006EE9'
  let icon = 'brefcase'
  let days = 1
  let totalItem = 0;
  let totalItemFinished = 0;
  let progress = 0;
  let id = item._id;
  if (item.enddate && item.startdate) {
    try {
      let msDiff = new Date(item.enddate).getTime() - new Date(item.startdate).getTime();
      days = Math.floor(msDiff / (1000 * 60 * 60 * 24)) + 1;
    } catch (error) {
      days = 0
    }
  }
  if ((item.list_item) && (item.list_item.length > 0)) {
    totalItem = item.list_item.length;
    totalItemFinished = item.list_item.filter(item => {
      if (item.isComplete.toUpperCase() === "YES") {
        return true;
      }
    }).length;
    progress = ((totalItemFinished / totalItem) * 100).toFixed(2);
  };
  icon =  parseToIcon(item.icontype.toUpperCase());
  bgc = parseToLevelColor(item.level.toUpperCase());
  console.log("bgc: " + bgc);
  return (
    <TaskCard
      key={id}
      id={id}
      title={item.title}
      icon={icon}
      bgc={bgc}
      days={days}
      progress={progress}
    />
  )
}

const indexTask = ({ item }) => {
  const title = item.title;
  let status = false;
  if (item.complete.toUpperCase() === "YES") {
    status = true;
  } else {
    status = false;
  }
  return (
    <IndexTaskView
      key={item._id}
      title={title}
      status={status}
      setState={false}
      id={item._id}
      updateFunc={async (id, status) => { }}
    />
  )
}



const Home = ({ navigation }) => {
  const [dataTask, setDataTask] = useState([]);
  const [dailyTask, setDailyTask] = useState([]);
  const [username, setUserName] = useState(null);
  const [date, setDate] = useState(null);
  const nav = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getTask();
    getDailyTask();
    wait(2000).then(() => setRefreshing(false));

  }, []);

  const getTask = async () => {
    const userid = await AsyncStorage.getItem("userid");
    const config = { "type": "priority", "userid": userid };
    const res = await axios.create({ baseURL: server, headers: config }).get("/todo", {
      // params:{
      //     id: "62fbcb17e8588f32cbea05b7"
      // }
    }).then(
      res => {
        setDataTask(res.data);
      }
    ).catch(error => {
      console.log(error)
    }).finally(() => {
      setIsLoading(false);
    });
  }
  const getDailyTask = async () => {
    const userid = await AsyncStorage.getItem("userid");
    const now = new Date()
    const fromdateTmp = now.setHours(0, 0, 0, 0);
    const todateTmp = now.setHours(23, 59, 59, 999);
    const fromdate = new Date(fromdateTmp);
    const todate = new Date(todateTmp);
    const config = {
      "type": "daily",
      "fromdate": fromdate,
      "todate": todate,
      "userId": userid
    };
    const res = await axios.create({ baseURL: server, headers: config }).get("/todo", {
      // params:{
      //     id: "62fbcb17e8588f32cbea05b7"
      // }
    }).then(
      res => {
        if (res.data) {
          setDailyTask(res.data)
        } else {
          setDailyTask([]);
        }
      }
    ).catch(error => {
      console.log(error)
      setDailyTask([]);
    }).finally(() => {
      setIsLoading(false);
    });
  }
  const IntLoad = async () => {
    const user = await AsyncStorage.getItem('username');
    await setUserName(user);
    await setDate(new Date().toDateString())
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    setIsLoading(true)
    IntLoad();
    getTask();
    getDailyTask();
    setIsLoading(false)
  }, [])
  return (
    <View style={styles.container} >
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.header}>
          <Text>{new Date().toDateString()}</Text>
          <View>
            <Icon name="bell" color={color.Secondary} size={30} />
          </View>
        </View>
        <View style={styles.header1}>
          <Text style={{ fontSize: 32, fontFamily: 'Poppins', color: color.Secondary, fontWeight: 'bold' }}>Welcome {username}</Text>
          <Text style={{ fontSize: 16, fontFamily: 'Poppins', color: 'gray' }}>Have a nice day !</Text>
        </View>
        {isLoading ?
          <View>
            <ProgressBar progress={0.8} color={color.Primary} style={{ height: 10, borderRadius: 5 }} indeterminate={true} />
          </View> :
          <View>
            <View style={styles.cardContainer1} >
              <Text style={{ fontSize: 20, fontFamily: 'Poppins', color: color.Primary, fontWeight: 'bold' }} >My Priority Task</Text>
              <ScrollView horizontal={true} style={{ width: "100%" }}>
                <FlatList
                  style={styles.cardList}
                  horizontal
                  pagingEnabled={false}
                  data={dataTask}
                  renderItem={taskCard}
                  keyExtractor={(item) => item._id}
                />
              </ScrollView>
            </View>
            <View style={styles.cardContainer2}>
              <Text style={{ fontSize: 20, fontFamily: 'Poppins', color: color.Primary, fontWeight: 'bold', marginBottom: 10 }} >Daily Task</Text>
              {/* <TaskCard /> */}
              <FlatList
                style={styles.IndexList}
                pagingEnabled={false}
                data={dailyTask}
                renderItem={indexTask}
                keyExtractor={(item) => item._id}
              />
            </View>
          </View>
        }

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    paddingBottom: 50
  },
  header: {
    flex: 0.75,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20
  },
  header1: {
    flex: 1,
    // marginBottom: 5
    marginVertical: 30
  },
  content: {
    height: "100%",
  },
  footer: {
    flex: 2,
    marginHorizontal: 10
  },
  time: {
    height: 20,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15
  },
  cardContainer1: {
    flex: 2.75,
    marginVertical: 10
  },
  cardContainer2: {
    flex: 5,
    marginVertical: 10
  },
  cardList: {
    marginTop: 5
  },
  IndexList: {
    marginTop: 5
  },
})

export default Home;