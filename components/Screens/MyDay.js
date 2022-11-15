import React from 'react';
import { Text, View, SafeAreaView, Dimensions, Animated, TouchableOpacity, } from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import TabListView from '../ComponentChild/Tab';

const width = Dimensions.get('window').width;
const ITEM_SIZE = width * 0.167;
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
const DAYS_IN_MONTH = getDaysInMonth(10, 2022).map((item) => {
  return {
    title: convertNumberToDate[new Date(item).getDay()],
    content: new Date(item).getDate()
  }
});

export default function MyDay() {
  const calendarRef = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <SafeAreaView style={{
      paddingRight: 10,
      paddingLeft: 10,
      paddingTop: 20
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
        }}>
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

        <TouchableOpacity style={{
          justifyContent: 'center',
          height: 32,
          width: 90,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#223671',
          flexDirection: 'row',

        }}>
          <AntDesign name={'plus'} color={'#ffffff'} size={18} />
          <Text style={{ color: '#ffffff', marginLeft: 3 }}>Add Task</Text>
        </TouchableOpacity>
      </View>

      <Animated.FlatList
        ref={calendarRef}
        data={DAYS_IN_MONTH}
        keyExtractor={({ content }) => content.toString()}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
        snapToInterval={DAYS_IN_MONTH.length}
        decelerationRate="normal"
        style={{ flexGrow: 0 }}
        onMomentumScrollEnd={(ev) => {
          const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE);
          setActiveIndex(index);
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
      <TabListView />


    </SafeAreaView>
  );
}