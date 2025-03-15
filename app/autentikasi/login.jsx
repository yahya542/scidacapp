import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';




const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation(); 

  const handleLogin = async () => {
    try {
      // Kirim request login ke API
      const response = await fetch('http://192.168.43.62:8000/api-login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      console.log('Response Status:', response.status);  // Cek status code dari respons
      console.log('Response Data:', data);  // Cek data yang diterima
  
      if (response.ok && data.access) {
        const {access} = data;

        // Simpan token ke AsyncStorage
        await AsyncStorage.setItem('access_token', access);
        console.log('Token saved successfully');
  
        // Redirect ke halaman dashboard
        navigation.navigate('dashboard');

      } else {
        // Jika login gagal, tampilkan pesan error
        setError(data.detail || 'Login failed');
      }
    } catch (error) {
      // Jika terjadi error di dalam try-catch, tampilkan pesan error
      setError('Maaf, terjadi kesalahan');
      console.error(error);  // Log kesalahan untuk debugging
    }
  };

  return (
    <View style={styles.container}>
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
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});


export default Login;