import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseconfig';
import ComingSoon from '../../component/belumTersedia';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigation();

  const show = (m) => Alert.alert('Login Gagal', m, [{ text: 'OK' }]);

  const onLogin = async () => {
    if (!email || !pass) return show('Semua field wajib diisi.');
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (e) {
      let m = 'Terjadi kesalahan.';
      if (e.code === 'auth/user-not-found') m = 'Email tidak terdaftar';
      if (e.code === 'auth/wrong-password') m = 'Password salah';
      if (e.code === 'auth/invalid-email') m = 'Email tidak valid';
      setErr(m);
      show(m);
    }
  };

  return (
    <View style={st.wrap}>
      {/* Gambar Bulan */}
      <Image source={require('../../assets/images/moon.png')} style={st.img} />
      <Image source={require('../../assets/images/depan.png')} style={st.img1} />


      {/* Card Login */}
      <View style={st.card}>
        <Text style={st.title}>Selamat Datang 👋</Text>
        <TextInput style={st.inp} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <TextInput style={st.inp} placeholder="Password" value={pass} onChangeText={setPass} secureTextEntry />
        {err ? <Text style={st.err}>{err}</Text> : null}
        <TouchableOpacity onPress={() => nav.navigate('ComingSoon')} style={st.lp}>
          <Text style={st.lp}>Lupa Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={st.btn} onPress={onLogin}>
          <Text style={st.btntxt}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nav.navigate('Register')}>
          <Text style={st.link}>Belum punya akun? Daftar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  img: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
    backgroundColor: 'white',
    padding: 10,
  },
  img1: {
    width: 100,
    height: 100,
    marginBottom: -40,
    borderRadius: 50,
    padding: 10,
    marginTop: -100,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 60,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    marginTop: '48%',
    height: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: 'orange',
    marginBottom: 16,
    textAlign: 'center',
  },
  inp: {
    borderWidth: 1,
    borderColor: 'lightblue',
    borderRadius: 10,
    padding: 16,
    marginTop: 25,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '10%',
  },
  err: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: 'orange',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '75%',
    marginLeft: '10%',
    marginTop: '10%',
  },
  btntxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#555',
    marginTop: 14,
    textAlign: 'center',
  },
  lp: {
    color: 'red',
    marginLeft: '40%',
    marginTop: '5%',
  }
});
