import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, SafeAreaView, Dimensions, Animated, TouchableOpacity, FlatList, ScrollView } from 'react-native';

import styles from '../StyleSheet/MydayStyle';
import color from '../StyleSheet/color';

import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import TabListView from '../ComponentChild/Tab';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { server } from "../../apis/server";

import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import DiaglogEditDelete from '../ComponentChild/DialogEditDelete';
import { set } from 'immer/dist/internal';
import { useRoute } from '@react-navigation/native';
import DialogConfirm from '../ComponentChild/DialogOkCancle';
import DialogCustom from '../ComponentChild/Dialog';
// import MonthPicker from 'react-native-month-year-picker';
// import { ACTION_DATE_SET, ACTION_DISMISSED, ACTION_NEUTRAL } from 'react-native-month-year-picker';





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

const parseToIcon = (text) => {
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



const width = Dimensions.get('window').width;
const ITEM_SIZE = width * 0.2;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

function getDaysInMonth(month, year) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const convertNumberToDate = {
  0: 'Mon',
  1: 'Tue',
  2: 'Wed',
  3: 'Thu',
  4: 'Fri',
  5: 'Sat',
  6: 'Sun',
}


export default function MyDay() {

  const calendarRef = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [status, setStatus] = useState(0);
  const [id, setId] = useState();
  const [priority, setPriority] = useState([]);
  const [daily, setDaily] = useState([]);
  const [showDialogEdit, setShowDialogEdit] = useState(false);
  const [showDialogConfirm, setShowDialogConfirm] = useState(false);
  const [showDialogOk, setShowDialogOk] = useState(false);
  const [showCalander, setShowCalander] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isPriority, setIsPriority] = useState(false);
  const [message, setMessage] = useState();
  const nav = useNavigation();
  const route = useRoute();
  const [date, setDate] = useState(new Date());
  const [canmomentum, setCanMomentum] = useState(false);
  const [day, setDay] = useState(new Date().getUTCDate());
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const DAYS_IN_MONTH = getDaysInMonth(month, year).map((item) => {
    return {
      title: convertNumberToDate[new Date(item).getDay()],
      content: new Date(item).getDate()
    }
  });

  const HandlePressDetail = (id, type) => {
    setShowDialogEdit(true);
    setId(id);
    if (type.toUpperCase() === "PRIORITY") {
      setIsPriority(true)
    } else {
      setIsPriority(false)
    }
  }
  const HandleEdit = () => {
    setShowDialogEdit(false);
    nav.navigate("EditTask", { id: id })
  }
  const HandleDelete = () => {
    setShowDialogConfirm(true);
  }
  const HandleCancle = () => {
    setShowDialogEdit(false);
    setId("");
  }
  const HandleCancle2 = () => {
    setShowDialogConfirm(false);
  }

  const HandleAfterDel = () => {
    console.log("delete");
    let arr = [];
    if (isPriority) {
      arr = [...priority];
    } else {
      arr = [...daily];
    }
    arr = arr.filter(item => item._id !== id);
    if (isPriority) {
      setPriority(arr);
    } else {
      setDaily(arr);
    }
    setMessage("Delete is successfully");
    setShowDialogConfirm(false);
    setShowDialogEdit(false);
    setId("");
    setShowDialogOk(true);
    setDeleting(false);

  }


  const HandleDeleteData = async () => {
    setDeleting(true);
    const res = await axios.create({ baseURL: server }).delete("/todo/" + id).then(res => {
      HandleAfterDel();
    }).catch(err => {
      setMessage("Delete is fail, try again!");
      setShowDialogConfirm(false);
      setShowDialogEdit(false);
      setId("");
      setShowDialogOk(true);
      setDeleting(false);
    });

  }

  const renderPriority = ({ item, index }) => {
    let iconname = parseToIcon(item.icontype.toUpperCase());
    return (
      <View>
        <TouchableOpacity style={styles.card} onPress={() => HandlePressDetail(item._id, item.type)}>
          <View style={styles.subcard}>
            <View style={styles.line}></View>
          </View >
          <View style={styles.headercard}>
            <View style={{ flexDirection: "row", flex: 3 }}>
              <Icon name={iconname} style={styles.title} />
              <Text style={styles.title}>  </Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
              <Icon name={"ellipsis-h"} style={styles.title} />
            </View>
          </View>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.time}>
            <Text style={styles.timetext}>{new Date(item.startdate).toDateString()}</Text>
            <Text style={styles.timetext}> - </Text>
            <Text style={styles.timetext}>{new Date(item.enddate).toDateString()}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  };

  const renderDaily = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity style={styles.card} onPress={() => HandlePressDetail(item._id, item.type)} >
          <Text>{item.title}</Text>
        </TouchableOpacity>
      </View>
    )
  };

  const setDateFunc = async (selectDate) => {
    setDate(selectDate);
  }

  const setStatusActive = status => {
    setStatus(status);
    // console.log('you clicked : ' , status);
  };
  const listTab = {
    0: {
      title: 'Priority Task',
      data: priority,
      renderItem: renderPriority,
      id: "0",
    },
    1: {
      title: 'Daily Task',
      data: daily,
      renderItem: renderDaily,
      id: "1",
    },
  };
  useEffect(() => {
    const numday = date.getUTCDate();
    setActiveIndex(numday - 1);
    // calendarRef.current.scrollToIndex({ index: numday-1, animated: true });
    getData();
  }, []);
  const getData = async () => {
    const userid = await AsyncStorage.getItem("userid");
    const fromdateTmp = date.setHours(0, 0, 0, 0);
    const todateTmp = date.setHours(23, 59, 59, 999);
    const fromdate = new Date(fromdateTmp);
    const todate = new Date(todateTmp);
    const config = { "userid": userid, "fromdate": fromdate, "todate": todate, };
    axios.create({ baseURL: server, headers: config }).get("/todo", {
      // params:{
      //     id: "62fbcb17e8588f32cbea05b7"
      // }
    }).then(
      res => {
        const data = handleData(res.data)
        setPriority(data?.priority || [])
        setDaily(data?.daily || [])
      }
    ).catch(error => {
      console.log(error)
    }).finally(() => {

    });
  }
  return (
    <ScrollView >
      <SafeAreaView style={{
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 20,
        marginBottom: 75
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: 15,
          paddingLeft: 15,

        }}>
          <TouchableOpacity style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
            onPress={() => { setShowCalander(true) }}
          >
            <Icon name={'calendar-alt'} color={'#223671'} size={25} />
            <View>
              <Text style={{
                color: 'black',
                fontSize: 25, fontWeight: '500',
                textDecorationLine: 'underline',
                paddingLeft: 5
              }}>
                Nov, 2022
              </Text>
            </View>
          </TouchableOpacity>

          <Pressable style={{
            justifyContent: 'center',
            height: 36,
            width: 96,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#223671',
            flexDirection: 'row',

          }} onPress={() => nav.navigate("AddTask")}>
            <AntDesign name={'plus'} color={'#ffffff'} size={18} />
            <Text style={{ color: '#ffffff', marginLeft: 3 }}>Add Task</Text>
          </Pressable>
        </View>

        <Animated.FlatList
          ref={calendarRef}
          data={DAYS_IN_MONTH}
          keyExtractor={({ content }) => content.toString()}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: true,
              listener: (event) => {
                setCanMomentum(true);
              },
            },
          )}
          contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
          snapToInterval={DAYS_IN_MONTH.length}
          decelerationRate="normal"
          style={{ flexGrow: 0 }}
          onMomentumScrollEnd={(ev) => {
            if (canmomentum) {
              const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE);
              console.log(index);
              const selectDate = new Date(year, month, index + 1);
              console.log(selectDate.toDateString());
              console.log(date.toDateString());
              setDate(selectDate);
              console.log(date.getUTCDate());
              setActiveIndex(index);
              console.log("active index:" + activeIndex);
              // const wait = new Promise(resolve => setTimeout(resolve, 2000));
              // wait.then(() => {
              // });
              // console.log(date.toDateString());
              console.log("getting data...")
              getData();
            }
            setCanMomentum(false);
          }}
          onLayout={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              calendarRef.current?.scrollToIndex({ index: activeIndex - 2, animated: true });
            });
          }}
          renderItem={({ item, index }) => {
            const { title, content } = item;
            const inputRange = [
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
              (index + 2) * ITEM_SIZE
            ];

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [.8, .8, 1, .8, .8]
            });
            return (
              <Animated.View style={{
                transform: [{
                  scale
                }],
                height: ITEM_SIZE,
                width: ITEM_SIZE,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: activeIndex === index ? '#223671' : '#e8eaf0',
                borderRadius: 8,
                borderColor: '#223671',
                marginTop: 30,
                marginBottom: 30,

              }}>
                <TouchableOpacity style={{
                  height: ITEM_SIZE,
                  width: ITEM_SIZE,
                  justifyContent: 'center',
                  alignItems: 'center',

                }}
                  onPress={() => {
                    calendarRef.current.scrollToOffset({
                      offset: index * ITEM_SIZE
                    })
                  }}
                >
                  <Text>
                    {title}
                  </Text>
                  <Text style={{
                    fontSize: 19,
                    fontWeight: '600'
                  }}>
                    {content}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            )
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        {/* <TabListView /> */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {
            Object.keys(listTab).map(item => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={3}
                style={[styles.btnTab]}
                onPress={() => setStatusActive(Number(item))}
              >
                <Text style={[styles.textTab, status === Number(item) && styles.textActive]}>
                  {listTab[Number(item)].title}
                </Text>
              </TouchableOpacity>
            ))
          }
        </View>
        <View style={{ flexGrow: 1, marginBottom: 5 }}>
          <FlatList
            data={listTab[status].data}
            keyExtractor={listTab[status].data.id}
            renderItem={listTab[status].renderItem}
            style={{ marginBottom: 10 }}
          />
        </View>
        <DiaglogEditDelete
          message={""}
          onEdit={() => HandleEdit()}
          onDelete={() => HandleDelete()}
          onCancle={() => HandleCancle()}
          visible={showDialogEdit}
        />
        <DialogConfirm
          message={"Are you sure?"}
          onOk={() => HandleDeleteData()}
          onCancle={() => HandleCancle2()}
          visible={showDialogConfirm}
          isHandlingOK={deleting}
        />
        <DialogCustom
          message={message}
          onPressHandle={() => { setShowDialogOk(false) }}
          visible={showDialogOk}
        />
        {/* {showCalander && (
          <MonthPicker
            onChange={onValueChange}
            value={date}
            minimumDate={new Date()}
            maximumDate={new Date(2025, 5)}
            locale="ko"
          />)} */}
      </SafeAreaView>
    </ScrollView>
  );
}