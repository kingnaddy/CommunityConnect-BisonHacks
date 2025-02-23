// VolunteerScreen.js
import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { RequestsContext } from '../context/RequestsContext';

export default function VolunteerScreen({ onGoBack }) {
  const { requests, acceptRequest } = useContext(RequestsContext);

  // Filter only open requests
  const openRequests = requests.filter((req) => req.status === 'open');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Volunteer Screen</Text>

      {openRequests.length === 0 ? (
        <Text>No open requests at the moment.</Text>
      ) : (
        <FlatList
          data={openRequests}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.requestCard}>
              <Text style={{ flex: 1 }}>{item.text}</Text>
              <Button
                title="Accept"
                color="green"
                onPress={() => acceptRequest(item.id)}
              />
            </View>
          )}
        />
      )}

      <View style={{ height: 20 }} />
      <Button title="Go Back" onPress={onGoBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, marginBottom: 16 },
  requestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
    borderRadius: 5,
  },
});
