import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Card = ({ title }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );



  const Perfil = ({ nombre, apellido, email, onPasswordChange }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
  
    const handleChangePassword = () => {
      onPasswordChange(oldPassword, newPassword);
      setModalVisible(false);
    };
    return (
      <View style={styles.container}>
        <View style={styles.profileIcon}>
          <Ionicons name="person-circle" size={100} color="#4bdaa3" />
        </View>
        <Text style={styles.name}>{nombre} {apellido}</Text>
        <Text style={styles.mail}>{email}</Text>
        <Card title="Mi comercio" />
        <Card title="Mi servicio" />
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
            <Button title="Cambiar" onPress={handleChangePassword} />
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
});

export default Perfil;