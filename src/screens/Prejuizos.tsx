import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { EventoEnergia } from '../types/event';
import { salvarEvento } from '../storage/storage';

const gerarIdSimples = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export default function Prejuizos() {
  const navigation = useNavigation();
  const route = useRoute();
  const { localizacao, tempoInterrupcao } = route.params as {
    localizacao: string;
    tempoInterrupcao: string;
  };

  const [prejuizos, setPrejuizos] = useState('');

  const handleSalvar = async () => {
    if (!prejuizos.trim()) {
      Alert.alert('Atenção', 'Descreva os prejuízos.');
      return;
    }

    try {
      const evento: EventoEnergia = {
        id: gerarIdSimples(),
        localizacao,
        tempoInterrupcao,
        prejuizos,
      };

      await salvarEvento(evento);
      Alert.alert('Evento registrado com sucesso!', '', [
        { text: 'OK', onPress: () => navigation.navigate('Panorama' as never) },
      ]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Erro', error.message);
      } else {
        Alert.alert('Erro', 'Erro desconhecido');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.logo}>⚡LightTech⚡</Text>

      <Text style={styles.label}>Descreva os prejuízos:</Text>
      <TextInput
        style={styles.input}
        value={prejuizos}
        onChangeText={setPrejuizos}
        multiline
        placeholder="Ex: quedas de árvore, lojas sem energia, etc."
      />
      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Registrar Evento</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E5F6FD', justifyContent: 'center' },
  logo: { fontSize: 26, textAlign: 'center', marginBottom: 20, color: '#0077b6' },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#023e8a' },
  input: {
    borderWidth: 1,
    borderColor: '#90e0ef',
    padding: 12,
    borderRadius: 8,
    height: 100,
    marginBottom: 20,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    color: '#03045e',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
