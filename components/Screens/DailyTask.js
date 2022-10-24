import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../StyleSheet/DailyTaskStyle";

const DailyTask = () => {

  return (
    <View style={styles.body}>
      <View>
        <Text style={styles.title}>
          Work Out
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
              14
            </Text>
            <Text style={{color: 'white'}}>
              hours
            </Text>
          </View>
        </View>
        <View >
          <View style={styles.timeBlock}>
            <Text style={styles.textBlock}>
              48
            </Text>
            <Text style={{color: 'white'}}>
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
          Description
          Routine exercise every morning with sports, either running, or swimming, or jogging, or badminton, futsal, or similar sports. Work out to form a better body and live a healthier life. hopefully all this can be achieved.
        </Text>
      </View>
      <TouchableOpacity style={styles.finishBtn}>
        <Text style={styles.textBtn}>
          Finish
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default DailyTask;