import { StyleSheet, Text, View, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function Dashboard() {

  const renderCard = (card) => (
    <TouchableOpacity style={styles.card} key={card.id}>
      {/* Jika Anda ingin menampilkan SVG, Anda bisa menggunakan SvgUri atau Image */}
      {card.icon && (
        <Image source={card.icon} style={styles.cardIcon} /> // Menampilkan ikon
      )}
      <Text style={styles.cardText}>{card.label}</Text>
    </TouchableOpacity>
  );

  const cardData = [
    { id: '1', label: 'Card 1', icon: require('../assets/images/math.svg') }, 
    { id: '2', label: 'Card 2' },
    { id: '3', label: 'Card 3' },
    { id: '4', label: 'Card 4' },
    { id: '5', label: 'Card 5' },
    { id: '6', label: 'Card 6' },
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
          </View>
        </View>

        <View style={styles.view3}>
          <View style={styles.row}>
            {cardData.slice(3, 6).map(card => renderCard(card))}
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
    marginLeft:-320,
  },
  text1: {
    marginTop: -50,
    color: 'white',
    marginLeft:-200, 
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
    height: 120,
    borderColor: 'orange',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    margin: 10,
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
});
