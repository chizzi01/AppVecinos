import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');


const ServicioImagenes = ({ idServicio }) => {
  const [imagenesUrls, setImagenesUrls] = useState([]);
  const [imagenesValidas, setImagenesValidas] = useState([]);

  useEffect(() => {
    const urls = [
      `https://municipio-g8-servidor-production-dcd2.up.railway.app/api/servicios/getImagenes/${idServicio}/1`,
      `https://municipio-g8-servidor-production-dcd2.up.railway.app/api/servicios/getImagenes/${idServicio}/2`,
      `https://municipio-g8-servidor-production-dcd2.up.railway.app/api/servicios/getImagenes/${idServicio}/3`,
      `https://municipio-g8-servidor-production-dcd2.up.railway.app/api/servicios/getImagenes/${idServicio}/4`,
      `https://municipio-g8-servidor-production-dcd2.up.railway.app/api/servicios/getImagenes/${idServicio}/5`,
      `https://municipio-g8-servidor-production-dcd2.up.railway.app/api/servicios/getImagenes/${idServicio}/6`,
      `https://municipio-g8-servidor-production-dcd2.up.railway.app/api/servicios/getImagenes/${idServicio}/7`,
    ];
    setImagenesUrls(urls);
    setImagenesValidas(urls);
  }, [idServicio]);

  const handleImageError = (badUrl) => {
    // Filtrar la URL que causó error
    setImagenesValidas(imagenesValidas.filter(url => url !== badUrl));
  };

  return (
    <View style={{ width: '100%' }}>
      <FlatList
        data={imagenesValidas}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        style={{ width: width }} // Ajustar el width aquí para que coincida con el ancho de la pantalla
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width: width, height: 200, objectFit: 'cover'}} // Asegúrate de que el width de la imagen sea igual al del FlatList
            onError={() => handleImageError(item)}
          />
        )}
        contentContainerStyle={{
          alignItems: 'center',
        }}
      />
    </View>
  );
};

export default ServicioImagenes;