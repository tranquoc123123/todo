import React from "react";
import { View, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import styles from "../StyleSheet/PriorityTaskStyle";

const PriorityTask = () => {
  const todoList = [
    {
      key: 1,
      data: 'Make a moodboard'
    },
    {
      key: 2,
      data: 'Make a wireframe'
    },
    {
      key: 3,
      data: 'Make a component design'
    },
    {
      key: 4,
      data: 'Client meeting'
    },
    {
      key: 5,
      data: 'Make a desgin'
    },
    {
      key: 6,
      data: 'Make a desgin'
    },
    {
      key: 7,
      data: 'Make a desgin'
    },
  ]
  return (
    <View style={styles.body}>
      <View>
        <Text style={styles.title}>
          UI Design
        </Text>
      </View>
      <View style={styles.timeTitle} >
        <View>
          <Text>
            start
          </Text>
          <Text>
            21 Feb 2022
          </Text>
        </View>
        <View>
          <Text>
            end
          </Text>
          <Text>
            21 Feb 2022
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
        <Text>
          Description
        </Text>
      </View>
      <View>
        <Text>
          user interface (UI) is anything a user may interact with to use a digital product or service. This includes everything from screens and touchscreens, keyboards, sounds, and even lights. To understand the evolution of UI, however, it's helpful to learn a bit more about its history and how it has evolved into best practices and a profession.
        </Text>
      </View>
      <View style={styles.progressComponent}>
        <View>
          <Text style={{ paddingBottom: 10 }}>
            Progress
          </Text>
          <View style={styles.progressBar}>
            <View><Text style={{ color: 'white', fontSize: 15 }}>80%</Text></View>
          </View>
        </View>
      </View>
      <View>
        <View>
          <Text>To do list</Text>
        </View>
      </View>
      <View>

        <ScrollView>
          {todoList.map(
            (item) =>
              <TouchableOpacity style={styles.todoItem} key={item.key}>
                <Text style={styles.textItem}>
                  {item.data}
                </Text>
              </TouchableOpacity>
          )}
        </ScrollView>
      </View>


      <TouchableOpacity style={styles.finishBtn}>
        <Text style={styles.textBtn}>
          Finish
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default PriorityTask;