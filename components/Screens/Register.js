import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from '@react-navigation/native'
import { View, Text, Button, TextInput, Pressable, StyleSheet, Settings, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import axiosIntance, { updateToken } from "../../apis/axios";
import { AuthContext } from "../../context/auth";
import { response } from "express";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAvoidingView } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import color from './../StyleSheet/color';
import Logo from '../ComponentChild/logo';
import { Dialog } from 'react-native-simple-dialogs';
const Register = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordcfm, setPasswordcfm] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState(false);
    const [login, setLogin] = useState(false);
    const userCtx = useContext(AuthContext);
    const nav = useNavigation();
    let userNameLogin  = null;
    let tokenLogin = null;
    const gotoLogin = () => {
        nav.navigate("Login");
    }
    const validateUsername = (Inusername) => {
        const reg = /^[a-zA-Z0-9_-]{3,15}$/;
        return reg.test(Inusername)
    };
    const validateEmail = (Inemail) => {
        const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        return reg.test(Inemail);
    };
    const validatePassword = (Inpassword) => {
        const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        return reg.test(Inpassword);
    };
    const validatePasswordcfm = (Inpasswword, Inpasswordcfm) => {
        if (Inpasswword !== Inpasswordcfm) {
            return false;
        }
        return true;
    };
    const validating = async () => {
        let err = true;
        if (await !validateUsername(username)) {
            setMessage('User name is invalid, input again!');
            err = false;
        }
        if (err && await !validateEmail(email)) {
            setMessage('Email is invalid, input again!');
            err = false;
        }
        if (err && await !validatePassword(password)) {
            setMessage('Password is invalid, input again!');
            err = false;
        }
        if (err && await !validatePasswordcfm(password, passwordcfm)) {
            setMessage('Confirm password is not match, input again! ');
            err = false;
        }
        if (err) {
            setMessage('')
        }
        return err;
    }
    const handleLogin = async() =>{
        setLogin(false);
        await userCtx.setUser('user', AsyncStorage.getItem('user'));
    }
    const handbleSubmit = async () => {
        setIsLoading(true);
        if (submit) {
            const hasError = await validating();
            if (hasError === false) {
                setError(true);
                setIsLoading(false);
            } else{
                const res = await axiosIntance.post('user/sign-up', {
                    username: username,
                    password: password,
                    email: email,
                    role: 'user'
                }).then(async(res)=>{
                    const resLogin = await axiosIntance.post('user/login', {
                        email: email,
                        password: password
                    }).then(async(res)=>{
                        await updateToken(res.data);
                        // console.log('resLogin.token: ' + resLogin.token);
                        await AsyncStorage.setItem('token', res.data.token);
                        await AsyncStorage.setItem('user', res.data.user);
                        //await userCtx.setUser('user', res.data.user);
                        //console.log(res.data);
                        await setLogin(true);
                        await setIsLoading(false);
                        }
                    )
                }).catch(error => {
                    // setMessage(error.message);
                    if (error.response.status === 409) {
                        setMessage(' Email is already in use');
                    }else {
                        setMessage( ' ' + error.message);
                    }
                    setError(true); 
                    setIsLoading(false)});
            }
        } else {
            setIsLoading(false);
        }
    };
    const HandlerEndEditting = () => {
        if (!username || !password || !passwordcfm || !email) {
            setSubmit(false)
        } else {
            setSubmit(true)
        }
    }
    return (
        <KeyboardAwareScrollView style={styles.container} behavior="height" >
            <TouchableOpacity style = {styles.buttonBack} onPress={()=>gotoLogin()}>
                <Icon name="arrow-left" color="#ffffff" size={20} />
            </TouchableOpacity>
            <View style={styles.loginCont}>
                <View style={styles.logo}>
                    {/* <MaterialCommunityIcons name="spotify" size={70} color={"#2ebd59"} /> */}
                    <Text style={styles.logoText}>TODO</Text>
                    <Text style={styles.logoText2}>Management App</Text>
                </View>
                <Text style={styles.logoText3}> Create your account </Text>
                <View style={styles.block}>
                      <View style={styles.icon}>
                        {/* <FontAwesome name="envelope-o" size={24} color="black" /> */}
                        <Icon name="user" color="#eee" size={20} />
                      </View>
                    <TextInput
                        placeholder="User Name"
                        placeholderTextColor="#b1b2b7"
                        value={username}
                        style={styles.input}
                        onChangeText={
                            newText => {
                                setUername(newText);
                            }
                        }
                        onEndEditing={
                            HandlerEndEditting
                        }
                        maxLength={20}
                    />

                </View>
                <View style={styles.block}>
                    <View style={styles.icon}>
                        {/* <FontAwesome name="envelope-o" size={24} color="black" /> */}
                        <Icon name="envelope" color="#eee" size={20} />
                    </View>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#b1b2b7"
                        value={email}
                        style={styles.input}
                        onChangeText={
                            newText => {
                                setEmail(newText);
                            }
                        }
                        onEndEditing={
                            HandlerEndEditting
                        }
                        maxLength={50}
                    />

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
                            }
                        }
                        onEndEditing={
                            HandlerEndEditting
                        }
                        maxLength={20}
                    />
                </View>
                <View style={styles.block}>
                    <View style={styles.icon}>
                        <Icon name="lock" color="#eee" size={20} />
                    </View>
                    <TextInput
                        placeholder="Confirm the password"
                        placeholderTextColor="#b1b2b7"
                        value={passwordcfm}
                        style={styles.input}
                        password={true}
                        secureTextEntry={true}
                        onChangeText={
                            newText => {
                                setPasswordcfm(newText);
                            }
                        }
                        onEndEditing={
                            HandlerEndEditting
                        }
                        maxLength={20}
                    />
                </View>
                <Pressable onPress={handbleSubmit} style={submit ? (styles.buttonEnable) : (styles.buttonDisable)}  >
                    {isLoading ?
                        <ActivityIndicator size="large" color="#90EE90" /> :
                        <Text style={submit ? (styles.textEnable) : (styles.textDisable)} >Register</Text>

                    }
                </Pressable>
                <Text style = {{marginVertical: 15}} >
                    - Or Register With -
                </Text>
                <View style={styles.logos}>
                    <Logo URL={require('./img/image1.png')} />
                    <Logo URL={require('./img/image2.png')} />
                    <Logo URL={require('./img/image3.png')} />
                </View>
                <Dialog
                visible={error}
                title="Error log"
                onTouchOutside={()=>setError(false)} >
                    <View style={{flexDirection:'row'}}>
                        <Icon name="minus-circle" color="red" size={20} />
                        <Text >
                            {message}
                        </Text>
                        {/* <Button title="OK" style ={{marginRight: 0, width: "10%"}} onPress={()=>setError(false)} /> */}
                    </View>
                </Dialog>
                <Dialog
                visible={login}
                title=""
                onTouchOutside={()=>handleLogin()} 
                >
                    <View style={{flexDirection: 'row', marginBottom: 20}}>
                        <Text > Sign up is success ! </Text>
                        <Icon name="check-circle" color="green" size={20} />
                    </View>
                    <Button onPress={()=>handleLogin()} title ="OK" containerStyle={{marginVertical: 30}} />
                </Dialog>
            </View>
        </KeyboardAwareScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    logo: {
        //flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30
    },
    logoText3: {
      fontSize: 16,
      color: "#474747",
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
    loginCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
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
        marginBottom: 40,
    },
    block: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
      marginHorizontal: 15
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
    buttonEnable: {
        width: 335,
        height: 50,
        borderRadius: 10,
        backgroundColor: color.Primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        color: '#ffffff'
    },
    buttonDisable: {
        width: 335,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#a9a9a9',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
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
        fontWeight: 'bold',
        fontSize: 15,
        color: '#969799',
    },
    btnSignIn: {
        width: 80,
        height: 40,
        // borderColor: '#2ebd59',
        // borderBottomWidth: 3,
        backgroundColor: '#2e2f33',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginTop: 50
    },
    btnSignUp: {
        width: 80,
        height: 40,
        borderColor: '#2ebd59',
        borderBottomWidth: 3,
        backgroundColor: '#2e2f33',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginLeft: 25,
        marginTop: 50
    },
    btnForgot: {
        marginTop: 55,
    },
    logos: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    buttonBack: {
      marginLeft: 10,
      marginTop: 10,
      height: 40,
      width: 50,
      borderRadius: 15,
      backgroundColor: color.Primary,
      color: "#ffffff",
      alignItems: 'center',
      justifyContent: 'center'
    },
})
export default Register;