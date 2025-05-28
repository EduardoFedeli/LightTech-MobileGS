import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventoEnergia } from '../types/event';

const CHAVE_EVENTOS = 'eventos_energia';

export async function salvarEvento(evento: EventoEnergia) {
  const dadosSalvos = await AsyncStorage.getItem(CHAVE_EVENTOS);
  const eventos: EventoEnergia[] = dadosSalvos ? JSON.parse(dadosSalvos) : [];
  eventos.push(evento);
  await AsyncStorage.setItem(CHAVE_EVENTOS, JSON.stringify(eventos));
}

export async function obterEventos(): Promise<EventoEnergia[]> {
  const dados = await AsyncStorage.getItem(CHAVE_EVENTOS);
  return dados ? JSON.parse(dados) : [];
}

export async function limparEventos(): Promise<void> {
  await AsyncStorage.removeItem(CHAVE_EVENTOS);
}
