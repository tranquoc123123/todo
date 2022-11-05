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

const PriorityTask = ({navigation}) => {
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
  const nav = useNavigation();

  const gotoHome = () => {
    console.log("onpress");
      nav.navigate("Home");
  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const setHeader = async () => {
    axios.defaults.headers.common["id"] = route.params.id;
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getDetail = async () => {
    setIsGetting(true);
    await setHeader();
    // console.log(route.params.id);
    const res = await axios.create({ baseURL: server }).get("/todo/", {
    }, {}).then(res => {
      setTitle(res.data[0].title);
      setDescription(res.data[0].description);
      if (res.data[0].startdate) {
        setStartDate(new Date(res.data[0].startdate).toDateString());
      }
      if (res.data[0].enddate) {
        setEndDate(new Date(res.data[0].enddate).toDateString());
      }
      setlistItem(res.data[0].list_item)
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
          <View>
            <ActivityIndicator size="large" color="#90EE90" style={{ flex: 1 }} />
          </View>:
          <View>
            <View style={{flexDirection:"row", justifyContent: "space-between", alignItems:"center"}}>
              <Text style={styles.title}>
                {title}
              </Text>
              <View>
                <TouchableOpacity style={{flex:1}} onPress={()=>gotoHome()}>
                  <Icon  name="code" color={color.Secondary} size={30} />
                </TouchableOpacity>
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
                    0
                  </Text>
                  <Text style={{ color: 'white' }}>
                    months
                  </Text>
                </View>
              </View>
              <View>
                <View style={styles.timeBlock}>
                  <Text style={styles.textBlock} >
                    14
                  </Text>
                  <Text style={{ color: 'white' }}>
                    hours
                  </Text>
                </View>
              </View>
              <View >
                <View style={styles.timeBlock}>
                  <Text style={styles.textBlock}>
                    48
                  </Text>
                  <Text style={{ color: 'white' }}>
                    minutes
                  </Text>
                </View>
              </View>

            </View>
            <View>
              <Text style={styles.indexText}>
                Description
              </Text>
            </View>
            <View>
              <Text>
                {description}
              </Text>
            </View>
            <View style={styles.progressComponent}>
              <View>
                <Text style={styles.indexText}>
                  Progress
                </Text>
                <View style={styles.progressBar}>
                  <View><Text style={{ color: 'white', fontSize: 15 }}>80%</Text></View>
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
                    <IndexTask key={item._id} title={item.titleItem} id={item._id} status={paseStatus(item.isComplete)} />
                )}
              </ScrollView>
            </View>
          </View>
        }
        {/* <TouchableOpacity style={styles.finishBtn}>
          <Text style={styles.textBtn}>
            Finish
          </Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default PriorityTask;