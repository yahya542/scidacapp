import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';



const islamic = () => {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.sv}>
      <View style={styles.container}>
        <View style={styles.view1}>
          <TouchableOpacity onPress={() => navigation.navigate('surah')}>
            <Image
              style={styles.img1}
              source={require('../../../assets/images/quran.png')}
            />
            <Text style={styles.text1}>Qur'an</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view1}>
          <TouchableOpacity>
            <Image
              style={styles.img2}
              source={require('../../../assets/images/tasbih.png')}
            />
            <Text style={styles.text1}>Ratib dan Dzikir</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view1}>
          <TouchableOpacity>
            <Image
              style={styles.img2}
              source={require('../../../assets/images/praying.png')}
            />
            <Text style={styles.text1}>Jadwal Shalat</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view1}>
          <TouchableOpacity>
            <Image
              style={styles.img2}
              source={require('../../../assets/images/kalender.png')}
            />
            <Text style={styles.text1}>Kalender Hijriyah</Text>
          </TouchableOpacity>
        </View>


        



      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sv: {
    flexGrow: 1,
    backgroundColor: "#007C6C", // Background untuk ScrollView
  },
  container: {
    alignItems: 'center',
    justifyContent: "center",
    paddingTop: 20, // Menghindari konten langsung terjepit di bagian atas
  },
  view1: {
    backgroundColor: "beige",
    width: '60%',
    height: 200, // Mengatur tinggi card menjadi lebih pasti
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 30,
    borderWidth: 5,
    borderColor: '#D2B48C',
  },
  img1: {
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems:"center",
  },
  img2:{
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems:"center",
    marginLeft:"18%"

  },
  text1: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold', // Perbaiki penulisan fontWeight
    marginLeft: "3%",
  },

});

export default islamic;