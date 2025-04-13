import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

function LogoutScreen() {
  const navigation = useNavigation();

  const handleReturnToLogin = () => {
    
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>You have successfully logged out.</Text>
      <Button title="Go to Login" onPress={handleReturnToLogin} />
    </View>
  );
}

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
});
