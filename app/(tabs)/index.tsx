import React from 'react';
import { Text, View, StyleSheet , Image } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SCIDAC</Text>
      <Text style={styles.body}>Science and Daily Activity </Text>

      <Images
        source = {'./assets/scidac.png'}
        style={styles.image}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white', 
    marginTop:60,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold', 
  },
  body: {
    fontSize: 18,
  },
  image: {
    height: 30, 
  }, 
});
