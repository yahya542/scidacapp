import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  const handleRegister = async () => {
    if (password !== password2) {
      Alert.alert("Error", "Maaf konfirmasi password yang dimasukkan tidak valid");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Error", "Password harus lebih dari 8 karakter");
      return;
    }

    const data = { username, email, password, password2 };

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://192.168.185.51:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const resData = await response.json();
      console.log('Response register:', resData);

      if (response.ok) {
        Alert.alert("Success", "Registration successful, silakan login");
        navigation.navigate('login');
      } else {
        let errorText = '';

        if (resData.message) {
          errorText = resData.message;
        } else {
          for (const key in resData) {
            if (Array.isArray(resData[key])) {
              errorText += `${key}: ${resData[key].join(', ')}\n`;
            } else {
              errorText += `${key}: ${resData[key]}\n`;
            }
          }
        }

        setErrorMessage(errorText.trim());
        Alert.alert("Error", errorText.trim());
      }
    } catch (error) {
      Alert.alert("Error", "Terjadi kesalahan, coba lagi nanti.");
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const masukLogin = () => {
    navigation.navigate('login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoid}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.view1}>
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
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
          <TouchableOpacity
            onPress={handleRegister}
            style={[styles.button, loading && styles.buttonDisabled]}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Register'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={masukLogin} style={{ marginTop: 10 }}>
            <Text style={styles.linkText}>Sudah punya akun? Klik di sini</Text>
          </TouchableOpacity>
        </View>
        <Image
          style={styles.image1}
          source={require('../../assets/images/register.png')} // pastikan path ini benar
          resizeMode="contain"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start', // perbaikan dari 'top'
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'orange',
  },
  view1: {
    backgroundColor: 'white',
    width: '100%',
    maxWidth: 400,
    padding: 25,
    borderRadius: 15,
    marginTop: 50,
    marginBottom: 20,
    elevation: 3, // untuk shadow di Android
    shadowColor: '#000', // shadow di iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: 'orange',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 12,
    borderRadius: 15,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'lightblue',
    width: '100%',
    height: 45,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#a0c4ff',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: 'slategrey',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  image1: {
    height: 180,
    width: 180,
    marginTop: 10,
  },
});
