import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import Dashboard from '../HomeScreen/Dashboard';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Ionicons } from 'react-native-vector-icons';

// Import screens
import Math from '../MenuScreens/math/db_math';
import Islamic from '../MenuScreens/islamic/_layout';
import Activity from '../MenuScreens/activity/db_activity';
import Savings from '../MenuScreens/savings/db_savings';
import Shop from '../MenuScreens/shop/db_shop';
import Science from '../MenuScreens/science/db_science';

// Create navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack navigator
const DashboardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="db_math" component={Math} />
    <Stack.Screen name="db_islamic" component={Islamic} />
    <Stack.Screen name="db_activity" component={Activity} />
    <Stack.Screen name="db_savings" component={Savings} />
    <Stack.Screen name="db_shop" component={Shop} />
    <Stack.Screen name="db_science" component={Science} />
  </Stack.Navigator>
);

// Tab screen
export default function Layout() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false,
        tabBarActiveTintColor: 'orange',tabBarInactiveTintColor: 'lightblue',
       }}
      style={styles.tab}  >

      {/* Tab Dashboard */}
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size}/>   ),
          }}
      />
      
      {/* Tab Profile */ }
      < Tab.Screen 
      name="Profile" 
      component={ ProfileScreen }
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" color={color} size={size} /> // Menggunakan Ionicons "home" untuk ikon Dashboard
        ),
      }} />

     


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