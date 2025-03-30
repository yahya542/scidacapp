import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';




const quran = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]); // Untuk menyimpan data dari API
  const [loading, setLoading] = useState(true); // Untuk status loading
  const [error, setError] = useState(null); // Untuk error jika ada

  // Mengambil data dari API ketika komponen pertama kali dimuat
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://quran-api.santrikoding.com/api/surah');
      const jsonData = await response.json();
      setData(jsonData); // Menyimpan data dari API ke state
      setLoading(false); // Set loading false setelah data selesai diambil
    } catch (error) {
      setError(error.message); // Menangani error
      setLoading(false); // Set loading false jika terjadi error
    }
  };

  // Menampilkan UI
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data} 
        keyExtractor={(item) => item.nomor.toString()} 
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('ayat')}>
          <View style={styles.item}>
            <View style={styles.row}>
            <Text style={styles.nomor}>{item.nomor}</Text>
            <Text style={styles.nl}>{item.nama_latin}</Text>
            <Text style={styles.title}>{item.nama}</Text>
            <Image
                style={styles.image1}
                source={require('../../../../assets/images/download.png')}

            />
            
            </View>
          </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor:"#007C6C",
  },
  row: {
    flexDirection: 'row', // Agar elemen berada dalam satu baris
    justifyContent: 'space-between', // Memberikan jarak antar elemen
    alignItems: 'center', // Menyelaraskan teks secara vertikal
   
    
  },
  item: {
    backgroundColor: 'beige',
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
    elevation: 3, // Untuk shadow
    justifyContent:"space-beetwen",
    
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginRight:"-30%",
    color:"#D2B48C",
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  image1:{
    height:30, 
    width:30,
    borderRadius:5,
  },
  nomor:{
    height:30,
    width:30,
    justifyContent:"center", 
    alignItems:'center',
    borderRadius:50,
    paddingLeft:"2%",
    paddingTop:"1%",
    borderColor:"#D2B48C",
    borderWidth:1,
    color:"#D2B48C",

  },
  nl:{
    marginLeft:"-30%",
    alignItems:"flex-end",
    justifyContent:"flex-end",
  },
});

export default quran;
