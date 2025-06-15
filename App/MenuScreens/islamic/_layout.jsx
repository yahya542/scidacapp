import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import IslamicMain from './db_islamic';  
import Quran from './quran/quran';  
import Ayat from './quran/ayat';    
import Shalat from './shalat/shalat';       

const Stack = createStackNavigator();

const IslamicLayout = () => {
  return (
    <Stack.Navigator screenOptions={{headershown:false, headerStyle: { height: 0, backgroundColor: 'transparent' }, headerLeft: () => null}}>
      {/* Layar utama Islamic */}
      <Stack.Screen name="Islamic" component={IslamicMain}  />
      {/* Quran */}
      <Stack.Screen name="surah" component={Quran} />
      <Stack.Screen name="ayat" component={Ayat} />
      <Stack.Screen name="shalat" component={Shalat} />
    </Stack.Navigator>
  );
};

export default IslamicLayout;
