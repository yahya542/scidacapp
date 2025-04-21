import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// import file on this directory
import ProfileScreen from './ProfileScreen'
import login from '../../auth/login'
import Edit from './EditProfile'


const stack = createStackNavigator()
const ProfileLayout = () => {
  return (
    <stack.Navigator initialRouteName="ProfileScreen"  screenOptions={{ headerShown: false, headerStyle: { height: 0, backgroundColor: 'transparent' }, headerLeft: () => null }}>
        <stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <stack.Screen name="login" component={login} />
        <stack.Screen name="EditProfile" component={Edit} />

      
      
    </stack.Navigator>
  )
}

export default ProfileLayout