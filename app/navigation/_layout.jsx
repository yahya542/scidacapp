import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Dimensions } from 'react-native';
import Dashboard from '../HomeScreen/Dashboard';
import ProfileScreen from '../screens/ProfileScreen/_layout';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import { Ionicons } from 'react-native-vector-icons';

import Study from '../MenuScreens/study/db_study';
import Islamic from '../MenuScreens/islamic/_layout';
import Activity from '../MenuScreens/activity/db_activity';
import Savings from '../MenuScreens/savings/db_savings';
import Read from '../MenuScreens/read/db_read';
import Kids from '../MenuScreens/kids/db_kids';

import CustomTabButton from '../../component/CustomTabButton';

// Hitung tinggi layar dan set tinggi tab bar proporsional (misal 8%)
const { height } = Dimensions.get('window');
const TAB_BAR_HEIGHT = height * 0.08;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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

export default function Layout() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        headerStyle: { height: 0, backgroundColor: 'transparent' },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'lightblue',
        tabBarStyle: {
          height: TAB_BAR_HEIGHT,
          paddingBottom: TAB_BAR_HEIGHT * 0.15,
          paddingTop: TAB_BAR_HEIGHT * 0.15,
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
        },
        tabBarLabelStyle: {
          fontSize: TAB_BAR_HEIGHT * 0.16,
        },
      }}
    >
      {/* Tab Profile */}
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={TAB_BAR_HEIGHT * 0.4} />
          ),
        }} 
      />

      {/* Tab Dashboard */}
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack} 
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={TAB_BAR_HEIGHT * 0.4} />
          ),
          tabBarButton: (props) => (
            <CustomTabButton {...props} />
          ),
        }}
      />

      {/* Tab Settings */}
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" color={color} size={TAB_BAR_HEIGHT * 0.4} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "orange",
  },
});
