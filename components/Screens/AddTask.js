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
import { Pressable } from 'react-native';
import { Dialog } from 'react-native-paper';
import DialogInput from '../ComponentChild/DialogInput';
import DiaglogEdit from '../ComponentChild/DialogEdit';
import DropDownPicker from 'react-native-dropdown-picker';
import { Levels } from '../ComponentChild/CommonFunction';
import { types } from '../ComponentChild/CommonFunction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseToIcon } from '../ComponentChild/CommonFunction';
import DialogBack from '../ComponentChild/DialogBack';

const todoItem = ({ item }) => {
    return (
        <TextInput value={item.title} />
    );
}
const AddTask = ({ navigation }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startDateStr, setStartDateStr] = useState(new Date().toDateString());
    const [endDateStr, setEndDateStr] = useState(new Date().toDateString());
    const [openStart, setOpenStart] = useState(false);
    const [openEnds, setOpenEnds] = useState(false);
    const [title, setTitle] = useState("Title");
    const [description, setDescription] = useState("Description");
    const [isOK, setOK] = useState(false);
    const [isOkBack, setOkBack] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGetting, setGetting] = useState(true);
    const [isPriority, setPriority] = useState(true);
    const [isShowDialog, setShowDialog] = useState(false);
    const [isShowDialogEdit, setShowDialogEdit] = useState(false);
    const [message, setMessage] = useState();
    const [titleItem, setTitleItem] = useState();
    const [listItem, setListItem] = useState([]);
    const [idUpdate, setIdUpdate] = useState();
    const route = useRoute();
    const nav = useNavigation();
    const [userId, setIdUser] = useState();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [level, setLevel] = useState('normal');
    const [typeIcon, setTypeIcon] = useState('coding');

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
        { label: 'Other', value: 'other' },
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

    const Validateting = async () => {
        let result = true;
        let cnt = 0;
        if (!title) {
            result = false;
             setMessage('Please input the title');
        }
        if (!description) {
             setMessage('Please input the description');
            result = false;
        }
        if (endDate.getTime() < startDate.getTime()) {
             setMessage('The end date must be greater than the start date');
            result = false;
        }
        if (isPriority == true) {
            console.log("lengthitem: " + listItem.length);
            if (listItem.length === 0) {
                setMessage('Please input the todo list');
                result = false;
            }
            console.log(message);
        }
        return result;

    }

    const init = async () => {
        setStartDate(new Date());
        setEndDate(new Date());
        setStartDateStr(new Date().toDateString());
        setEndDateStr(new Date().toDateString());
        setIdUser(await AsyncStorage.getItem("userid"));
    }
    const handleEdit = () => {
        if (titleItem) {
            var items = [...listItem];
            var item = items.find((item) => { if (item.id === idUpdate) return true });
            item.titleItem = titleItem;
            var index = items.findIndex(item => { item.id === idUpdate });
            items[index] = item;
            setListItem(items);
            setShowDialogEdit(false);
        }
    }
    const handleDelete = () => {
        var items = [...listItem]
        items = items.filter(item => item.id !== idUpdate);
        setTitleItem("");
        setListItem(items);
        setShowDialogEdit(false);AsyncStorage
    }

    const CreateTaskHandle = async () => {
        setIsLoading(true);
        console.log("create task handle");
        if ( await Validateting() === true) {
            var body = {};
            body.complete = 'no';
            body.description = description;
            body.startdate = new Date(startDate.setHours(0, 0, 0, 0));
            body.enddate = new Date(endDate.setHours(23, 59, 59, 999));
            body.title = title;
            body.userId = userId;
            if (!isPriority) {
                body.type = "daily";
                body.list_item = [{}];
                body.level = " ";
                body.icontype = " ";
            } else {
                body.type = "priority"
                body.listItems   = listItem;
                body.icontype = typeIcon;
                body.level = level;
            }
            console.log(body);
            const res = await axiosIntance.post("/todo", body).then((res)=>{
                setMessage("Create task sucessfully")
                setOkBack(true);
            }
            ).catch( err=>
                {
                    setMessage("Has a error when create task, try again.")
                    console.log(err);
                }
            ).finally(()=>{
                setOK(true);
                setIsLoading(false);
            });
        } else{
            setOK(true);
            setIsLoading(false);
        }
    }
    const handlleOnCancle = () => {
        setTitleItem("");
        setShowDialog(false);
    }
    const handleOK = async () => {
        if (titleItem) {
            var arr = [...listItem];
            var item = { id: 0, titleItem: "" };
            var maxid = 0;
            if (!arr) {
                arr = [{}];
            }
            if (arr.length === 0) {
                item.id = 1;
                item.titleItem = titleItem;
                item.isComplete ="no";
                arr[0] = item;
            } else {
                maxid = Math.max(...arr.map(item => item.id)) + 1;
                item.id = maxid;
                item.titleItem = titleItem;
                item.isComplete ="no";
                arr.push(item);
            }
            setListItem(arr);
            setShowDialog(false);
            setTitleItem("");
        }
    }

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
        // IntLoad();
        // setGetting(true);
        init();
        // getTask();
        setGetting(false);
        // setDataTask(data);
    }, [])

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <View style={styles.absolute}>
            </View>
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Pressable style={styles.buttonBack} onPress={() => { nav.navigate("My Day") }}>
                        <Icon name="arrow-left" color={color.Primary} size={20} />
                    </Pressable>
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 16, color: "#ffffff", fontWeight: "bold" }}>Add Task</Text>
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
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 20, alignItems: "center" }}>
                            {isPriority && <Icon name={parseToIcon(typeIcon.toUpperCase())} color={color.Primary} style={{ marginRight: 10 }} size={32} />}
                            <Text style={styles.title}>{title}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.indextext}>Start</Text>
                                <InputDate date={startDateStr} onPress={() => { setOpenStart(true) }} />
                            </View>
                            <View style={{flex: 0.1}}>

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
                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.indextext}>
                                Category
                            </Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Pressable style={isPriority ? styles.buttonEnable : styles.buttonDisable} onPress={() => setPriority(true)} >
                                    <Text style={isPriority ? { color: "#ffffff" } : { color: color.Primary }}>Priority Task</Text>
                                </Pressable>
                                <Pressable style={!isPriority ? styles.buttonEnable : styles.buttonDisable} onPress={() => setPriority(false)}  >
                                    <Text style={!isPriority ? { color: "#ffffff" } : { color: color.Primary }}>Daily Task</Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.indextext}>
                                Description
                            </Text>
                            <TextInput placeholder='Description' style={styles.input2} defaultValue={description} onChangeText={(text) => { setDescription(text) }} multiline={true} numberOfLines={4} />
                        </View>
                        {isPriority &&
                            <View style={{ marginVertical: 10 }}>
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
                                <Text style={styles.indextext}>
                                    To do list
                                </Text>
                                <View style={{ flex: 1 }}>
                                    {
                                        listItem.map((item) => (
                                            <Pressable onPress={() => { setShowDialogEdit(true); setTitleItem(item.titleItem); setIdUpdate(item.id) }}>
                                                <View pointerEvents="none" >
                                                    <TextInput contextMenuHidden={true} id={item.id} key={item.id} value={item.titleItem} style={styles.itemstodo} />
                                                </View>
                                            </Pressable>
                                        ))
                                    }
                                </View>
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <TouchableOpacity style={styles.buttonEnable2} onPress={() => setShowDialog(true)}>
                                        <Text style={{ color: color.Primary }}> + Add to do </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
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
                }
                <DialogCustom
                    visible={isOK}
                    onPressHandle={() => setOK(false)}
                    title=""
                    message={message}
                />
                <DialogInput
                    visible={isShowDialog}
                    onCancle={() => handlleOnCancle()}
                    onOK={() => handleOK()}
                    setValue={(text) => { setTitleItem(text) }}
                />
                <DiaglogEdit
                    visible={isShowDialogEdit}
                    onCancle={() => setShowDialogEdit(false)}
                    onEdit={() => handleEdit()}
                    onDelete={() => handleDelete()}
                    setValue={(text) => { setTitleItem(text) }}
                    value={titleItem}
                />

                <DialogBack                     
                    visible={isOkBack}
                    onPressBack={() => nav.navigate("My Day")}
                    title=""
                    message={message} />

                <View style={{ marginBottom: 100, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity style={styles.buttonEnable1} onPress={() => CreateTaskHandle()} >
                        {isLoading ?
                            <ActivityIndicator size="large" color="#90EE90" /> :
                            <Text style={{ color: "#ffffff" }}> Create Task </Text>
                        }
                    </TouchableOpacity>
                </View>
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
        marginVertical: 50,
        width: "100%"
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
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.Primary,
        marginTop: 5
    },
    buttonEnable1: {
        width: "100%",
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.Primary,
        marginTop: 5
    },
    buttonEnable2: {
        width: "100%",
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#ffffff",
        borderColor: color.Primary,
        marginTop: 5,
        borderWidth: 2,
        borderStyle: 'dashed'
    },
    buttonDisable: {
        width: 150,
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        backgroundColor: "#ffffff",
        borderColor: color.Primary,
        borderWidth: 0.2
    },
    input2: {
        borderRadius: 1,
        borderColor: color.Primary,
        borderWidth: 0.1,
        textAlignVertical: 'top',
        paddingHorizontal: 5
    },
    itemstodo: {
        borderWidth: 0.2,
        marginTop: 5,
        borderRadius: 5,
        paddingHorizontal: 15,
        borderColor: color.Primary
    },
    title: {
        color: color.Primary,
        fontSize: 32,
        fontWeight: "bold"
    },
})

export default AddTask;