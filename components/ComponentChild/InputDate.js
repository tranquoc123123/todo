import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Pressable, TextInput, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../StyleSheet/color';

const InputDate = ({ date, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.input}  >
        <Icon name="calendar-alt" color={color.Primary} size={20} />
        <Text>{"  "}{date}</Text>
        <Text />

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 0.2,
    borderRadius: 3,
    marginRight: 10,
    height: 50,
    paddingLeft: 10,
    borderColor: color.Primary

  },
  input: {
    flexDirection: "row"
  }
});

export default InputDate;