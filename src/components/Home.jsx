import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import imagen from '../img/home.png';

const Home = () => {
  return (
    <ImageBackground source={imagen} style={styles.backgroundImage}>
      {/* Add your content here */}
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
});


export default Home;