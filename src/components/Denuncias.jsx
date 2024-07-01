import React, { useState, useCallback, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Modal, Button, TextInput, View, Text, Image, RefreshControl, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import CarousellImagenes from './CarousellImagenes';
import postDenunciaComercio from '../controllers/postDenunciaComercio';
import postDenunciaVecino from '../controllers/postDenunciaVecino';
import ModalEnviado from './ModalEnviado';
import getDenuncias from '../controllers/denuncias';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDate, set } from 'date-fns';






const Denuncias = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [descripcion, setDescripcion] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [motivo, setMotivo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [generada, setGenerada] = useState(''); // o cualquier valor inicial que necesites
    const [search, setSearch] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [vecinoDenuncia, setVecinoDenuncia] = useState(false);
    const [comercioDenuncia, setComercioDenuncia] = useState(false);
    const [modalDenunciasVisible, setModalDenunciasVisible] = useState(false);
    const [selectedDenuncia, setSelectedDenuncia] = useState(null);
    const [imagenes, setImagenes] = useState([]);
    const [vistasPrevia, setVistasPrevia] = useState([]);
    const [modalEnviado, setModalEnviado] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [denuncias, setDenuncias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [storedValue, setStoredValue] = useState('');
    const [token, setToken] = useState('');
    const [idSitio, setIdSitio] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await getDenuncias(setDenuncias);
            console.log(denuncias);
            setLoading(false);
        };
        fetchData();
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('documento');
                const token = await AsyncStorage.getItem('token');
                console.log('Documento:', value);
                console.log('Token:', token);
                if (value !== null) {
                    setStoredValue(value);
                    setToken(token);
                }
            } catch (e) {
                console.error('Failed to fetch the data from storage', e);
            }
        };
        getData();
    }, []);


    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getDenuncias(setDenuncias);
        setRefreshing(false);
    }, []);




    const handleSave = () => {
        // console.log('Guardando denuncia...');
        // console.log('Motivo:', motivo);
        // console.log('Direccion:', direccion);
        // console.log('Descripcion:', descripcion);
        // console.log('Vecino:', vecinoDenuncia);
        // console.log('Comercio:', comercioDenuncia);
        // console.log('Imagenes:', imagenes);
        // console.log('Términos aceptados:', termsAccepted);
        // console.log('Generada:', generada);
        // console.log('Search:', search);

        if (!motivo || !direccion || !descripcion || !termsAccepted) {
            alert('Por favor complete todos los campos y acepte los términos.');
            return;
        }

        if (!vecinoDenuncia && !comercioDenuncia) {
            alert('Por favor seleccione si la denuncia es de un vecino o un comercio.');
            return;
        }

        if (vecinoDenuncia) {
            console.log("estos son los archivos",imagenes)
            console.log("este es el storedValue",storedValue)
            console.log("este es el idSitio",idSitio)
            console.log("este es el motivo",motivo)
            console.log("este es la descripcion",descripcion)
            console.log("este es el terminos aceptados",termsAccepted)
            console.log("este es la direccion",direccion)
            console.log("este es la ubicacion",ubicacion)
            console.log("este es el token",token)

            postDenunciaVecino(imagenes, storedValue, idSitio, motivo, descripcion, termsAccepted, direccion, ubicacion, token)
                .then(() => {
                    setModalVisible(false);
                    setModalEnviado(true);
                })
                .catch((error) => {
                    console.error('Error al enviar la denuncia:', error);
                    alert('Error al enviar la denuncia. Por favor, inténtelo de nuevo.');
                });
        } else {
            postDenunciaComercio(imagenes, storedValue,idSitio, motivo, direccion, descripcion, termsAccepted, token)
                .then(() => {
                    setModalVisible(false);
                    setModalEnviado(true);
                })
                .catch((error) => {
                    console.error('Error al enviar la denuncia:', error);
                    alert('Error al enviar la denuncia. Por favor, inténtelo de nuevo.');
                });
        }
    };




    const pickDocument = async () => {
        let documentosSeleccionados = [];

        const solicitarOtroDocumento = async () => {
            return new Promise((resolve) => {
                Alert.alert(
                    "Seleccionar más documentos",
                    "¿Deseas seleccionar otro documento?",
                    [
                        {
                            text: "No",
                            onPress: () => resolve(false),
                            style: "cancel"
                        },
                        { text: "Sí", onPress: () => resolve(true) }
                    ]
                );
            });
        };

        while (documentosSeleccionados.length < 7) {
            const result = await DocumentPicker.getDocumentAsync({});

            if (result.type === 'cancel') {
                break;
            }

            documentosSeleccionados.push(result);

            if (documentosSeleccionados.length < 7) {
                const continuarSeleccionando = await solicitarOtroDocumento();
                if (!continuarSeleccionando) break;
            }
        }

        // Actualizar el estado con los documentos seleccionados
        setImagenes(documentosSeleccionados);

        const vistasPreviaUrls = documentosSeleccionados.map((doc) => {
            // Asumiendo que siempre quieres el primer objeto dentro de 'assets'
            const primerAsset = doc.assets && doc.assets[0] ? doc.assets[0] : null;

            return {
                // Usa un valor predeterminado si 'primerAsset' es null
                uri: primerAsset ? primerAsset.uri : 'about:blank',
                type: primerAsset && primerAsset.mimeType ? primerAsset.mimeType : 'application/pdf', // Asumiendo un tipo por defecto
            };
        });

        console.log('Vistas previas:', vistasPreviaUrls);
        setVistasPrevia(vistasPreviaUrls);

        // Si necesitas hacer algo más con los documentos seleccionados, hazlo aquí
    };

    function eliminarImagen(index) {
        // Crea una copia del array sin el elemento en el índice especificado
        const newArray = vistasPrevia.filter((_, i) => i !== index);
        // Actualiza el estado o la variable que contiene las vistas previas con el nuevo array
        setVistasPrevia(newArray);
    }


    const filteredDenuncias = denuncias.filter(denuncia =>
        denuncia.denunciaDenunciado[0]?.nombre.toLowerCase().includes(search.toLowerCase())
        &&
        (generada === "" || denuncia.denunciaDenunciado.generada === generada)

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
                </Picker>
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
                    filteredDenuncias.map((denuncia, index) => (
                        <TouchableOpacity key={index} onPress={() => { setSelectedDenuncia(denuncia); setModalDenunciasVisible(true); }} >
                            <View key={denuncia.idDenuncias} style={styles.denunciasCard}>
                                <Text style={styles.titulo}>🚨 {denuncia.denunciaDenunciado[0]?.nombre}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="location" size={15} color="#7E7E7E" />
                                    <Text style={styles.direccion}>{denuncia.denunciaDenunciado[0]?.direccion}</Text>
                                </View>
                                <Text>Última actualizacion: {denuncia.movimientosDenuncia.length > 0 && !isNaN(new Date(denuncia.movimientosDenuncia[denuncia.movimientosDenuncia.length - 1]?.fecha).getTime()) ? formatDate(new Date(denuncia.movimientosDenuncia[denuncia.movimientosDenuncia.length - 1]?.fecha), 'dd/MM/yyyy HH:mm') : 'No disponible'}</Text>
                            </View>
                        </TouchableOpacity>


                    ))
                )}
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
                <ScrollView>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.tituloModal}>Nueva denuncia</Text>
                            <View style={styles.inRowAlign}>
                                <TouchableOpacity
                                    style={styles.checkboxContainer}
                                    onPress={() => {
                                        setVecinoDenuncia(!vecinoDenuncia);
                                        setComercioDenuncia(vecinoDenuncia);
                                    }}
                                >
                                    <Text style={[styles.checkbox, vecinoDenuncia ? styles.checkboxSelected : null]}>{vecinoDenuncia ? '✓' : ''}</Text>
                                    <Text style={styles.checkboxText}>Vecino</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.checkboxContainer}
                                    onPress={() => {
                                        setComercioDenuncia(!comercioDenuncia);
                                        setVecinoDenuncia(comercioDenuncia);
                                    }}
                                >
                                    <Text style={[styles.checkbox, comercioDenuncia ? styles.checkboxSelected : null]}>{comercioDenuncia ? '✓' : ''}</Text>
                                    <Text style={styles.checkboxText}>Comercio</Text>
                                </TouchableOpacity>
                            </View>
                            {vecinoDenuncia ? (
                                <>
                                    <TextInput style={styles.input} placeholder="Nombre del denunciado" onChangeText={setMotivo} selectionColor="#fd746c" />
                                    <TextInput style={styles.input} placeholder="Dirección del denunciado" onChangeText={setDireccion} selectionColor="#fd746c" />
                                    <TextInput style={styles.input} placeholder="Ubicacion del hecho" onChangeText={setUbicacion} selectionColor="#fd746c" />
                                    <TextInput style={styles.input} placeholder="Detalle de la causa" onChangeText={setDescripcion} multiline={true}
                                        numberOfLines={4} selectionColor="#fd746c" />
                                </>
                            ) : (
                                <>
                                    <TextInput style={styles.input} placeholder="Nombre del comercio" onChangeText={setMotivo} selectionColor="#fd746c" />
                                    <TextInput style={styles.input} placeholder="Dirección del comercio" onChangeText={setDireccion} selectionColor="#fd746c" />
                                    <TextInput style={styles.input} placeholder="Detalle de la causa" onChangeText={setDescripcion} multiline={true} numberOfLines={4} selectionColor="#fd746c" />
                                </>
                            )}


                            <TouchableOpacity style={styles.addImg} onPress={pickDocument}>
                                <Ionicons name="attach" size={20} color="grey" />
                                <Text style={styles.colorText}>Adjuntar documentos</Text>
                            </TouchableOpacity>
                            <View style={styles.previewContainer}>
                                {vistasPrevia.map((file, index) => {
                                    if (!file) return null; // Skip rendering for undefined or null items
                                    return (
                                        <View key={index} style={styles.imageContainer}>
                                            {file.type.includes('image/') ? (
                                                <Image source={{ uri: file.uri }} style={styles.previewImage} />
                                            ) : (
                                                <View style={styles.genericFileContainer}>
                                                    <Ionicons name="document-text-outline" size={55} color="grey" />
                                                </View>
                                            )}
                                            <TouchableOpacity
                                                style={styles.closeButton}
                                                onPress={() => eliminarImagen(index)}
                                            >
                                                <Ionicons name="close" size={15} color="white" />
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
                            </View>
                            <TouchableOpacity
                                style={styles.checkboxContainer}
                                onPress={() => setTermsAccepted(!termsAccepted)}
                            >
                                <Text style={[styles.checkbox, termsAccepted ? styles.checkboxSelected : null]}>{termsAccepted ? '✓' : ''}</Text>
                                <Text style={styles.checkboxText}>Confirmo autenticidad del hecho</Text>
                            </TouchableOpacity>
                            <View style={styles.lineAlign}>
                                <TouchableOpacity style={styles.save} onPress={handleSave}>
                                    <Text style={{ color: "white" }}>Enviar Denunia</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancel} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.colorText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
            <ModalEnviado texto="Denuncia enviada" isVisible={modalEnviado} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalDenunciasVisible}
                onRequestClose={() => {
                    setModalVisible(!modalDenunciasVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.comercioView}>
                        {selectedDenuncia && (
                            <>
                                <View style={{ maxWidth: '100%', overflow: 'hidden', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                                    <CarousellImagenes idServicio={selectedDenuncia.idDenuncias} tipo={"denuncias"} />
                                </View>
                                <View style={styles.contentView}>
                                    <Text style={styles.comercioTitulo}>Denuncia #{selectedDenuncia.idDenuncias}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons name="person" size={20} color="#7E7E7E" />
                                        <Text style={styles.comercioProveedor}>Denuncia vecinal a {selectedDenuncia.denunciaDenunciado[0]?.nombre}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons name="location" size={20} color="#7E7E7E" />
                                        <Text style={styles.comercioTelefono}>{selectedDenuncia.denunciaDenunciado[0]?.direccion}</Text>
                                    </View>
                                    <Text style={styles.comercioDescripcion}>{selectedDenuncia.descripcion}</Text>
                                    <View style={{ paddingTop: 15 }}>
                                        <Text style={styles.titulo}>Estado</Text>
                                        <ScrollView>
                                            <View style={styles.estadoContainer}>
                                                <View>
                                                    <Text style={styles.paso}>{selectedDenuncia.estado?.paso || '1'}</Text>
                                                </View>
                                                <View style={styles.estadoTextos}>
                                                    <Text>{selectedDenuncia.estado || 'Descripción no disponible'}</Text>
                                                    <Text style={{ color: "grey" }}>Responsable: {selectedDenuncia.movimientosDenuncia[selectedDenuncia.movimientosDenuncia.length - 1]?.responsable || 'No disponible'}</Text>
                                                    <Text style={{ color: "grey" }}>Causa: {selectedDenuncia.movimientosDenuncia[selectedDenuncia.movimientosDenuncia.length - 1]?.causa || 'No disponible'}</Text>
                                                    <Text style={{ color: "grey" }}>
                                                        Ultima actualizacion: {
                                                            selectedDenuncia.movimientosDenuncia.length > 0 && !isNaN(new Date(selectedDenuncia.movimientosDenuncia[selectedDenuncia.movimientosDenuncia.length - 1]?.fecha).getTime())
                                                                ? formatDate(new Date(selectedDenuncia.movimientosDenuncia[selectedDenuncia.movimientosDenuncia.length - 1]?.fecha), 'dd/MM/yyyy HH:mm')
                                                                : 'No disponible'
                                                        }
                                                    </Text>                                            
                                                    </View>
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                            </>
                        )}
                        <TouchableOpacity title="Cerrar" style={styles.cerrarBtn} onPress={() => setModalDenunciasVisible(false)}>
                            <Text style={styles.cerrarBtnText}>Cerrar</Text>
                        </TouchableOpacity>
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
        color: '#fd746c',
    },
    tituloModal: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fd746c',
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
        height: 40,
        borderColor: 'gray',
        backgroundColor: '#FFFF',
        borderWidth: 0,
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
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: 'center',
        borderColor: '#fd746c',
        borderRadius: 12,
        borderWidth: 1,
        height: 20,
        justifyContent: 'center', // Añade esto
        alignItems: 'center', // Añade esto
        marginRight: 10,
        width: 20,
    },
    checkboxSelected: {
        backgroundColor: '#fd746c',
        color: '#fff',
        textAlign: 'center',
    },
    checkboxText: {
        maxWidth: '80%',
        color: '#7E7E7E',
        marginRight: 10,
    },
    inRowAlign: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
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
        height: 300,
        gap: 20,
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
        maxHeight: 80, // Adjust the height as needed
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
        fontSize: 20, // Larger font size
        fontWeight: 'bold', // Bold font
        marginBottom: 10, // Add some margin to the bottom
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
    // filterAlign: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-evenly',
    //     alignItems: 'center',
    //     width: '100%'
    // },
    // searchSection: {
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#fff',
    // },
    searchIcon: {
        padding: 10,
    },
    // inputSearch: {
    //     flex: 1,
    //     paddingTop: 10,
    //     paddingRight: 10,
    //     paddingBottom: 10,
    //     paddingLeft: 0,
    //     backgroundColor: '#fff',
    //     color: '#424242',
    // },
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
        backgroundColor: '#fd746c',
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
    estadoContainer: {
        backgroundColor: '#ecf0f1',
        padding: 10,
        borderRadius: 5,
        borderColor: '#fd746c',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5,
    },
    paso: {
        backgroundColor: '#fd746c',
        color: 'white',
        borderRadius: 50,
        padding: 5,
        width: 30,
        height: 30,
        textAlign: 'center',

    },
    estadoTextos: {
        width: '80%',
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
    save: {
        backgroundColor: '#fd746c',
        padding: 10,
        borderRadius: 10,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
    },



});

export default Denuncias;