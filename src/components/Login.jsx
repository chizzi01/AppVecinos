import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity } from "react-native";
import theme from "../theme";

const Login = ({user}) => {

    const styles = StyleSheet.create({
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
            color: '#A8A8A8',
        },
        button: (isSelected) => ({
            backgroundColor: isSelected ? '#A8A8A8' : '#D9D9D9', // Cambia el color de fondo dependiendo de si el botón está seleccionado
            padding: 10,
            alignItems: 'center',
            borderRadius: 20,
            width: '50%',
          }),
    });
    
    const [userType, setUserType] = useState('vecino');
    const [modalVisible, setModalVisible] = useState(false);

    return (
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
                    />
                </View>
            ) : (
                <>
                    <View style={styles.box}>
                        <TextInput
                            style={styles.input}
                            placeholder="Número de legajo"
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            secureTextEntry={true}
                        />
                    </View>
                </>
            )}
            <TouchableOpacity>
            <Text style={styles.olvide}>Olvidé mi Contraseña</Text>
            </TouchableOpacity>
            <Button style={styles.button} title="Iniciar sesión" />
        </View>
    );
};

export default Login;