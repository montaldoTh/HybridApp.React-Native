import { Text, TouchableOpacity, View } from 'react-native'
import ThemeColors from '../appStyles';

export const Button = ({ content, color, pressAction }) => {
    const usdTheme = ThemeColors();

    return(
        <TouchableOpacity onPress={pressAction} style={[usdTheme.button, color ? {backgroundColor: color} : {}]}>
            <Text style={usdTheme.button.text}>{ content }</Text>
        </TouchableOpacity>
    )
}