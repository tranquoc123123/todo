
import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, AnimatedFlatList, SafeAreaView, RefreshControl} from "react-native";
import { useNavigation } from "@react-navigation/native";
import TaskCard from "../ComponentChild/TaskCard";
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from "../StyleSheet/color";
import IndexTask from "../ComponentChild/IndexTask";
import axiosIntance from "../../apis/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const data = [
  {
    title: 'Design UI',
    process: 80,
    days: 10,
    id: 1,
    level: 'normal',
    type: '0'
  },
  {
    title: 'Laravel',
    process: 60,
    days: 10,
    id: 2,
    level: 'normal',
    type: '1'
  },
  {
    title: 'Task 3',
    process: 0,
    days: 10,
    id: 3,
    level: 'normal',
    type: '3'
  },
  {
    title: 'Task 4',
    process: 10,
    days: 10,
    id: 4,
    level: 'normal',
    type: '2'
  },
  {
    title: 'Task 5',
    process: 60,
    days: 10,
    id: 5,
    level: 'normal',
    type: '1'
  },
] 

const data1 = [
  {
    title: 'Work Out',
    status: true,
    id: 1,
  },
  {
    title: 'Daily Metting',
    status: true,
    id: 2,
  },
  {
    title: 'Reading book',
    status: false,
    id: 3,
  },
  {
    title: 'Daily Metting',
    status: false,
    id: 4,
  },
  {
    title: 'Task 5',
    status: false,
    id: 5
  },
  {
    title: 'Daily Metting',
    status: false,
    id: 6,
  },
  {
    title: 'Task 5',
    status: false,
    id: 7
  },
] 




const taskCard = ({ item }) => {
  let bgc = '#006EE9'
  let icon = 'briefcase'


  switch(item.level) {
    case 'normal':
      bgc = '#006EE9';
      break;
    
    case 'urgent':
      bgc = '#311F65';
      break;

    case 'important':
      bgc = '#D92C2C';
      break;

    default:
      bgc = '#006EE9';
  }
  switch(item.type) {
    case '0':
      icon = 'briefcase';
      break;
    
    case '1':
      icon = 'code';
      break;

    case '2':
      icon = 'laptop-code';
      break;

    default:
      icon = 'briefcase';
    }

  return (
      <TaskCard key={item._id}
          title={item.title}
          progress={item.process }
          id={item._id}
          bgc={bgc}  
          days={'20'}
          icon={icon}
          />
  )
}

const indexTask = ({ item }) => {
  return (
      <IndexTask key={item.id}
          title={item.title}
          status={item.status}
          />
  )
}



const Home = ({navigation}) => {
  const [dataTask, setDataTask] = useState([]);
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
    const res = await axiosIntance.get("/todo" , {
        // params:{
        //     id: "62fbcb17e8588f32cbea05b7"
        // }
    }).then(
        res => {
          setDataTask(res.data)
           console.log(res.data)
        }
    ).catch(error => {
        console.log(error)
    }).finally(() => {
        // setIsLoading(false)
    });
    const res1 = await axiosIntance.get("/todo" , {
      // params:{
      //     id: "62fbcb17e8588f32cbea05b7"
      // }
    }).then(
        res => {
          setDataTask(res.data)
          console.log(res.data)
        }
    ).catch(error => {
        console.log(error)
    }).finally(() => {
        // setIsLoading(false)
    });
  }
  const IntLoad = async()=>{
    let user = await AsyncStorage.getItem('user');
    await setUserName(user);  
    await setDate(new Date().toDateString())
  }

  useEffect(() => {
    navigation.setOptions({
        headerShown: false,
    });
    IntLoad();
    getTask();
    setDataTask(data);
}, [])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}}          refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />} >
      <View style={styles.header}>
        <Text>{date}</Text>
        <View>
          <Icon name="bell" color={color.Secondary} size={20} />
        </View>
      </View>
      <View style={styles.header1}>
        <Text style={{fontSize: 24, fontFamily: 'Poppins', color: color.Primary, fontWeight:'bold'}}>Welcome {username}</Text>
        <Text style={{fontSize: 16, fontFamily: 'Poppins', color: 'gray' }}>Have a nice day !</Text>
      </View>
      <View style={styles.cardContainer1} >
        <Text style={{fontSize: 20, fontFamily: 'Poppins', color: color.Primary, fontWeight:'bold'}} >My Priority Task</Text> 
          <FlatList
            style={styles.cardList}
            horizontal
            pagingEnabled={false}
            data={dataTask}
            renderItem={taskCard}
            keyExtractor={(item) => item._id}
          />
      </View>
      <View style={styles.cardContainer2}>
        <Text style={{fontSize: 20, fontFamily: 'Poppins', color: color.Primary, fontWeight:'bold', marginBottom: 10}} >Daily Task</Text>
        {/* <TaskCard /> */}
        <FlatList
            style={styles.IndexList}
            pagingEnabled={false}
            data={data1}
            renderItem={indexTask}
            keyExtractor={(item) => item._id}
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
    justifyContent:"space-between",
    marginVertical: 10
  },
  header1: {
    flex: 1,
    marginVertical: 20
    // marginBottom: 5
  },
  content: {
    height: "100%",
  },
  footer: {
      flex: 2,
      marginHorizontal:  10
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