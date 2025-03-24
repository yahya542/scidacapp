import { StyleSheet, Text, View, StatusBar, Image, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, navigation } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';


export default function dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const navigation = useNavigation();
  // Menampilkan kartu
  const renderCard = (card, index) => (
    <TouchableOpacity
      style={styles.card}
      key={card.id}
      onPress={() => {
        if (card.id === '1') { navigation.navigate('fitur/math/db_math'); }
        else if (card.id === '2') { navigation.navigate('fitur/islamic/db_islamic'); }
        else if (card.id === '3') { navigation.navigate('fitur/science/db_science'); }
        else if (card.id === '4') { navigation.navigate('fitur/shop/db_shop'); }
        else if (card.id === '5') { navigation.navigate('fitur/activity/db_activity'); }
        else if (card.id === '6') { navigation.navigate('fitur/savings/db_savings'); }
        
        
        
      }
        

      }
    >
      <ImageBackground
        source={card.image ? card.image : require('../assets/images/scidac.png')} // Gambar default jika tidak ada gambar
        style={styles.cardBackground}
        imageStyle={{ borderRadius: 10 }} // Menambahkan border radius untuk gambar agar sesuai dengan card
      >
        {card.icon && (
          <Image source={card.image} style={styles.cardIcon} /> // Menampilkan ikon
        )}
        <Text style={styles.cardText}>{card.label}</Text>
      </ImageBackground>
    </TouchableOpacity>
    
  );

  const cardData = [
    { id: '1', image: require('../assets/images/math.png') },
    { id: '2', image: require('../assets/images/islamic.png') },
    { id: '3', image: require('../assets/images/science.png') },
    { id: '4', image: require('../assets/images/store.png') },
    { id: '5', image: require('../assets/images/activity.png') },
    { id: '6', image: require('../assets/images/money.png') },
  ];




  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <StatusBar hidden={true} />

        {/* Tampilkan informasi pengguna yang sedang login */}
        <View style={styles.view1}>
          <Image
            source={require('../assets/images/scidac.png')}
            style={styles.image1}
            resizeMode="contain"
          />
          <View style={styles.text1}>
            <Text style={{ color: 'white' }}>Hai,</Text>
            <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>
              {user && user.username ? user.username : "User"}  {/* Menampilkan nama pengguna */}
            </Text>
          </View>
        </View>

        <View style={styles.view2}></View>

        {/* Render cards */}
        <View style={styles.view3}>
          <View style={styles.row}>
            {cardData.slice(0, 3).map((card, index) => renderCard(card, index))}
            <Text style={{ marginLeft: 35, marginTop: -50, color: 'black' }}>Math</Text>
            <Text style={{ marginRight: 2, marginTop: -50, color: 'black' }}>Islamic</Text>
            <Text style={{ marginRight: 28, marginTop: -50, color: 'black' }}>Science</Text>
          </View>
        </View>

        <View style={styles.view3}>
          <View style={styles.row}>
            {cardData.slice(3, 6).map((card, index) => renderCard(card, index))}
            <Text style={{ marginLeft: 35, marginTop: -60, color: 'black' }}>Shop</Text>
            <Text style={{ marginRight: -20, marginTop: -60, color: 'black' }}>Activity</Text>
            <Text style={{ marginRight: 20, marginTop: -60, color: 'black' }}>Savings</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.fixedFooter}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  view1: {
    backgroundColor: 'orange',
    width: '100%',
    height: 250,
    justifyContent: 'top',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  view2: {
    backgroundColor: 'lightblue',
    width: '85%',
    marginTop: -180,
    marginLeft: 35,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  view3: {
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    padding: 10,
    marginBottom: -40,
  },
  image1: {
    height: 55,
    marginTop: 15,
    marginLeft: '-85%',
  },
  text1: {
    marginTop: -50,
    color: 'white',
    marginLeft: -200,
  },
  scrollContent: {
    paddingBottom: 80, // Memberikan ruang ekstra di bawah untuk footer tetap
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: '12%',
    borderRadius: 20,
  },
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
    flexWrap: 'wrap', // Membuat baris baru jika tidak cukup ruang
  },
  cardBackground: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
