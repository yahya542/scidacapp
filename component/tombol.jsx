import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

function tombol ({name, onPress} ) {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={onPress} >
        <Text style={styles.buttonText}> {name} </Text>
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
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
})