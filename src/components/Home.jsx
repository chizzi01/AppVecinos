import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import imagen from '../img/home.png';
import { useNavigate } from 'react-router-native';


const Home = () => {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();
  return (
    <ImageBackground source={imagen} style={styles.backgroundImage}>
      <View style={styles.loginView}>
        <Text style={styles.loginTitle}>Iniciar sesión como</Text>
        <TouchableOpacity style={styles.buttonVec} onPress={() => { setUserType('vecino'); navigate('/login'); }}>
          <Text style={styles.buttonText}>Vecino</Text>
        </TouchableOpacity>
        <Text>O</Text>
        <TouchableOpacity style={styles.buttonInsp} onPress={() => { setUserType('inspector'); navigate('/login'); }}>
          <Text style={styles.buttonText}>Inspector</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    zIndex: -1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  loginView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    margin: 20,
    borderRadius: 10,
    top: '20%',
    height: '20%',
  },
  loginTitle: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonVec: {
    backgroundColor: '#57B27E',
    padding: 5,
    borderRadius: 10,
    width: '60%',
    alignItems: 'center',
    margin: 5,
  },
  buttonInsp: {
    backgroundColor: '#ff834e',
    padding: 5,
    borderRadius: 10,
    width: '60%',
    alignItems: 'center',
    margin: 5,
  },
});


export default Home;