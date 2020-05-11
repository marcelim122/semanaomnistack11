import React from 'react';
import {NavigationContainer} from '@react-navigation/native'; /*sempre fica em volta de todas as rotas, essencial*/
import {createStackNavigator} from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

/*
appstack.screen: componente de cada uma das paginas criadas
headerShown: apaga o header existente, para criação de um de autoria propria
*/
export default function Routes(){
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name='Incidents' component={Incidents} />
        <AppStack.Screen name='Detail' component={Detail} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}