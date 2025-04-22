import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import Dashboard from '../HomeScreen/Dashboard';
import ProfileScreen from '../screens/ProfileScreen/_layout';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import { Ionicons } from 'react-native-vector-icons';

// Import screens
import Study from '../MenuScreens/study/db_study';
import Islamic from '../MenuScreens/islamic/_layout';
import Activity from '../MenuScreens/activity/db_activity';
import Savings from '../MenuScreens/savings/db_savings';
import Read from '../MenuScreens/read/db_read';
import Kids from '../MenuScreens/kids/db_kids';

import CustomTabButton from '../../component/CustomTabButton';



// Create navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// menuscreen
const DashboardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="db_study" component={Study} />
    <Stack.Screen name="db_islamic" component={Islamic} />
    <Stack.Screen name="db_activity" component={Activity} />
    <Stack.Screen name="db_savings" component={Savings} />
    <Stack.Screen name="db_read" component={Read} />
    <Stack.Screen name="db_kids" component={Kids} />
   
  </Stack.Navigator>
);

//authscreen

// Tab screen
export default function Layout() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, headerStyle: { height: 0, backgroundColor: 'transparent' },
        tabBarActiveTintColor: 'orange',tabBarInactiveTintColor: 'lightblue',
       }}
      style={styles.tab}  >


        {/* Tab Profile */ }
      < Tab.Screen 
      name="Profile" 
      component={ ProfileScreen }
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" color={color} size={size} /> // Menggunakan Ionicons "home" untuk ikon Dashboard
        ),
      }} />


      {/* Tab Dashboard */}
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack} 
        options={{
          tabBarIcon: ({ color, size , focused}) => (
            <Ionicons name="home" color={color} size={size}/>   ),
            tabBarButton: (props) => (
              <CustomTabButton {...props} />
            ),
          }}
      />
      
      
     


      {/* Tab Settings */ }
      < Tab.Screen 
      name="Settings" 
      component={ SettingsScreen }
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="settings" color={color} size={size} /> // Menggunakan Ionicons "settings" untuk ikon Settings
        ),
      }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  //tab
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "orange",
  },
})