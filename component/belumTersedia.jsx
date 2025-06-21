import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';

const ComingSoon = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/studora.png')} // Ganti path sesuai gambar kamu
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Maaf!</Text>
      <Text style={styles.subtitle}>Fitur ini belum tersedia.</Text>
    </SafeAreaView>
  );
};

export default ComingSoon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // putih
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: 'lightblue',
    maxWidth: 300,
  },
});
