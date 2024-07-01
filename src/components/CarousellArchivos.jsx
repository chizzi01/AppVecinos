import React from 'react';
import { View, Button, Alert, Linking } from 'react-native';
const CarousellArchivos = ({ idDenuncia }) => {

    const handlePress = async () => {
        const url = `https://municipio-g8-servidor-production-dcd2.up.railway.app/api/denuncias/getZipArchivos/${idDenuncia}`;
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`No se puede abrir el enlace: ${ url }`);
        }
    };
console.log(idDenuncia);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Descargar Archivos" onPress={handlePress} />
        </View>
    );
};



export default CarousellArchivos;