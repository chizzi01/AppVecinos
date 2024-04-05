import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import theme from './src/theme';
import { useLocation } from 'react-router-native';
import { Link } from 'react-router-native';
import { NativeRouter as Router, Route, Routes, useNavigate } from 'react-router-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons'
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';


import Comercios from './src/components/Comercios';
import Servicios from './src/components/Servicios';
import Reclamos from './src/components/Reclamos';
import Denuncias from './src/components/Denuncias';
import Login from './src/components/Login';
import Home from './src/components/Home';

const App = () => {
  const drawer = useRef(null);
  const [drawerPosition] = useState('left');


  const navigationView = () => (


    <View style={[styles.container, styles.navigationContainer]}>
      <Link to="/" onPress={() => drawer.current.closeDrawer()}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="home" size={30} color="#57B27E" />
          <Text style={styles.link}>Home</Text>
        </View>
      </Link>
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
      <Link to="/reclamos" onPress={() => drawer.current.closeDrawer()}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="construct" size={30} color="#2c3e50" />
          <Text style={styles.link}>Reclamos</Text>
        </View>
      </Link>
      <Link to="/denuncias" onPress={() => drawer.current.closeDrawer()}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="alert-circle" size={30} color="#fd746c" />
          <Text style={styles.link}>Denuncias</Text>
        </View>
      </Link>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Link to="/login" onPress={() => drawer.current.closeDrawer()}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="log-in" size={30} color="#4bdaa3" />
            <Text style={styles.link}>Ingresar</Text>
          </View>
        </Link>
      </View>
    </View>
  );

  const usuario = {
    nombre: 'Juan',
    apellido: 'Perez',
    email: 'juanperez@gmail.com',
    password: 'pepito123',
    dni: '12345678',
    tipo: 'vecino',
    validado: true,
  };

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
        titulo = 'Ingresar';
        break;
      default:
        appBarColor = 'grey';
        titulo = 'Home';
    }
  
    return (
      <View style={[styles.appBar, {backgroundColor: appBarColor}]}>
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
          <TouchableOpacity style={styles.menuButton} onPress={() => drawer.current.openDrawer()}>
            <Ionicons name="menu" size={36} color="#fff" />
          </TouchableOpacity>
          <View>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/home" element={<Home />} />
              <Route path="/comercios" element={<Comercios />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/reclamos" element={<Reclamos />} /> // Asegúrate de que el componente Reclamos está correctamente definido y exportado
              <Route path="/denuncias" element={<Denuncias />} />
              <Route path="/login" element={<Login user={usuario} />} />
            </Routes>
          </View>
        </DrawerLayoutAndroid>
      </SafeAreaView>
    </Router>
  );
};

const styles = StyleSheet.create({
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
