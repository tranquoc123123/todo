import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../StyleSheet/color';
import { useNavigation } from '@react-navigation/native'
const IndexTaskView= ({ status, title, id, type, bgc, updateFunc, setState }) => {
    const [idItem, setIdItem] = useState();
    const nav = useNavigation();
    const handlePress = () => {
        nav.navigate("DailyTask", {id: id}); 
    }
    return (
        <Pressable onPress={handlePress}>
            <View style={styles.container}>
                <Text style={status ? styles.text : styles.text1} >{title}</Text>
                <View style={styles.circle}>
                    {
                        status ?
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
        justifyContent: "space-between",
        alignItems: 'center',
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
    text: {
        fontSize: 14,
        color: color.Primary,
        fontWeight: 'bold'
    },
    text1: {
        fontSize: 14,
        fontWeight: 'bold'
        // color: '#006EE9'
    }
})

export default IndexTaskView;