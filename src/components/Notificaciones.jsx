import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import format from 'date-fns/format';


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

const Notificaciones = ({ notificaciones }) => {
  return (
    <SafeAreaView >
      <View style={styles.container}>
        {notificaciones.map((notificacion, index) => (
          <Notificacion
            key={index}
            title={notificacion.title}
            date={notificacion.date}
            type={notificacion.type}
            description={notificacion.description}
          />
        ))}
      </View>
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