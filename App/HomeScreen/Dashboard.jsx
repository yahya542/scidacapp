import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundImage from "../../component/fullBackground"



export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();  // Menggunakan useNavigation dengan benar

  const ref = useRef(null);
  const scrollPosition = useRef(0);
  const scrollWidth = useRef(0);

  const renderCard = (card) => (
    <TouchableOpacity
      key={card.id}
      style={styles.card}
      onPress={() => {
        if (card.id === '1') { navigation.navigate('db_study'); }
        else if (card.id === '2') { navigation.navigate('db_activity'); }
        else if (card.id === '3') { navigation.navigate('db_kids'); }
        else if (card.id === '4') { navigation.navigate('db_read'); }
        else if (card.id === '5') { navigation.navigate('db_islamic'); }
        else if (card.id === '6') { navigation.navigate('db_savings'); }
      }}
    >
      <ImageBackground
        source={card.image ? card.image : require('../../assets/images/studora.png')}
        style={styles.cardBackground}
        imageStyle={{ borderRadius: 10 }}
      >
        <Text style={styles.cardText}>{card.label}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  const cardData = [
    { id: '1', image: require('../../assets/images/study.png'), },
    { id: '2', image: require('../../assets/images/game.png'), },
    { id: '3', image: require('../../assets/images/capsules.png'), },
    { id: '4', image: require('../../assets/images/tree.png'), },
    { id: '5', image: require('../../assets/images/islamic.png'), },
    { id: '6', image: require('../../assets/images/lbd.png'), },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current && scrollWidth.current > 0) {
        scrollPosition.current += 1;

        ref.current.scrollTo({
          x: scrollPosition.current,
          animated: false,
        });


        if (scrollPosition.current >= scrollWidth.current) {
          scrollPosition.current = 0;
        }
      }
    }, 16);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log('useEffect dipanggil');
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token);
        if (!token) {
          console.log('Token tidak ditemukan!');
          // Mungkin redirect ke login
          return;
        }

        const response = await fetch('http://192.168.185.51:8000/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          const text = await response.text();
          console.error('Failed to fetch data:', response.status, text);
          return;
        }

        const json = await response.json();
        console.log('User data:', json);
        setUser(json);
      } catch (error) {
        console.error('Error fetch user:', error);
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
            <Text style={{ color: 'white', marginLeft: '40' }}>Hai,</Text>
            <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginLeft: '40' }}>
              {user && user.username ? user.username : "User"}
            </Text>
          </View>
        </View>

        {/* Pop-up informasi */}
        <View style={styles.view2}>

          <ScrollView
            horizontal={true}
            ref={ref}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onContentSizeChange={(w, h) => {
              scrollWidth.current = w;
            }}>
            <BackgroundImage image={require('../../assets/images/isi.jpg')} borderRadius={30} >
              <Text style={styles.box}   ></Text>
            </BackgroundImage>
            <BackgroundImage image={require('../../assets/images/isi1.jpg')}>
              <Text style={styles.box}></Text>
            </BackgroundImage>
            <BackgroundImage image={require('../../assets/images/isi2.jpg')}>
              <Text style={styles.box}></Text>
            </BackgroundImage>
            <BackgroundImage image={require('../../assets/images/isi3.jpg')}>
              <Text style={styles.box}></Text>
            </BackgroundImage>
            <BackgroundImage image={require('../../assets/images/isi4.jpg')}>
              <Text style={styles.box}></Text>
            </BackgroundImage>
            <BackgroundImage image={require('../../assets/images/isi5.jpg')}>
              <Text style={styles.box}></Text>
            </BackgroundImage>

          </ScrollView>

        </View>

        {/* Render cards */}
        <View style={styles.view3}>
          <View style={styles.row}>
            {cardData.slice(0, 3).map((card) => renderCard(card))}
            <Text style={{ marginLeft: 35, marginTop: -50, color: 'black' }}>Math</Text>
            <Text style={{ marginRight: -8, marginTop: -50, color: 'black' }}>play</Text>
            <Text style={{ marginRight: 29, marginTop: -50, color: 'black' }}>capsule</Text>
          </View>
        </View>

        <View style={styles.view3}>
          <View style={styles.row}>
            {cardData.slice(3, 6).map((card) => renderCard(card))}
            <Text style={{ marginLeft: 35, marginTop: -50, color: 'black' }}>tree</Text>
            <Text style={{ marginRight: -29, marginTop: -50, color: 'black' }}>islamic</Text>
            <Text style={{ marginRight: 27, marginTop: -50, color: 'black' }}>leaerbod</Text>

          </View>
        </View>
      </ScrollView >


    </View >
  );
}








const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1

  },
  view1: {
    backgroundColor: 'lightblue',
    width: '90%',
    height: 240,
    justifyContent: 'top',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 30,
    paddingTop: StatusBar.currentHeight,
    margin: 20,


  },
  view2: {
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
    marginTop: 5,
    marginBottom: 20,
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

    margin: 10,
    padding: 20,
    borderRadius: 10,
    width: 200,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
