import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button } from "react-native";
import { FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../StyleSheet/color';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import InputDate from '../ComponentChild/InputDate';
import DatePicker from 'react-native-date-picker'
const todoItem = ({item})=>{
    return(
        <TextInput  value={item.title} />
    );
}



const EditTask = ({navigation}) => {
    const data1 = [
        {
          title: 'Work Out',
          status: true,
          key: 1,
        },
        {
          title: 'Daily Metting',
          status: true,
          key: 2,
        },
        {
          title: 'Reading book',
          status: false,
          key: 3,
        },
        {
          title: 'Daily Metting',
          status: false,
          key: 4,
        },
        {
          title: 'Task 5',
          status: false,
          key: 5
        },
        {
          title: 'Daily Metting',
          status: false,
          key: 6,
        },
        {
          title: 'Task 5',
          status: false,
          key: 7
        },
      ] 
    const [startDate, setStartDate]= useState(new Date());
    const [endDate, setEndDate]= useState(new Date());
    const [open, setOpen] = useState(false)
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
        // IntLoad();
        // getTask();
        // setDataTask(data);
    }, [])

  return (
    <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.absolute}>
        </View>
        <View style={styles.header}>
            <View style={{flex:1}}>
                <TouchableOpacity style = {styles.buttonBack}>
                    <Icon name="arrow-left" color={color.Primary} size={20} />
                </TouchableOpacity>
            </View>
            <View style={{flex:1, alignItems:"center",justifyContent:"center"}}>
                <Text style={{fontSize:16, color:"#ffffff",fontWeight:"bold"}}>Edit Task</Text>
            </View>
            <View style={{flex:1}}>
                {/* <Text>Edit Task</Text> */}
            </View>
        </View>
        <View style={styles.body}>
           <View style={{flexDirection:"row", justifyContent:"center",marginVertical: 20}}>
                <Icon name="code" color={color.Primary} size={32} />
                <Text style={{color:color.Primary, fontSize:32, fontWeight:"bold"}}>{' '}UI DESIGN</Text>
           </View>
           <View style={{flexDirection:"row"}}>
                <View style={{flex:1}}>
                    <Text style={styles.indextext}>Start</Text>
                    <Button title="Open" onPress={() => setOpen(true)} />
                    <DatePicker
                        modal
                        open={open}
                        date={startDate}
                        onConfirm={(date) => {
                            setOpen(false)
                            setStartDate(date)
                        }}
                        onCancel={() => {
                        setOpen(false)
                        }}
                    />
                </View>
                <View style={{flex:1}}>
                    <Text style={styles.indextext}>End</Text>
                    <Text>day</Text>
                    <InputDate />
                </View> 
           </View>
           <View style={{marginVertical: 20}}>
                <Text style={styles.indextext}>
                    Title
                </Text>
                <TextInput placeholder='UI DESIGN' style={styles.input} />
           </View>
           <View style={{marginVertical: 10}}>
                <Text style={styles.indextext}>
                    Category
                </Text>
                <TouchableOpacity style={styles.buttonEnable}>
                    <Text style={{color:"#ffffff"}}>Priority Task</Text>
                </TouchableOpacity>
           </View>
           <View style={{marginVertical: 10}}>
                <Text style={styles.indextext}>
                    Description
                </Text>
                <TextInput placeholder='Description' style={styles.input2}     multiline={true} numberOfLines={4} />
           </View>
           <View style={{marginVertical: 10, flex:1}}>
                <Text style={styles.indextext}>
                    List To Do
                </Text>
                {/* <TextInput placeholder='Description' style={styles.input2}     multiline={true} numberOfLines={4} /> */}
                {/* <FlatList
                    style={styles.cardList}
                    pagingEnabled={false}
                    data={data1}
                    renderItem={todoItem}
                    keyExtractor={(item) => item._id}
                /> */}
                <View style={{flex: 1}}>
                {
                    data1.map((item)=>(
                        <TextInput value={item.title} style={{borderWidth: 0.2, marginTop: 5, borderRadius: 5}} />  
                    ))
                }
                </View>
           </View>
        </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    header:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        zIndex: 1,
        flexDirection: "row",
        marginVertical: 50
    },  
    body:{
        flex: 4.5,
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
        backgroundColor: color.Primary
    },
    indextext: {
        fontSize:14,
        color: color.Primary
    },
    input:{
        borderRadius: 1,
        borderColor: color.Primary,
        borderWidth: 0.1,
        marginTop: 10 
    },
    buttonEnable: {
        width: 335,
        height: 50,
        borderRadius: 10,
        backgroundColor: color.Primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        color: '#ffffff'
    },
    input2:{
        borderRadius: 1,
        borderColor: color.Primary,
        borderWidth: 0.1,
        marginTop: 10,
        textAlignVertical: 'top'
    },
})

export default EditTask;