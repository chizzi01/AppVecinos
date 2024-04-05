import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Modal, Button, TextInput, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';





const Denuncias = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [descripcion, setDescripcion] = useState('');
    const [motivo, setMotivo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [generada, setGenerada] = useState(''); // o cualquier valor inicial que necesites
    const [search, setSearch] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);


    const handleSave = () => {
        // Save the new service
        setModalVisible(false);
    };

    const pickImage = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(result);

            if (!result.cancelled) {
                // setImage(result.uri);
                console.log(result.uri);
            }
        } else {
            console.error('Camera roll permission not granted');
        }
    };


    const denuncias = [
        { motivo: 'Denuncia 1', direccion: 'Dirección 1', codigo: '#1288', ultActualizacion: '01/01/2021', generada: true },
        { motivo: 'Denuncia 2', direccion: 'Dirección 2', codigo: '#1289', ultActualizacion: '01/01/2021', generada: false },
        { motivo: 'Denuncia 3', direccion: 'Dirección 3', codigo: '#1290', ultActualizacion: '01/01/2021', generada: true },
        { motivo: 'Denuncia 4', direccion: 'Dirección 4', codigo: '#1291', ultActualizacion: '01/01/2021', generada: false },
        { motivo: 'Denuncia 5', direccion: 'Dirección 5', codigo: '#1292', ultActualizacion: '01/01/2021', generada: true },
        { motivo: 'Denuncia 6', direccion: 'Dirección 6', codigo: '#1293', ultActualizacion: '01/01/2021', generada: false },
        { motivo: 'Denuncia 7', direccion: 'Dirección 7', codigo: '#1294', ultActualizacion: '01/01/2021', generada: true },
        { motivo: 'Denuncia 8', direccion: 'Dirección 8', codigo: '#1295', ultActualizacion: '01/01/2021', generada: false },
        { motivo: 'Denuncia 9', direccion: 'Dirección 9', codigo: '#1296', ultActualizacion: '01/01/2021', generada: true },
        { motivo: 'Denuncia 10', direccion: 'Dirección 10', codigo: '#1297', ultActualizacion: '01/01/2021', generada: false },
    ];

    const filteredDenuncias = denuncias.filter(denuncia =>
        denuncia.motivo.toLowerCase().includes(search.toLowerCase()) &&
        (generada === "" || denuncia.generada === generada)
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.filterAlign}>
            <View style={styles.searchSection}>
                <Ionicons style={styles.searchIcon} name="search" size={20} color="#000" />
                <TextInput
                    style={styles.inputSearch}
                    placeholder="Buscar por nombre"
                    selectionColor="#fd746c"
                    onChangeText={text => setSearch(text)}
                />
            </View>
                <Picker
                    selectedValue={generada}
                    onValueChange={(itemValue) => setGenerada(itemValue)}
                    style={styles.pickerRubro}
                >
                    <Picker.Item label="Todas" value="" />
                    <Picker.Item label="Generadas" value={true} />
                    <Picker.Item label="Recibidas" value={false} />
                </Picker>
            </View>
            <ScrollView>
                {filteredDenuncias.map((denuncia, index) => (
                    <View key={denuncia.codigo} style={styles.denunciasCard}>
                        <Text style={styles.titulo}>🚨 {denuncia.motivo}</Text>
                        <Text style={styles.codigo}>Denuncia N°: {denuncia.codigo}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="location" size={15} color="#7E7E7E" />
                            <Text style={styles.direccion}>{denuncia.direccion}</Text>
                        </View>
                        <Text>Última actualizacion: {denuncia.ultActualizacion}</Text>
                    </View>

                ))}
            </ScrollView>
            <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
                <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.titulo}>Nueva denuncia</Text>
                        <TextInput style={styles.input} placeholder="Motivo" onChangeText={setMotivo} selectionColor="#fd746c"  />
                        <TextInput style={styles.input} placeholder="Dirección" onChangeText={setDireccion} selectionColor="#fd746c" />
                        <TextInput style={styles.input} placeholder="Informacion adicional" onChangeText={setDescripcion} multiline={true}
                            numberOfLines={4} selectionColor="#fd746c"/>
                        <TouchableOpacity style={styles.addImg} onPress={pickImage}>
                            <Ionicons name="attach" size={20} color="grey" />
                            <Text style={styles.colorText}>Adjuntar imagenes</Text>
                        </TouchableOpacity>
                        {/* <CheckBox
                            value={termsAccepted}
                            onValueChange={setTermsAccepted}
                        /> */}
                        <Text style={styles.termsText}>Acepto los términos y condiciones</Text>
                        <View style={styles.lineAlign}>
                            <Button title="Crear denuncia" onPress={handleSave} />
                            <TouchableOpacity style={styles.cancel} onPress={() => setModalVisible(false)}>
                                <Text style={styles.colorText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    denunciasCard: {
        backgroundColor: '#ecf0f1',
        padding: 8,
        borderRadius: 10,
        margin: 10,

    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#fd746c',
        borderRadius: 30,
        elevation: 8
    },
    fabIcon: {
        fontSize: 40,
        color: 'white'
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    codigo: {
        fontSize: 15,
        color: '#888',
    },
    direccion: {
        fontSize: 15,
        color: '#888',
        marginLeft: 5,
    },
    container: {
        backgroundColor: '#D9D9D9',
        height: '100%'
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "#f0f0f0", // Light gray background
        borderRadius: 30, // Larger border radius
        padding: 50, // More padding
        alignItems: "center",
        justifyContent: "space-evenly",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '90%', // Larger height
        width: '95%' // Larger width
    },
    input: {// Adjust the height as needed
        width: '100%', // Make the input take up the full width of the modal
        borderColor: 'gray', // Add a border
        borderWidth: 1, // Add a border
        marginTop: 10, // Add some margin to the top
        paddingLeft: 10, // Add some padding to the left
        borderRadius: 10 // Add a border radius
    },
    addImg: {
        backgroundColor: '#FFFF', // Blue background
        padding: 10, // Add padding
        borderRadius: 10, // Add a border radius
        marginTop: 10, // Add some margin to the top
        borderColor: '#D9D9D9',
        borderStyle: 'solid',
        borderWidth: 1,
        flexDirection: 'row', // Align items horizontally
        alignItems: 'center', // Center items vertically
        justifyContent: 'center', // Center items horizontally 
    },
    colorText: {
        color: '#7E7E7E', // Black text 
    },
    cancel: {
        backgroundColor: '#D9D9D9',
        padding: 10,
        borderRadius: 10,

    },
    lineAlign: {
        flexDirection: 'row', // Align items horizontally
        alignItems: 'center', // Center items vertically
        justifyContent: 'space-evenly', // Add space between the buttons
        width: '100%' // Make the buttons take up the full width of the modal
    },
    picker: {
        height: 50,
        width: '100%',
        borderColor: 'gray',
        backgroundColor: '#FFFF',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 10,
    },
    busqueda: {
        height: 40,
        width: '50%',
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        paddingLeft: 10,
        borderRadius: 10
    },
    filterAlign: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%'
    },
    pickerRubro: {
        width: '40%',
        borderColor: 'gray',
        backgroundColor: '#FFFF',
        borderWidth: 1,
        margin: 10,
        borderRadius: 10,
    },
    termsText: {
        color: '#7E7E7E',
        marginTop: 10,
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    inputSearch: {
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
});

export default Denuncias;