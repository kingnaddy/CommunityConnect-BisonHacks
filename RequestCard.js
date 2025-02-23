import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function RequestCard({ request, onAccept }) {
  return (
    <View style={styles.card}>
      <Text style={styles.requestText}>{request.text}</Text>
      <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
        <Text style={{ color: '#fff' }}>Accept</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 8,
  },
  requestText: {
    flex: 1,
    fontSize: 16,
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 4,
    marginLeft: 8,
  },
});
