import React from "react";
import { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Dimensions, Touchable, TouchableOpacity, RefreshControl } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Circle from "../ComponentChild/Circle";
import color from "../StyleSheet/color";
import styles from "../StyleSheet/StatisticStyle";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { server } from "../../apis/server";
import axiosIntance from "../../apis/axios";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const dataInit = {
  1: {
    id: 1,
    title: 'January',
    rate: 0
  },
  2: {
    id: 2,
    title: 'February',
    rate: 0
  },
  3: {
    id: 3,
    title: 'March',
    rate: 0
  },
  4: {
    id: 4,
    title: 'April',
    rate: 0
  },
  5: {
    id: 5,
    title: 'May',
    rate: 0
  },
  6: {
    id: 6,
    title: 'June',
    rate: 0
  },
  7: {
    id: 7,
    title: 'July',
    rate: 0
  },
  8: {
    id: 8,
    title: 'August',
    rate: 0
  },
  9: {
    id: 9,
    title: 'September',
    rate: 0
  },
  10: {
    id: 10,
    title: 'October',
    rate: 0
  },
  11: {
    id: 11,
    title: 'November',
    rate: 0
  },
  12: {
    id: 12,
    title: 'December',
    rate: 0
  },
};
const Statistic = (props) => {

  const nav = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState(dataInit);
  const [totalTask, setTotalTask] = useState(0);
  const [completeTask, setCompleteTask] = useState(0);


  const handleData = (data) => {
    return data.reduce((obj, currentItem) => {
      const arr = [{ ...currentItem }];
      if (!obj?.[currentItem?.type]) {
        obj[currentItem?.type] = arr;
      } else {
        obj[currentItem?.type] = [...obj?.[currentItem?.type], ...arr];
      }
      return obj;
    }, {});
  };
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // console.log(typeof data[Number(1)].rate);
  const rerender = (res) => {
    const data_cp = data;
    data_cp[Number(1)].rate = res.data[0].percentMonth === null ? 0 : Math.round(res.data[0].percentMonth);
    data_cp[Number(2)].rate = res.data[1].percentMonth === null ? 0 : Math.round(res.data[1].percentMonth);
    data_cp[Number(3)].rate = res.data[2].percentMonth === null ? 0 : Math.round(res.data[2].percentMonth);
    data_cp[Number(4)].rate = res.data[3].percentMonth === null ? 0 : Math.round(res.data[3].percentMonth);
    data_cp[Number(5)].rate = res.data[4].percentMonth === null ? 0 : Math.round(res.data[4].percentMonth);
    data_cp[Number(6)].rate = res.data[5].percentMonth === null ? 0 : Math.round(res.data[5].percentMonth);
    data_cp[Number(7)].rate = res.data[6].percentMonth === null ? 0 : Math.round(res.data[6].percentMonth);
    data_cp[Number(10)].rate = res.data[9].percentMonth === null ? 0 : Math.round(res.data[9].percentMonth);
    data_cp[Number(11)].rate = res.data[10].percentMonth === null ? 0 : Math.round(res.data[10].percentMonth);
    data_cp[Number(12)].rate = res.data[11].percentMonth === null ? 0 : Math.round(res.data[11].percentMonth);
    setData(data_cp);
  }

  const GetData = async () => {
    const userid = await AsyncStorage.getItem("userid");
    const config = { "userid": userid, "year": year };
    console.log(year);
    const res = await axios.create({ baseURL: server, headers: config }).get("/todo/statistic", {}).then(res => {
      console.log(res.data);
      if (res.data) {
        rerender(res);
        var total = 0;
        var complete = 0;
        for (let i = 0; i < 12; i++) {
          total +=     res.data[i].totalTasks;
          complete +=  res.data[i].completeTasks;
        }
        setTotalTask(total)
        setCompleteTask(complete)
      }
    }).catch(err => {
      console.log(err);
    })

  };
  useEffect(() => {
    //calendarRef.current?.scrollToIndex({ index: ((activeIndex - 2) > 0) ? activeIndex - 2 : 0, animated: true });
    GetData();
  }, [refreshing]);
  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerBackground}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                style={styles.buttonBack}
                onPress={() => {
                  nav.navigate('Profile')
                }}
              >
                <Icon name='arrow-left' color={color.Primary} size={20} />
              </TouchableOpacity>
              {/* <Text>Container</Text> */}
              <View style={styles.title}>
                <Text style={{
                  fontSize: 16, color: "#ffffff",
                  fontWeight: "bold"
                }}>Statistic</Text>
              </View>
            </View>

          </View>
          <View style={styles.body}>

            <View style={styles.yearPicker} >
              <TouchableOpacity onPress={() => { setYear(year - 1) }}>
                <Icon name={'caret-left'} color={'#000'} size={30} />
              </TouchableOpacity>
              <View>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{year}</Text>
              </View>
              <TouchableOpacity onPress={() => { setYear(year + 1) }}>
                <Icon name={'caret-right'} color={'#000'} size={30} />
              </TouchableOpacity>
            </View>

            <View style={styles.totalContainer}>
              <View style={[styles.center, styles.block]}>
                <Text style={styles.textBlock}>Total Tasks</Text>
                <Text style={styles.numberBlock}>{totalTask}</Text>
              </View>
              <View style={[styles.center, styles.block]}>
                <Text style={styles.textBlock}>Completed Tasks</Text>
                <Text style={styles.numberBlock}>{completeTask}</Text>
              </View>
            </View>
            <View style={{ height: "100%" }}>
              <View style={styles.flexRow}>
                <Circle
                  rate={String(data[Number(1)].rate) + ',' + '100'}
                  rateIn={String(data[Number(1)].rate) + '%'}
                  month={data[Number(1)].title}
                />
                <Circle
                  rate={String(data[Number(2)].rate) + ',' + '100'}
                  rateIn={String(data[Number(2)].rate) + '%'}
                  month={data[Number(2)].title}
                />
              </View>

              <View style={styles.flexRow}>
                <Circle
                  rate={String(data[Number(3)].rate) + ',' + '100'}
                  rateIn={String(data[Number(3)].rate) + '%'}
                  month={data[Number(3)].title}

                />
                <Circle
                  rate={String(data[Number(4)].rate) + ',' + '100'}
                  rateIn={String(data[Number(4)].rate) + '%'}
                  month={data[Number(4)].title}
                />
              </View>

              <View style={styles.flexRow}>
                <Circle
                  rate={String(data[Number(5)].rate) + ',' + '100'}
                  rateIn={String(data[Number(5)].rate) + '%'}
                  month={data[Number(5)].title}
                />
                <Circle
                  rate={String(data[Number(6)].rate) + ',' + '100'}
                  rateIn={String(data[Number(6)].rate) + '%'}
                  month={data[Number(6)].title}
                />
              </View>

              <View style={styles.flexRow}>
                <Circle
                  rate={String(data[Number(7)].rate) + ',' + '100'}
                  rateIn={String(data[Number(7)].rate) + '%'}
                  month={data[Number(7)].title}
                />
                <Circle
                  rate={String(data[Number(8)].rate) + ',' + '100'}
                  rateIn={String(data[Number(8)].rate) + '%'}
                  month={data[Number(8)].title}
                />
              </View>

              <View style={styles.flexRow}>
                <Circle
                  rate={String(data[Number(9)].rate) + ',' + '100'}
                  rateIn={String(data[Number(9)].rate) + '%'}
                  month={data[Number(9)].title}
                />
                <Circle
                  rate={String(data[Number(10)].rate) + ',' + '100'}
                  rateIn={String(data[Number(10)].rate) + '%'}
                  month={data[Number(10)].title}
                />
              </View>

              <View style={styles.flexRow}>
                <Circle
                  rate={String(data[Number(11)].rate) + ',' + '100'}
                  rateIn={String(data[Number(11)].rate) + '%'}
                  month={data[Number(11)].title}
                />
                <Circle
                  rate={String(data[Number(12)].rate) + ',' + '100'}
                  rateIn={String(data[Number(12)].rate) + '%'}
                  month={data[Number(12)].title}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  )
};

export default Statistic;