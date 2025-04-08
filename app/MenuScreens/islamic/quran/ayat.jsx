import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'

const Ayat = ({route}) => {
  const {id} = route.params; 
  const [ayat, setAyat] = useState([]);

  useEffect(() => {
    fetch(`https://quran-api.santrikoding.com/api/surah/${id}`)
    .then((response) => response.json())
    .then(data => {
      console.log(data.data.ayat);
    

    })
    .catch((error) => {
      console.error(error);
    });
  }, [id]);
  return (
    <View>
      <Text>Ayat</Text>
      {ayat.map((item) => (
        <View key={item.nomor}>
          <Text>{item.nomor}</Text>
          <Text>{item.ayat}</Text>
        </View>
      ))}
    </View>
  )
   
};
export default Ayat

const styles = StyleSheet.create({}) 
