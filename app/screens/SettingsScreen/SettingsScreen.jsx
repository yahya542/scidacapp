import { StyleSheet,  View } from 'react-native'
import React from 'react'

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.lingkaran}>
      <View style={styles.cutout}></View>
      </View>
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  
    // warna background utama layar
  },
  lingkaran:{

  }, 

 cutout: {
    width: "100%",
    height: 250,
    borderRadius: "100%",
    backgroundColor: 'lightblue', // sesuaikan dengan warna container
    position: 'absolute',
    marginTop: "150%",
    zIndex: 10,
    
  }, 

})
