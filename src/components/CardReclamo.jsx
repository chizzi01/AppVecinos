import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CardReclamo = ({ idReclamo, nombreReclamo, direccion, ultActualizacion, rubro  }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.nombreServicio}>Reclamo N°:{idReclamo}</Text>
                <Text style={styles.nombreServicio}>{nombreReclamo}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons style={styles.clock} name="location" size={20} color="#7E7E7E" />
                        <Text style={styles.proveedor}>{direccion}</Text>
                    </View>
                {rubro && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons style={styles.clock} name="time" size={20} color="#7E7E7E" />
                        <Text style={styles.proveedor}>{rubro}</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',

        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        height: 150,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    imagen: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
    },
    textContainer: {
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    nombreServicio: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,

    },
    proveedor: {
        fontSize: 15,
        color: '#888',

    },
    image: {
        width: 150, // Set your desired width
        height: '100%', // Set your desired height
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        //ajustar imagen al tamaño del contenedor
        resizeMode: 'cover',
    },
    clock: {
        marginRight: 5,
    },

});


export default CardReclamo;