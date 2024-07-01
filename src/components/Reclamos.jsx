import React, { useState, useCallback, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Modal, Button, TextInput, View, Text, ActivityIndicator, Image, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Picker } from '@react-native-picker/picker';
import getReclamos from '../controllers/reclamos';
import CarousellImagenes from './CarousellImagenes';
import postReclamoInspector from '../controllers/postReclamoInspector';
import postReclamoVecino from '../controllers/postReclamoVecino';
import ModalEnviado from './ModalEnviado';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDate } from 'date-fns';
import getRubros from '../controllers/getRubros';
import getDesperfectos from '../controllers/getDesperfectos';
import getSitios from '../controllers/getSitios';
import getReclamosByRubro from '../controllers/getReclamosByRubro.js';
import NetInfo from '@react-native-community/netinfo';






const Reclamos = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [instalacionAfectada, setInstalacionAfectada] = useState('');
    const [tipoDesperfecto, setTipoDesperfecto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [search, setSearch] = useState('');
    const [rubro, setRubro] = useState('');
    const [loading, setLoading] = useState(true);
    const [modalReclamosVisible, setModalReclamosVisible] = useState(false);
    const [selectedReclamo, setSelectedReclamo] = useState(null);
    const [imagenes, setImagenes] = useState([]);
    const [vistasPrevia, setVistasPrevia] = useState([]);
    const [modalEnviado, setModalEnviado] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [reclamos, setReclamos] = useState([])
    const [rol, setRol] = useState('');
    const [documentoVecino, setDocumentoVecino] = useState('');
    const [legajo, setLegajo] = useState('');
    const [token, setToken] = useState('');
    const [idReclamoCreado, setIdReclamoCreado] = useState('')
    const [rubros, setRubros] = useState([]);
    const [desperfectos, setDesperfectos] = useState([]);
    const [sitios, setSitios] = useState([]);
    const [idDesperfecto, setIdDesperfecto] = useState('');
    const [desperfectosFiltrados, setDesperfectosFiltrados] = useState([]);
    const [rubroFiltro, setRubroFiltro] = useState('');
    const [categoria, setCategoria] = useState('');





    const getData = async () => { try { const value = await AsyncStorage.getItem('logueado'); if (value !== null) { setRol(value); } } catch (e) { console.error('Failed to fetch the data from storage', e); } };
    const getData2 = async () => { try { const value = await AsyncStorage.getItem('legajo'); if (value !== null) { setLegajo(value); } } catch (e) { console.error('Failed to fetch the data from storage', e); } };
    const getData3 = async () => { try { const value = await AsyncStorage.getItem('documento'); if (value !== null) { setDocumentoVecino(value); } } catch (e) { console.error('Failed to fetch the data from storage', e); } };
    const getData4 = async () => { try { const value = await AsyncStorage.getItem('token'); if (value !== null) { setToken(value); } } catch (e) { console.error('Failed to fetch the data from storage', e); } };


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch 'logueado' from AsyncStorage and set it
                const logueadoValue = await AsyncStorage.getItem('logueado');
                if (logueadoValue !== null) {
                    setRol(logueadoValue);
                } else {
                    console.error('Logueado is null');
                }

                // Fetch 'legajo' from AsyncStorage and set it
                const legajoValue = await AsyncStorage.getItem('legajo');
                if (legajoValue !== null) {
                    setLegajo(legajoValue);
                } else {
                    console.error('Legajo is null');
                }

                // Fetch 'documento' from AsyncStorage and set it
                const documentoValue = await AsyncStorage.getItem('documento');
                if (documentoValue !== null) {
                    setDocumentoVecino(documentoValue);
                } else {
                    console.error('Documento is null');
                }

                // Fetch 'token' from AsyncStorage and set it
                const tokenValue = await AsyncStorage.getItem('token');
                if (tokenValue !== null) {
                    setToken(tokenValue);
                } else {
                    console.error('Token is null');
                }

                // Fetch additional data
                if (rol == 'vecino') {
                    await getReclamos(setReclamos);
                } else {
                    const categoria = await AsyncStorage.getItem('categoria');
                    setCategoria(categoria);
                    console.log("categoria", categoria);
                    await getReclamosByRubro(setReclamos, categoria);
                    console.log("byRubro", reclamos)
                }
                await getRubros(setRubros);
                await getDesperfectos(setDesperfectos);
                await getSitios(setSitios);
            } catch (e) {
                console.error('Failed to fetch the data from storage or get additional data', e);
            }
            setLoading(false);
        };
        fetchData();
        const fetchCategoria = async () => {
            if (rol == 'inspector') {

                // Asumiendo que rubros ya ha sido establecido por getRubros
                const rubroEspecifico = rubros.find(rubro => rubro.idRubro == categoria);
                console.log("rubro", rubroEspecifico);
                console.log("rubros", rubros);
                console.log("categoria", categoria);
                if (rubroEspecifico) {
                    console.log("IdRubro:", rubroEspecifico.idRubro, "Categoria:", categoria);
                } else {
                    console.log("No se encontró un rubro que coincida con la categoria.");
                }
            }
        };

        fetchCategoria();
    }
        , []);

    // console.log("reclamos", reclamos)
    // console.log("rubros", rubros)
    // console.log("desperfectos", desperfectos)
    // console.log("sitios", sitios)


    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getReclamos(setReclamos);
        setRefreshing(false);
    }, []);

    const handleSave = async () => {
        const estadoConexion = await NetInfo.fetch();

        const enviarReclamo = async () => {
            console.log(rol);
            let response;
            if (rol === 'vecino') {
                response = await postReclamoVecino(imagenes, documentoVecino, parseInt(instalacionAfectada), parseInt(idDesperfecto), descripcion, token);
            } else {
                response = await postReclamoInspector(imagenes, legajo, instalacionAfectada, tipoDesperfecto, descripcion, token);
            }
            setIdReclamoCreado(response);
            resetFormulario();
        };

        const guardarReclamoLocalmente = async () => {
            const reclamo = {
                rol,
                imagenes,
                documentoVecino,
                legajo,
                instalacionAfectada,
                tipoDesperfecto,
                descripcion,
                token
            };
            // Aquí se guardaría el reclamo en AsyncStorage o en el almacenamiento local de tu elección
            console.log('Reclamo guardado localmente', reclamo);
            resetFormulario();
        };

        const resetFormulario = () => {
            setModalReclamosVisible(false);
            setInstalacionAfectada('');
            setTipoDesperfecto('');
            setDescripcion('');
            setRubro('');
            setImagenes([]);
            setVistasPrevia([]);
            setModalEnviado(true);
        };

        if (!estadoConexion.isConnected) {
            Alert.alert(
                "Sin conexión a Internet",
                "¿Deseas usar datos móviles o guardar el reclamo para enviarlo más tarde?",
                [
                    { text: "Usar datos móviles", onPress: () => enviarReclamo() },
                    { text: "Guardar", onPress: () => guardarReclamoLocalmente() }
                ],
                { cancelable: false }
            );
        } else {
            await enviarReclamo();
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

    const takeImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.cancelled && result.assets && result.assets.length > 0) {
            // Asegurarse de que assets existe y tiene al menos un elemento
            const firstAsset = result.assets[0]; // Acceder al primer objeto de assets
            const nuevasImagenes = [...imagenes, { uri: firstAsset.uri }];
            setImagenes(nuevasImagenes);

            // Actualizar las vistas previas con las nuevas URIs
            const vistasPreviaUrls = nuevasImagenes.map((img) => img.uri);
            setVistasPrevia(vistasPreviaUrls);
        }
    };

    // console.log("lista de reclamos", reclamos)
    const filteredReclamos = reclamos.filter(reclamo =>
        (search === '' || reclamo.descripcion.toLowerCase().includes(search.toLowerCase()) || reclamo.idReclamo.toString().includes(search)) &&
        (rubroFiltro === '' || reclamo.desperfectos.rubro.idRubro === rubroFiltro)
    );

    const filtrarDesperfectosPorRubro = (idRubroSeleccionado) => {
        const desperfectosFiltrados = desperfectos.filter(desperfecto => desperfecto.idRubro === idRubroSeleccionado);
        setDesperfectosFiltrados(desperfectosFiltrados);
    };




    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.filterAlign}>
                <View style={styles.searchSection}>
                    <Ionicons style={styles.searchIcon} name="search" size={20} color="#000" />
                    <TextInput
                        style={styles.inputSearch}
                        placeholder="Buscar por nombre"
                        selectionColor="#2c3e50"
                        onChangeText={text => setSearch(text)}
                    />
                </View>
                {rol === 'vecino' ? (
                    <Picker
                        selectedValue={rubroFiltro}
                        onValueChange={(itemValue) => setRubroFiltro(itemValue)}
                        style={styles.pickerRubro}
                    >
                        <Picker.Item label="Todos los rubros" value="" />
                        {rubros.map((rubro, index) => (
                            <Picker.Item key={index} label={rubro.descripcion} value={rubro.idRubro} />
                        ))}
                    </Picker>
                ) : (
                    <Picker
                        selectedValue={rubroFiltro}
                        onValueChange={(itemValue) => setRubroFiltro(itemValue)}
                        style={styles.pickerRubro}
                    >
                        {rubros.filter(rubro => rubro.idRubro == categoria).map((rubro, index) => (
                            <Picker.Item key={index} label={rubro.descripcion} value={rubro.idRubro} />
                        ))}
                    </Picker>
                )}
            </View>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {loading ? (
                    // Muestra el spinner si los datos aún se están cargando
                    <ActivityIndicator size="large" color="#2c3e50" style={{ marginTop: 20 }} />
                ) : (
                    filteredReclamos.map((reclamo, index) => (
                        <TouchableOpacity key={reclamo.idReclamo} onPress={() => { setSelectedReclamo(reclamo); setModalVisible(true); }}>
                            <View key={reclamo.idReclamo} style={styles.reclamosCard}>
                                <Text style={styles.titulo}>🛠 {reclamo.sitios.descripcion}</Text>
                                <Text style={styles.codigo}>Reclamo N°: {reclamo.idReclamo}</Text>
                                <Text style={styles.direccion}>Rubro: {reclamo.desperfectos.rubro.descripcion}</Text>
                                <Text>Última actualizacion: {reclamo.movimientosReclamo.length > 0 && !isNaN(new Date(reclamo.movimientosReclamo[reclamo.movimientosReclamo.length - 1]?.fecha).getTime()) ? formatDate(new Date(reclamo.movimientosReclamo[reclamo.movimientosReclamo.length - 1]?.fecha), 'dd/MM/yyyy HH:mm') : 'No disponible'}</Text>
                            </View>
                        </TouchableOpacity>

                    ))
                )}
            </ScrollView>
            <TouchableOpacity style={styles.fab} onPress={() => setModalReclamosVisible(true)}>
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
                    <View style={styles.comercioView}>
                        {selectedReclamo && (
                            <>
                                <View style={{ maxWidth: '100%', overflow: 'hidden', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                                    <CarousellImagenes idServicio={selectedReclamo.idReclamo} tipo={"reclamos"} />
                                </View>
                                <View style={styles.contentView}>
                                    <Text style={styles.reclamoId}>Reclamo #{selectedReclamo.idReclamo}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View
                                            style={[
                                                styles.estadoCirculo,
                                                selectedReclamo.estado === 'Pendiente' && styles.pendiente,
                                                selectedReclamo.estado === 'Enviado' && styles.enviado,
                                                selectedReclamo.estado === 'Finalizado' && styles.finalizado,
                                            ]}
                                        />
                                        <Text style={styles.reclamoEstado}>{selectedReclamo.estado}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons style={styles.clock} name="location" size={20} color="#7E7E7E" />
                                        <Text style={styles.ubiReclamo}>{selectedReclamo.sitios.descripcion}</Text>
                                    </View>
                                    <Text style={styles.comercioDescripcion}>{selectedReclamo.descripcion}</Text>

                                    <View style={{ paddingTop: 15 }}>
                                        <Text style={styles.titulo}>Movimiento del reclamo</Text>
                                        <View style={styles.estadoContainer}>
                                            <View style={styles.estadoTextos}>
                                                <Text style={{ color: "grey" }}>Responsable: {selectedReclamo.movimientosReclamo[selectedReclamo.movimientosReclamo.length - 1]?.responsable || 'No disponible'}</Text>
                                                <Text style={{ color: "grey" }}>Causa: {selectedReclamo.movimientosReclamo[selectedReclamo.movimientosReclamo.length - 1]?.causa || 'No disponible'}</Text>
                                                <Text style={{ color: "grey" }}>
                                                    Ultima actualizacion: {
                                                        selectedReclamo.movimientosReclamo.length > 0 && !isNaN(new Date(selectedReclamo.movimientosReclamo[selectedReclamo.movimientosReclamo.length - 1]?.fecha).getTime())
                                                            ? formatDate(new Date(selectedReclamo.movimientosReclamo[selectedReclamo.movimientosReclamo.length - 1]?.fecha), 'dd/MM/yyyy HH:mm')
                                                            : 'No disponible'
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </>
                        )}
                        <TouchableOpacity title="Cerrar" style={styles.cerrarBtn} onPress={() => setModalVisible(false)}>
                            <Text style={styles.cerrarBtnText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <ModalEnviado texto={`Se ha creado tu reclamo con el id ${idReclamoCreado}`} isVisible={modalEnviado} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalReclamosVisible}
                onRequestClose={() => {
                    setModalReclamosVisible(!modalReclamosVisible);
                }}
            >
                <ScrollView>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.tituloModal}>Nuevo reclamo</Text>
                            {rol === 'vecino' ? (
                                <Picker
                                    selectedValue={rubro}
                                    onValueChange={(itemValue) => {
                                        setRubro(itemValue);
                                        filtrarDesperfectosPorRubro(itemValue);
                                    }}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Rubro" value="" enabled={false} />
                                    {rubros.map((rubro, index) => (
                                        <Picker.Item key={index} label={rubro.descripcion} value={rubro.idRubro} />
                                    ))}
                                </Picker>
                            ) : (
                                <Picker
                                    selectedValue={rubro}
                                    onValueChange={(itemValue) => {
                                        setRubro(itemValue);
                                        filtrarDesperfectosPorRubro(itemValue);
                                    }}
                                    style={styles.picker}
                                >
                                    {rubros.filter(rubro => rubro.idRubro == categoria).map((rubro, index) => (
                                        <Picker.Item key={index} label={rubro.descripcion} value={rubro.idRubro} />
                                    ))}
                                </Picker>
                            )}


                            <Picker
                                selectedValue={instalacionAfectada}
                                onValueChange={(itemValue) => setInstalacionAfectada(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Sitio" value="" enabled={false} />
                                {sitios.map((sitio, index) => (
                                    <Picker.Item key={index} label={sitio.descripcion} value={sitio.idSitio} />
                                ))}
                            </Picker>

                            <Picker
                                selectedValue={tipoDesperfecto}
                                onValueChange={(itemValue) => {
                                    setTipoDesperfecto(itemValue);
                                    setIdDesperfecto(itemValue);
                                }}
                                style={styles.picker}
                            >
                                <Picker.Item label="Desperfecto" value="" enabled={false} />
                                {/* Asegúrate de que desperfectos sea la lista filtrada basada en el rubro seleccionado */}
                                {desperfectosFiltrados.map((desperfecto, index) => (
                                    <Picker.Item key={index} label={desperfecto.descripcion} value={desperfecto.idDesperfecto} />
                                ))}
                            </Picker>

                            <TextInput style={styles.input} placeholder="Informacion adicional" onChangeText={setDescripcion} multiline={true}
                                numberOfLines={4} selectionColor="#2c3e50" />
                            <TouchableOpacity style={styles.addImg} onPress={pickImage}>
                                <Ionicons name="attach" size={20} color="grey" />
                                <Text style={styles.colorText}>Adjuntar imagenes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.addImg} onPress={takeImage}>
                                <Ionicons name="camera" size={20} color="grey" />
                                <Text style={styles.colorText}> Tomar foto</Text>
                            </TouchableOpacity>
                            <Text style={styles.colorText}>*Máximo 7 fotos*</Text>
                            <View style={styles.previewContainer}>
                                {vistasPrevia.map((imgUri, index) => (
                                    <View key={index} style={styles.imageContainer}>
                                        <Image
                                            source={{ uri: imgUri + '?time=' + new Date() }}
                                            style={styles.previewImage}
                                        />
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
                                    <Text style={{ color: "white" }}>Enviar reclamo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancel} onPress={() => setModalReclamosVisible(false)}>
                                    <Text style={styles.colorText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    reclamosCard: {
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
        backgroundColor: '#2c3e50',
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
        color: '#2c3e50',
    },
    tituloModal: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2c3e50',
    },
    codigo: {
        fontSize: 15,
        color: '#888',
    },
    direccion: {
        fontSize: 15,
        color: '#888',
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
        width: '95%', // Larger width
        gap: 10
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
    comercioTitulo: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2c3e50',
    },
    comercioProveedor: {
        fontSize: 20,
        color: '#2c3e50',
    },
    comercioTelefono: {
        fontSize: 20,
        color: '#2c3e50',
    },
    comercioDescripcion: {
        fontSize: 20,
        color: '#2c3e50',
    },
    carouselImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    reclamoId: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2c3e50',
    },
    reclamoNombre: {
        fontSize: 20,
        color: '#2c3e50',
    },
    ubiReclamo: {
        fontSize: 20,
        color: '#2c3e50',
    },
    clock: {
        marginRight: 5,
    },
    reclamoEstado: {
        fontSize: 20,
        color: '#2c3e50',
    },
    cerrarBtn: {
        backgroundColor: '#2c3e50',
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
        backgroundColor: '#2c3e50',
        padding: 10,
        borderRadius: 10,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    estadoCirculo: {
        width: 20,
        height: 20,
        borderRadius: 50,
        marginRight: 5,
    },
    pendiente: {
        backgroundColor: '#DED14B',
    },
    enviado: {
        backgroundColor: '#4E90DE',
    },
    finalizado: {
        backgroundColor: '#7EDE4E',
    },

});

export default Reclamos;