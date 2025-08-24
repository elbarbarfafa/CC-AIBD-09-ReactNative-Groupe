import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

type Props = {
  slug: string;
};

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function DevisForm({ slug }: Props) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const isValidEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const canSubmit =
    isValidEmail(email) && message.trim().length > 0 && status !== 'sending';

  const handleSubmit = () => {
    if (!canSubmit) return;

    setStatus('sending');

    //Simulation d’un appel réseau (1.5s)
    setTimeout(() => {
      // Ici tu pourrais faire un fetch/axios puis setStatus selon la réponse
      setStatus('sent');
      setEmail('');
      setMessage('');

      // Revenir à l’état “idle” après 2 secondes pour laisser le bandeau visible
      setTimeout(() => setStatus('idle'), 2000);
    }, 1500);
  };

  const disabled = status === 'sending';

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, disabled && styles.inputDisabled]}
        placeholder="Votre email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        editable={!disabled}
      />

      <TextInput
        style={[styles.input, { height: 96 }, disabled && styles.inputDisabled]}
        placeholder="Votre message"
        multiline
        value={message}
        onChangeText={setMessage}
        editable={!disabled}
      />

      <Pressable
        onPress={handleSubmit}
        disabled={!canSubmit}
        style={({ pressed }) => [
          styles.button,
          (!canSubmit || disabled) && styles.buttonDisabled,
          pressed && canSubmit && styles.buttonPressed,
        ]}
      >
        {status === 'sending' ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>Envoyer la demande</Text>
        )}
      </Pressable>

      {/* Messages d’état */}
      {status === 'sending' && (
        <Text style={styles.info}>Envoi en cours…</Text>
      )}
      {status === 'sent' && (
        <View style={styles.successBox}>
          <Text style={styles.successText}>
            Demande envoyée ✔️
            {'\n'}Formation : {slug}
          </Text>
        </View>
      )}

      {/* Aide de validation */}
      {email.length > 0 && !isValidEmail(email) && status !== 'sending' && (
        <Text style={styles.hint}>✱ Email invalide</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 20, gap: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#cfcfcf',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  inputDisabled: {
    opacity: 0.6,
  },
  button: {
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb', // bleu
  },
  buttonPressed: {
    transform: [{ scale: 0.99 }],
  },
  buttonDisabled: {
    backgroundColor: '#9bb9ff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  info: {
    marginTop: 8,
    fontStyle: 'italic',
    color: '#555',
  },
  successBox: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#e8f7ef',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b7e4c7',
  },
  successText: {
    color: '#0f5132',
    fontWeight: '600',
  },
  hint: {
    color: '#b91c1c',
  },
});
