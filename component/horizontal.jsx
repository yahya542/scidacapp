import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const horizontal = () => {
  return (
    <View  style={style.garis}></View>
  )
}

export default horizontal

const style = StyleSheet.create({
    garis:{
        borderBottomColor: 'beige',
        borderBottomWidth: 2,
        marginVertical: 10,
        width:"80%",
        marginTop:40,
    
    }
})