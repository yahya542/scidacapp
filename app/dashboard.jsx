

import { StyleSheet, Text, View , StatusBar, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';







export default function () {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />  
   
      {/* view1 */}
      <View style={styles.view1}>
        <Image 
          source = {require('../assets/images/scidac.png')}
          style={styles.image1}
          resizeMode='contain'
        /> 
        <View style={styles.text1}>
          <Text style={{  color: 'white'}}  > Hai,</Text>
          <Text style={{ fontSize: 25, color: 'white', fontWeight:"bold",}}>User </Text>
        </View>

      </View>

      <View style={styles.view2}>
        
      </View>


    
      <View style={styles.view3}>
        
      </View>
    </View>
  );
}






const styles = StyleSheet.create({
  container: {
    flex: 1, // Membuat container mengambil seluruh ruang layar
    justifyContent: 'space-between', // Menyusun konten secara vertikal di tengah
    alignItems: 'center', // Menyusun konten secara horizontal di tengah
  },
  view1: {
    backgroundColor: 'orange  rgba(255, 165, 0, 0.9) ',
    color: 'white', 
    width: "100%", 
    height: 250,
    justifyContent: 'top',
    alignItems: 'center',
    marginBottom: 20, // Memberikan jarak antar view
    borderBottomRightRadius: 30, 
    borderBottomLeftRadius: 30,

  },


  view2: {
    backgroundColor: 'lightblue rgba(173, 216, 230, 1)',
    width: "85%", 
    marginTop:-475,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Memberikan jarak antar view
    borderRadius:30,
  
  }, 

  view3: {
    backgroundColor: 'white',
    width: "100%",
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image1: {
    height: 55, 
    marginLeft : -335, 
    marginTop: 15, 

  }, 

  text1: {
    marginTop: -50, 
    marginLeft: -200, 
    color: "white"
  }
}); 