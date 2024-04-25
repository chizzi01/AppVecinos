import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, ImageBackground } from "react-native";
import theme from "../theme";
import { Ionicons } from '@expo/vector-icons';
import imagen from '../img/login.png';
import inspector from '../img/inspector.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from 'react-router-native';




const Login = ({ user, onLogin }) => {
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

    });

    const [userType, setUserType] = useState('vecino');
    const [modalVisible, setModalVisible] = useState(false);
    const [emailModalVisible, setEmailModalVisible] = useState(false);
    const [dni, setDni] = useState('');
    const [legajo, setLegajo] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [solicitudEnviada, setSolicitudEnviada] = useState(false);
    const [verificado, setVerificado] = useState(false);


    const handleLogin = async () => {
        if (dni !== user.dni) {
            setModalVisible(true);
        } else {
            if (user.validado === true ) {
                setVerificado(true);
                if (password === user.password ) {
                    try {
                        await AsyncStorage.setItem('logueado', 'true');
                        alert('Inició sesión correctamente');
                        navigate('/comercios');
                        onLogin();
                  

                    } catch (error) {
                        // Error saving data
                    }
                } else if (password !== user.password && password !== ''){
                    alert('Contraseña incorrecta');
                }
            } else {
                setEmailModalVisible(true);
            }
        };
    };


    const handleSolicitud = () => {
        setSolicitudEnviada(true);
    }

    return (
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
                                <TextInput
                                    style={styles.input}
                                    secureTextEntry
                                    placeholder="Contraseña"
                                    onChangeText={(text) => setPassword(text)}
                                    value={password}
                                />
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
                    <TouchableOpacity>
                        <Text style={styles.olvide}>Olvidé mi Contraseña</Text>
                    </TouchableOpacity>
                    <Button style={styles.button} title="Iniciar sesión" onPress={handleLogin} />
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
    );
};

export default Login;