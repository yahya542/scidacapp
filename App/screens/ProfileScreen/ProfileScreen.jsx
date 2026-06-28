import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Logout from '../../../component/logout';
import Garis from '../../../component/horizontal';
import { useNavigation } from '@react-navigation/native';
import Edit from '../../../component/edit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile, logout as apiLogout } from '../../utils/api';
import { useAuth } from '../../index';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { checkAuth } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
        const profileResult = await getProfile();
        if (profileResult.success) {
          setUserData(profileResult);
        }
      } catch (error) {
        console.log('Gagal ambil data user:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await apiLogout();
      checkAuth();
      Alert.alert('Logout berhasil', '', [
        { text: 'OK', onPress: () => navigation.getParent()?.reset({ index: 0, routes: [{ name: 'Login' }] }) }
      ]);
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

        {loading ? (
          <Text style={styles.bio}>Memuat data...</Text>
        ) : userData ? (
          <>
            <Text style={styles.bio}>Username: </Text> 
            <Text style={styles.isi}>{userData.username}</Text>
            <Garis />
            <Text style={styles.bio}>No Hp:</Text>
            <Text style={styles.isi}> {userData.noHp || '-'}</Text>
            <Garis />
            <Text style={styles.bio}>Alamat:</Text>
            <Text style={styles.isi}   > {userData.alamat || '-'}</Text>
            <Garis />
            <Text style={styles.bio}>Email: </Text>
             <Text style={styles.isi}   > {userData.email}</Text>
            <Garis />
          </>
        ) : (
          <Text style={styles.bio}>Data user tidak ditemukan.</Text>
        )}
      </View>
    </View>
  );
}

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
    marginLeft: -150, marginTop: 20, color: "orange", width: 100, fontWeight: "bold",
  },
  isi : {
    marginLeft: 50, marginTop: -20, color: "lightblue",
  },
});
