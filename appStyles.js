import { StyleSheet } from 'react-native';
import ThemeColors from './theme';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default ()=>{

  const usedTheme = ThemeColors();
  const insets = useSafeAreaInsets()
  // console.log(insets);
  
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: usedTheme.backgroundColor
    },
    logForm:{
      flex: 1,
      backgroundColor: usedTheme.backgroundColor,
      justifyContent: 'center',
      alignItems: 'center'
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
    button: {
      padding: 10,
      backgroundColor: usedTheme.SecondaryColor,
      margin: 5,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      text: {
        fontWeight: 'bold',
        color: usedTheme.textColor
      }
    },
    input: {
      borderWidth: 1,
      padding: 5,
      color: usedTheme.textColor,
      borderColor: usedTheme.textColor,
      borderRadius: 5,
      marginBottom: 10,
      height: 50,
      width: 200
    },
    unvalidInput: {
      color: "#e01010"
    },
    validInput: {
      color: "#0eb00e"
    }
  });
}