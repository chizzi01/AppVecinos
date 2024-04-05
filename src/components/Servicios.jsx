import React, { useState } from 'react';
import { View, Text } from 'react-native';
import CardServicio from './CardServicio';
import { TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Modal, Button, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

const Servicios = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [nombreServicio, setNombreServicio] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [telefono, setTelefono] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [selectedServicio, setSelectedServicio] = useState(null);
    const [modalServicioVisible, setModalServicioVisible] = useState(false);
    const [search, setSearch] = useState('');
    const servicios = [
        { id:'01', imagen: require('../img/servicio.jpg'), nombreServicio: 'Carpinteria a domicilio', proveedor: 'Don Ramon', telefono: '1167845715', descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, tempore ab. Quos iusto tenetur inventore ducimus aut, fuga alias vero excepturi culpa temporibus quam odio officia eos enim nulla quaerat.' },
        { id:'02', imagen: require('../img/servicio.jpg'), nombreServicio: 'Plomeria a domicilio', proveedor: 'Juan Perez', telefono: '1167845715', descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, tempore ab. Quos iusto tenetur inventore ducimus aut, fuga alias vero excepturi culpa temporibus quam odio officia eos enim nulla quaerat.' },
        { id:'03', imagen: require('../img/servicio.jpg'), nombreServicio: 'Electricidad a domicilio', proveedor: 'Nicolas Gonzales', telefono: '1167845715', descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, tempore ab. Quos iusto tenetur inventore ducimus aut, fuga alias vero excepturi culpa temporibus quam odio officia eos enim nulla quaerat.' },
        { id:'04', imagen: require('../img/servicio.jpg'), nombreServicio: 'Gasista a domicilio', proveedor: 'Federico Martinez', telefono: '1167845715', descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, tempore ab. Quos iusto tenetur inventore ducimus aut, fuga alias vero excepturi culpa temporibus quam odio officia eos enim nulla quaerat.' },
        { id:'05', imagen: require('../img/servicio.jpg'), nombreServicio: 'Cerrajeria', proveedor: 'Lucas Gomez', telefono: '1167845715', descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, tempore ab. Quos iusto tenetur inventore ducimus aut, fuga alias vero excepturi culpa temporibus quam odio officia eos enim nulla quaerat.' },
        { id:'06', imagen: require('../img/servicio.jpg'), nombreServicio: 'Pintura a domicilio', proveedor: 'Michael Jackson', telefono: '1167845715', descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, tempore ab. Quos iusto tenetur inventore ducimus aut, fuga alias vero excepturi culpa temporibus quam odio officia eos enim nulla quaerat.' },
        { id:'07', imagen: require('../img/servicio.jpg'), nombreServicio: 'Jardineria a domicilio', proveedor: 'Carla Perez', telefono: '1167845715', descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, tempore ab. Quos iusto tenetur inventore ducimus aut, fuga alias vero excepturi culpa temporibus quam odio officia eos enim nulla quaerat.' },
        { id:'08', imagen: require('../img/servicio.jpg'), nombreServicio: 'Limpieza a domicilio', proveedor: 'Juana Perez', telefono: '1167845715', descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, tempore ab. Quos iusto tenetur inventore ducimus aut, fuga alias vero excepturi culpa temporibus quam odio officia eos enim nulla quaerat.' },
        { id:'09', imagen: require('../img/servicio.jpg'), nombreServicio: 'Carpinteria', proveedor: 'Mengana Perez', telefono: '1167845715', descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, tempore ab. Quos iusto tenetur inventore ducimus aut, fuga alias vero excepturi culpa temporibus quam odio officia eos enim nulla quaerat.' },

    ];

    const handleSave = () => {
        // Save the new service
        console.log(nombreServicio, proveedor, telefono, descripcion);
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

    const filteredServicios = servicios.filter(servicio =>
        servicio.nombreServicio.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchSection}>
                <Ionicons style={styles.searchIcon} name="search" size={20} color="#000" />
                <TextInput
                    style={styles.inputSearch}
                    placeholder="Buscar por nombre"
                    selectionColor="#ff834e"
                    onChangeText={text => setSearch(text)}
                />
            </View>
            <ScrollView>
                {filteredServicios.map((servicio, index) => (
                    <TouchableOpacity key={servicio.id} onPress={() => { setSelectedServicio(servicio); setModalServicioVisible(true); }}>
                        <CardServicio
                            key={servicio.id}
                            imagen={servicio.imagen}
                            nombreServicio={servicio.nombreServicio}
                            proveedor={servicio.proveedor}
                        />
                    </TouchableOpacity>
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
                        <Text style={styles.titulo}>Agregar servicio</Text>
                        <TextInput style={styles.input} placeholder="Nombre del servicio" onChangeText={setNombreServicio} selectionColor="#ff834e"/>
                        <TextInput style={styles.input} placeholder="Proveedor" onChangeText={setProveedor} selectionColor="#ff834e"/>
                        <TextInput style={styles.input} placeholder="Telefono" onChangeText={setTelefono} selectionColor="#ff834e" keyboardType="numeric"/>
                        <TextInput style={styles.input} placeholder="Descripcion" onChangeText={setDescripcion} selectionColor="#ff834e"/>
                        <TouchableOpacity style={styles.addImg} onPress={pickImage}>
                            <Ionicons name="attach" size={20} color="grey" />
                            <Text style={styles.colorText}>Adjuntar imagenes</Text>
                        </TouchableOpacity>
                        <View style={styles.lineAlign}>
                            <Button title="Guardar" onPress={handleSave} />
                            <TouchableOpacity style={styles.cancel} onPress={() => setModalVisible(false)}>
                                <Text style={styles.colorText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalServicioVisible}
                onRequestClose={() => {
                    setModalVisible(!modalServicioVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.comercioView}>
                        {selectedServicio && (
                            <>
                                <Image
                                    source={selectedServicio.imagen}
                                    style={styles.carouselImage}
                                    onError={(error) => console.log(error)}
                                />
                                <Text style={styles.comercioTitulo}>{selectedServicio.nombreServicio}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="person" size={20} color="#7E7E7E" />
                                    <Text style={styles.comercioProveedor}>{selectedServicio.proveedor}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="call" size={20} color="#7E7E7E" />
                                    <Text style={styles.comercioTelefono}>{selectedServicio.telefono}</Text>
                                </View>
                                <Text style={styles.comercioDescripcion}>{selectedServicio.descripcion}</Text>
                            </>
                        )}
                        <Button title="Cerrar" style={{backgroundColor:'red'}} onPress={() => setModalServicioVisible(false)} />
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#ff834e',
        borderRadius: 30,
        elevation: 8
    },
    fabIcon: {
        fontSize: 40,
        color: 'white'
    },
    container: {
        backgroundColor: '#D9D9D9',
        height: '100%'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "#f0f0f0", // Light gray background
        borderRadius: 30, // Larger border radius
        padding: 20, // More padding
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
    input: {
        height: 40, // Adjust the height as needed
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
    titulo: {
        fontSize: 30, // Larger font size
        fontWeight: 'bold', // Bold font
        marginBottom: 20, // Add some margin to the bottom
        color: '#7E7E7E' // Gray text
    },
    comercioView: {
        margin: 20,
        backgroundColor: "#f0f0f0",
        borderRadius: 30,
        padding: 20,
        alignItems: "left",
        justifyContent: "space-evenly",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '90%',
        width: '95%'
    },
    comercioDireccion: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#888',
        marginLeft: 5,
    },
    comercioTelefono: {
        fontSize: 15,
        color: '#888',
        marginLeft: 5,
    },
    comercioDescripcion: {
        fontSize: 15,
        color: '#888',
    },
    comercioTitulo: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    comercioProveedor: {
        fontSize: 18,
        color: '#888',
        marginLeft: 5,
    },
    carouselImage: {
        width: '100%',
        height: 200,
        borderRadius: 20,
    },
    busqueda: {
        height: 40,
        width: '80%',
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
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
});


export default Servicios;