import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import format from 'date-fns/format';
import getNotificacionesVecino from '../controllers/getNotificacionesVecino';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Notificacion = ({ date, description }) => {
  const formattedDate = format(new Date(date), 'dd/MM');

  return (
    <View style={styles.notificacion}>
      <Text style={styles.date}>{formattedDate}</Text>
      <View style={styles.details}>
        <Text>{description}</Text>
      </View>
    </View>
  );
};

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([])
  const [documentoVecino, setDocumentoVecino] = useState('')
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const value = await AsyncStorage.getItem('documento');
        if (value !== null) {
          console.log("documentoVecino", value);
          const response = await getNotificacionesVecino(value);
          setNotificaciones(response);
          console.log("notificaciones", response);
        } else {
          console.error('Documento vecino is null');
        }
      } catch (e) {
        console.error('Failed to fetch the data from storage or get notifications', e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView >
      <ScrollView>
        <View style={styles.container}>
          {loading ? (
            // Muestra el spinner si los datos aún se están cargando
            <ActivityIndicator size="large" color="#decf35" style={{ marginTop: 20 }} />
          ) : (

            notificaciones.map((notificacion, index) => (
              <Notificacion
                key={index}
                date={notificacion.fecha}
                description={notificacion.descripcion}
              />
            ))

          )}
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
    paddingRight: 10,
    maxWidth: 250,
  },
});



export default Notificaciones;