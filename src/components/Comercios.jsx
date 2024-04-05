import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Modal, Button, TextInput, View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import CardServicio from './CardServicio';
import { Picker } from '@react-native-picker/picker';


const Comercios = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalComercioVisible, setModalComercioVisible] = useState(false);
    const [selectedComercio, setSelectedComercio] = useState(null);
    const [nombreServicio, setNombreServicio] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [horaInicio, setHoraInicio] = useState('Apertura');
    const [horaFin, setHoraFin] = useState('Cierre');
    const [telefono, setTelefono] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [search, setSearch] = useState('');
    const comercios = [
        { id: '1', imagen: require('../img/comercio.jpg'), nombreComercio: 'Lavanderia', direccion: 'Amenabar 1345', telefono: '1187645281', horario: '10am - 20pm', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam odio aliquam laudantium. Itaque labore quod ad quibusdam cupiditate minus amet veniam ipsa consequuntur quam! Dolor soluta placeat rem dolorum quae.' },
        { id: '2', imagen: require('../img/comercio.jpg'), nombreComercio: 'Peluqueria', direccion: 'Amenabar 1345', telefono: '1187645281', horario: '10am - 20pm', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam odio aliquam laudantium. Itaque labore quod ad quibusdam cupiditate minus amet veniam ipsa consequuntur quam! Dolor soluta placeat rem dolorum quae.' },
        { id: '3', imagen: require('../img/comercio.jpg'), nombreComercio: 'Pintureria', direccion: 'Amenabar 1345', telefono: '1187645281', horario: '10am - 20pm', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam odio aliquam laudantium. Itaque labore quod ad quibusdam cupiditate minus amet veniam ipsa consequuntur quam! Dolor soluta placeat rem dolorum quae.' },
        { id: '4', imagen: require('../img/comercio.jpg'), nombreComercio: 'Veterinaria', direccion: 'Amenabar 1345', telefono: '1187645281', horario: '10am - 20pm', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam odio aliquam laudantium. Itaque labore quod ad quibusdam cupiditate minus amet veniam ipsa consequuntur quam! Dolor soluta placeat rem dolorum quae.' },
        { id: '5', imagen: require('../img/comercio.jpg'), nombreComercio: 'Ferreteria', direccion: 'Amenabar 1345', telefono: '1187645281', horario: '10am - 20pm', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam odio aliquam laudantium. Itaque labore quod ad quibusdam cupiditate minus amet veniam ipsa consequuntur quam! Dolor soluta placeat rem dolorum quae.' },
        { id: '6', imagen: require('../img/comercio.jpg'), nombreComercio: 'Supermercado', direccion: 'Amenabar 1345', telefono: '1187645281', horario: '10am - 20pm', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam odio aliquam laudantium. Itaque labore quod ad quibusdam cupiditate minus amet veniam ipsa consequuntur quam! Dolor soluta placeat rem dolorum quae.' },
        { id: '7', imagen: require('../img/comercio.jpg'), nombreComercio: 'Kiosco', direccion: 'Amenabar 1345', telefono: '1187645281', horario: '10am - 20pm', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam odio aliquam laudantium. Itaque labore quod ad quibusdam cupiditate minus amet veniam ipsa consequuntur quam! Dolor soluta placeat rem dolorum quae.' },
        { id: '8', imagen: require('../img/comercio.jpg'), nombreComercio: 'Panaderia', direccion: 'Amenabar 1345', telefono: '1187645281', horario: '10am - 20pm', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam odio aliquam laudantium. Itaque labore quod ad quibusdam cupiditate minus amet veniam ipsa consequuntur quam! Dolor soluta placeat rem dolorum quae.' },
        { id: '9', imagen: require('../img/comercio.jpg'), nombreComercio: 'Carniceria', direccion: 'Amenabar 1345', telefono: '1187645281', horario: '10am - 20pm', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam odio aliquam laudantium. Itaque labore quod ad quibusdam cupiditate minus amet veniam ipsa consequuntur quam! Dolor soluta placeat rem dolorum quae.' },

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

    const filteredComercios = comercios.filter(comercio => comercio.nombreComercio.toLowerCase().includes(search.toLowerCase()));
    const horario = horaInicio + ' - ' + horaFin;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchSection}>
                <Ionicons style={styles.searchIcon} name="search" size={20} color="#000" />
                <TextInput
                    style={styles.inputSearch}
                    placeholder="Buscar por nombre"
                    selectionColor="#03A9F4"
                    onChangeText={text => setSearch(text)}
                />
            </View>
            <ScrollView>
                {filteredComercios.map((comercio) => (
                    <TouchableOpacity key={comercio.id} onPress={() => { setSelectedComercio(comercio); setModalComercioVisible(true); }}>
                        <CardServicio
                            key={comercio.id}
                            imagen={comercio.imagen}
                            nombreServicio={comercio.nombreComercio}
                            proveedor={comercio.proveedor}
                            horario={comercio.horario}
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
                        <Text style={styles.titulo}>Agregar comercio</Text>
                        <TextInput style={styles.input} placeholder="Nombre del comercio" onChangeText={setNombreServicio} selectionColor="#03A9F4" />
                        <TextInput style={styles.input} placeholder="Dirección" onChangeText={setTelefono} selectionColor="#03A9F4" />
                        <Picker style={styles.input} selectedValue={horaInicio} onValueChange={(itemValue, itemIndex) => setHoraInicio(itemValue)}>
                            <Picker.Item label="Apertura" value="" />
                            <Picker.Item label="00am" value="00am" />
                            <Picker.Item label="1am" value="1am" />
                            <Picker.Item label="2am" value="2am" />
                            <Picker.Item label="3am" value="3am" />
                            <Picker.Item label="4am" value="4am" />
                            <Picker.Item label="5am" value="5am" />
                            <Picker.Item label="6am" value="6am" />
                            <Picker.Item label="7am" value="7am" />
                            <Picker.Item label="8am" value="8am" />
                            <Picker.Item label="9am" value="9am" />
                            <Picker.Item label="10am" value="10am" />
                            <Picker.Item label="11am" value="11am" />
                            <Picker.Item label="12pm" value="12pm" />
                            <Picker.Item label="13pm" value="13pm" />
                            <Picker.Item label="14pm" value="14pm" />
                            <Picker.Item label="15pm" value="15pm" />
                            <Picker.Item label="16pm" value="16pm" />
                            <Picker.Item label="17pm" value="17pm" />
                            <Picker.Item label="18pm" value="18pm" />
                            <Picker.Item label="19pm" value="19pm" />
                            <Picker.Item label="20pm" value="20pm" />
                            <Picker.Item label="21pm" value="21pm" />
                            <Picker.Item label="22pm" value="22pm" />
                            <Picker.Item label="23pm" value="23pm" />
                        </Picker>

                        <Picker style={styles.input} selectedValue={horaFin} onValueChange={(itemValue, itemIndex) => setHoraFin(itemValue)}>
                            <Picker.Item label="Cierre" value="" />
                            <Picker.Item label="00am" value="00am" />
                            <Picker.Item label="1am" value="1am" />
                            <Picker.Item label="2am" value="2am" />
                            <Picker.Item label="3am" value="3am" />
                            <Picker.Item label="4am" value="4am" />
                            <Picker.Item label="5am" value="5am" />
                            <Picker.Item label="6am" value="6am" />
                            <Picker.Item label="7am" value="7am" />
                            <Picker.Item label="8am" value="8am" />
                            <Picker.Item label="9am" value="9am" />
                            <Picker.Item label="10am" value="10am" />
                            <Picker.Item label="11am" value="11am" />
                            <Picker.Item label="12pm" value="12pm" />
                            <Picker.Item label="13pm" value="13pm" />
                            <Picker.Item label="14pm" value="14pm" />
                            <Picker.Item label="15pm" value="15pm" />
                            <Picker.Item label="16pm" value="16pm" />
                            <Picker.Item label="17pm" value="17pm" />
                            <Picker.Item label="18pm" value="18pm" />
                            <Picker.Item label="19pm" value="19pm" />
                            <Picker.Item label="20pm" value="20pm" />
                            <Picker.Item label="21pm" value="21pm" />
                            <Picker.Item label="22pm" value="22pm" />
                            <Picker.Item label="23pm" value="23pm" />
                        </Picker>

                        <TextInput style={styles.input} placeholder="Telefono" onChangeText={setTelefono} selectionColor="#03A9F4" keyboardType="numeric" />
                        <TextInput style={styles.input} placeholder="Descripcion" multiline={true}
                            numberOfLines={4} onChangeText={setDescripcion} selectionColor="#03A9F4" />
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
                visible={modalComercioVisible}
                onRequestClose={() => {
                    setModalVisible(!modalComercioVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.comercioView}>
                        {selectedComercio && (
                            <>
                                <Image
                                    source={selectedComercio.imagen}
                                    style={styles.carouselImage}
                                    onError={(error) => console.log(error)}
                                />
                                <Text style={styles.comercioTitulo}>{selectedComercio.nombreComercio}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="location" size={20} color="#7E7E7E" />
                                    <Text style={styles.comercioDireccion}>{selectedComercio.direccion}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="time" size={20} color="#7E7E7E" />
                                    <Text style={styles.comercioHorario}>{selectedComercio.horario}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="call" size={20} color="#7E7E7E" />
                                    <Text style={styles.comercioTelefono}>{selectedComercio.telefono}</Text>
                                </View>
                                <Text style={styles.comercioDescripcion}>{selectedComercio.descripcion}</Text>
                            </>
                        )}
                        <Button title="Cerrar" onPress={() => setModalComercioVisible(false)} />
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
        backgroundColor: '#03A9F4',
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
        marginBottom: 5, // Add some margin to the bottom
        color: '#7E7E7E' // Gray text
    },
    carouselImage: {
        width: '100%',
        height: 200,
        borderRadius: 20,
    },
    comercioView: {
        margin: 20,
        backgroundColor: "#f0f0f0", // Light gray background
        borderRadius: 30, // Larger border radius
        padding: 20, // More padding
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
        height: '90%', // Larger height
        width: '95%' // Larger width
    },
    comercioDireccion: {
        fontSize: 16,
        fontWeight: 'bold',
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
    comercioHorario: {
        fontSize: 15,
        color: '#888',
        marginLeft: 5,
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


export default Comercios;