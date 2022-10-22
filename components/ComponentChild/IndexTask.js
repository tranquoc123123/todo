import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Pressable } from 'react-native';
import React, {useEffect, useState} from 'react';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
const IndexTask = ({status, title, id, type, bgc}) => {
    const [isSelect, setSelect] = useState(status);
// let progressNum = 100;
// progressNum = progress;
useEffect(() => {
    setSelect(status)
}, [])
//   const prg = progress/100;

const handlePress = () =>{
    {
        isSelect ? setSelect(false) : setSelect(true)
    }
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
                    backgroundColor: '#006EE9',
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
        height: 40,
        width: "100%",
        borderWidth: 0.25,
        borderRadius: 25,
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
        borderColor: '#006EE9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize:14,
        color: '#006EE9'
    },
    text1:{
        fontSize:14,
        // color: '#006EE9'
    }
})

export default IndexTask;