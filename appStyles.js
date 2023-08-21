import { StyleSheet } from 'react-native';
import ThemeColors from './theme';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default ()=>{

  const usedTheme = ThemeColors();
  const insets = useSafeAreaInsets()
  console.log(insets);
  
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: usedTheme.backgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    safeArea:{
      backgroundColor: usedTheme.backgroundColor,
      marginBottom: insets.bottom,
      marginTop: insets.top,
      marginRight: insets.right,
      marginLeft: insets.left
    },
    text: {
      color: usedTheme.textColor,
    },
    textSecondary: {
      fontSize: 20,
      fontWeight: 'bold',
      color: usedTheme.textSecondaryColor,
    }
  });
}