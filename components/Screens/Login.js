import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from '@react-navigation/native'
import { View, Text, Button, TextInput, Pressable, StyleSheet, Settings,TouchableOpacity, ActivityIndicator } from "react-native";
import axiosIntance, { updateToken } from "../../apis/axios";
import { AuthContext } from "../../context/auth";
import { response } from "express";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons'; 
import Logo from '../ComponentChild/logo';
import color from './../StyleSheet/color';
import { Dialog } from 'react-native-simple-dialogs';
import DialogCustom from "../ComponentChild/Dialog";
const LoginScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])
    const [username, setUername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const userCtx = useContext(AuthContext)
    const nav = useNavigation();
    const gotoRegister = () => {
        nav.navigate("Register");

    }
    const handbleSubmit = async (event) => {
        event.preventDefault()
        if (submit) {
            setIsLoading(true);
            const res = await axiosIntance.post('user/login', {
                email: username,
                password: password
            }).then(async(res)=>{
                console.log(res.data.user);
                await updateToken(res.data.token);
                await AsyncStorage.setItem('token', res.data.token)
                await AsyncStorage.setItem('username', res.data.username)
                await AsyncStorage.setItem('userid', res.data.userId)
                await userCtx.setUser(res.data.username);
                await console.log('login with user: ' + res.data.username)
            }).
            catch(error => {
            // console.log(JSON.stringify(error));
            if (error.response.status === 409) {
                setMessage('Email or password is invalid');
            }else {
                setMessage(error.message);
            }
            //setMessage(' Email or password is invalid!');
            // console.log('error status: ');
            // console.log(error.response.status);
            setError(true); 
            setIsLoading(false)})
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <View style={styles.loginCont}>
                <View style={styles.logo}>
                    {/* <MaterialCommunityIcons name="spotify" size={70} color={"#2ebd59"} /> */}
                    <Text style={styles.logoText}>TODO</Text>
                    <Text style={styles.logoText2}>Management App</Text>
                </View>
                <Text style={styles.logoText3}>Login to your account</Text>
                <View style={styles.block}>
                    <View style={styles.icon}>
                        {/* <FontAwesome name="envelope-o" size={24} color="black" /> */}
                        <Icon name="envelope" color="#eee" size={20} />
                    </View>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#b1b2b7"
                        value={username}
                        style={styles.input}
                        onChangeText={
                            newText => {
                                setUername(newText);
                                if (newText && password) { setSubmit(true) } else { setSubmit(false) };
                            }
                        } />

                </View>
                <View style={styles.block}>
                    <View style={styles.icon}>
                        <Icon name="lock" color="#eee" size={20} />
                    </View>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#b1b2b7"
                        value={password}
                        style={styles.input}
                        password={true}
                        secureTextEntry={true}
                        onChangeText={
                            newText => {
                                setPassword(newText);
                                if (newText && username) { setSubmit(true) } else { setSubmit(false) };
                            }
                        }
                    />
                </View>
            </View>
            <Pressable style={styles.btnForgot}>
                    <Text style={styles.textForgot}>Forgot Password?</Text>
            </Pressable>
            <View style={styles.submitArea}>
                <Text style={{ color: 'white', marginBottom: 5, fontSize: 10 }}>
                        {message}
                </Text>
                <Pressable onPress={handbleSubmit} style={submit ? (styles.buttonEnable) : (styles.buttonDisable)}  >

                        {/* <Text style={submit ? (styles.textEnable) : (styles.textDisable)} >Login</Text> */}
                        {isLoading ?
                                <ActivityIndicator size="large" color="#90EE90" /> :
                                <Text style={submit ? (styles.textEnable) : (styles.textDisable)} >Login</Text>

                        }
                </Pressable>
                <Text style = {{marginVertical: 15}} >
                    - Or Login With -
                </Text>
                <View style={styles.logos}>
                    <Logo URL={require('./img/image1.png')} />
                    <Logo URL={require('./img/image2.png')} />
                    <Logo URL={require('./img/image3.png')} />
                </View>
                <View style = {{flexDirection:"row", marginTop: 30}}>
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity onPress={gotoRegister} >
                        <Text style={{color : "#006EE9"}} > Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <DialogCustom
            visible={error}
            message={message}
            onPressHandle={()=>setError(false)}
            />
        </KeyboardAwareScrollView>


    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    logo: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 75
    },
    logoText: {
        fontSize: 30,
        color: color.Secondary,
        fontWeight: "bold"
    },
    logoText2: {
        fontSize: 16,
        color: "#9A9A9A",
        marginLeft: 10,
    },
    submitArea: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText3: {
        fontSize: 16,
        color: "#474747",
    },
    loginCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    icon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: "100%",
        marginLeft: 5,
        backgroundColor: color.Primary,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },
    input: {
        width: 280,
        height: 50,
        backgroundColor: '#ffffff',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        color: 'black',
        fontSize: 16,
        borderColor: '#006EE9',
        borderWidth: 0.2,
        paddingHorizontal: 20,
    },
    blockHead: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 70,
    },
    block: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginHorizontal: 15
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
    buttonDisable: {
        width: 335,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#a9a9a9',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        color: '#ffffff'
    },
    textEnable: {
        fontWeight: 'bold',
        fontSize: 15,
        color: "white",
    },
    textDisable: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'gray'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white'
    },
    textForgot: {
        fontSize: 15,
        color: '#87ADF4',
        textAlign:'right',
        marginTop: 5,
        paddingRight: 10,
        fontFamily: 'Poppins'
    },
    btnSignIn: {
        width: 80,
        height: 40,
        borderColor: '#2ebd59',
        borderBottomWidth: 3,
        backgroundColor: '#2e2f33',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginTop: 50
    },
    btnSignUp: {
        width: 80,
        height: 40,
        // borderColor: '#2ebd59',
        // borderBottomWidth: 3,
        backgroundColor: '#2e2f33',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginLeft: 25,
        marginTop: 50
    },
    btnForgot: {
        marginTop: 0,
        textAlign: "right",
        justifyContent:"flex-end",
        marginRight: 15
    },
    logos: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})
export default LoginScreen;