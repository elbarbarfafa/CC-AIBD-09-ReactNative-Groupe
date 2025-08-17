import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Training } from '../types/training';
import { useRouter } from 'expo-router';

type Props = {
  training: Training;
};

export default function FormationItem({ training }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: '/[slug]',
          params: { slug: training.slug },
        })
      }
    >
      <Text style={styles.title}>{training.title}</Text>
      <Text>{training.slug}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontWeight: 'bold', fontSize: 16 },
});
