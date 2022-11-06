import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Pressable, TextInput, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../StyleSheet/color';
import { Dialog } from 'react-native-simple-dialogs';
const DialogCustom = ({ message, onPressHandle, visible, title }) => {
    return (
        <Dialog
            visible={visible}
            title={title}
            onTouchOutside={() => onPressHandle()}
            message={message}
        >
            <View style={styles.container}>
                <Text style={{ color: color.Primary, fontSize: 16 }} color={color.Primary} > {message} </Text>
                <TouchableOpacity onPress={() => {onPressHandle()}} style={styles.button}>
                    <Text style={{ color: "#ffffff" }}>OK</Text>
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
        borderRadius: 10

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
    message: {
        color: color.Primary,
        fontSize: 16
    },
});

export default DialogCustom;