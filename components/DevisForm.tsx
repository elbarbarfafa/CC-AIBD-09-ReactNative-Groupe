import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

type Props = {
  slug: string;
};

export default function DevisForm({ slug }: Props) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    // Ici tu peux intégrer EmailJS, une API REST, ou simplement simuler :
    Alert.alert(
      'Demande envoyée !',
      `Formation : ${slug}\nEmail : ${email}\nMessage : ${message}`
    );
    setEmail('');
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Votre email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Votre message"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <Button
        title="Envoyer la demande"
        onPress={handleSubmit}
        disabled={!email || !message}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 20, gap: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 12
  }
});
