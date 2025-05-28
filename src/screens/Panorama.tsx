import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { EventoEnergia } from '../types/event';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Panorama'>;

export default function Panorama() {
  const navigation = useNavigation<NavigationProp>();
  const [eventos, setEventos] = useState<EventoEnergia[]>([]);

  const carregarEventos = async () => {
    try {
      const json = await AsyncStorage.getItem('eventos_energia');
      if (json) setEventos(JSON.parse(json));
      else setEventos([]);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarEventos);
    carregarEventos();
    return unsubscribe;
  }, [navigation]);

  const handleLimparEventos = () => {
    Alert.alert(
      'Confirmação',
      'Deseja realmente apagar todos os registros?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('eventos_energia');
              setEventos([]);
              Alert.alert('Sucesso', 'Todos os registros foram apagados!');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível apagar os registros.');
            }
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.logo}>⚡LightTech⚡</Text>
      <Text style={styles.header}>Eventos Registrados</Text>

      {eventos.length === 0 ? (
        <Text style={styles.empty}>Nenhum evento registrado ainda.</Text>
      ) : (
        <FlatList
          data={eventos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.localizacao}</Text>
              <Text style={styles.info}>Tempo: {item.tempoInterrupcao}</Text>
              <Text style={styles.info}>Prejuízos: {item.prejuizos}</Text>
            </View>
          )}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Registrar Novo Evento"
          color="#0077b6"
          onPress={() => navigation.navigate('Localizacao')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Ver Recomendações"
          color="#023e8a"
          onPress={() => navigation.navigate('Recomendacoes')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Apagar Todos os Registros"
          color="#d00000"
          onPress={handleLimparEventos}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E5F6FD',
    justifyContent: 'flex-start',
  },
  logo: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
    color: '#0077b6',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 20,
    marginBottom: 15,
    color: '#023e8a',
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#023e8a',
    marginBottom: 15,
  },
  item: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 6,
    borderColor: '#90e0ef',
    borderWidth: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: '#03045e',
  },
  info: {
    fontSize: 14,
    color: '#023e8a',
    marginBottom: 4,
  },
  buttonContainer: {
    marginVertical: 6,
  },
});
