import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CarousellImagenes = ({ idServicio, tipo }) => {
  const [imagenesUrls, setImagenesUrls] = useState([]);
  const [imagenesValidas, setImagenesValidas] = useState([]);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  useEffect(() => {
    const urls = [
      `https://municipio-g8-servidor-production-dcd2.up.railway.app/api/${tipo}/getImagenes/${idServicio}/1`,
      `https://municipio-g8-servidor-production-dcd2.up.railway.app/api/${tipo}/getImagenes/${idServicio}/2`,
      `https://municipio-g8-servidor-production-dcd2.up.railway.app/api/${tipo}/getImagenes/${idServicio}/3`,
      `https://municipio-g8-servidor-production-dcd2.up.railway.app/api/${tipo}/getImagenes/${idServicio}/4`,
      `https://municipio-g8-servidor-production-dcd2.up.railway.app/api/${tipo}/getImagenes/${idServicio}/5`,
      `https://municipio-g8-servidor-production-dcd2.up.railway.app/api/${tipo}/getImagenes/${idServicio}/6`,
      `https://municipio-g8-servidor-production-dcd2.up.railway.app/api/${tipo}/getImagenes/${idServicio}/7`,
    ];
    setImagenesUrls(urls);
  
    // Simulación de validación de imágenes
    // En un caso real, aquí se verificaría la validez de cada imagen
    const imagenesValidas = urls.filter(url => url); // Simulación: todas las URLs son válidas
  
    if (imagenesValidas.length > 0) {
      setImagenesValidas(imagenesValidas);
      setImagenSeleccionada(imagenesValidas[0]);
    } else {
      // No se encontraron imágenes válidas, establecer un fondo gris
      setImagenSeleccionada('https://via.placeholder.com/300/808080/FFFFFF?text=No+image');
    }
  }, [idServicio, tipo]);

  const handleImageError = (badUrl) => {
    // Filtrar la URL que causó error
    const filteredImages = imagenesValidas.filter(url => url !== badUrl);
  
    // Actualizar el estado de imagenesValidas
    setImagenesValidas(filteredImages);
  
    // Si no quedan imágenes válidas, establecer una imagen de fondo gris
    if (filteredImages.length === 0) {
      setImagenSeleccionada('https://via.placeholder.com/300/808080/FFFFFF?text=No+image');
    } else {
      // Si aún quedan imágenes válidas, seleccionar la primera de la lista actualizada
      setImagenSeleccionada(filteredImages[0]);
    }
  };

  const seleccionarImagen = (url) => {
    setImagenSeleccionada(url);
  };

  return (
    <View style={{ width: '100%' }}>
      {/* Carrusel para la imagen seleccionada */}
      <View style={{ width: width, height: 200 }}>
        {imagenSeleccionada && (
          <Image
            source={{ uri: imagenSeleccionada }}
            style={{ width: '100%', height: '100%' }}
            onError={() => handleImageError(imagenSeleccionada)}
          />
        )}
      </View>

      {/* Previsualizaciones de las imágenes */}
      <FlatList
        data={imagenesValidas}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => seleccionarImagen(item)}>
            <Image
              source={{ uri: item }}
              style={{
                width: 60,
                height: 60,
                margin: 10,
                borderRadius: 5,
                borderWidth: imagenSeleccionada === item ? 2 : 0, // Condición para el borde
                borderColor: imagenSeleccionada === item ? '#7E7E7E' : 'transparent', // Color del borde si la imagen está seleccionada
              }}
              onError={() => handleImageError(item)}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default CarousellImagenes;