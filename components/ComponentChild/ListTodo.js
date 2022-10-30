import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet,  } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../StyleSheet/color';

const ListTodo = ({list, mode})=>{
    const [listToDo, setListTodo] =useState([]);
    const IndexINput =(item)=>{

    }
    useEffect(() => {
        if (mode ==='edit'){
            setListTodo(list);
        } else {
            setListTodo([])
        }
    }, [])
    return(
        <View>
            <FlatList 
            data  = {listToDo}
            renderItem={IndexINput}
            keyExtractor={(item) => item._id}
            />
            <TouchableOpacity>
                <Text>
                    ADD
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default ListTodo