import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Logout from '../../../component/logout';
import Garis from '../../../component/horizontal';
import { useNavigation } from '@react-navigation/native';
import Edit from '../../../component/edit';
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
  const handleEdit = () => {
    navigation.navigate('EditProfile');
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <Edit onPress={handleEdit}  name="Edit"  />
        <Logout  onPress={handleLogout}  name="Logout"  />
        <View style={styles.foto}>
        </View>
        <Garis/>
        <Text style={styles.bio} >Username:</Text>
        <Garis></Garis>
        <Text style={styles.bio} >No Hp: </Text>
        <Garis></Garis>
        <Text style={styles.bio}>Alamat: </Text>
        <Garis></Garis>
        <Text style={styles.bio}>Email:</Text>
        <Garis></Garis>
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  //top
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  wrap: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems:"center",
    backgroundColor: 'white',
    marginTop: 180,
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


  //mid 
  foto:{
    height:150,
    width:150,
    backgroundColor:"orange",
    borderRadius:100,
    marginTop:-100,
  },
  bio:{
    marginLeft:-150,
    marginTop:20,
    color:"orange",
  },
  



});

 
