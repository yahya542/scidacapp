import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

const Ayat = ({ route }) => {
  const { id } = route.params;
  const [surahInfo, setSurahInfo] = useState({});
  const [ayat, setAyat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch(`https://equran.id/api/v2/surat/${id}`)
    .then((response) => response.json())
    .then((json) => {
      // Ambil data dari json.data
      const res = json.data; 
      
      setSurahInfo({
        nomor: res.nomor,
        nama: res.nama,
        namaLatin: res.namaLatin,
        jumlahAyat: res.jumlahAyat, 
        arti: res.arti,// API V2 menggunakan jumlahAyat (camelCase)
      });
      setAyat(res.ayat);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });
}, [id]);

  if (loading) {
    return (
      <View style={styles.loading}>
       <Image source={require('../../../../assets/images/quran.png')} style={styles.logoImage} />
        <Text style="{styles.lt}">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
     
        <View style={styles.surahInfo}>
          <Text style={styles.title}>
           {surahInfo?.namaLatin} ({surahInfo?.nama})
          </Text>
          <Text >Surah ke : {surahInfo?.nomor}</Text>
          <Text>Jumlah Ayat: {surahInfo?.jumlahAyat}</Text>
          <Text>Arti: {surahInfo?.arti}</Text>
        </View>

        {/* Ayat-ayat */}
        {ayat.map((item) => (
          <View key={item.nomorAyat.toString()} style={styles.ayatBox}>
            <Text style={styles.nomorAyat}>Ayat {item.nomorAyat}</Text>
            <Text style={styles.arab}>{item.teksArab}</Text>
            <Text style={styles.terjemah}>{item.teksIndonesia}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};


export default Ayat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F8FF',
  },
  surahInfo: {
    backgroundColor: '#21ABA5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ayatBox: {
    backgroundColor: 'beige',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 1,
  },
 
  nomorAyat: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  arab: {
    fontSize: 22,
    textAlign: 'right',
    marginBottom: 8,
  },
  terjemah: {
    fontSize: 16,
    color: '#333',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
  },
  lt: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },


  //loading
  logoImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#21ABA5',
    backgroundColor: '#ffff',
    elevation: 5,
  },
});
