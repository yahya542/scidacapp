import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// import file on this directory
import Setting from './SettingsScreen'

const stack = createStackNavigator()
const ProfileLayout = () => {
  return (
    <stack.Navigator initialRouteName="ProfileScreen"  screenOptions={{ headerShown: false, headerStyle: { height: 0, backgroundColor: 'transparent' }, headerLeft: () => null }}>
        <stack.Screen name="SettingsScreen" component={Setting} />

      
      
    </stack.Navigator>
  )
}

export default ProfileLayout