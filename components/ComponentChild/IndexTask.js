import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Pressable } from 'react-native';
import React, {useEffect, useState} from 'react';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../StyleSheet/color';
const IndexTask = ({status, title, id, type, bgc, updateFunc}) => {
    const [isSelect, setSelect] = useState(status);
// let progressNum = 100;
// progressNum = progress;
useEffect(() => {
    setSelect(status)
}, [])
//   const prg = progress/100;

const handlePress = () =>{
    let status = false;
    {
        isSelect ? status = false : status = true
    }
    setSelect(status);
    updateFunc(id, status);
}
  return (
    <Pressable onPress={handlePress}>
        <View style={styles.container}>
            <Text  style={isSelect? styles.text : styles.text1 } >{title}</Text>
            <View style = {styles.circle}>
            {
                isSelect ?
                  <View style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    backgroundColor: color.Primary,
                  }} />
                  : null
              }
            </View>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:'center',
        height: 50,
        width: "100%",
        borderWidth: 0.1,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginBottom: 7
    },
    header: {
        flex: 2,
        alignItems: 'flex-end',
        marginTop: 5,
        marginRight: 5
    },
    circle: {
        height: 26,
        width: 26,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: color.Primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize:14,
        color: color.Primary,
        fontWeight: 'bold'
    },
    text1:{
        fontSize:14,
        fontWeight: 'bold'
        // color: '#006EE9'
    }
})

export default IndexTask;