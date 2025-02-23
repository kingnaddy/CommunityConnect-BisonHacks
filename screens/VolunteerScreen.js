import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { RequestsContext } from '../context/RequestsContext';
import RequestCard from '../RequestCard';

export default function VolunteerScreen({ onGoBack }) {
  const { requests } = useContext(RequestsContext);
  const [sortedRequests, setSortedRequests] = useState([]);
  const [volunteerLocation, setVolunteerLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setVolunteerLocation(loc.coords); // volunteer's latitude & longitude
    })();
  }, []);

  useEffect(() => {
    if (!volunteerLocation || requests.length === 0) return;

    // Sort requests by distance
    const sorted = [...requests].sort((a, b) => {
      const distanceA = getDistance(volunteerLocation, a);
      const distanceB = getDistance(volunteerLocation, b);
      return distanceA - distanceB;
    });

    setSortedRequests(sorted);
  }, [volunteerLocation, requests]);

  // Haversine formula to compute distance in kilometers
  const getDistance = (loc1, req) => {
    const toRad = (angle) => (angle * Math.PI) / 180;
    const R = 6371; // Earth radius in km

    const dLat = toRad(req.latitude - loc1.latitude);
    const dLon = toRad(req.longitude - loc1.longitude);
    const lat1 = toRad(loc1.latitude);
    const lat2 = toRad(req.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in km
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Volunteer Requests</Text>

      {sortedRequests.length === 0 ? (
        <Text>No requests available.</Text>
      ) : (
        <FlatList
          data={sortedRequests}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            // Compute distance in km
            const distanceKm = getDistance(volunteerLocation, item).toFixed(2);

            // If index === 0, it's the closest
            const isClosest = index === 0;

            return (
              <RequestCard
                request={item}
                distance={distanceKm}
                isClosest={isClosest}
              />
            );
          }}
        />
      )}

      <Button title="Go Back" onPress={onGoBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
});
