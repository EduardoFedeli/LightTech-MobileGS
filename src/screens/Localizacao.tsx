// Arquivo: src/screens/Localizacao.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';

export default function Localizacao() {
  const [local, setLocal] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleAvancar = () => {
    if (!local.trim()) {
      Alert.alert('Preencha a localização');
      return;
    }
    navigation.navigate('Tempo', { localizacao: local });
  };

  const handleInputChange = (text: string) => {
    // Impede números
    const textoFiltrado = text.replace(/[0-9]/g, '');
    setLocal(textoFiltrado);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <Text style={styles.logo}>⚡LightTech⚡</Text>
      <Text style={styles.label}>Bairro / Cidade:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a localização afetada"
        value={local}
        onChangeText={handleInputChange}
        autoCapitalize="sentences"
      />
      <Button title="Salvar e ir para o tempo" onPress={handleAvancar} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E5F6FD', justifyContent: 'center' },
  logo: { fontSize: 26, textAlign: 'center', marginBottom: 20, color: '#0077b6' },
  label: { fontSize: 16, marginBottom: 8, color: '#023e8a' },
  input: {
    borderWidth: 1,
    borderColor: '#90e0ef',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#03045e',
  },
});
