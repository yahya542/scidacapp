import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// import file on this directory
import ProfileScreen from './ProfileScreen'
import Edit from './EditProfile'
import login from '../../auth/login'


const Stack = createStackNavigator()
const ProfileLayout = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen"  screenOptions={{ headerShown: false, headerStyle: { height: 0, backgroundColor: 'transparent' }, headerLeft: () => null }}>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="EditProfile" component={Edit} />

      
      
    </Stack.Navigator>
  )
}

export default ProfileLayout