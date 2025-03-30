import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity, ImageBackground, Text, StyleSheet } from 'react-native';

//import screens
import Dashboard from './HomeScreen/Dashboard';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import Math from './MenuScreens/math/db_math';
import Islamic from './MenuScreens/islamic/_layout';
import Activity from './MenuScreens/activity/db_activity';
import Savings from './MenuScreens/savings/db_savings';
import Shop from './MenuScreens/shop/db_shop';
import Science from './MenuScreens/science/db_science';

const Stack = createStackNavigator();

// Membuat navigators
const Tab = createBottomTabNavigator();




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



const Layout = () => {
  return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        {/* Tab Dashboard */}
        <Tab.Screen name="Dashboard" component={DashboardStack} />

        {/* Tab Profile */}
        <Tab.Screen name="Profile" component={ProfileScreen} />

        {/* Tab Settings */}
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    
  );
};

export default Layout;




// Style untuk card
const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  cardBackground: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

