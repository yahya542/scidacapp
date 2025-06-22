import React from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';

const AboutAppScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header Circle */}
      <View style={styles.headerCircle}>
        <Image
          source={require('../../../assets/images/night.png')} // logo kamu
          style={styles.logo}
        />
      </View>

      <Text style={styles.appName}>Studora</Text>
      <Text style={styles.tagline}>Solusi Pintar untuk Pembelajaran Modern</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Deskripsi</Text>
        <Text style={styles.description}>
          Studora adalah aplikasi edukasi yang dirancang untuk membantu kamu belajar, mengelola
          tugas, dan tetap produktif. Dibuat dengan semangat membantu pelajar Indonesia!
        </Text>

        <View style={styles.line} />

        <Text style={styles.label}>Versi Aplikasi</Text>
        <Text style={styles.value}>1.0.0</Text>

        <Text style={styles.label}>Dikembangkan oleh</Text>
        <Text style={styles.value}>Yahya</Text>

        <Text style={styles.label}>Email</Text>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:muhyahyaas@gmail.com')}>
          <Text style={[styles.value, styles.link]}>muhyahyaas@gmail.com</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Kebijakan Privasi</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://studora.com/privacy')}>
          <Text style={[styles.value, styles.link]}>studora.com/privacy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AboutAppScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  headerCircle: {
    backgroundColor: 'lightblue',
    padding: 20,
    borderRadius: 100,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'orange',
    marginTop: 20,
  },
  tagline: {
    fontSize: 14,
    color: '#444',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    elevation: 4,
    shadowColor: '#aaa',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'orange',
    marginTop: 16,
  },
  description: {
    fontSize: 15,
    color: '#333',
    marginTop: 6,
  },
  value: {
    fontSize: 15,
    color: '#333',
    marginTop: 4,
  },
  link: {
    color: 'lightblue',
    textDecorationLine: 'underline',
  },
  line: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
});
