import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/navigation/RootStackParamList';
import Localizacao from './src/screens/Localizacao';
import Tempo from './src/screens/Tempo';
import Prejuizos from './src/screens/Prejuizos';
import Panorama from './src/screens/Panorama';
import Recomendacoes from './src/screens/Recomendacoes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Panorama">
        <Stack.Screen name="Panorama" component={Panorama} />
        <Stack.Screen name="Localizacao" component={Localizacao} />
        <Stack.Screen name="Tempo" component={Tempo} />
        <Stack.Screen name="Prejuizos" component={Prejuizos} />
        <Stack.Screen name="Recomendacoes" component={Recomendacoes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
