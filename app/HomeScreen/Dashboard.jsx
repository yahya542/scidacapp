import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();  // Menggunakan useNavigation dengan benar

  const ref = useRef(null);

  const renderCard = (card) => (
    <TouchableOpacity
      key = {card.id}
      style={styles.card}
      onPress={() => {
        if (card.id === '1') { navigation.navigate('db_math'); }
        else if (card.id === '2') { navigation.navigate('db_islamic'); }
        else if (card.id === '3') { navigation.navigate('db_science'); }
        else if (card.id === '4') { navigation.navigate('db_shop'); }
        else if (card.id === '5') { navigation.navigate('db_activity'); }
        else if (card.id === '6') { navigation.navigate('db_savings'); }
      }}
    >
      <ImageBackground
        source={card.image ? card.image : require('../../assets/images/scidac.png')}
        style={styles.cardBackground}
        imageStyle={{ borderRadius: 10 }}
      >
        <Text style={styles.cardText}>{card.label}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  const cardData = [
    { id: '1', image: require('../../assets/images/math.png'), },
    { id: '2', image: require('../../assets/images/islamic.png'), },
    { id: '3', image: require('../../assets/images/science.png'), },
    { id: '4', image: require('../../assets/images/store.png'), },
    { id: '5', image: require('../../assets/images/activity.png'), },
    { id: '6', image: require('../../assets/images/money.png'), },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      ref.current?.scrollTo({ x: 300, animated: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log('useEffect dipanggil');
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); 
        console.log('Token:', token); 
        if (!token) {
          console.log('Token tidak ditemukan!');
          // Tindakan lain misalnya logout atau navigasi ke login
          return;
        }





        const response = await fetch('http://deya.my.id/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Failed to fetch data:', response.status);
          return;
        }
        


        const json = await response.json();
        setUser(json.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, []);

  return (
    <View
     style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} >
        {/* Informasi pengguna */}
        <View style={styles.view1}>
          <Image source={require('../../assets/images/scidac.png')} style={styles.image1} resizeMode="contain" />
          <View style={styles.text1}>
            <Text style={{ color: 'white' }}>Hai,</Text>
            <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>
              {user && user.username ? user.username : "User"}
            </Text>
          </View>
        </View>

        {/* Pop-up informasi */}
        <View style={styles.view2}>
         
            <ScrollView horizontal={true} ref={ref}>
              <Text style={styles.box}>isi1</Text>
              <Text style={styles.box}>isi2</Text>
              <Text style={styles.box}>isi3</Text>
              <Text style={styles.box}>isi4</Text>
              <Text style={styles.box}>isi5</Text>
            </ScrollView>
         
        </View>

        {/* Render cards */}
        <View style={styles.view3}>
          <View style={styles.row}>
            {cardData.slice(0, 3).map((card) => renderCard(card))}
            <Text style={{ marginLeft: 35, marginTop: -50, color: 'black' }}>Math</Text>
            <Text style={{ marginRight: 2, marginTop: -50, color: 'black' }}>Islamic</Text>
            <Text style={{ marginRight: 28, marginTop: -50, color: 'black' }}>Science</Text>
          </View>
        </View>

        <View style={styles.view3}>
          <View style={styles.row}>
            {cardData.slice(3, 6).map((card) => renderCard(card))}
            <Text style={{ marginLeft: 35, marginTop: -60, color: 'black' }}>Shop</Text>
            <Text style={{ marginRight: -20, marginTop: -60, color: 'black' }}>Activity</Text>
            <Text style={{ marginRight: 20, marginTop: -60, color: 'black' }}>Savings</Text>

          </View>
        </View>
      </ScrollView >

  
    </View >
  );
}








const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex:1
   
  },
  view1: {
    backgroundColor: 'lightblue',
    width: '90%',
    height: 250,
    justifyContent: 'top',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius:30,
    paddingTop: StatusBar.currentHeight,
    margin: 20,
   
  },
  view2:{
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: "5%",
    borderRadius: 70,
    
  },
  
  view3: {
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    padding: 10,
    marginBottom: -30,
  },
  image1: {
    height: 55,
    marginTop: 45,
    marginLeft: '-85%',
  },
  text1: {
    marginTop: -50,
    color: 'white',
    marginLeft: -200,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  //footer
  
  card: {
    width: '20%', // Menyesuaikan lebar card menjadi 1/3 dari layar
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap', 
  },
  cardBackground: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  
  box: {
    backgroundColor: 'orange',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    width: 200,
    height: 95,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
