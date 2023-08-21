// Native Component
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";

// Handmade Component
import Hello from './component/Hello';
import AppStyle from './appStyles';

export default function App() {
  const App =()=>{
    
    const styles = AppStyle()

    return (
      <View style={styles.safeArea}>
        <Text style={styles.text}> Shut yo ass up</Text>
        <StatusBar style="auto" />
        <Text style={styles.textSecondary}><Hello></Hello></Text>
      </View>
    )}
  
  return (
    <SafeAreaProvider>
      <App></App>
    </SafeAreaProvider>
  );
}