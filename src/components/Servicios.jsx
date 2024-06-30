import React, { useEffect, useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import CardServicio from './CardServicio';
import { TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Modal, Button, TextInput, Image, ActivityIndicator, KeyboardAvoidingView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import getServicios from '../controllers/servicios';
import { Picker } from '@react-native-picker/picker';
import postServicios from '../controllers/postServicio';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CarousellImagenes from './CarousellImagenes';
import ModalEnviado from './ModalEnviado';

const Servicios = (logueado) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [nombreServicio, setNombreServicio] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [telefono, setTelefono] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [selectedServicio, setSelectedServicio] = useState(null);
    const [modalServicioVisible, setModalServicioVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [horaInicio, setHoraInicio] = useState('');
    const [minutoInicio, setMinutoInicio] = useState('');
    const [horaCierre, setHoraCierre] = useState('');
    const [minutoCierre, setMinutoCierre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [storedValue, setStoredValue] = useState('');
    const [rubro, setRubro] = useState('');
    const [image, setImage] = useState(null);
    const [imagenes, setImagenes] = useState([]);
    const [vistasPrevia, setVistasPrevia] = useState([]);
    const [modalEnviado, setModalEnviado] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [servicios, setServicios] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await getServicios(setServicios);
            setLoading(false);
        };
        fetchData();
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('documento');
                if (value !== null) {
                    setStoredValue(value);
                }
            } catch (e) {
                console.error('Failed to fetch the data from storage', e);
            }
        };
        getData();
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getServicios(setServicios);
        setRefreshing(false);
    }, []);



    const getData = async () => { try { const value = await AsyncStorage.getItem('token'); if (value !== null) { setStoredValue(value); } } catch (e) { console.error('Failed to fetch the data from storage', e); } };

    useEffect(() => { getData(); }, []);

    const handleSave = async () => {
        try {
            console.log("Nombre servicio" , nombreServicio)
            console.log("Direccion" , direccion)
            console.log("Telefono" , telefono)
            console.log("Hora inicio" , horaInicio)
            console.log("Minuto inicio" , minutoInicio)
            console.log("Hora cierre" , horaCierre)
            console.log("Minuto cierre" , minutoCierre)
            console.log("Rubro" , rubro)
            console.log("Descripcion" , descripcion)
            console.log("Value" , storedValue)
            const response = await postServicios(imagenes, storedValue, nombreServicio, direccion, telefono, horaInicio, minutoInicio, horaCierre, minutoCierre, rubro, descripcion);
            console.log('Response from postServicios:', response);
            setModalVisible(false);
            setModalEnviado(true);
        } catch (error) {
            alert('Error al enviar el servicio: ' + error.message);
            console.error('Error al enviar el servicio:', error);
        }
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
    };

    const eliminarImagen = (index) => {
        // Crea una copia del estado actual de imágenes y vistas previas
        const nuevasImagenes = [...imagenes];
        const nuevasVistasPrevia = [...vistasPrevia];

        // Elimina la imagen y su vista previa correspondiente
        nuevasImagenes.splice(index, 1);
        nuevasVistasPrevia.splice(index, 1);

        // Actualiza el estado con las nuevas listas
        setImagenes(nuevasImagenes);
        setVistasPrevia(nuevasVistasPrevia);
    };

    const filteredServicios = servicios.filter(servicio =>
        servicio.tituloServicio.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <KeyboardAvoidingView>
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
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {loading ? (
                        // Muestra el spinner si los datos aún se están cargando
                        <ActivityIndicator size="large" color="#ff834e" style={{ marginTop: 20 }} />
                    ) : (
                        filteredServicios.map((servicio, index) => (
                            <TouchableOpacity key={servicio.idServicio} onPress={() => { setSelectedServicio(servicio); setModalServicioVisible(true); }}>
                                <CardServicio
                                    key={servicio.idServicio}
                                    idServicio={servicio.idServicio}
                                    nombreServicio={servicio.tituloServicio}
                                    proveedor={servicio.vecinos.nombre + " " + servicio.vecinos.apellido}
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
                    <ScrollView>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.titulo}>Agregar servicio</Text>
                                <TextInput style={styles.input} placeholder="Nombre del servicio" onChangeText={setNombreServicio} selectionColor="#ff834e" />
                                <TextInput style={styles.input} placeholder="Direccion" onChangeText={setDireccion} selectionColor="#ff834e" />
                                <View style={styles.horariosAlign}>
                                    <Picker style={styles.picker} selectedValue={horaInicio} onValueChange={(itemValue, itemIndex) => setHoraInicio(itemValue)}>
                                        <Picker.Item label="Apertura" value="" />
                                        {Array.from({ length: 24 }, (_, index) => (
                                            <Picker.Item key={index} label={index.toString().padStart(2, '0')} value={index.toString()} />
                                        ))}
                                    </Picker>
                                    <Picker style={styles.picker} selectedValue={minutoInicio} onValueChange={(itemValue, itemIndex) => setMinutoInicio(itemValue)}>
                                        <Picker.Item label="Minutos" value="" />
                                        {Array.from({ length: 60 }, (_, index) => (
                                            <Picker.Item key={index} label={index.toString().padStart(2, '0')} value={index.toString()} />
                                        ))}
                                    </Picker>
                                </View>
                                <View style={styles.horariosAlign}>
                                    <Picker style={styles.picker} selectedValue={horaCierre} onValueChange={(itemValue, itemIndex) => setHoraCierre(itemValue)}>
                                        <Picker.Item label="Cierre" value="" />
                                        {Array.from({ length: 24 }, (_, index) => (
                                            <Picker.Item key={index} label={index.toString().padStart(2, '0')} value={index.toString()} />
                                        ))}
                                    </Picker>
                                    <Picker style={styles.picker} selectedValue={minutoCierre} onValueChange={(itemValue, itemIndex) => setMinutoCierre(itemValue)}>
                                        <Picker.Item label="Minutos" value="" />
                                        {Array.from({ length: 60 }, (_, index) => (
                                            <Picker.Item key={index} label={index.toString().padStart(2, '0')} value={index.toString()} />
                                        ))}
                                    </Picker>
                                </View>
                                <TextInput style={styles.input} placeholder="Telefono" onChangeText={setTelefono} selectionColor="#ff834e" keyboardType="numeric" />
                                <Picker style={styles.picker} selectedValue={rubro} onValueChange={(itemValue, itemIndex) => setRubro(itemValue)}>
                                    <Picker.Item label="Rubro" value="0" />
                                    <Picker.Item label="Electricidad" value="1" />
                                    <Picker.Item label="Gas" value="2" />
                                    <Picker.Item label="Agua" value="3" />
                                    <Picker.Item label="Internet" value="4" />
                                </Picker>
                                <TextInput style={styles.input} placeholder="Descripcion" onChangeText={setDescripcion} selectionColor="#ff834e" />
                                <TouchableOpacity style={styles.addImg} onPress={pickImage}>
                                    <Ionicons name="attach" size={20} color="grey" />
                                    <Text style={styles.colorText}>Adjuntar imágenes</Text>
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
                                    <TouchableOpacity style={styles.save} onPress={handleSave}>
                                        <Text style={{color:"white"}}>Guardar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cancel} onPress={() => setModalVisible(false)}>
                                        <Text style={styles.colorText}>Cancelar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </Modal>

                <ModalEnviado texto="El servicio sera revisado, le avisaremos cuando esté validado" isVisible={modalEnviado} />

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
                                    <View style={{ maxWidth: '100%', overflow: 'hidden', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                                        <CarousellImagenes idServicio={selectedServicio.idServicio} tipo={"servicios"} />
                                    </View>
                                    <View style={styles.contentView}>
                                        <Text style={styles.comercioTitulo}>{selectedServicio.tituloServicio}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Ionicons name="person" size={20} color="#7E7E7E" />
                                            <Text style={styles.comercioProveedor}>{selectedServicio.vecinos.nombre + " " + selectedServicio.vecinos.apellido}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Ionicons name="call" size={20} color="#7E7E7E" />
                                            <Text style={styles.comercioTelefono}>{selectedServicio.telefono}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Ionicons name="time" size={20} color="#7E7E7E" />
                                            <Text style={styles.comercioTelefono}>{selectedServicio.horaApertura + ":" + selectedServicio.minutoApertura} a {selectedServicio.horaCierre + ":" + selectedServicio.minutoCierre}</Text>
                                        </View>
                                        <Text style={styles.comercioDescripcion}>{selectedServicio.descripcion}</Text>
                                    </View>
                                </>
                            )}
                            <TouchableOpacity title="Cerrar" style={styles.cerrarBtn} onPress={() => setModalServicioVisible(false)}>
                                <Text style={styles.cerrarBtnText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </SafeAreaView>
        </KeyboardAvoidingView>
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
    contentView: {
        padding: 20,
        width: '100%',
        alignItems: 'left',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: 300
    },
    modalView: {
        margin: 20,
        backgroundColor: "#f0f0f0", // Light gray background
        borderRadius: 30, // Larger border radius
        padding: 20, // More padding
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '100%', // Larger height
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
        marginBottom: 5,
        color: '#888',
        marginLeft: 5,
    },
    comercioTelefono: {
        fontSize: 15,
        color: '#888',
        marginLeft: 5,
        paddingLeft: 5,
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
    image: {
        width: 150, // Set your desired width
        height: '100%', // Set your desired height
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        //ajustar imagen al tamaño del contenedor
        resizeMode: 'cover',
    },
    horariosAlign: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    picker: {
        height: 40,
        width: '40%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        color: '#333',
        borderColor: '#4bdaa3',
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
        backgroundColor: '#ff834e',
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
    save : {
        backgroundColor: '#03A9F4',
        padding: 10,
        borderRadius: 10,
        paddingHorizontal: 20,
    }

});


export default Servicios;