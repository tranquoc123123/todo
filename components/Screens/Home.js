
import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, AnimatedFlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import TaskCard from "../ComponentChild/TaskCard";
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from "../StyleSheet/color";
import IndexTask from "../ComponentChild/IndexTask";
const data = [
  {
    title: 'Design UI',
    progress: 80,
    days: 10,
    id: 1,
    type: '0'
  },
  {
    title: 'Laravel',
    progress: 60,
    days: 10,
    id: 2,
    type: '1'
  },
  {
    title: 'Task 3',
    progress: 0,
    days: 10,
    id: 3,
    type: '3'
  },
  {
    title: 'Task 4',
    progress: 10,
    days: 10,
    id: 4,
    type: '2'
  },
  {
    title: 'Task 5',
    progress: 60,
    days: 10,
    id: 5,
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
  let bgc = '#ffffff'
  switch(item.type) {
    case '0':
      bgc = '#006EE9';
      break;
    
    case '1':
      bgc = '#311F65';
      break;

    case '3':
      bgc = '#D92C2C';
      break;

    default:
      bgc = '#006EE9';
    }
  return (
      <TaskCard key={item.id}
          title={item.title}
          progress={item.progress}
          id={item.id}
          bgc={bgc}  
          days={item.days}
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
  // const [dataTask, setDataTask] = useState([]);

  // const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
        headerShown: false,
    });
    // setDataTask(data);
}, [])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Thursday, October 20 2022</Text>
        <View>
          <Icon name="bell" color={color.Primary} size={20} />
        </View>
      </View>
      <View style={styles.header1}>
        <Text style={{fontSize: 24, fontFamily: 'Poppins', color: 'black', fontWeight:'bold'}}>Welcome Phillip</Text>
        <Text style={{fontSize: 16, fontFamily: 'Poppins', color: '#474747' }}>Have a nice day !</Text>
      </View>
      <View style={styles.cardContainer1} >
        <Text style={{fontSize: 20, fontFamily: 'Poppins', color: 'black', fontWeight:'bold'}} >My Priority Task</Text> 
          <FlatList
            style={styles.cardList}
            horizontal
            pagingEnabled={false}
            data={data}
            renderItem={taskCard}
            keyExtractor={(item) => item.id}
          />
      </View>
      <View style={styles.cardContainer2}>
        <Text style={{fontSize: 20, fontFamily: 'Poppins', color: 'black', fontWeight:'bold', marginBottom: 10}} >Daily Task</Text>
        {/* <TaskCard /> */}
        <FlatList
            style={styles.IndexList}
            pagingEnabled={false}
            data={data1}
            renderItem={indexTask}
            keyExtractor={(item) => item.id}
          />
      </View>
      {/* <View>
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
      </View> */}

    </View>
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
    // marginBottom: 5
  },
  content: {
    height: "100%",
    // flexGrow :1,
    // marginTop: 20
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