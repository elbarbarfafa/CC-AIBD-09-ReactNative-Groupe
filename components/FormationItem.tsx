import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Training } from '../types/training';
import { useRouter } from 'expo-router';

type Props = {
  training: Training;
};

export default function FormationItem({ training }: Props) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/[slug]',
          params: { slug: training.slug },
        })
      }
      android_ripple={{ color: '#e6efff' }}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.95 }]}
    >
      <View style={styles.badge}>
        <Text style={styles.badgeText}>DAWAN</Text>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {training.title}
      </Text>
      <Text style={styles.slug} numberOfLines={1}>
        {training.slug}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 8,
    // Ombres iOS
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    // Élévation Android
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eef2ff',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#2563eb15', // léger bleu translucide
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 6,
  },
  badgeText: {
    color: '#2563eb',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  slug: {
    fontSize: 13,
    color: '#64748b',
  },
});
