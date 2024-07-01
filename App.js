import { useLocation } from 'react-router-native';
import { Link } from 'react-router-native';
import { NativeRouter as Router, Route, Routes } from 'react-router-native';
import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Badge } from 'react-native-elements';
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';


import Comercios from './src/components/Comercios';
import Servicios from './src/components/Servicios';
import Reclamos from './src/components/Reclamos';
import Denuncias from './src/components/Denuncias';
import Login from './src/components/Login';
import Home from './src/components/Home';
import Perfil from './src/components/Perfil';
import Notificaciones from './src/components/Notificaciones';
import getNotificacionesVecino from './src/controllers/getNotificacionesVecino';
import getNotificacionesInspector from './src/controllers/getNotificacionesInspector';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keyboard } from 'react-native';





const App = () => {
  const drawer = useRef(null);
  const [drawerPosition] = useState('left');
  const [logueado, setLogueado] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(true);
  const [nombre, setNombre] = useState('');
  const [notificaciones, setNotificaciones] = useState([])
  const [documentoVecino, setDocumentoVecino] = useState('')
  const [legajo, setLegajo] = useState('')

  // const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch 'nombre' from AsyncStorage
        const nombreValue = await AsyncStorage.getItem('nombre');
        if (nombreValue !== null) {
          setNombre(nombreValue);
        } else {
          console.log('Nombre is null');
        }
  
        // Fetch 'documento' and 'legajo' from AsyncStorage
        const documentoValue = await AsyncStorage.getItem('documento');
        const legajoValue = await AsyncStorage.getItem('legajo');
        const rol = await AsyncStorage.getItem('logueado');
  
        if (rol === 'vecino') {
          setDocumentoVecino(documentoValue);
          console.log("documentoVecino", documentoValue);
  
          // Fetch notifications using the documento value
          const response = await getNotificacionesVecino(documentoValue);
          setNotificaciones(response);
        } else {
          const response = await getNotificacionesInspector(legajoValue);
          setNotificaciones(response);
        }
      } catch (e) {
        console.error('Failed to fetch the data from storage or get notifications', e);
      }
    };
  
    fetchData();
  
    // Consider adding a polling mechanism or WebSocket listener here if you need real-time updates
  }, []); // Add dependencies if needed, for example, if notifications should be fetched when a certain state changes.

useEffect(() => {
  const keyboardDidShowListener = Keyboard.addListener(
    'keyboardDidShow',
    () => setKeyboardVisible(false)
  );
  const keyboardDidHideListener = Keyboard.addListener(
    'keyboardDidHide',
    () => setKeyboardVisible(true)
  );

  return () => {
    keyboardDidShowListener.remove();
    keyboardDidHideListener.remove();
  };
}, []);

const cargarNotificaciones = async (rol) => {
  try {
    if (rol === 'vecino') {
      // Suponiendo que existe una función para obtener las notificaciones del vecino
      const documentoValue = await AsyncStorage.getItem('documento');
      const response = await getNotificacionesVecino(documentoValue);
      setNotificaciones(response);
    } else if (rol === 'inspector') {
      // Suponiendo que existe una función para obtener las notificaciones del inspector
      const legajoValue = await AsyncStorage.getItem('legajo');
      const response = await getNotificacionesInspector(legajoValue);
      setNotificaciones(response);
    }
  } catch (e) {
    console.error('Error al cargar las notificaciones', e);
  }
};


useEffect(() => {
  const fetchLogueado = async () => {
    const value = await AsyncStorage.getItem('logueado');
    console.log("Este es el valor que ingresa:", value);
    if (value == 'vecino') {
      setLogueado("vecino");
      console.log('entra en veinooo');
    }
    if (value == 'inspector') {
      setLogueado("inspector");
      console.log('Entro aca');
    }

    if (value == null || value === 'false') {
      setLogueado(false);
      console.log('no logueado');
    }
  };

  fetchLogueado();
}, []);

const handleLogin = () => {
  AsyncStorage.getItem('logueado').then((value) => {
    if (value == 'vecino') {
      setLogueado('vecino');
      cargarNotificaciones('vecino');
    } else if (value == 'inspector') {
      setLogueado('inspector');
      cargarNotificaciones('inspector');
    } else {
      setLogueado(false);
    }
  }
  );
};


const handleLogout = async () => {
  await AsyncStorage.setItem('logueado', 'false');
  await AsyncStorage.setItem('nombre', '');
  await AsyncStorage.setItem('documento', '');
  await AsyncStorage.setItem('legajo', '');
  await AsyncStorage.setItem('notificaciones', '');
  setNotificaciones([]);
  setNombre('');
  setDocumentoVecino('');
  setLegajo('');
  setLogueado(false);
  setModalVisible(false);

};

const NotificacionesIcono = ({ notificaciones }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="notifications" size={30} color="#decf35" />
      <Badge value={notificaciones.length} status="error" containerStyle={{ position: 'absolute', top: -4, right: -4 }} />
    </View>
  );
};


