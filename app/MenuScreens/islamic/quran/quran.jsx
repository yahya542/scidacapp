import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';




const quran = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]); // save data api 
  const [filter, setFilter] = useState([]); // result filter
  const [search, setSearch] = useState(''); // search input 
  const [loading, setLoading] = useState(true); // loading
  const [error, setError] = useState(null); // error

  // firts time api
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://quran-api.santrikoding.com/api/surah');
      const jsonData = await response.json();
      setData(jsonData); // save API to state
      setFilter(jsonData);
      setLoading(false);
    } catch (error) {
      setError(error.message); // error
      setLoading(false);
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

  //backtracking 
  const backtracking = (list, query) => {
    let results = [];

    const byself = (index) => {
      if (index >= list.length) return;

      const item = list[index];
      if (matches(item.nama_latin.toLowerCase(), query.toLowerCase())) {
        results.push(item);
      }
      byself(index + 1);
    };

    const matches = (name, query) => {
      if (query.length === 0) return true;
      if (name.length === 0) return false;
      if (name[0] === query[0]) {
      return matches(name.slice(1), query.slice(1)); // cocok huruf demi huruf
        } else {
          return false; // tidak cocok, berhenti
        }
      };

    byself(0);
    return results;
  };


  const handleSearch = (text) => {
    setSearch(text);


    if (text === '') {
      setFilter(data);
    }
    else {
      const results = backtracking(data, text); // cari dengan backtracking
      setFilter(results);
    } 
  };

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.searchBox}
        placeholder="Cari Surah..."
        value={search}
        onChangeText={handleSearch}
      />



      <FlatList
        data={filter}
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
    backgroundColor: "#ffff",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  row2: {
    flexDirection: 'row',
    alignItems: 'flex-end',

  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    justifyContent: "space-beetwen",
    width: "85%",
    marginBottom: 20,
    marginLeft: "8%",
    borderColor: "#21ABA5",
    borderStyle: "solid",
    elevation: 3,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },


  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 180,
    color: "#D2B48C",
    alignItems: "stretch"
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },


  nl: {
    marginLeft: 10,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  //search 
  searchBox: { 
    height: 40,
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default quran;
