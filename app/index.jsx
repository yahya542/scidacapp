import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Untuk cek status login
import { useNavigation } from '@react-navigation/native'; // Ganti expo-router dengan react-navigation
import _layout from './navigation/_layout'; 
import login from './auth/login'; // Import komponen login
import register from './auth/register'; // Import komponen register
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Untuk navigasi stack

function Awal() {
  const [isLogged, setIsLogged] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Menggunakan navigation dari @react-navigation

  useEffect(() => {
    const checkLoginStatus = async () => {
      // Mulai pengecekan token saat komponen dimuat
      const token = await AsyncStorage.getItem('token');
      
      // Tunggu selama 3 detik (3000 ms) setelah pengecekan selesai
      setTimeout(() => {
        if (token) {
          setIsLogged(true); // Jika token ada, berarti sudah login
          navigation.replace('_layout'); // Navigasi ke Layout setelah login
        } else {
          setIsLogged(false); // Jika tidak ada token, berarti belum login
          navigation.replace('login'); // Navigasi ke halaman login
        }
        setLoading(false); // Selesai pengecekan, set loading ke false
      }, 3000); // Tunggu selama 3 detik sebelum melanjutkan navigasi
    };

    checkLoginStatus(); // Menjalankan pengecekan status login
  }, []); // Kosongkan dependensi agar hanya dijalankan sekali setelah komponen dimuat

  if (loading) {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/scidac.png')} style={styles.image} resizeMode='contain' />
        <Text style={styles.heading}>SIDAC</Text>
        <Text style={styles.body}>Study Islamicand Daily Activity</Text>
      </View>
    );
  }

  return null; // Tidak ada tampilan jika sudah selesai pengecekan
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Stack.Navigator initialRouteName='Awal' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Awal" component={Awal} />
      <Stack.Screen name="_layout" component={_layout} />
      <Stack.Screen name="login" component={login} />
      <Stack.Screen name="register" component={register} />
      {/* Tambahkan screen lain sesuai kebutuhan */}
    </Stack.Navigator>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    
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
