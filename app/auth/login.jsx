import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import _layout from '../navigation/_layout';





const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation();
  const showAlert = (message) => {
    Alert.alert(
      "Login Gagal", // Judul alert
      message, // Pesan alert yang diterima dari parameter
      [
        { text: "OK", onPress: () => console.log("Tombol OK ditekan") }, // Tombol OK
      ],
      { cancelable: false } // Alert tidak bisa dibatalkan dengan menekan di luar alert
    );
  };


  const handleLogin = async () => {
    try {
      // Kirim request login ke API
      const response = await fetch('http://192.168.185.51:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Response Status:', response.status);  // Cek status code dari respons
      console.log('Response Data:', data);  // Cek data yang diterima



      if (response.ok && data.access_token) {
        // Simpan access_token dengan benar
        await AsyncStorage.setItem('token', data.access_token);
        console.log('Token saved successfully');

        // Redirect ke halaman dashboard
        navigation.navigate('_layout');
      } else {
        const errorMessage = data.detail || 'Login failed';
        showAlert(errorMessage);
      }


    } catch (error) {
      // Jika terjadi error di dalam try-catch, tampilkan pesan error
      setError('Maaf, terjadi kesalahan');
      console.error(error);  // Log kesalahan untuk debugging
    }
  };
  const handleregister = async () => {
    navigation.navigate('register')
  }



  return (
    <View style={styles.container}>
      <View >
        <Image source={require('../../assets/images/moon.png')} style={{ width: 100, height: 100, marginBottom: -80, justifyContent: 'center', alignItems: 'center' }} />
        <Image source={require('../../assets/images/login.png')} style={{ width: 100, height: 100, marginBottom: 60, justifyContent: 'center', alignItems: 'center' }} />
      </View>

      <View style={styles.view1}>
        <View style={styles.view2}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.error} > Lupa password? </Text>
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleregister} >
          <Text style={styles.buttonText2}>Belum punya akun? klik disini</Text>
        </TouchableOpacity>

      </View>



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: "lightblue",


  },
  view1: {

    justifyContent: 'center',
    padding: 70,
    backgroundColor: "white",
    height: "80%",
    width: "110%",
    marginBottom: -140,
    borderRadius: 40,


  },
  view2: {

    marginTop: -110,
    marginBottom: 20,


  },
  input: {
    height: 40,
    borderColor: 'lightblue',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 8,
    borderRadius: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    marginTop: -10,
    textAlign: 'right',
    fontSize: 12,
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    borderRadius: 10,
  },
  buttonText2: {
    color: 'slategrey',
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 18,
  },
});


export default Login;