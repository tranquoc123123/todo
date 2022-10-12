import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, ImageBackground } from "react-native";
import styles from "../StyleSheet/TodoScreen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Important = () => {
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
        { key: Math.random().toString(), data: inputDay }
      ]);
      setInputDay('');
    }

  }

  const removeItem = (itemkey) => {
    var newList = getList.filter(item => item.key !== itemkey)
    setList(newList)
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
        source={{ uri: 'asset:/images/Pink Gold Cloud Quote Motivational Phone Wallpaper.jpg' }}
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
            <Text style={{ color: '#fff' }}>Add</Text>
          </TouchableOpacity>

        </View>
        <View>
          <Text>{inputDay}</Text>
        </View>
        <ScrollView style={{ marginBottom: 40 }}>
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
                <MaterialIcons name={'delete-outline'} color={'#000'} size={30} />
                {/* <Text style={styles.itemRemove}>X</Text> */}
              </TouchableOpacity>
            </TouchableOpacity>)
          }

        </ScrollView>

      </ImageBackground>

    </View>
  )
}

export default Important;