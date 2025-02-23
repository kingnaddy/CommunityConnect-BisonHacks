// App.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { RequestsProvider } from './context/RequestsContext';
import ElderScreen from './screens/ElderScreen';
import VolunteerScreen from './screens/VolunteerScreen';

export default function App() {
  const [role, setRole] = useState(null);

  return (
    // 1) The provider is always mounted
    <RequestsProvider>
      {/* 2) Role selection is also within the provider now */}

      {!role ? (
        // Show role selection
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to Community Connect</Text>
          <Button title="I am an Elder" onPress={() => setRole('elder')} />
          <Button title="I am a Volunteer" onPress={() => setRole('volunteer')} />
        </View>
      ) : (
        // Show one of the two screens, but keep the provider untouched
        role === 'elder' ? (
          <ElderScreen onGoBack={() => setRole(null)} />
        ) : (
          <VolunteerScreen onGoBack={() => setRole(null)} />
        )
      )}
    </RequestsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', 
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
  },
});
