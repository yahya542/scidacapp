import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Tombol from '../../../component/tombol';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

function ProfileScreen () {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      console.log('Token removed successfully');
      Alert.alert('Logout Berhasil');
      navigation.replace('index');
    } catch (e) {
      console.error('logout erorr', e);
      Alert.alert('Maaf logout gagal');
    } 
  }

  return (
    <View style={styles.container}>
      <Tombol onPress={handleLogout}  name="Logout" />
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
});

 
