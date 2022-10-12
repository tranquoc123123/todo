import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, ImageBackground, StyleSheet, Pressable } from "react-native";

import styles from "../StyleSheet/TodoScreen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const MyDay = () => {
  const [inputDay, setInputDay] = useState('');
  const [getList, setList] = useState([]);


 

  const addItem = () => {
    // console.log(inputDay);
    if (inputDay === '') {
      // console.log(inputDay);
      alert('Please input your tasks!');

    } else {
      setList([
        ...getList,
        { 
          key: Math.random().toString(), 
          data: inputDay,
        }
      ]);
      setInputDay('');
      console.log(getList)

    }

  }

  const removeItem = (itemkey) => {
    var newList = getList.filter(item => item.key !== itemkey);
    setList(newList);
    // console.log(newList);
  }


  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        source={{ uri: 'asset:/images/sky phone wallpaper.jpg' }}
      >
        <View style={{ flexDirection: "row", padding: 15 }}>
          <TextInput
            style={styles.inputBorder}
            placeholder="Input your tasks..."
            placeholderTextColor={'#fff'}
            onChangeText={text => setInputDay(text)}
            value={inputDay}
          />
          <TouchableOpacity
            onPress={addItem}
            style={styles.addBtn}
            activeOpacity={0.7}
          >
            <Text style={{ color: '#fff', fontSize: 28 }}>+</Text>
          </TouchableOpacity>

        </View>
        <View>
          <Text>{inputDay}</Text>
        </View>
        <ScrollView contentContainerStyle={styleScrollView.contentContainer}>
          {getList.map((item) =>
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.7}
              style={styles.itemContainer}
            >      

              <Text style={styles.itemTitle}>{item.data}</Text>
              <TouchableOpacity
                onPress={() => removeItem(item.key)}
                style={{ padding: 10 }}
              >
                <MaterialIcons name={'delete-outline'} color={'#7097a4'} size={30} />
              </TouchableOpacity>
            </TouchableOpacity>)
          }

        </ScrollView>

      </ImageBackground>

    </View>
  )
};

const styleScrollView = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
  },
  checkBox: {
    height: 25,
    width: 25,
    borderColor: '#7097a4',
    borderWidth: 2.5,
    borderRadius: 50,
    marginTop: 13,
  }

})

export default MyDay;