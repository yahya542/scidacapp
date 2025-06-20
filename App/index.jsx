// index.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // ganti jika pakai expo

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseconfig';

/* ---------- Auth ---------- */
import Login from './auth/login';
import Register from './auth/register';

/* ---------- Screens ---------- */
import Dashboard from './HomeScreen/Dashboard';
import ProfileScreen from './screens/ProfileScreen/_layout';
import SettingsScreen from './screens/SettingsScreen/SettingsScreen';

import Study from './MenuScreens/study/db_study';
import Islamic from './MenuScreens/islamic/_layout';
import Activity from './MenuScreens/activity/db_activity';
import Leaderboard from './MenuScreens/leaderboard/leaderboard';
import Read from './MenuScreens/read/db_read';
import Capsule from './MenuScreens/capsule/db_capsule';

/* ---------- Splash ---------- */
function Splash() {
  return (
    <View style={styles.splash}>
      <Image source={require('../assets/images/scidac.png')} style={{ height: 200 }} resizeMode="contain" />
      <Text style={styles.heading}>SIDAC</Text>
      <Text style={styles.body}>Study Islamic and Daily Activity</Text>
    </View>
  );
}

/* ---------- Navigators ---------- */
const Stack = createNativeStackNavigator();
const InTab = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TAB_H = Dimensions.get('window').height * 0.08;

/* ---------- Dashboard Stack ---------- */
function DashboardStack() {
  return (
    <InTab.Navigator screenOptions={{ headerShown: false }}>
      <InTab.Screen name="Dashboard" component={Dashboard} />
      <InTab.Screen name="db_study" component={Study} />
      <InTab.Screen name="db_islamic" component={Islamic} />
      <InTab.Screen name="db_activity" component={Activity} />
      <InTab.Screen name="leaderboard" component={Leaderboard} />
      <InTab.Screen name="db_read" component={Read} />
      <InTab.Screen name="db_capsule" component={Capsule} />
    </InTab.Navigator>
  );
}

/* ---------- Main Bottom Tab ---------- */
function MainTab() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'lightblue',
        tabBarStyle: {
          height: TAB_H + 10,
          paddingBottom: 10,
          paddingTop: TAB_H * 0.15,
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
        },
        tabBarLabelStyle: { fontSize: TAB_H * 0.16 },
      }}
    >
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="person" size={TAB_H * 0.4} color={color} />,
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home" size={TAB_H * 0.4} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="settings" size={TAB_H * 0.4} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

/* ---------- Root App ---------- */
export default function App() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setReady(true);
    });
    return unsubscribe;
  }, []);

  if (!ready) return <Splash />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainTab} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  splash: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  heading: { marginTop: -30, fontSize: 40, fontWeight: 'bold', color: 'orange' },
  body: { fontSize: 18, color: 'slategray' },
});
