import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Logout from '../../../component/logout';
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
      <View style={styles.wrap}>
        <Logout  onPress={handleLogout}  name="Logout"  />
        <View>
          
        </View>
      </View>
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
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 80,
    width: '100%',
    borderRadius: 50,
    marginBottom:-50,
  },
  logout: {
    backgroundColor: 'red',
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

 
