import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseconfig'; // sesuaikan path-nya

export default function EditProfileScreen({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    noHp: '',
    alamat: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            username: data.username || '',
            email: data.email || '',
            noHp: data.noHp || '',
            alamat: data.alamat || ''
          });
        }
      } catch (error) {
        console.error('Gagal mengambil data:', error.message);
      }
    };

    if (user) fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, formData, { merge: true });
      Alert.alert('Sukses', 'Profil berhasil diperbarui!');
      navigation.goBack(); // kembali ke halaman sebelumnya
    } catch (error) {
      console.error('Gagal menyimpan:', error.message);
      Alert.alert('Error', 'Gagal menyimpan profil');
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
        value={formData.noHp}
        onChangeText={text => setFormData({ ...formData, noHp: text })}
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
