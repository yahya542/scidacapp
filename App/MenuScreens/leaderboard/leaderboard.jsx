import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ImageBackground } from 'react-native';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebaseconfig';

const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const leaderboardQuery = query(
          collection(db, 'users'),
          orderBy('points', 'desc'),
          limit(10)
        );
        const querySnapshot = await getDocs(leaderboardQuery);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLeaderboard(data);
      } catch (error) {
        console.error('❌ Gagal mengambil data leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.listItem}>
      <Text style={styles.rank}>{index + 4}</Text>
      <View style={styles.userInfo}>
        <Text style={styles.name}>{item.username || 'Anonim'}</Text>
        <Text style={styles.points}>{item.points} Poin</Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>🏆 Leaderboard</Text>

      {leaderboard.length >= 3 && (
        <View style={styles.topThreeContainer}>
          {leaderboard.slice(0, 3).map((item, index) => (
            <View key={item.id} style={styles.topUser}>
              <Image
                source={require('../../../assets/images/trophy.png')}
                style={[
                  styles.medalIcon,
                  {
                    tintColor:
                      index === 0
                        ? '#FFD700'
                        : index === 1
                        ? '#C0C0C0'
                        : '#CD7F32',
                    marginTop: 5,
                  },
                ]}
              />
              <Text style={styles.topName}>{item.username || 'Anonim'}</Text>
              <Text style={styles.topPoints}>{item.points} pts</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <ImageBackground
      source={require('../../../assets/images/bgldb2.png')}
      style={styles.bgldb}
      resizeMode="cover"
    >
      <FlatList
        data={leaderboard.slice(3)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 20 }}
      />
    </ImageBackground>
  );
};

export default LeaderboardScreen;

const styles = StyleSheet.create({
  bgldb: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 80,
    marginBottom: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rank: {
    width: 40,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange',
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  points: {
    fontSize: 16,
    color: 'white',
  },
  topThreeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'gold',
  },
  topUser: {
    alignItems: 'center',
  },
  medalIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  topName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orangered',
  },
  topPoints: {
    fontSize: 16,
    color: 'gold',
  },
});
