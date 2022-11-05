
import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, AnimatedFlatList, SafeAreaView, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TaskCard from "../ComponentChild/TaskCard";
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from "../StyleSheet/color";
import IndexTask from "../ComponentChild/IndexTask";
import axiosIntance from '../../apis/axios';

const taskCard = ({ item }) => {
  let bgc = '#006EE9'
  let icon = 'briefcase'
  let days = 1
  let totalItem = 0;
  let totalItemFinished = 0;
  let progress = 0
  if (item.enddate && item.startdate) {
    try {
      let msDiff = new Date(item.enddate).getTime() - new Date(item.startdate).getTime();
      days = Math.floor(msDiff / (1000 * 60 * 60 * 24)) + 1;
    } catch (error) {
      days = 0
    }

  }
  // console.log(item.list_item)
  if (item.list_item) {
    totalItem = item.list_item.length;
    totalItemFinished = item.list_item.filter(item => {
      if (item.isComplete.toUpperCase() === "YES") {
        return true;
      }
    }).length;
    progress = ((totalItemFinished / totalItem) * 100).toFixed(2);
    // console.log(totalItemFinished);
  };
  switch (item.level.toUpperCase()) {
    case 'NORMAL':
      bgc = '#006EE9';
      break;

    case 'URGENCY':
      bgc = '#311F65';
      break;

    case 'IMPORTANT':
      bgc = '#D92C2C';
      break;

    default:
      bgc = '#006EE9';
  }
  switch (item.iconType) {
    case '0':
      icon = 'briefcase';
      break;

    case '1':
      icon = 'book';
      break;

    case '3':
      icon = 'pencil-ruler';
      break;

    default:
      icon = 'briefcase';
  }
  return (
    <TaskCard key={item._id}
      title={item.title}
      id={item.id}
      icon={icon}
      bgc={bgc}
      days={days}
      progress={progress}
    />
  )
}

const indexTask = ({ item }) => {
  const title = item.titleItem;
  let status = false;
  console.log(item.isComplete);
  if (item.isComplete.toUpperCase() === "YES") {
    status = true;
  }
  return (
    <IndexTask key={item._id}
      title={title}
      status={status}
      id={item._id}
      updateFunc={async (id, status) => {
        let isYes = "NO"
        if (status) {
          isYes = "YES"
        }
        const res = await axiosIntance.put('/item/' + id, { isComplete: isYes }, {}).catch(err => {
          console.log(err);
        })
      }}
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

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // const navigation = useNavigation();


  const getTask = async () => {
    axiosIntance.defaults.headers.common["id"] = "6360986eab6b9925b4ceea2b";
    const res = await axiosIntance.get("/todo", {
      // params:{
      //     id: "62fbcb17e8588f32cbea05b7"
      // }
    }).then(
      res => {
        setDataTask(res.data)
        setDailyTask(res.data[0].list_item)
      }
    ).catch(error => {
      console.log(error)
    }).finally(() => {

    });
    // const res1 = await axiosIntance.get("/todo" , {
    //   // params:{
    //   //     id: "62fbcb17e8588f32cbea05b7"
    //   // }
    // }).then(
    //     res => {
    //       setDataTask(res.data)
    //       console.log(res.data)
    //     }
    // ).catch(error => {
    //     console.log(error)
    // }).finally(() => {
    //     // setIsLoading(false)
    // });
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
    IntLoad();
    getTask();
  }, [])
  return (
    <SafeAreaView style={styles.container} >
      <ScrollView
        contentContainerStyle={styles.scrollView}
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
            <Icon name="bell" color={color.Secondary} size={20} />
          </View>
        </View>
        <View style={styles.header1}>
          <Text style={{ fontSize: 24, fontFamily: 'Poppins', color: color.Primary, fontWeight: 'bold' }}>Welcome {username}</Text>
          <Text style={{ fontSize: 16, fontFamily: 'Poppins', color: 'gray' }}>Have a nice day !</Text>
        </View>
        <View style={styles.cardContainer1} >
          <Text style={{ fontSize: 20, fontFamily: 'Poppins', color: color.Primary, fontWeight: 'bold' }} >My Priority Task</Text>
          <FlatList
            style={styles.cardList}
            horizontal
            pagingEnabled={false}
            data={dataTask}
            renderItem={taskCard}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.cardContainer2}>
          <Text style={{ fontSize: 20, fontFamily: 'Poppins', color: color.Primary, fontWeight: 'bold', marginBottom: 10 }} >Daily Task</Text>
          {/* <TaskCard /> */}
          <FlatList
            style={styles.IndexList}
            pagingEnabled={false}
            data={dailyTask}
            renderItem={indexTask}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
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
    flex: 3,
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