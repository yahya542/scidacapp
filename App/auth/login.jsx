import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseconfig';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [pass, setPass]         = useState('');
  const [err , setErr]          = useState('');
  const nav = useNavigation();

  const show = (m)=>Alert.alert('Login Gagal',m,[{text:'OK'}]);

  const onLogin = async()=>{
    if(!email||!pass) return show('Semua field wajib diisi.');
    try{
      await signInWithEmailAndPassword(auth,email,pass);
      
    }catch(e){
      let m='Terjadi kesalahan.';
      if(e.code==='auth/user-not-found')m='Email tidak terdaftar';
      if(e.code==='auth/wrong-password')m='Password salah';
      if(e.code==='auth/invalid-email') m='Email tidak valid';
      setErr(m); show(m);
    }
  };

  return(
    <View style={st.wrap}>
      <View style={st.card}>
        <TextInput style={st.inp} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none"/>
        <TextInput style={st.inp} placeholder="Password" value={pass} onChangeText={setPass} secureTextEntry/>
        {err?<Text style={st.err}>{err}</Text>:null}
        <TouchableOpacity style={st.btn} onPress={onLogin}>
          <Text style={st.btntxt}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>nav.navigate('Register')}>
          <Text style={st.link}>Belum punya akun? Daftar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const st=StyleSheet.create({
  wrap:{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'lightblue'},
  card:{width:'85%',padding:24,backgroundColor:'white',borderRadius:16},
  inp:{borderWidth:1,borderColor:'#ccc',borderRadius:8,padding:10,marginBottom:12},
  err:{color:'red',marginBottom:12,textAlign:'center'},
  btn:{backgroundColor:'orange',padding:12,borderRadius:8,alignItems:'center'},
  btntxt:{color:'#fff',fontWeight:'bold'},
  link:{color:'slategray',marginTop:12,textAlign:'center'},
});
