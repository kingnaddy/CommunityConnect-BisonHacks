// ElderScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { RequestsContext } from '../context/RequestsContext';

export default function ElderScreen({ onGoBack }) {
  const [requestText, setRequestText] = useState('');
  
  // Access the addRequest function from context
  const { addRequest } = useContext(RequestsContext);

  const handleSubmitRequest = () => {
    if (requestText.trim()) {
      addRequest(requestText);  // Call context function
      setRequestText('');
      alert('Request submitted!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elder Screen</Text>
      <Text>Simulate voice input by typing below:</Text>
      <TextInput
        style={styles.input}
        placeholder="I need help with groceries..."
        value={requestText}
        onChangeText={setRequestText}
      />
      <Button title="Submit Request" onPress={handleSubmitRequest} />
      <View style={{ height: 20 }} />
      <Button title="Go Back" onPress={onGoBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, marginBottom: 16 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 10,
    padding: 8,
    borderRadius: 5,
  },
});
