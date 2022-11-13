import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Pressable, TextInput, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../StyleSheet/color';
import { Dialog } from 'react-native-simple-dialogs';

const DialogInput = ({ message, onOK, onCancle, visible, title, setValue }) => {
    return (
        <Dialog
            visible={visible}
            title={title}
            onTouchOutside={()=>onCancle()}
            message={message}
            style={{borderRadius: 20}}
            borderRadius={20}
        >
            <View style={styles.container}>
                <View style={{alignItems:"flex-start", justifyContent:"flex-start",width:"100%" }}>
                    <TextInput placeholder='Type something...' style={styles.input}  onChangeText={text=>setValue(text)}/>
                </View>
                <TouchableOpacity onPress={() => {onOK() }} style={styles.button}>
                    <Text style={{ color: "#ffffff" }}>Add task</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onCancle() }} style={styles.button}>
                    <Text style={{ color: "#ffffff" }}>Cancle</Text>
                </TouchableOpacity>
            </View>
        </Dialog>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10

    },
    button: {
        backgroundColor: color.Primary,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: 48,
        marginVertical: 10,
        borderRadius: 10
    },
    message: {
        color: color.Primary,
        fontSize: 16
    },
    input:{
        borderRadius: 10,
        borderWidth: 0.2,
        borderColor: color.Primary,
        width: "100%",
        paddingHorizontal: 10
    }

});


export default DialogInput;