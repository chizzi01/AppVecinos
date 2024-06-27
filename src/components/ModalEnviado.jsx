import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Modal, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const ModalEnviado = ({ texto, isVisible }) => {
    const [modalVisible, setModalVisible] = useState(isVisible);

    useEffect(() => {
        setModalVisible(isVisible);
    }
    , [isVisible]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredViewBlue}>
                <View style={styles.modalView}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Ionicons name="arrow-back-circle-outline" size={35} />
                    </TouchableOpacity>
                    <>
                        <Ionicons name="checkmark-circle" size={50} color="#0A36D3" />
                        <Text style={styles.tituloAviso}>Solicitud enviada</Text>
                        <Text style={styles.mindescAviso}>{texto}</Text>
                    </>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    centeredViewBlue: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        elevation: 5,
    },
    modalViewLarge: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        elevation: 5,
        width: '80%',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    tituloAviso: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    mindescAviso: {
        fontSize: 16,
        marginBottom: 20,
    },
    inputEmail: {
        height: 40,
        width: '80%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        width: '80%',
        padding: 10,
    },
});

export default ModalEnviado;