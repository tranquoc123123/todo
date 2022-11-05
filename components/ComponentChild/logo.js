import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';
import { Pressable } from 'react-native';
const Logo = ({ URL }) => {
    return (
        <Pressable style={styles.container}>
            <View>
                <Image
                    style={{ width: 59, height: 59 }}
                    source={URL} />
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: 60,
        borderRadius: 5,
        marginHorizontal: 25

    }
})

export default Logo;