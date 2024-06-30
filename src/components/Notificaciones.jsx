import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import format from 'date-fns/format';
import getNotificacionesVecino from '../controllers/getNotificacionesVecino';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Notificacion = ({ title, date, type, description }) => {
  const formattedDate = format(new Date(date), 'dd/MM');

  return (
    <View style={styles.notificacion}>
      <Text style={styles.date}>{formattedDate}</Text>
      <View style={styles.details}>
        <Text>{title}</Text>
        <Text>{type}</Text>
        <Text>{description}</Text>
      </View>
    </View>
  );
};

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([])
  const [documentoVecino, setDocumentoVecino] = useState('')
  const getDocumento = async () => { try { const value =  await AsyncStorage.getItem('documento'); if (value !== null) { setDocumentoVecino(value); } } catch (e) { console.error('Failed to fetch the data from storage', e); } };

  useEffect(() => {
    const fetchData = async () => {
        getDocumento()
        response = await getNotificacionesVecino(documentoVecino);
        setNotificaciones(response)
        console.log("a")
        console.log(notificaciones)
    };
    fetchData();
}, []);

  return (
    <SafeAreaView >
      <ScrollView>
      <View style={styles.container}>
        {notificaciones.map((notificacion, index) => (
          <Notificacion
            key={index}
            //title={notificacion.title}
            date={notificacion.fecha}
            //type={notificacion.type}
            description={notificacion.descripcion}
          />
        ))}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  notificacion: {
    flexDirection: 'row',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1
  },
  date: {
    marginRight: 10,
    justifyContent: "center",
    fontSize: 20,
    color: 'grey',
  },
  details: {
    borderLeftWidth: 1,
    borderLeftColor: '#000',
    paddingLeft: 10,
  },
});



export default Notificaciones;