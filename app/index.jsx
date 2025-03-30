import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Untuk cek status login
import { useRouter } from 'expo-router'; // Menggunakan expo-router untuk navigasi

const Index = () => {
  const [isLogged, setIsLogged] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Menggunakan router untuk navigasi

  useEffect(() => {
    const checkLoginStatus = async () => {
      // Mengambil token dari AsyncStorage
      const token = await AsyncStorage.getItem('access_token');
      
      if (token) {
        setIsLogged(true); // Jika token ada, berarti sudah login
        router.replace('/_layout'); // Navigasi ke Layout setelah login
      } else {
        setIsLogged(false); // Jika tidak ada token, berarti belum login
        router.replace('/autentikasi/login'); // Navigasi ke halaman login
      }

      setLoading(false); // Selesai pengecekan, set loading ke false
    };

    checkLoginStatus(); // Menjalankan pengecekan status login
  }, [router]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/scidac.png')}
        style={styles.image}
        resizeMode='contain'
      />
      <Text style={styles.heading}>SCIDAC</Text>
      <Text style={styles.body}>Science and Daily Activity</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  heading: {
    marginTop: -30,
    fontSize: 40,
    fontWeight: 'bold',
    color: "orange",
  },
  body: {
    fontSize: 18,
    color: "slategray",
  },
  image: {
    height: 200,
  },
});

export default Index;
