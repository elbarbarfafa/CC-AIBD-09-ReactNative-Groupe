import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import DevisForm from '../DevisForm';

describe('DevisForm', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // pour contrôler setTimeout dans le composant
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('1) le bouton est inactif tant que email/message ne sont pas valides', () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <DevisForm slug="react-native" />
    );

    const btn = getByText('Envoyer la demande');

    // État initial : pas d’envoi en cours
    expect(queryByText('Envoi en cours…')).toBeNull();

    // Email invalide + message rempli
    fireEvent.changeText(getByPlaceholderText('Votre email'), 'foo@bar'); // invalide (pas de TLD)
    fireEvent.changeText(getByPlaceholderText('Votre message'), 'Bonjour');

    // On essaie de cliquer, rien ne doit se passer (pas de spinner)
    fireEvent.press(btn);
    expect(queryByText('Envoi en cours…')).toBeNull();
  });

  test('2) passage par "Envoi en cours…" puis "Demande envoyée ✔️"', () => {
    const { getByText, getByPlaceholderText, queryByText, getByDisplayValue } = render(
      <DevisForm slug="react-native" />
    );

    const emailInput = getByPlaceholderText('Votre email');
    const msgInput = getByPlaceholderText('Votre message');
    const btn = getByText('Envoyer la demande');

    // Saisie valide
    fireEvent.changeText(emailInput, 'user@example.com');
    fireEvent.changeText(msgInput, 'Je souhaite un devis');

    // Soumission
    act(() => {
      fireEvent.press(btn);
    });

    // On voit le spinner/texte d’envoi
    expect(getByText('Envoi en cours…')).toBeTruthy();

    // Avance le timer de 1.5s (simulation requête)
    act(() => {
      jest.advanceTimersByTime(1600);
    });

    // Le message de succès apparaît avec le slug
    expect(getByText(/Demande envoyée/i)).toBeTruthy();
    expect(getByText(/Formation : react-native/i)).toBeTruthy();

    // Les champs sont vidés (voir test 3 en détail)
    // Ici on vérifie déjà que l’ancien contenu n’est plus présent
    expect(queryByText('user@example.com')).toBeNull();
    expect(queryByText('Je souhaite un devis')).toBeNull();

    // Le bandeau reste 2s puis disparaît (retour à idle)
    act(() => {
      jest.advanceTimersByTime(2200);
    });
    expect(queryByText(/Demande envoyée/i)).toBeNull();
  });

  test('3) les champs sont vidés après succès', () => {
    const { getByText, getByPlaceholderText } = render(
      <DevisForm slug="react-native" />
    );

    const emailInput = getByPlaceholderText('Votre email');
    const msgInput = getByPlaceholderText('Votre message');
    const btn = getByText('Envoyer la demande');

    fireEvent.changeText(emailInput, 'john@doe.com');
    fireEvent.changeText(msgInput, 'Bonjour');

    act(() => {
      fireEvent.press(btn); // envoi
      jest.advanceTimersByTime(1600); // passage à "sent"
    });

    // Après l’envoi, les valeurs sont vidées
    // On relit les props.value actuelles des TextInput via update des nodes
    const emailNow = getByPlaceholderText('Votre email').props.value;
    const messageNow = getByPlaceholderText('Votre message').props.value;
    expect(emailNow).toBe('');
    expect(messageNow).toBe('');
  });
});
