import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Olá, essa é a aba Perfil!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
   text: {
    color: 'white', // 🔹 aqui você muda a cor do texto
    fontSize: 20,
  },
});
