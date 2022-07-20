import * as React from 'react';
import { View, Text,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AlertFun from './alertfuncao';
import AlertClass from './alertclasse';



function Inicio() {
return (
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Inicio</Text>
</View>
);
}

function Funcao() {
return (
  <AlertFun/>
);
}

function Classe() {
  return (
    <AlertClass/>
  );
  }

const Drawer = createDrawerNavigator();

function MyDrawer() {
return (
<Drawer.Navigator>
<Drawer.Screen name="Inicio" component={Inicio} />
<Drawer.Screen name="Alert junto a função" component={Funcao} />
<Drawer.Screen name="Alert junto a classe" component={Classe} />
</Drawer.Navigator>
);
}

export default function App() {
return (
<NavigationContainer>
<MyDrawer />
</NavigationContainer>
);
}
