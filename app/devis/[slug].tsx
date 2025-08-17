import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DevisForm from '../../components/DevisForm';

export default function DevisPage() {
  const { slug } = useLocalSearchParams();

  if (typeof slug !== 'string') {
    return <Text>Paramètre manquant</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Demande de devis</Text>
      <Text style={styles.subtitle}>Pour la formation : {slug}</Text>
      <DevisForm slug={slug} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontWeight: 'bold', fontSize: 20, marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 10 }
});
