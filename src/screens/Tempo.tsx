import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tempo'>;
type RouteProps = RouteProp<RootStackParamList, 'Tempo'>;

export default function Tempo() {
  const [tempo, setTempo] = useState('');
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { localizacao } = route.params;

  const handleAvancar = () => {
    if (!tempo.trim()) {
      Alert.alert('Informe o tempo de interrupção');
      return;
    }

    navigation.navigate('Prejuizos', {
      localizacao,
      tempoInterrupcao: tempo,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.logo}>⚡LightTech⚡</Text>

      <Text style={styles.label}>Tempo estimado de interrupção:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 2h30"
        value={tempo}
        onChangeText={setTempo}
      />
      <TouchableOpacity style={styles.button} onPress={handleAvancar}>
        <Text style={styles.buttonText}>Avançar</Text>
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
    backgroundColor: '#fff',
    marginBottom: 20,
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
