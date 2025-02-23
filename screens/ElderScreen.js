import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { RequestsContext } from '../context/RequestsContext';

export default function ElderScreen({ onGoBack }) {
  const [requestText, setRequestText] = useState('');
  const [location, setLocation] = useState(null);
  const { addRequest } = useContext(RequestsContext);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords); // Save lat/lng
    })();
  }, []);

  const handleSubmit = async () => {
    if (!requestText.trim()) {
      alert('Please enter a request.');
      return;
    }
    if (!location) {
      alert('Location not available. Try again.');
      return;
    }

    await addRequest(requestText, location.latitude, location.longitude);
    setRequestText('');
    alert('Request submitted!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit a Request</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your request..."
        value={requestText}
        onChangeText={setRequestText}
      />
      <Button title="Submit Request" onPress={handleSubmit} />
      <Button title="Go Back" onPress={onGoBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, marginBottom: 16, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
});
