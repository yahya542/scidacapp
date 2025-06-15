import { StyleSheet, Text, View, Alert } from 'react-native';
import React from 'react';
import Logout from '../../../component/logout';
import Garis from '../../../component/horizontal';
import { useNavigation } from '@react-navigation/native';
import Edit from '../../../component/edit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseconfig';

function ProfileScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // 1. Logout dari Firebase
      await signOut(auth);

      // 2. Hapus data lokal (opsional, tergantung apa yg kamu simpan)
      await AsyncStorage.clear(); // atau removeItem('userData') jika pakai key tertentu

      // 3. Alert (navigasi otomatis akan dilakukan oleh onAuthStateChanged)
      Alert.alert('Logout berhasil');

    } catch (e) {
      console.error('Logout error:', e);
      Alert.alert('Maaf, logout gagal');
    }
  };

  const handleEdit = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <Edit onPress={handleEdit} name="Edit" />
        <Logout onPress={handleLogout} name="Logout" />
        <View style={styles.foto}></View>
        <Garis />
        <Text style={styles.bio}>Username:</Text>
        <Garis />
        <Text style={styles.bio}>No Hp:</Text>
        <Garis />
        <Text style={styles.bio}>Alamat:</Text>
        <Garis />
        <Text style={styles.bio}>Email:</Text>
        <Garis />
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue',
  },
  wrap: {
    flex: 1, justifyContent: "flex-start", alignItems: "center",
    backgroundColor: 'white', marginTop: 180, width: '100%',
    borderRadius: 50, marginBottom: -50,
  },
  foto: {
    height: 150, width: 150, backgroundColor: "orange",
    borderRadius: 100, marginTop: -100,
  },
  bio: {
    marginLeft: -150, marginTop: 20, color: "orange",
  },
});
