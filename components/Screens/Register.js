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
    const userCtx = useContext(AuthContext);
    const nav = useNavigation();
    const gotoLogin = () => {
        nav.navigate("Login");
    }
    const validateUsername = (Inusername) => {
        const reg = /^[a-z0-9_-]{3,15}$/;
        return reg.test(Inusername)
    };
    const validateEmail = (Inemail) => {
        const reg = /\S+@\S+\.\S+/
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
            setMessage('USER NAME IS INVALID, INPUT AGAIN');
            err = false;
        }
        if (err && await !validateEmail(email)) {
            setMessage('EMAIL ADDRESS IS INVALID, INPUT AGAIN');
            err = false;
        }
        if (err && await !validatePassword(password)) {
            setMessage('PASSWORD IS INVALID, INPUT AGAIN');
            err = false;
        }
        if (err && await !validatePasswordcfm(password, passwordcfm)) {
            setMessage('PASSWORD CONFIRM NOT MATCH');
            err = false;
        }
        if (err) {
            setMessage('')
        }
        return err;
    }

    const handbleSubmit = async () => {
        setIsLoading(true);
        if (submit) {
            const hasError = await validating();
            if (hasError === false) {
                setError(true);
                setIsLoading(false);
            } else{
                const res = await axiosIntance.post('auth/signup', {
                    username: username,
                    password: password,
                    email: email,
                }).catch(error => {
                    setMessage(error.message);
                    setError(true); 
                    setIsLoading(false)});
                const resLogin = await axiosIntance.post('auth/signin', {
                    username: username,
                    password: password
                }).catch(error => {
                    setMessage(error.message);
                    setError(true); 
                    setIsLoading(false)});
                await updateToken(resLogin.token);
                console.log('resLogin.token: ' + resLogin.token);
                await AsyncStorage.setItem('token', resLogin.token);
                await userCtx.setUser(resLogin.data.user.username);
            }
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
                        maxLength={20}
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
                    <View>
                        <Text >
                            {message}
                        </Text>
                        {/* <Button title="OK" style ={{marginRight: 0, width: "10%"}} onPress={()=>setError(false)} /> */}
                    </View>
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