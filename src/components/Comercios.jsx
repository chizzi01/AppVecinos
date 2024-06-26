import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Modal, Button, TextInput, View, Text, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Picker } from '@react-native-picker/picker';
import getComercios from '../controllers/comercios';
import postComercio from '../controllers/postComercio';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardComercio from './CardComercio';
import CarousellImagenes from './CarousellImagenes';
import ModalEnviado from './ModalEnviado';


const Comercios = (logueado) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalComercioVisible, setModalComercioVisible] = useState(false);
    const [selectedComercio, setSelectedComercio] = useState(null);
    const [nombreComercio, setNombreComercio] = useState('');
    const [direccion, setDireccion] = useState('');
    const [horaInicio, setHoraInicio] = useState('Apertura');
    const [horaFin, setHoraFin] = useState('Cierre');
    const [telefono, setTelefono] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [storedValue, setStoredValue] = useState('');
    const [image, setImage] = useState(null);
    const [contacto, setContacto] = useState('');
    const [imagenes, setImagenes] = useState([]);
    const [vistasPrevia, setVistasPrevia] = useState([]);
    const [modalEnviado, setModalEnviado] = useState(false);


    const [comercios, setComercios] = useState([])
    useEffect(() => {
        getComercios(setComercios).then(() => setLoading(false));
    }, []);


    const getData = async () => { try { const value = await AsyncStorage.getItem('documento'); if (value !== null) { setStoredValue(value); } } catch (e) { console.error('Failed to fetch the data from storage', e); } };

    useEffect(() => { getData(); }, []);

    const handleSave = async () => {
        console.log(image)
        const response = await postComercio(image, storedValue, nombreComercio, descripcion, direccion, contacto)
            .then(() => {
                setModalVisible(false);
                setModalEnviado(true);
            });
    };


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true, // Asegúrate de que tu versión de expo-image-picker soporte esta opción
            quality: 1,
        });

        if (!result.cancelled && result.assets) {
            if (result.assets.length > 7) {
                alert('No puedes seleccionar más de 7 imágenes.');
                return;
            }
            setImagenes(result.assets);
            const vistasPreviaUrls = result.assets.map((img) => img.uri);
            setVistasPrevia(vistasPreviaUrls);
        }
        // console.log(result);
        // console.log(imagenes);
        // console.log(vistasPrevia);
    };

    const eliminarImagen = (index) => {
        const nuevasImagenes = [...imagenes];
        nuevasImagenes.splice(index, 1);
        setImagenes(nuevasImagenes);
        const vistasPreviaUrls = nuevasImagenes.map((img) => img.uri);
        setVistasPrevia(vistasPreviaUrls);
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
                {loading ? (
                    // Muestra el spinner si los datos aún se están cargando
                    <ActivityIndicator size="large" color="#03A9F4" style={{ marginTop: 20 }} />
                ) : (
                    filteredComercios.map((comercio, index) => (
                        <TouchableOpacity key={comercio.idComercio} onPress={() => { setSelectedComercio(comercio); setModalComercioVisible(true); }}>
                            <CardComercio
                                key={comercio.idComercio}
                                idComercio={comercio.idComercio}
                                nombreComercio={comercio.nombreComercio}
                                proveedor={comercio.vecinos.nombre + " " + comercio.vecinos.apellido}
                                horario={comercio.horario}
                            />
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
            {logueado.logueado === "vecino" ? (
                <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
                    <Ionicons name="add" size={30} color="white" />
                </TouchableOpacity>
            ) : null}
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
                        <TextInput style={styles.input} placeholder="Nombre del comercio" onChangeText={setNombreComercio} selectionColor="#03A9F4" />
                        <TextInput style={styles.input} placeholder="Dirección" onChangeText={setDireccion} selectionColor="#03A9F4" />
                        <TextInput style={styles.input} placeholder="Telefono" onChangeText={setContacto} selectionColor="#03A9F4" keyboardType="numeric" />
                        <TextInput style={styles.input} placeholder="Descripcion" multiline={true}
                            numberOfLines={4} onChangeText={setDescripcion} selectionColor="#03A9F4" />
                        <TouchableOpacity style={styles.addImg} onPress={pickImage}>
                            <Ionicons name="attach" size={20} color="grey" />
                            <Text style={styles.colorText}>Adjuntar imagenes</Text>
                        </TouchableOpacity>
                        <Text style={styles.colorText}>*Máximo 7 fotos*</Text>
                        <View style={styles.previewContainer}>
                            {vistasPrevia.map((imgUri, index) => (
                                <View key={index} style={styles.imageContainer}>
                                    <Image source={{ uri: imgUri }} style={styles.previewImage} />
                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={() => eliminarImagen(index)}
                                    >
                                        <Ionicons name="close" size={15} color="white" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        <View style={styles.lineAlign}>
                            <Button title="Guardar" onPress={handleSave} />
                            <TouchableOpacity style={styles.cancel} onPress={() => setModalVisible(false)}>
                                <Text style={styles.colorText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <ModalEnviado texto="El comercio sera revisado, le avisaremos cuando esté validado" isVisible={modalEnviado} />
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
                                <View style={{ maxWidth: '100%', overflow: 'hidden', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                                    <CarousellImagenes idServicio={selectedComercio.idComercio} tipo={"comercios"} />
                                </View>
                                <View style={styles.contentView}>
                                    <Text style={styles.comercioTitulo}>{selectedComercio.nombreComercio}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons name="person" size={20} color="#7E7E7E" />
                                        <Text style={styles.comercioProveedor}>{selectedComercio.vecinos.nombre + " " + selectedComercio.vecinos.apellido}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons name="location" size={20} color="#7E7E7E" />
                                        <Text style={styles.comercioDireccion}>{selectedComercio.direccion}</Text>
                                    </View>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="time" size={20} color="#7E7E7E" />
                                    <Text style={styles.comercioHorario}>{selectedComercio.horario}</Text>
                                </View> */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons name="call" size={20} color="#7E7E7E" />
                                        <Text style={styles.comercioTelefono}>{selectedComercio.contacto}</Text>
                                    </View>
                                    <Text style={styles.comercioDescripcion}>{selectedComercio.descripcion}</Text>
                                </View>
                            </>
                        )}
                        <TouchableOpacity title="Cerrar" style={styles.cerrarBtn} onPress={() => setModalComercioVisible(false)}>
                            <Text style={styles.cerrarBtnText}>Cerrar</Text>
                        </TouchableOpacity>
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
    contentView: {
        padding: 20,
        width: '100%',
        alignItems: 'left',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: 300
    },
    comercioView: {
        margin: 0,
        backgroundColor: "#f0f0f0",
        borderRadius: 15,
        padding: 0,
        alignItems: "left",
        justifyContent: "space-between",
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
    comercioProveedor: {
        fontSize: 18,
        color: '#888',
        marginLeft: 5,
    },
    miniaturasContenedor: {
        // Estilos para el contenedor de miniaturas
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    miniaturaImagen: {
        // Estilos para las miniaturas
        width: 50,
        height: 50,
        marginRight: 5,
    },
    miniaturaSeleccionada: {
        // Estilos para la miniatura seleccionada
        borderWidth: 2,
        borderColor: '#03A9F4',
    },
    imageContainer: {
        position: 'relative',
        marginRight: 10,
    },
    previewContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    previewImage: {
        width: 50,
        height: 50,
        margin: 5,
        borderRadius: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 25, // Adjust size as needed
        height: 25, // Adjust size as needed
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey', // Customize as needed
        borderRadius: 25, // Adjust size as needed
    },
    cerrarBtn: {
        backgroundColor: '#03A9F4',
        padding: 5,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cerrarBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },


});


export default Comercios;