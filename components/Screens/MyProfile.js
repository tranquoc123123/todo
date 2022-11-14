import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput, FlatList, ActivityIndicator, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../StyleSheet/color';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import InputDate from '../ComponentChild/InputDate';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axiosIntance from '../../apis/axios';
import DialogCustom from '../ComponentChild/Dialog';
import axios from "axios";
import { updateHeaderId } from '../../apis/axios';
import { server } from '../../apis/server';
import { Pressable } from 'react-native';

const todoItem = ({ item }) => {
    return (
        <TextInput value={item.title} />
    );
}

const MyProfile = ({ navigation }) => {
    const [openStart, setOpenStart] = useState(false);
    const [isOK, setOK] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGetting, setGetting] = useState(true);
    const [message, setMessage] = useState();
    const [img, setImg] = useState(require('./img/default.png'))
    const [name, setName] = useState("Name");
    const [email, setEmail] = useState("Email");
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [dateOfBirthStr, setDateOfBirthStr] = useState(new Date().toISOString().split('T')[0]);
    const [profession, setProfession] = useState("No info");
    const nav = useNavigation();

    const route = useRoute();
    const onChange = (event, selectedDate) => {
        // const currentDate = selectedDate || date;
        // setDate(currentDate);
        if (openStart === true) {
            setOpenStart(Platform.OS === 'ios');
            const currentDate = selectedDate || dateOfBirth;
            setDateOfBirth(currentDate);
            setDateOfBirthStr(currentDate.toISOString().split('T')[0]);
        }
    };


    const UpdateHandle = async () => {
        // setIsLoading(true);
        // if (await Validateting() === true) {
        //     const res = await axiosIntance.put("/todo", {
        //         title: title,
        //         startdate: startDate,
        //         enddate: endDate,
        //         description: description
        //     },
        //         {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'id': '6360986eab6b9925b4ceea2b',
        //             }
        //         },
        //     ).then(res => {
        //         updateTodoList();
        //     }
        //     ).catch(error => {
        //         console.log(error);
        //         setMessage(error.messaage);
        //         setOK(true);
        //     }).finally(() => {
        //         // setIsLoading(false)
        //         setOK(true);
        //     });
        // } else {
        //     setOK(true);
        // }
        // setIsLoading(false);
    };

    const gotoProfile = () =>{
        nav.navigate("Profile");
    }

    const Validateting = async () => {
        let result = true;
        let cnt = 0;
        if (!name) {
            result = false;
             setMessage('Please input the name');
        }
        console.log(message);
        return result;

    }

    const init = async () => {
        setDateOfBirth(new Date(route.params.dateofbirth));
        setDateOfBirthStr(new Date(route.params.dateofbirth).toISOString().split('T')[0]);
        setEmail(route.params.email);
        setName(route.params.name);
        setProfession(route.params.profession);
        setImg(route.params.img);
    }

    const handlePress = async (text, id) => {
        // console.log(e.value);
        let items = [...listItem];
        let item = await listItem.find(i => {
            if (i._id === id) return true;
        })
        item.titleItem = text;
        console.log(item);
        let index = await listItem.findIndex(item => item._id === id);
        items[index] = item;
        setListItem(items);
    }

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
        init();
        setGetting(false);
    }, [])

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <View style={styles.absolute}>
            </View>
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Pressable style={styles.buttonBack} onPress={()=>gotoProfile()}>
                        <Icon name="arrow-left" color={color.Primary} size={20} />
                    </Pressable>
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 16, color: "#ffffff", fontWeight: "bold" }}>My Profile</Text>
                </View>
                <View style={{ flex: 1 }}>
                    {/* <Text>Edit Task</Text> */}
                </View>
            </View>
            <View style={styles.body}>
                {isGetting ?
                    <View style={{ flex: 1, height: "100%" }}>
                        <ActivityIndicator size="large" color="#90EE90" style={{ flex: 1 }} />
                    </View>
                    :
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 20, alignItems: "center" }}>
                            <Image  source={img} style={styles.img}/>
                        </View>
                        <View style={styles.index}>
                            <Text style={styles.indextext}>
                                Name
                            </Text>
                            <TextInput placeholder='Name' style={styles.input} defaultValue={name} onChangeText={(text) => setName(text)} />
                        </View>
                        <View style={styles.index}>
                            <Text style={styles.indextext}>
                                Profession
                            </Text>
                            <TextInput placeholder='Profession' style={styles.input} defaultValue={profession} onChangeText={(text) => setProfession(text)} />
                        </View>
                        <View style={[{ flexDirection: "row" },styles.index]}>
                            <View style={{ flex: 1,  }}>
                                <Text style={styles.indextext}>Date of Birth</Text>
                                <InputDate date={dateOfBirthStr} onPress={() => { setOpenStart(true) }} />
                            </View>
                        </View>
                        <View style={styles.index}>
                            <Text style={styles.indextext}>
                                Email
                            </Text>
                            <TextInput placeholder='Email' style={styles.input} defaultValue={email} onChangeText={(text) => setEmail(text)} />
                        </View>
                        <View style={{ marginVertical: 20 }}>
                            <TouchableOpacity style={styles.buttonEnable} onPress={() => UpdateHandle()} >
                                {isLoading ?
                                    <ActivityIndicator size="large" color="#90EE90" /> :
                                    <Text style={{ color: "#ffffff" }}> Update </Text>
                                }
                            </TouchableOpacity>
                        </View>
                        {
                            openStart && (<DateTimePicker
                                testID="dateTimePicker"
                                timeZoneOffsetInMinutes={0}
                                value={dateOfBirth}
                                mode="date"
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                                headerShown={false}
                                accentColor={color.Primary}
                            />)

                        }
                    </View>
                }
                <DialogCustom
                    visible={isOK}
                    onPressHandle={() => setOK(false)}
                    title=""
                    message={message}
                />
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        zIndex: 1,
        flexDirection: "row",
        marginVertical: 40
    },
    body: {
        flex: 1,
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex: 1,
        paddingHorizontal: 15
    },
    buttonBack: {
        marginLeft: 10,
        // marginTop: 10,
        height: 40,
        width: 50,
        borderRadius: 15,
        backgroundColor: "#ffffff",
        //   color: color.Primary,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
    },
    absolute: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 0,
        backgroundColor: color.Primary,
        flex: 1
    },
    indextext: {
        fontSize: 14,
        color: color.Primary,
        fontWeight: "bold",
        marginBottom: 5
    },
    input: {
        borderRadius: 1,
        borderColor: color.Primary,
        borderWidth: 0.1,
        paddingLeft: 10
    },
    buttonEnable: {
        width: 335,
        height: 50,
        borderRadius: 10,
        backgroundColor: color.Primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        color: '#ffffff',
    },
    input2: {
        borderRadius: 1,
        borderColor: color.Primary,
        borderWidth: 0.1,
        textAlignVertical: 'top',
        paddingHorizontal: 15
    },
    img: {
        height:100,
        width: 100,
        borderRadius: 100,
        borderWidth: 0.3,
        borderColor: color.Primary
    },
    index: {
        marginVertical: 10
    },
})

export default MyProfile;