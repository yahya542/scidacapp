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
        <ActivityIndicator size="large" color="#red" />
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
            onPress={() => navigation.navigate('ayat', { id: item.nomor })}>
          <View style={styles.item}>
            <View style={styles.row}>
            <Text >{item.nomor}</Text>
            <Text style={styles.nl}>{item.nama_latin}</Text>
          
            </View>
            <View style={styles.row2}>
            <Text style={styles.title}>{item.nama}</Text>
          
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
    backgroundColor:"#21ABA5", 
  },
  row: {
    flexDirection: 'row', // Agar elemen berada dalam satu baris
    alignItems: 'center', // Menyelaraskan teks secara vertikal
    
  },
  row2: {
    flexDirection: 'row', // Agar elemen berada dalam satu baris
    alignItems: 'flex-end', // Menyelaraskan teks secara vertikal
    
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
    elevation: 3, // Untuk shadow
    justifyContent:"space-beetwen",
    width:"85%",
    marginBottom:20,
    marginLeft:"8%",
    
    
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft:180,
    color:"#D2B48C",
    alignItems:"stretch"
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  
  
  nl:{
    marginLeft:10,
    alignItems:"flex-end",
    justifyContent:"flex-end",
  },
});

export default quran;
