import { StyleSheet, Text, View, StatusBar, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Dashboard() {

  const renderCard = (card) => (
    <TouchableOpacity style={styles.card} key={card.id}>
      <ImageBackground
        source={card.image ? card.image : require('../assets/images/scidac.png')} // Gambar default jika tidak ada gambar
        style={styles.cardBackground}
        imageStyle={{ borderRadius: 10 }} // Menambahkan border radius untuk gambar agar sesuai dengan card
      >
        {/* Jika Anda ingin menampilkan ikon, bisa tetap menggunakan Image */}
        {card.icon && (
          <Image source={card.image} style={styles.cardIcon} /> // Menampilkan ikon
        )}
        <Text style={styles.cardText}>{card.label}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  const cardData = [
    { id: '1',   image: require('../assets/images/math.png') },
    { id: '2',  image: require('../assets/images/islamic.png')},
    { id: '3', image: require('../assets/images/science.png')},
    { id: '4', image: require('../assets/images/store.png')},
    { id: '5', image: require('../assets/images/activity.png')},
    { id: '6', image: require('../assets/images/money.png')},
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <StatusBar hidden={true} />

        <View style={styles.view1}>
          <Image
            source={require('../assets/images/scidac.png')}
            style={styles.image1}
            resizeMode='contain'
          />
          <View style={styles.text1}>
            <Text style={{ color: 'white' }}> Hai,</Text>
            <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>User</Text>
          </View>
        </View>

        {/* view2 */}
        <View style={styles.view2}></View>

        {/* Render cards */}
        <View style={styles.view3}>
          <View style={styles.row}>
            {cardData.slice(0, 3).map(card => renderCard(card))}
            <Text style={ {marginLeft:35, marginTop:-20, color:"black"} }   > Math </Text>
            <Text style={ {marginRight:2, marginTop:-20, color:"black"} }   > Islamic</Text>
            <Text style={ {marginRight:28, marginTop:-20, color:"black"} } > Science</Text>

          </View>
        </View>

        <View style={styles.view3}>
          <View style={styles.row }>
            {cardData.slice(3, 6).map(card => renderCard(card))}
            <Text style={ {marginLeft:35, marginTop:-20, color:"black"} }   > shop </Text>
            <Text style={ {marginRight:-20, marginTop:-20, color:"black"} }   > Activity</Text>
            <Text style={ {marginRight:20, marginTop:-20, color:"black"} } > Tabungan </Text>

          </View>
        </View>

      </ScrollView>

      {/* bottom */}
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
    marginTop: -160,
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
  },
  image1: {
    height: 55,
    marginTop: 15,
    marginLeft: -320,
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
    backgroundColor: '#F8F8F8',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  card: {
    width: '20%',  // Menyesuaikan lebar card menjadi 1/3 dari layar
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 20,
    marginTop:10, 
    marginBottom:30,
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
  cardBackground:{
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',

  },
});