const navigationView = () => (


  <View style={[styles.container, styles.navigationContainer]}>
    {logueado == false && (
      <>
        <Link to="/" onPress={() => drawer.current.closeDrawer()}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="home" size={30} color="#57B27E" />
            <Text style={styles.link}>Home</Text>
          </View>
        </Link>
      </>
    )}
    <Link to="/comercios" onPress={() => drawer.current.closeDrawer()}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="cart" size={30} color="#3072ff" />
        <Text style={styles.link}>Comercios</Text>
      </View>
    </Link>
    <Link to="/servicios" onPress={() => drawer.current.closeDrawer()}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="briefcase" size={30} color="#ff834e" />
        <Text style={styles.link}>Servicios</Text>
      </View>
    </Link>
    {((logueado == "vecino") || (logueado == "inspector")) && (
      <>
        <Link to="/reclamos" onPress={() => drawer.current.closeDrawer()}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="construct" size={30} color="#2c3e50" />
            <Text style={styles.link}>Reclamos</Text>
          </View>
        </Link>
      </>
    )}
    {logueado == "vecino" && (
      <>
        <Link to="/denuncias" onPress={() => drawer.current.closeDrawer()}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="alert-circle" size={30} color="#fd746c" />
            <Text style={styles.link}>Denuncias</Text>
          </View>
        </Link>
      </>
    )}
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      {logueado === "vecino" || logueado === "inspector" ? (
        <>
          <Link to="/notificaciones" onPress={() => drawer.current.closeDrawer()}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <NotificacionesIcono notificaciones={notificaciones} />
              <Text style={styles.link}>Notificaciones</Text>
            </View>
          </Link>
          <Link to="/perfil" onPress={() => drawer.current.closeDrawer()}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="person-circle-outline" size={30} color="#57B27E" />
              <Text style={styles.link}>Mi perfil</Text>
            </View>
          </Link>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="log-out" size={30} color="#fd746c" />
              <Text style={styles.link}>Cerrar sesión</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <Link to="/login" onPress={() => drawer.current.closeDrawer()}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="log-in" size={30} color="#4bdaa3" />
            <Text style={styles.link}>Ingresar</Text>
          </View>
        </Link>
      )}
    </View>
  </View>
);



const AppBarTitle = () => {
  const location = useLocation();
  let appBarColor;
  let titulo;

  switch (location.pathname) {
    case '/':
      appBarColor = '#57B27E';
      titulo = 'Home';
      break;
    case '/comercios':
      appBarColor = '#3072ff';
      titulo = 'Comercios';
      break;
    case '/servicios':
      appBarColor = '#ff834e';
      titulo = 'Servicios';
      break;
    case '/reclamos':
      appBarColor = '#2c3e50';
      titulo = 'Reclamos';
      break;
    case '/denuncias':
      appBarColor = '#fd746c';
      titulo = 'Denuncias';
      break;
    case '/login':
      appBarColor = '#4bdaa3';
      titulo = 'Ingreso';
      break;
    case '/perfil':
      appBarColor = '#57B27E';
      titulo = 'Bienvenido/a ' + nombre;
      break;
    case '/notificaciones':
      appBarColor = '#decf35';
      titulo = 'Notificaciones';
      break;
    default:
      appBarColor = 'grey';
      titulo = 'Home';
  }

  return (
    <View style={[styles.appBar, { backgroundColor: appBarColor }]}>
      <Text style={styles.appBarTitle}>{titulo}</Text>
    </View>
  );
};


return (
  <Router style={[styles.appSpace]}>
    <SafeAreaView style={{ flex: 1 }}>
      <AppBarTitle />
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={navigationView}
      >
        {keyboardVisible && (
          <TouchableOpacity style={styles.menuButton} onPress={() => drawer.current.openDrawer()}>
            <Ionicons name="menu" size={36} color="#fff" />
          </TouchableOpacity>
        )}
        <View>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/comercios" element={<Comercios logueado={logueado} />} />
            <Route path="/servicios" element={<Servicios logueado={logueado} />} />
            <Route path="/reclamos" element={<Reclamos />} />
            <Route path="/denuncias" element={<Denuncias />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/notificaciones" element={<Notificaciones notificaciones={notificaciones} />} />
          </Routes>
        </View>
      </DrawerLayoutAndroid>
      <Modal animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>¿Deseas cerrar sesión?</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.buttonsModal}>
                <Link to="/login" onPress={() => drawer.current.closeDrawer()}>
                  <Button title="Sí" onPress={handleLogout} color={'#fd746c'} />
                </Link>
              </View>
              <View style={styles.buttonsModal}>
                <Button title="No" onPress={() => setModalVisible(false)} />
              </View>
            </View>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  </Router>
);
};

AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({
  modalView: {
    width: '60%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  buttonsModal: {
    margin: 10,
    width: '40%',
  },
  container: {
    flex: 1,
    alignItems: 'left',
    justifyContent: 'flex-start',
    padding: 16, // Aumenta este valor para agregar más espacio en la parte superior
    // marginTop: Constants.statusBarHeight,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  link: {
    padding: 16,
    fontSize: 20,
    textAlign: 'left',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  menuButton: {
    backgroundColor: 'radial-gradient(circle, rgba(44,62,80,1) 0%, rgba(253,116,108,1) 100%)', // Cambia esto al color que quieras
    padding: 10,
    borderTopLeftRadius: 50, // Hace que el botón sea semicircular
    borderTopRightRadius: 50, // Hace que el botón sea semicircular
    width: 100, // Establece el ancho del botón
    height: 50, // Establece la altura del botón
    alignItems: 'center',
    justifyContent: 'center', // Centra el texto dentro del botón
    position: 'absolute', // Posiciona el botón en la parte inferior central
    bottom: 0,
    alignSelf: 'center',
    borderTopWidth: 2, // Agrega un borde de 1 píxel en la parte superior
    borderLeftWidth: 2, // Agrega un borde de 1 píxel en el lado izquierdo
    borderRightWidth: 2, // Agrega un borde de 1 píxel en el lado derecho
    borderColor: '#123050',
    zIndex: 1, // Asegúrate de que el botón esté encima de otras vistas
  },
  menuButtonText: {
    color: 'white', // Cambia esto al color que quieras
  },
  appBar: {
    backgroundColor: "#A8A8A8",
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appBarTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

});


export default App;
