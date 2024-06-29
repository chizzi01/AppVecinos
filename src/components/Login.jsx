import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, ImageBackground, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import theme from "../theme";
import { Ionicons } from '@expo/vector-icons';
import imagen from '../img/login.png';
import inspector from '../img/inspector.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from 'react-router-native';
import esVecino from "../controllers/esVecino";
import login from "../controllers/login";
import habilitado from "../controllers/habilitado";
import solicitarClave from "../controllers/solicitarClave";
import checkPass from "../controllers/checkPass";
import generarClave from "../controllers/generarClave";
import recuperarPass from "../controllers/recuperarPass";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import loginInspector from "../controllers/loginInspector";
import recuperarPassInspector from "../controllers/recuperarPassInspector";




const Login = ({ onLogin }) => {
    const navigate = useNavigate();

    const styles = StyleSheet.create({
        backgroundImage: {
            zIndex: -1,
            resizeMode: 'cover',
            height: '100%',
            width: '100%',
        },
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 20,
        },
        selection: {
            flexDirection: "row",
            justifyContent: "space-around",
            width: '100%',
            backgroundColor: '#D9D9D9',
            padding: 10,
            borderRadius: 20,
        },
        title: {
            fontSize: theme.sizes.h1,
            marginBottom: 20,
            textAlign: 'center',
            marginTop: 20,
        },
        input: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 10,
            width: '100%',
            marginBottom: 0,
            marginTop: 20,
            padding: 10,
            borderRadius: 10,
            backgroundColor: 'white',
        },
        box: {
            width: '100%',
            margin: 30,
        },
        formatDiv: {
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            margin: 20,
        },
        userSelection: {
            backgroundColor: '#D9D9D9',
            width: '100vw',
        },
        olvide: {
            textAlign: 'center',
            width: '100%',
            marginBottom: 20,
        },
        buttonText: {
            color: '#000',
            fontSize: 16,
        },
        button: {
            backgroundColor: '#A8A8A8',
            padding: 10,
            alignItems: 'center',
            borderRadius: 20,
            width: '50%',
            marginTop: 20,
        },
        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 25,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
        },
        button: (isSelected) => ({
            backgroundColor: isSelected ? '#A8A8A8' : '#D9D9D9', // Cambia el color de fondo dependiendo de si el botón está seleccionado
            padding: 10,
            alignItems: 'center',
            borderRadius: 20,
            width: '50%',
        }),
        tituloAviso: {
            fontSize: 20,
            marginBottom: 20,
            fontWeight: 'bold',
        },
        descripAviso: {
            textAlign: 'center',
            marginBottom: 20,
            fontWeight: 'bold',
            color: '#535353',
        },
        mindescAviso: {
            color: '#535353',
            marginBottom: 20,
            textAlign: 'center',
            fontSize: 12,
        },
        modalBackground: {
            flex: 1,
            backgroundColor: '#0A36D3',
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonAviso: {
            backgroundColor: '#A8A8A8',
            padding: 10,
            alignItems: 'center',
            borderRadius: 12,
            marginTop: 20,
            borderColor: '#0A36D3',
            borderWidth: 1,
        },
        closeButton: {
            alignSelf: 'flex-start',
            marginBottom: 10,
        },
        closeButtonText: {
            fontSize: 20,
        },
        inputEmail: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 10,
            width: '100%',
            marginBottom: 20,
            padding: 10,
            borderRadius: 10,
        },
        centeredViewBlue: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'blue',
            height: '100%',
        },
        modalViewLarge: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width: '80%', // Ajusta esto según tus necesidades
            height: '40%', // Ajusta esto según tus necesidades
        },
        buttonLogin: {
            backgroundColor: '#4bdaa3',
            padding: 10,
            alignItems: 'center',
            borderRadius: 20,
            width: '50%',
            color: 'white',
        },
        wrongPass: {
            color: 'red',
            textAlign: 'center',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 5,
            margin: 5,
        },
        confirmPasswordContainer: {
            width: '100%',
            margin: 30,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        inputContra: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 10,
            width: '100%',
            marginBottom: 20,
            padding: 10,
            borderRadius: 10,
            minWidth: 200,
        },

    });

    const [userType, setUserType] = useState('vecino');
    const [modalVisible, setModalVisible] = useState(false);
    const [emailModalVisible, setEmailModalVisible] = useState(false);
    const [dni, setDni] = useState('');
    const [legajo, setLegajo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [solicitudEnviada, setSolicitudEnviada] = useState(false);
    const [verificado, setVerificado] = useState(false);
    const [loading, setLoading] = useState(false);
    const [okPassword, setOkPassword] = useState(true);
    const [ModalCrearPassVisible, setModalCrearPassVisible] = useState(false);
    const [okPasswordIguales, setOkPasswordIguales] = useState(true);
    const [modalRecuperarPassVisible, setModalRecuperarPassVisible] = useState(false);

    const handleLogin = async () => {
        if (userType === 'vecino' ){
            setLoading(true);
        const esUnVecino = await esVecino(dni)
        if (!esUnVecino) {
            setModalVisible(true);
            setLoading(false);
        } else {
            const estaHabilitado = await habilitado(dni)

            if (estaHabilitado) {
                setVerificado(true);
                setLoading(false);
                const responseLogin = await login(dni, password)
                const responseCheckPass = await checkPass(dni)
                if (!responseCheckPass) {
                    setModalCrearPassVisible(true);
                }
                if (responseLogin.status === 200) {
                    try {
                        await AsyncStorage.setItem('logueado', 'vecino');
                        await AsyncStorage.setItem('token', responseLogin.data.token);
                        await AsyncStorage.setItem('documento', dni);
                        await AsyncStorage.setItem('nombre', responseLogin.data.userVecino.nombre);
                        await AsyncStorage.setItem('apellido', responseLogin.data.userVecino.apellido);
                        await AsyncStorage.setItem('mail', responseLogin.data.user.mail);
                        // console.log(responseLogin.data.userVecino.nombre)
                        // console.log(responseLogin.data.userVecino.apellido)
                        // console.log(responseLogin.data.user.mail)
                        // console.log('response', responseLogin.data.token);
                        console.log("El usuario es: ", await AsyncStorage.getItem('logueado'));
                        alert('Inició sesión correctamente');
                        navigate('/servicios');
                        onLogin();


                    } catch (error) {
                        alert(error)
                        // Error saving data
                    }
                } else {
                    if (password) {
                        setOkPassword(false);
                    }

                }
            } else {
                setEmailModalVisible(true);
            }
        }
    } else {
        setLoading(true);
        const response = await loginInspector(legajo, password)
        console.log(response)
        if (response.status === 200) {
            try {
                await AsyncStorage.setItem('logueado', 'inspector');
                await AsyncStorage.setItem('token', response.data.token);
                await AsyncStorage.setItem('legajo', legajo);
                await AsyncStorage.setItem('nombre', response.data.user.nombre);
                await AsyncStorage.setItem('apellido', response.data.user.apellido);
                //await AsyncStorage.setItem('mail', response.data.user.mail);
                // console.log(response.data.userInspector.nombre)
                // console.log(response.data.userInspector.apellido)
                // console.log(response.data.user.mail)
                // console.log('response', response.data.token);
                console.log(AsyncStorage.getItem('logueado'));
                alert('Inició sesión correctamente');
                navigate('/servicios');
                onLogin();
            } catch (error) {
                alert(error)
                // Error saving data
            }
        } else {
            if (password) {
                setOkPassword(false);
            }
        }
    }
        
    };


    const handleSolicitud = async () => {
        const response = await solicitarClave(dni, email)
        setSolicitudEnviada(true);
    }


    const handleGenerarPass = async () => {
        if (password !== confirmPassword) {
            setOkPasswordIguales(false);
        } else {
            const response = await generarClave(dni, password)
            console.log('respuesta', response)
            setOkPasswordIguales(true);
            setModalCrearPassVisible(false);

        }
    }

    const handleRecuperarPass = async () => {
        if (userType === 'vecino' ){
            const response = await recuperarPass(dni, email)
        }else {
            const response = await recuperarPassInspector(dni, email) //en verdad es el legajo pero lo toma como dni en el input
        }
        setOkPasswordIguales(true);
        setModalRecuperarPassVisible(false);
    }


    return (
        <KeyboardAvoidingView>
            <View>
                <ImageBackground source={userType === 'inspector' ? inspector : imagen} style={styles.backgroundImage}>
                    <View style={styles.formatDiv}>
                        <Text style={styles.title}>Iniciar sesión</Text>
                        <View style={styles.selection}>
                            <TouchableOpacity style={styles.button(userType === 'vecino')} onPress={() => setUserType('vecino')}>
                                <Text style={styles.buttonText}>Vecino</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button(userType === 'inspector')} onPress={() => setUserType('inspector')}>
                                <Text style={styles.buttonText}>Inspector</Text>
                            </TouchableOpacity>
                        </View>

                        {userType === 'vecino' ? (
                            <View style={styles.box}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Número de documento"
                                    keyboardType="numeric"
                                    onChangeText={text => setDni(text)}
                                />
                                {verificado ? (
                                    <>
                                        <TextInput
                                            style={styles.input}
                                            secureTextEntry
                                            placeholder="Contraseña"
                                            onChangeText={(text) => setPassword(text)}
                                            value={password}
                                        />
                                        {okPassword ? null : <Text style={styles.wrongPass}>Contraseña incorrecta</Text>}

                                    </>
                                ) : null}
                            </View>
                        ) : (
                            <>
                                <View style={styles.box}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Número de legajo"
                                        keyboardType="numeric"
                                        onChangeText={text => setLegajo(text)}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Contraseña"
                                        secureTextEntry={true}
                                        onChangeText={text => setPassword(text)}
                                    />
                                </View>
                            </>
                        )}
                        <TouchableOpacity onClick style={styles.olvide} onPress={() => setModalRecuperarPassVisible(true)}>
                            <Text style={styles.olvide}>Olvidé mi Contraseña</Text>
                        </TouchableOpacity>
                        {/* <Button style={styles.button} title={{loading ? 'Iniciar sesión' : <ActivityIndicator size="30px" color="#4bdaa3" />}} onPress={handleLogin} /> */}
                        <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator size="small" color="#FFFF" />
                            ) : (
                                <Text>Iniciar sesión</Text>
                            )}
                        </TouchableOpacity>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.modalBackground}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <TouchableOpacity
                                            style={styles.closeButton}
                                            onPress={() => setModalVisible(!modalVisible)}
                                        >
                                            <Ionicons name="arrow-back-circle-outline" size={35} />
                                        </TouchableOpacity>
                                        <Text style={styles.tituloAviso}>Aviso</Text>
                                        <Text style={styles.descripAviso}>No se encuentra registrado en ningún municipio. Debido a eso no podrá utilizar la aplicación para hacer promociones, reclamos ni denuncias.</Text>
                                        <Text style={styles.mindescAviso}>Si se ha mudado hace poco, tiene que ir a
                                            la sede de su municipio para que lo registren
                                            y desde ese momento puede volver a intentar iniciar sesión como un usuario en esta aplicación.</Text>
                                    </View>
                                </View>
                            </View>
                        </Modal>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={ModalCrearPassVisible}
                            onRequestClose={() => {
                                setModalCrearPassVisible(!ModalCrearPassVisible);
                            }}
                        >
                            <View style={styles.modalBackground}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <TouchableOpacity
                                            style={styles.closeButton}
                                            onPress={() => setModalCrearPassVisible(!ModalCrearPassVisible)}
                                        >
                                            <Ionicons name="arrow-back-circle-outline" size={35} />
                                        </TouchableOpacity>
                                        <Text style={styles.tituloAviso}>Generar contraseña</Text>
                                        <View style={styles.confirmPasswordContainer}>
                                            <TextInput
                                                style={styles.inputContra}
                                                placeholder="Contraseña"
                                                secureTextEntry={true}
                                                keyboardType="password"
                                                onChangeText={text => setPassword(text)}
                                            />
                                            <TextInput
                                                style={styles.inputContra}
                                                placeholder="Confirmar contraseña"
                                                keyboardType="password"
                                                secureTextEntry={true}
                                                onChangeText={text => setConfirmPassword(text)}
                                            />
                                            {okPasswordIguales ? null : <Text style={styles.wrongPass}>Contraseña incorrecta</Text>}
                                        </View>
                                        <Button style={styles.button} title="Generar contraseña" onPress={handleGenerarPass} />
                                    </View>
                                </View>
                            </View>
                        </Modal>

                        <Modal animationType="slide"
                            transparent={true}
                            visible={modalRecuperarPassVisible}
                            onRequestClose={() => {
                                setModalRecuperarPassVisible(!modalRecuperarPassVisible);
                            }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={() => setModalRecuperarPassVisible(!modalRecuperarPassVisible)}
                                    >
                                        <Ionicons name="arrow-back-circle-outline" size={35} />
                                    </TouchableOpacity>
                                    <Text style={styles.tituloAviso}>Recuperar contraseña</Text>
                                    <Text style={styles.mindescAviso}>Ingrese su DNI o legajo y correo electrónico para recuperar su contraseña</Text>
                                    <TextInput
                                        style={styles.inputContra}
                                        placeholder="DNI o legajo"
                                        keyboardType="numeric"
                                        onChangeText={text => setDni(text)}
                                    />
                                    <TextInput
                                        style={styles.inputContra}
                                        placeholder="Correo electrónico"
                                        keyboardType="email-address"
                                        onChangeText={text => setEmail(text)}
                                    />

                                    <Button style={styles.button} title="Recuperar contraseña" onPress={() => handleRecuperarPass()} />
                                </View>
                            </View>
                        </Modal>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={emailModalVisible}
                            onRequestClose={() => {
                                setEmailModalVisible(!emailModalVisible);
                                setSolicitudEnviada(false);
                            }}
                        >
                            <View style={solicitudEnviada ? styles.centeredViewBlue : styles.centeredView}>
                                <View style={solicitudEnviada ? styles.modalViewLarge : styles.modalView}>
                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={() => setEmailModalVisible(!emailModalVisible)}
                                    >
                                        <Ionicons name="arrow-back-circle-outline" size={35} />
                                    </TouchableOpacity>
                                    {solicitudEnviada ? (
                                        <>
                                            <Ionicons name="checkmark-circle" size={50} color="#0A36D3" />
                                            <Text style={styles.tituloAviso}>Solicitud enviada</Text>
                                        </>
                                    ) : verificado === false ? (
                                        <>
                                            <Text style={styles.tituloAviso}>Solicitar generar clave</Text>
                                            <Text style={styles.mindescAviso}>Para poder utilizar “LaApp” es necesario
                                                que genere su clave. El municipio
                                                corroborará que esté habilitado para generarlo.
                                                En breve recibirá un mail informando
                                                su aprobación o desaprobación al mismo.</Text>
                                            <TextInput
                                                style={styles.inputEmail}
                                                placeholder="Correo electrónico"
                                                keyboardType="email-address"
                                                onChangeText={text => setEmail(text)}
                                            />
                                            <Button style={styles.button} title="Enviar solicitud" onPress={handleSolicitud} />
                                        </>
                                    ) : null}
                                </View>
                            </View>
                        </Modal>
                    </View>
                </ImageBackground>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Login;