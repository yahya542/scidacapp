import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseconfig'; // ⬅️ FIXED di sini!
import Dashboard from '../HomeScreen/Dashboard';

export default function Register() {
  const [email, setEmail]     = useState('');
  const [username, setUsername] = useState('');
  const [pass, setPass]       = useState('');
  const [confirm, setConfirm] = useState('');
  const [err, setErr]         = useState('');
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
        createdAt: new Date()
      });

      alertMsg('Sukses', 'Akun berhasil dibuat!' );

    } catch (e) {
      let m = 'Terjadi kesalahan.';
      if (e.code === 'auth/email-already-in-use') m = 'Email sudah terdaftar';
      if (e.code === 'auth/invalid-email')        m = 'Email tidak valid';
      if (e.code === 'auth/weak-password')        m = 'Password min. 6 karakter';
      setErr(m);
      alertMsg('Registrasi Gagal', m);
    }
  };

  return (
    <View style={st.wrap}>
      <View style={st.card}>
        <TextInput style={st.inp} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <TextInput style={st.inp} placeholder="Username" value={username} onChangeText={setUsername} />
        <TextInput style={st.inp} placeholder="Password" value={pass} onChangeText={setPass} secureTextEntry />
        <TextInput style={st.inp} placeholder="Konfirmasi Password" value={confirm} onChangeText={setConfirm} secureTextEntry />
        {err ? <Text style={st.err}>{err}</Text> : null}
        <TouchableOpacity style={st.btn} onPress={onReg}>
          <Text style={st.btntxt}>Daftar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue' },
  card: { width: '85%', padding: 24, backgroundColor: 'white', borderRadius: 16 },
  inp: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  err: { color: 'red', marginBottom: 12, textAlign: 'center' },
  btn: { backgroundColor: 'orange', padding: 12, borderRadius: 8, alignItems: 'center' },
  btntxt: { color: '#fff', fontWeight: 'bold' },
});
