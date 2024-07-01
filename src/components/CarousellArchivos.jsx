import React from 'react';
import { View, Text, Alert, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const CarousellArchivos = ({ idDenuncia }) => {

    const handlePress = async () => {
        const url = `https://municipio-g8-servidor-production-dcd2.up.railway.app/api/denuncias/getZipArchivos/${idDenuncia}`;
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`No se puede abrir el enlace: ${url}`);
        }
    };
    console.log(idDenuncia);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <TouchableOpacity style={styles.descargar} onPress={handlePress}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="download" size={30} color="#FFFF" />
                    <Text style={styles.texto}>Descargar archivos</Text>
                </View>
            </TouchableOpacity>


        </View>
    );
};

const styles = {
    descargar: {
        backgroundColor: '#FF5733',
        padding: 10,
        borderRadius: 5,
    },
    texto: {
        color: '#FFFF',
        fontSize: 20,
        marginLeft: 5,
    },
};


export default CarousellArchivos;