// app/[slug].tsx
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { fetchTrainingDetails } from '@/services/trainingService';
import DevisForm from '@/components/DevisForm';
import type { Training } from '@/types/training';

export default function TrainingDetailsScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [training, setTraining] = useState<Training | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchTrainingDetails(String(slug));
        setTraining(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) {
    return (
      <>
        {/* Enlève le titre slug du header */}
        <Stack.Screen options={{ title: '' }} />
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 8, color: '#64748b' }}>
            Chargement de la formation…
          </Text>
        </View>
      </>
    );
  }

  if (!training) {
    return (
      <>
        <Stack.Screen options={{ title: '' }} />
        <View style={styles.center}>
          <Text style={{ color: '#b91c1c' }}>Formation introuvable.</Text>
        </View>
      </>
    );
  }

  // Quelques champs possibles selon l’API : adapte si besoin
  const title = (training.title as any) || (training.name as any) || 'Formation';
  const summary =
    (training.shortDescription as any) ||
    (training.description as any) ||
    (training.resume as any) ||
    '';

  return (
    <>
      {/* Masque le titre du header pour ne plus voir [slug] */}
      <Stack.Screen
        options={{
          title: '',
          headerTitle: '',
          headerTitleAlign: 'left',
        }}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>DAWAN</Text>
          </View>

          <Text style={styles.h1} numberOfLines={3}>
            {title}
          </Text>

          {!!summary && (
            <Text style={styles.sub} numberOfLines={4}>
              {summary}
            </Text>
          )}

          <Pressable
            onPress={() => setShowForm((v) => !v)}
            android_ripple={{ color: '#e6efff' }}
            style={({ pressed }) => [
              styles.cta,
              pressed && { transform: [{ scale: 0.995 }] },
            ]}
          >
            <Text style={styles.ctaText}>
              {showForm ? 'MASQUER LE FORMULAIRE' : 'DEMANDER UN DEVIS'}
            </Text>
          </Pressable>
        </View>

        {showForm && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Demande de devis</Text>
            <Text style={styles.cardSub}>
              Laissez votre email et un message. Nous revenons vers vous sous
              24–48h.
            </Text>
            <DevisForm slug={String(slug)} />
          </View>
        )}

        {/* Exemple de sections futures (programme, objectifs, etc.) 
            Tu pourras les brancher si l’API renvoie ces champs */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Objectifs</Text>
          <Text style={styles.sectionText}>{training.objectives}</Text>
        </View> */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
  },
  hero: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#eef2ff',
    // ombre douce
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#2563eb15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 8,
  },
  badgeText: {
    color: '#2563eb',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.3,
  },
  h1: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 6,
  },
  sub: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 12,
  },
  cta: {
    height: 48,
    backgroundColor: '#2563eb',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // petite ombre bouton
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  ctaText: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#eef2ff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
  },
  cardSub: {
    color: '#64748b',
    marginBottom: 12,
  },

  section: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 6,
  },
  sectionText: {
    color: '#475569',
    lineHeight: 20,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});
