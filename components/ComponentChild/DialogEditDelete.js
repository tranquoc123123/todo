import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Pressable, TextInput, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../StyleSheet/color';
import { Dialog } from 'react-native-simple-dialogs';

const DiaglogEditDelete = ({ message, onEdit, onCancle, onDelete, visible, title, idFind }) => {
    return (
        <Dialog
            visible={visible}
            title={title}
            onTouchOutside={() => onCancle()}
            message={message}
            style={{ borderRadius: 20 }}
            borderRadius={20}
        >
            <View style={styles.container}>
                <TouchableOpacity onPress={() => { onEdit(idFind) }} style={styles.button}>
                    <Text style={{ color: "#ffffff" }}>Edit task</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onDelete(idFind) }} style={styles.button}>
                    <Text style={{ color: "#ffffff" }}>Delete task</Text>
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
    input: {
        borderRadius: 10,
        borderWidth: 0.2,
        borderColor: color.Primary,
        width: "100%",
        paddingHorizontal: 10
    }

});


export default DiaglogEditDelete;