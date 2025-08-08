import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { fetchTrainings } from '../../services/trainingService';
import FormationItem from '../../components/FormationItem';
import { Training } from '../../types/training';

export default function Home() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainings()
      .then(setTrainings)
      .catch(() => setTrainings([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator />;
  if (!trainings.length) return <Text>Aucune formation trouvée.</Text>;

  return (
    <FlatList
      data={trainings}
      keyExtractor={(item) => item.slug}
      renderItem={({ item }) => <FormationItem training={item} />}
    />
  );
}
