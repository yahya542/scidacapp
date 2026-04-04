import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile } from '../../utils/api';

const API_BASE_URL = 'https://sajakcodingan.biz.id/studora';

export default function EditProfileScreen({ navigation }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    no_hp: '',
    alamat: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const data = JSON.parse(storedUserData);
          setFormData({
            username: data.username || '',
            email: data.email || '',
            no_hp: data.no_hp || '',
            alamat: data.alamat || ''
          });
        }
      } catch (error) {
        console.error('Gagal mengambil data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/api/auth/profile/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        await AsyncStorage.setItem('userData', JSON.stringify(formData));
        Alert.alert('Sukses', 'Profil berhasil diperbarui!');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Gagal menyimpan profil');
      }
    } catch (error) {
      console.error('Gagal menyimpan:', error.message);
      Alert.alert('Error', 'Gagal menyimpan profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={formData.username}
        onChangeText={text => setFormData({ ...formData, username: text })}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={formData.email}
        onChangeText={text => setFormData({ ...formData, email: text })}
        keyboardType="email-address"
      />

      <Text style={styles.label}>No HP</Text>
      <TextInput
        style={styles.input}
        value={formData.no_hp}
        onChangeText={text => setFormData({ ...formData, no_hp: text })}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Alamat</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={formData.alamat}
        onChangeText={text => setFormData({ ...formData, alamat: text })}
        multiline
      />

      <Button title="Simpan" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20, backgroundColor: '#fff', flexGrow: 1,
  },
  label: {
    marginBottom: 5, color: 'gray', fontWeight: 'bold',
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 10, marginBottom: 15,
  }
});
