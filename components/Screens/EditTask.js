import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from "react-native";
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
import DropDownPicker from 'react-native-dropdown-picker';
import { parseToIcon } from '../ComponentChild/CommonFunction';
import DialogBack from '../ComponentChild/DialogBack';
import { Pressable } from 'react-native';
const todoItem = ({ item }) => {
    return (
        <TextInput value={item.title} />
    );
}
const EditTask = ({ navigation }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startDateStr, setStartDateStr] = useState(new Date().toDateString());
    const [endDateStr, setEndDateStr] = useState(new Date().toDateString());
    const [openEnds, setOpenEnds] = useState(false);
    const [openStart, setOpenStart] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [isOK, setOK] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGetting, setGetting] = useState(true);
    const [message, setMessage] = useState();
    const [listItem, setListItem] = useState([]);
    const route = useRoute();
    const [isPriority, setPriority] = useState(true);
    const [userId, setIdUser] = useState();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [level, setLevel] = useState('normal');
    const [typeIcon, setTypeIcon] = useState('coding');
    const [isOkBack, setOkBack] = useState(false);
    const nav = useNavigation();

    const [items, setItems] = useState([
        { label: 'Normal', value: 'normal' },
        { label: 'Important', value: 'important' },
        { label: 'Urgency', value: 'Urgency' }
    ]);
    const [items2, setItems2] = useState([
        { label: 'Coding', value: 'coding' },
        { label: 'Design', value: 'design' },
        { label: 'Reading', value: 'reading' },
        { label: 'Learning', value: 'learning' },
        { label: 'other', value: 'other' },
    ]);
    const onChange = (event, selectedDate) => {
        // const currentDate = selectedDate || date;
        // setDate(currentDate);
        if (openStart === true) {
            setOpenStart(Platform.OS === 'ios');
            const currentDate = selectedDate || startDate;
            setStartDate(currentDate);
            setStartDateStr(currentDate.toDateString());
        }
        if (openEnds === true) {
            setOpenEnds(Platform.OS === 'ios');
            const currentDate = selectedDate || endDate;
            setEndDate(currentDate);
            setEndDateStr(currentDate.toDateString());
        };
    };

    const updateTodoList = async () => {
        let cnt = 0;
        await listItem.map(item => {
            const res_1 = axiosIntance.put("/item/" + item._id, {
                titleItem: item.titleItem
            }, {}).catch(err => {
                let cnt = cnt + 1;
            })
        })
        if (cnt === 0) {
            setMessage("Update is sucessfully");
            setOkBack(true);
        } else {
            setMessage("Have an error when on updation, try again");
            setOK(true);
        }
        return;
    }

    const UpdateHandle = async () => {
        setIsLoading(true);
        if (await Validateting() === true) {
            const body = {};
            const id = route.params.id;
            body.title = title;
            body.startdate = new Date(startDate.setHours(0, 0, 0, 0));
            body.enddate = new Date(endDate.setHours(23, 59, 59, 999));
            body.description = description;
            if (isPriority === true) {
                body.level = level;
                body.icontype = typeIcon;
            }
            const res = await axiosIntance.put("/todo", body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'id': id,
                    }
                },
            ).then(res => {
                if (isPriority === true) {
                    updateTodoList();
                } else {
                    setMessage("Update is sucessfully");
                    setOkBack(true);
                };
            }
            ).catch(error => {
                setMessage(error.messaage);
                setOK(true);
            }).finally(() => {
                // setIsLoading(false)
            });
        } else {
            setOK(true);
        }
        setIsLoading(false);
    };


    const getTask = async () => {
        // await updateHeaderId('6360986eab6b9925b4ceea2b');
        const id = route.params.id;
        console.log("taskid: " + id);
        const res = await axios.create({ baseURL: server, headers: { "id": id } }).get("/todo/", {
        }).then(res => {
            // console.log("res.data: ");
            // console.log( res.data[0]);
            setTitle(res.data[0].title);
            setDescription(res.data[0].description);
            if (res.data[0].startdate) {
                setStartDate(new Date(res.data[0].startdate));
                setStartDateStr(new Date(res.data[0].startdate).toDateString());
            }
            if (res.data[0].enddate) {
                setEndDate(new Date(res.data[0].enddate));
                setEndDateStr(new Date(res.data[0].enddate).toDateString());
            }
            if (res.data[0].type) {
                if (res.data[0].type.toUpperCase() === "PRIORITY") {
                    setPriority(true)
                    setLevel(res.data[0].level)
                    setTypeIcon(res.data[0].icontype)
                    setListItem(res.data[0].list_item);
                } else {
                    setPriority(false)
                }
            }
        }
        ).catch(error => {
            setMessage("Have an error")
            setOK(true);
        }).finally(() => {
            // setIsLoading(false)
            setGetting(false)
        });
    };

    const Validateting = async () => {
        let result = true;
        let cnt = 0;
        if (!title) {
            result = false;
            await setMessage('Please input the title');
        }
        if (!description) {
            await setMessage('Please input the description');
            result = false;
        }
        listItem.map(item => {
            if (!item.titleItem) {
                cnt = cnt + 1;
            }
        })
        if (cnt !== 0) {
            await setMessage('Please input all title of list todo');
            result = false;
        }
        if (endDate.getTime() < startDate.getTime()) {
            await setMessage('The end date must be greater than the start date');
            result = false;
        }
        return result;

    }

    const init = async () => {
        setStartDate(new Date());
        setEndDate(new Date());
        setStartDateStr(new Date().toDateString());
        setEndDateStr(new Date().toDateString());
    }

    const handlePress = async (text, id) => {
        let items = [...listItem];
        let item = await listItem.find(i => {
            if (i._id === id) return true;
        })
        item.titleItem = text;
        let index = await listItem.findIndex(item => item._id === id);
        items[index] = item;
        setListItem(items);
    }

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
        // IntLoad();
        // setGetting(true);
        getTask();
        init();
        // setDataTask(data);
    }, [])

    return (
        <KeyboardAwareScrollView style={styles.container}>
            {isGetting ?
                <View style={{ flex: 1, height: 500 }}>
                    <ActivityIndicator size="large" color={color.Secondary} style={{ flex: 1 }} />
                </View> :
                <View>
                    <View style={styles.absolute}>
                    </View>
                    <View style={styles.header}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={styles.buttonBack} onPress={() => { nav.navigate("My Day") }}>
                                <Icon name="arrow-left" color={color.Primary} size={20} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontSize: 16, color: "#ffffff", fontWeight: "bold" }}>Edit Task</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            {/* <Text>Edit Task</Text> */}
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View>
                            <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 20, alignItems: "center" }}>
                                {isPriority && <Icon name={parseToIcon(typeIcon.toUpperCase())} color={color.Primary} style={{ marginRight: 10 }} size={32} />}
                                <Text style={{ color: color.Primary, fontSize: 32, fontWeight: "bold" }}>{' '}{title}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.indextext}>Start</Text>
                                    <InputDate date={startDateStr} onPress={() => { setOpenStart(true) }} />
                                </View>
                                <View style={{ flex: 0.1 }}>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.indextext}>Ends</Text>
                                    <InputDate date={endDateStr} onPress={() => { setOpenEnds(true) }} />
                                </View>
                            </View>
                            <View style={{ marginVertical: 20 }}>
                                <Text style={styles.indextext}>
                                    Title
                                </Text>
                                <TextInput placeholder='DESIGN' style={styles.input} defaultValue={title} onChangeText={(text) => setTitle(text)} />
                            </View>
                            <Text style={styles.indextext}>
                                Category
                            </Text>
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <Pressable style={styles.buttonEnable} >
                                    {isPriority ?
                                        <Text style={{ color: "#ffffff" }}>Priority Task</Text> :
                                        <Text style={{ color: "#ffffff" }}>Daily Task</Text>
                                    }
                                </Pressable>
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.indextext}>
                                    Description
                                </Text>
                                <TextInput placeholder='Description' style={styles.input2} defaultValue={description} onChangeText={(text) => { setDescription(text) }} multiline={true} numberOfLines={4} />
                            </View>
                            {isPriority &&
                                <View>
                                    <View style={{ marginVertical: 10, zIndex: 2 }}>
                                        <Text style={styles.indextext}>
                                            Level of task
                                        </Text>
                                        <DropDownPicker
                                            open={open}
                                            value={level}
                                            items={items}
                                            setOpen={setOpen}
                                            setValue={setLevel}
                                            setItems={setItems}
                                        />
                                    </View>
                                    <View style={{ marginVertical: 10, zIndex: 1 }}>
                                        <Text style={styles.indextext}>
                                            Type of task
                                        </Text>
                                        <DropDownPicker
                                            open={open2}
                                            value={typeIcon}
                                            items={items2}
                                            setOpen={setOpen2}
                                            setValue={setTypeIcon}
                                            setItems={setItems2}
                                        />
                                    </View>
                                    <View style={{ marginVertical: 10 }}>
                                        <Text style={styles.indextext}>
                                            List To Do
                                        </Text>
                                        <View style={{ flex: 1 }}>
                                            {
                                                listItem.map((item) => (
                                                    <TextInput key={item._id} value={item.titleItem} style={{ borderWidth: 0.2, marginTop: 5, borderRadius: 5, paddingHorizontal: 15 }} onChangeText={text => handlePress(text, item._id)} />
                                                ))
                                            }
                                        </View>
                                    </View>
                                </View>
                            }
                            <View style={{ marginVertical: 20, justifyContent: "center", alignItems: "center" }}>
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
                                    value={startDate}
                                    mode="date"
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                    headerShown={false}
                                    accentColor={color.Primary}
                                />)

                            }
                            {
                                openEnds && <DateTimePicker
                                    testID="dateTimePicker"
                                    timeZoneOffsetInMinutes={0}
                                    value={endDate}
                                    mode="date"
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                    buttonTextColorIOS={color.Primary}
                                    accentColor={color.Primary}
                                />

                            }
                        </View>
                        <DialogBack
                            visible={isOkBack}
                            onPressBack={() => nav.navigate("My Day")}
                            title=""
                            message={message} />
                        <DialogCustom
                            visible={isOK}
                            onPressHandle={() => setOK(false)}
                            title=""
                            message={message}
                        />
                    </View>
                </View>
            }
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
        marginVertical: 50
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
        borderWidth: 0.1
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
        paddingHorizontal: 5
    },
})

export default EditTask;