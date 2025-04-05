import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import IslamicMain from './db_islamic';  
import Quran from './quran/quran';  
import Ayat from './quran/ayat';           

const Stack = createStackNavigator();

const IslamicLayout = () => {
  return (
    <Stack.Navigator screenOptions={headershown=false} >
      {/* Layar utama Islamic */}
      <Stack.Screen name="Quran" component={IslamicMain} />
      {/* Quran */}
      <Stack.Screen name="surah" component={Quran} />
      <Stack.Screen name="ayat" component={Ayat} />
    </Stack.Navigator>
  );
};

export default IslamicLayout;
