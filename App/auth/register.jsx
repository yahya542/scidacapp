import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseconfig';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigation();

  const alertMsg = (title, m, cb = () => {}) =>
    Alert.alert(title, m, [{ text: 'OK', onPress: cb }]);

  const onReg = async () => {
    if (!email || !username || !pass || !confirm)
      return alertMsg('Registrasi Gagal', 'Semua field wajib diisi.');

    if (pass !== confirm)
      return alertMsg('Registrasi Gagal', 'Konfirmasi password tidak cocok.');

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, pass);

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        username: username,
        createdAt: new Date(),
      });

      alertMsg('Sukses', 'Akun berhasil dibuat!', );
    } catch (e) {
      let m = 'Terjadi kesalahan.';
      if (e.code === 'auth/email-already-in-use') m = 'Email sudah terdaftar';
      if (e.code === 'auth/invalid-email') m = 'Email tidak valid';
      if (e.code === 'auth/weak-password') m = 'Password min. 6 karakter';
      setErr(m);
      alertMsg('Registrasi Gagal', m);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.header}>Buat Akun</Text>
        <Text style={styles.sub}>Daftar untuk mulai belajar 📚</Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={pass}
            onChangeText={setPass}
            secureTextEntry
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Konfirmasi Password"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
            placeholderTextColor="#888"
          />

          {err ? <Text style={styles.error}>{err}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={onReg}>
            <Text style={styles.buttonText}>Daftar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => nav.navigate('Login')}>
            <Text style={styles.loginLink}>Sudah punya akun? Masuk</Text>
          </TouchableOpacity>
          

        </View>
        <Image
          source={require('../../assets/images/register.png')} 
          style={styles.img}
          ></Image>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
  scroll: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 40,
    color : 'white',
  },
  sub: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLink: {
    marginTop: 16,
    textAlign: 'center',
    color: '#333',
  },
  img: {
    height: 100, 
    width:100,
    marginTop: '20%',
  }
});
