import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cambiarPass from '../controllers/cambiarPass';
import cambiarPassInspector from '../controllers/cambiarPassInspector';


const Card = ({ title }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
  </View>
);



const Perfil = ({ onPasswordChange }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [storedValue, setStoredValue] = useState('');
  const [legajo, setLegajo] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [mail, setMail] = useState('');
  const [rol, setRol] = useState('');

  const getData = async () => { try { const value = await AsyncStorage.getItem('documento'); if (value !== null) { setStoredValue(value); } } catch (e) { console.error('Failed to fetch the data from storage', e); } };
  const getData1 = async () => { try { const value = await AsyncStorage.getItem('nombre'); if (value !== null) { setNombre(value); } } catch (e) { console.error('Failed to fetch the data from storage', e); } };
  const getData2 = async () => { try { const value = await AsyncStorage.getItem('apellido'); if (value !== null) { setApellido(value); } } catch (e) { console.error('Failed to fetch the data from storage', e); } };
  const getData3 = async () => { try { const value = await AsyncStorage.getItem('mail'); if (value !== null) { setMail(value); } } catch (e) { console.error('Failed to fetch the data from storage', e); } };
  const getData4 = async () => { try { const value = await AsyncStorage.getItem('legajo'); if (value !== null) { setLegajo(value); } } catch (e) { console.error('Failed to fetch the data from storage', e); } };
  const getData5 = async () => { try { const value = await AsyncStorage.getItem('logueado'); if (value !== null) { setRol(value); } } catch (e) { console.error('Failed to fetch the data from storage', e); } };


  useEffect(() => {
    getData5();
    getData();
    getData1()
    getData2()
    getData3()
    getData4()
  }, []);

  const handleChangePassword = async () => {
    console.log(rol)
    if (rol === 'vecino') {
      const reponse = await cambiarPass(storedValue, oldPassword, newPassword)
      //onPasswordChange(storedValue, oldPassword, newPassword);
    } else {
      const response = await cambiarPassInspector(legajo, oldPassword, newPassword)
      //onPasswordChange(legajo, oldPassword, newPassword);
    }

    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileIcon}>
        <Ionicons name="person-circle" size={100} color="#4bdaa3" />
      </View>
      <Text style={styles.name}>{nombre} {apellido}</Text>
      <Text style={styles.mail}>{mail}</Text>
      <Card title="Mis comercios" />
      <Card title="Mis servicios" />
      <Card title="Mis denuncias" />
      <Card title="Mis reclamos" />
      <View style={styles.buttonContainer}>
        <Button title="Cambiar contraseña" onPress={() => setModalVisible(true)} color="#4bdaa3" />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={setOldPassword}
              value={oldPassword}
              placeholder="Contraseña anterior"
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              onChangeText={setNewPassword}
              value={newPassword}
              placeholder="Nueva contraseña"
              secureTextEntry
            />
            <View style={styles.lineAlign}>
              <TouchableOpacity style={styles.cambiar} onPress={handleChangePassword}>
                <Text style={{ color: "white" }}>Cambiar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelar} onPress={() => setModalVisible(false)}>
                <Text style={{ color: "white" }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: '100%',
    padding: 20,
  },
  profileIcon: {
    marginBottom: 20,
  },
  name: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  mail: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  card: {
    marginTop: 10,
    width: '100%',
    height: 80,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  input: {
    height: 40,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: '#333',
    borderColor: '#4bdaa3',
  },
  cambiar: {
    backgroundColor: '#4bdaa3',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  lineAlign: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-evenly', // Add space between the buttons
    width: '100%' // Make the buttons take up the full width of the modal
  },
  cancelar: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default Perfil;