import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React, {useEffect} from 'react';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native'


const TaskCard = ({key, days, progress, title, id, bgc, icon}) => {
// let progressNum = 100;
// progressNum = progress;
// useEffect(() => {
//     // progressNum = progress;
// }, [])
const nav = useNavigation();
const prg = progress/100;
  return (
    <TouchableOpacity onPress={()=>{ nav.navigate("PriorityTask");}}>
        <View style={[styles.container,{backgroundColor: bgc}]}>
            <View style={styles.header}>
                <View style = {styles.time}>
                    <Text style={{fontSize: 10}}>{days} days</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Icon name= {icon} color='#ffffff' size={20} />
                <Text style ={{fontSize: 16, color: '#ffffff'}}>{'  '}{title}</Text>
            </View>
            <View style={styles.footer}>
                <Text style={{fontSize: 10, color: '#ffffff'}}> Progress </Text>
                <ProgressBar progress={prg} color={'#ffffff'} />
                <View style={{alignItems:'flex-end'}}>
                    <Text style={{ fontSize: 10, color: '#ffffff'}}> {progress}%</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 188,
        width: 129,
        borderRadius: 20,
        marginRight: 5
    },
    header: {
        flex: 2,
        alignItems: 'flex-end',
        marginTop: 5,
        marginRight: 5
    },
    content: {
        flex: 3,
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'row'
    },
    footer: {
        flex: 2,
        marginHorizontal:  10
    },
    time: {
        height: 20,
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 15
    }
})

export default TaskCard;