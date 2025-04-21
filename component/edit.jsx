import { StyleSheet, Text, View, TouchableOpacity , Image} from 'react-native'
import React from 'react'

function edit ({name, onPress}){
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={onPress}    >    
      <Image source={require('../assets/images/edit.png')} style={styles.img}  />
      </TouchableOpacity>
    </View>
  )
}

export default edit


const styles = StyleSheet.create({
   
  button: {
      backgroundColor: 'orange  ',
      padding: 10,
      borderRadius: 10,
      alignItems: 'flex-start',
      marginTop: -160,
      marginLeft:"-40%"
  },
  buttonText: {
      color: 'white',
      fontSize: 16,
  },
  img:{
    height:35,
    width:35,
    
  }
})