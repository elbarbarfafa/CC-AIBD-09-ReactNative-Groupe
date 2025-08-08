import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchTrainingDetails } from '../services/trainingService';
import { Training } from '../types/training';

export default function Details() {
  const { slug } = useLocalSearchParams();
  const [training, setTraining] = useState<Training | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof slug === 'string') {
      fetchTrainingDetails(slug)
        .then(setTraining)
        .catch(() => setTraining(null))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) return <ActivityIndicator />;
  if (!training) return <Text>Détail non trouvé.</Text>;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{training.title}</Text>
      <Text>{training.objectives}</Text>
      <Button
        title="Demander un devis"
        onPress={() => router.push(`/devis/${training.slug}`)}
      />
    </View>
  );
}
