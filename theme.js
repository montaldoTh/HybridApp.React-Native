import { useColorScheme } from 'react-native';

const colors= {
    white: '#fff',
    black: '#000',
    red: '#FF033E',
    blue: '#007EC4'
}

export const colorsTheme = {
    'light' : {
        backgroundColor: colors.white,
        textColor: colors.black,
        textSecondaryColor: colors.blue
    },
    'dark': {
        backgroundColor: colors.black,
        textColor: colors.white,
        textSecondaryColor: colors.red
    }
}

export default ()=>{
    const themeName = useColorScheme();
    return colorsTheme[themeName]
}