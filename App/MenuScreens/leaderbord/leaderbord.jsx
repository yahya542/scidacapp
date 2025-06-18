import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
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
        console.error('Gagal mengambil data leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.listItem}>
      <Text style={styles.rank}>{index + 1}</Text>
      <View style={styles.userInfo}>
        <Text style={styles.name}>{item.name || 'Anonim'}</Text>
        <Text style={styles.points}>{item.points} Poin</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏆 Leaderboard</Text>

      {/* Top 3 User */}
      {leaderboard.length >= 3 && (
        <View style={styles.topThreeContainer}>
          {leaderboard.slice(0, 3).map((item, index) => (
            <View key={item.id} style={styles.topUser}>
              <Image
                source={require('../../../assets/images/studora.png')}
                style={[styles.medalIcon, { tintColor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32' }]}
              />
              <Text style={styles.topName}>{item.name || 'Anonim'}</Text>
              <Text style={styles.topPoints}>{item.points} pts</Text>
            </View>
          ))}
        </View>
      )}

      {/* Ranking List */}
      <FlatList
        data={leaderboard.slice(3)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
};

export default LeaderboardScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  points: {
    fontSize: 16,
    color: '#666',
  },
  topThreeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
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
  },
  topPoints: {
    fontSize: 16,
    color: '#666',
  },
});

