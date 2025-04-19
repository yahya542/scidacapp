import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

function tombol ({name, onPress} ) {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={onPress} >
        <Image source={require('../assets/images/logout.png')}    style={styles.img}    />
      </TouchableOpacity>
    </View>
  )
}

export default tombol

const styles = StyleSheet.create({
   
    button: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: -380,
        marginLeft:"70%"
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    img:{
      height:20,
      width:20,
      
    }
})