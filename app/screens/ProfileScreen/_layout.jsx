import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// import file on this directory
import ProfileScreen from './ProfileScreen'
import LogoutScreen from './LogoutScreen'
import LoginScreen from '../../auth/login'

const stack = createStackNavigator()
const ProfileLayout = () => {
  return (
    <stack.Navigator initialRouteName="ProfileScreen"  screenOptions={{ headerShown: false, headerStyle: { height: 0, backgroundColor: 'transparent' }, headerLeft: () => null }}>
        <stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <stack.Screen name="logout" component={LogoutScreen} />
        <stack.Screen name="LoginScreen" component={LoginScreen} />
      
    </stack.Navigator>
  )
}

export default ProfileLayout