import React, {useEffect} from 'react';
import { Text, View, StyleSheet , Image } from 'react-native';
import {useNavigation} from 'expo-router'; 
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const Index = () => {
  const navigation = useNavigation();

  // Menggunakan useEffect untuk memulai timer
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate( 'autentikasi/login');  // Navigasi ke halaman Dashboard setelah 3 detik
    }, 2000);  // Set timer selama 3 detik

    // Cleanup timer ketika komponen unmount
    return () => clearTimeout(timer);

}, [navigation]) ; 


  return (
    <View style={styles.container}>
      

      <View style={styles.isi}>
        <Image
          source = {require('../assets/images/scidac.png')}
          style={styles.image}
          resizeMode='contain'
        />
      </View>
      <Text style={styles.heading}>SCIDAC</Text>
      <Text style={styles.body}>Science and Daily Activity </Text>
      
    </View>
  );
};

<Stack.Navigator screenOptions={{ headerShown: false }} headerMode="none">
  <Stack.Screen name="index" component={Index} />
</Stack.Navigator>






const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white', 
    
  },
  heading: {
    marginTop: -30 , 
    fontSize: 40,
    fontWeight: 'bold', 
    color: "orange", 
  },
  body: {
    fontSize: 18,
    color: "slategray", 
  },
  isi: {
    marginTop:150, 
    alignItems: 'center',
    backgroundColor: 'white', 
    padding: 30,
    justifyContent:"center", 
    
  }, 
  image: {
    height: 200, 
  }, 
});

export default Index; 