import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Alert, TouchableOpacity , Navigation} from 'react-native';
import { createAnimatedPropAdapter } from 'react-native-reanimated';

export default function register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  

  const Stack = createStackNavigator();

  const handleRegister = () => {
    // Validasi di sisi klien
    if (password !== password2) {
      Alert.alert("Error", "maaf konfirmasi password yang dimasukkan tidak valid ");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Error", "Password harus lebih dari 8 character");
      return;
    }

    // Menyiapkan data untuk dikirim ke API
    const data = {
      username,
      email,
      password,
      password2,
    };

    setLoading(true); // Menampilkan loading

    // Kirimkan data ke API
    fetch('http://0.0.0.0:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false); // Matikan loading

        // Cek apakah ada error dari backend
        if (data.message) {
          setErrorMessage(data.message);
          Alert.alert("Error", data.message);
        } else {
          navigation.navigate('dashboard');
        }
      })
      .catch((error) => {
        setLoading(false); // Matikan loading jika ada error
        Alert.alert("Error", "An error occurred. Please try again.");
        console.error('Error:', error);
      });
  };
  const masuklogin = async() => {
    Navigation.navigate('autentikasi/login')
  }

  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={password2}
          onChangeText={setPassword2}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={{ color: "white" }}>Register </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={masuklogin}>
          <Text style={styles.buttonText}>Sudah punya akun? klik disini</Text>
        </TouchableOpacity>
      </View>
      <Image style={styles.image1} source={require('../../assets/images/register.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    padding: 16,
    backgroundColor: "orange",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    backgroundColor: "lightblue",
  },

  input: {
    width: '100%',
    height: 40,
    borderColor: 'orange',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 8,
    borderRadius: 8,
  },

  error: {
    color: 'red',
    marginBottom: 10,
  },
  view1: {
    backgroundColor: "white",
    height: "80%",
    marginTop: -80,
    width: '120%',
    padding: "25%",
    borderRadius: "15%",
    paddingTop: 150,
  },
  button: {
    backgroundColor: "lightblue",
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: "white",
    marginBottom: 10,
    marginTop: 30,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  image1: {
    height: 180,
    width: 180,
    marginTop: 40,
  },
  buttonText:{
    color:"slategrey",
    alignItems:"center",
  },
});
