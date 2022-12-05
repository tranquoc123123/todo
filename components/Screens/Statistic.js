import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Dimensions, Touchable, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Circle from "../ComponentChild/Circle";
import color from "../StyleSheet/color";
import styles from "../StyleSheet/StatisticStyle";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { server } from "../../apis/server";
import AsyncStorage from "@react-native-async-storage/async-storage";


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Statistic = (props) => {
  const [statistic, setStatistic] = useState([]);
  const nav = useNavigation();
  const data = {
    1: {
      id: 1,
      title: 'January',
      rate: 90
    },
    2: {
      id: 2,
      title: 'February',
      rate: 78
    },
    3: {
      id: 3,
      title: 'March',
      rate: 99
    },
    4: {
      id: 4,
      title: 'April',
      rate: 30
    },
    5: {
      id: 5,
      title: 'May',
      rate: 68
    },
    6: {
      id: 6,
      title: 'June',
      rate: 80
    },
    7: {
      id: 7,
      title: 'July',
      rate: 56
    },
    8: {
      id: 8,
      title: 'August',
      rate: 38
    },
    9: {
      id: 9,
      title: 'September',
      rate: 38
    },
    10: {
      id: 10,
      title: 'October',
      rate: 38
    },
    11: {
      id: 11,
      title: 'November',
      rate: 18
    },
    12: {
      id: 12,
      title: 'December',
      rate: 22
    },
  };
  const statisticData = {}
  
  useEffect(() => {
    fetch("https://backendtodo123.herokuapp.com/todo/statistic")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);



  // console.log(typeof data[Number(1)].rate);

  return (
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
            <TouchableOpacity>
              <Icon name={'caret-left'} color={'#000'} size={30} />
            </TouchableOpacity>
            <View>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>2022</Text>
            </View>
            <TouchableOpacity>
              <Icon name={'caret-right'} color={'#000'} size={30} />
            </TouchableOpacity>
          </View>

          <View style={styles.totalContainer}>
            <View style={[styles.center, styles.block]}>
              <Text style={styles.textBlock}>Total Tasks</Text>
              <Text style={styles.numberBlock}>846</Text>
            </View>
            <View style={[styles.center, styles.block]}>
              <Text style={styles.textBlock}>Completed Tasks</Text>
              <Text style={styles.numberBlock}>682</Text>
            </View>
          </View>
          <View>
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
  )
};

export default Statistic;