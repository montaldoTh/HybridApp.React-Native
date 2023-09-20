// Native Component
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useState } from "react";

// Handmade Component
import { Liste } from './screens/Liste/Liste';
import { Connexion } from './screens/Connexion/Connexion';
import { AjoutTache } from "./screens/AjoutTache/AjoutTache";
import { MaterialList } from "./screens/MaterialList/MaterialList";
import { AdingMaterial } from "./screens/AdingMaterial/AdingMaterial";


const App =()=>{
  const Drawer = createDrawerNavigator()

  const ConnexionNavigator = createNativeStackNavigator();
  
  const [connected, setConnected] = useState(false);

  const ConnexionScreen = ({ min=5,  max=15, carac=10, number=4, spechart=2})=>{
    return <Connexion 
      MinLength={min}
      MaxLength={max}
      MaxCarac={carac}
      MaxNumber={number}
      MaxSpechart={spechart}
      connected={connected}
      setConnected={setConnected}
    ></Connexion>
  }

  return connected ? (
    <Drawer.Navigator>
      <Drawer.Screen component={Liste} name="Stuff list"></Drawer.Screen>
      <Drawer.Screen component={AjoutTache} name="Add task"></Drawer.Screen>
      <Drawer.Screen component={MaterialList} name="Material list"></Drawer.Screen>
      <Drawer.Screen component={AdingMaterial} name="Add Material"></Drawer.Screen>
    </Drawer.Navigator>
  ) : (
    <ConnexionNavigator.Navigator>
      <ConnexionNavigator.Screen
        component={ConnexionScreen}
        name="Log in"
      ></ConnexionNavigator.Screen>
    </ConnexionNavigator.Navigator>
  );
};

export default () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <App></App>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};