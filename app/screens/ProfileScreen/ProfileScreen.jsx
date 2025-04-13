import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Tombol from '../../../component/tombol';
import { useNavigation } from '@react-navigation/native';
import LogoutScreen from './LogoutScreen';

function ProfileScreen () {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('logout');  // Ensure this matches the name in your navigator
  };

  return (
    <View style={styles.container}>
      <Tombol onpress={handleLogout}  name="Logout" />
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
