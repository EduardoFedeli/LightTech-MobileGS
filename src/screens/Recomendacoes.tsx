import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const dicas = [
  'Tenha lanternas e pilhas à mão.',
  'Mantenha a geladeira fechada para conservar os alimentos.',
  'Desligue equipamentos eletrônicos da tomada.',
  'Use rádio à pilha para receber informações da defesa civil.',
  'Evite sair de casa durante chuvas e ventanias fortes.',
  'Comunique a concessionária local sobre a interrupção.',
];

export default function Recomendacoes() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🔌 Recomendações em Caso de Falta de Energia</Text>
      {dicas.map((dica, index) => (
        <View key={index} style={styles.item}>
          <Ionicons name="alert-circle-outline" size={20} color="#007bff" />
          <Text style={styles.itemText}>{dica}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f7fa',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#444',
  },
});
