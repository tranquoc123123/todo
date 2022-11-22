import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Pressable, TextInput, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../StyleSheet/color';
import { Dialog } from 'react-native-simple-dialogs';
const DialogConfirm = ({ message, onOk, onCancle, visible, title, isHandlingOK }) => {
    return (
        <Dialog
            visible={visible}
            title={title}
            onTouchOutside={() => onCancle()}
            message={message}
        >
            <View style={styles.container}>
                <Text style={{ color: color.Primary, fontSize: 16 }} color={color.Primary} > {message} </Text>
                <TouchableOpacity onPress={() => { onOk() }} style={styles.button}>
                    {isHandlingOK ?
                        <ActivityIndicator size="large" color="#90EE90" /> :
                        <Text style={{ color: "#ffffff" }}>OK </Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onCancle() }} style={styles.button2}>
                    <Text style={{ color: "black" }}>Cancle</Text>
                </TouchableOpacity>
            </View>
            {/* <Button onPress={()=>setOK(false)} title ="OK" containerStyle={{marginVertical: 30}} /> */}
        </Dialog>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },
    button: {
        backgroundColor: color.Primary,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: 48,
        marginVertical: 10,
        borderRadius: 5
    },
    button2: {
        backgroundColor: "#ffffff",
        borderColor: color.Primary,
        borderWidth: 0.2,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: 48,
        marginVertical: 10,
        borderRadius: 2
    },
    message: {
        color: color.Primary,
        fontSize: 16
    },
});


export default DialogConfirm;