import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Voice from '@react-native-community/voice';
import { RequestsContext } from '../context/RequestsContext'; // Ensure correct path

export default function ElderScreen({ onGoBack }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const { addRequest } = useContext(RequestsContext);

  useEffect(() => {
    // Set up event listeners
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    // Cleanup when the component unmounts
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecording = async () => {
    setRecognizedText('');
    setIsRecording(true);
    try {
      await Voice.start('en-US'); // Set to preferred language
    } catch (error) {
      console.error('Voice start error:', error);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    try {
      await Voice.stop();
    } catch (error) {
      console.error('Voice stop error:', error);
    }
  };

  const onSpeechResults = (event) => {
    if (event.value && event.value.length > 0) {
      setRecognizedText(event.value[0]); // Take the best result
    }
  };

  const onSpeechError = (event) => {
    console.error('Speech error:', event.error);
    setIsRecording(false);
  };

  const handleSubmitRequest = () => {
    if (recognizedText.trim()) {
      addRequest(recognizedText);
      setRecognizedText('');
      alert('Voice request submitted!');
    } else {
      alert('No speech detected. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elder Voice Request</Text>

      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? stopRecording : startRecording}
      />

      <Text style={styles.recognizedText}>
        {recognizedText ? `Recognized: ${recognizedText}` : 'No speech detected yet'}
      </Text>

      <Button title="Submit Request" onPress={handleSubmitRequest} disabled={!recognizedText} />

      <View style={{ height: 20 }} />
      <Button title="Go Back" onPress={onGoBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, marginBottom: 16 },
  recognizedText: {
    marginVertical: 10,
    fontStyle: 'italic',
  },
});
