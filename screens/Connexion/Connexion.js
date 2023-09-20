import { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Button } from '../../component/Button';
import ThemeColors from '../../appStyles';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Connexion = ({ MinLength, MaxLength, MaxCarac, MaxNumber, MaxSpechart, setConnected, connected  }) => {
    
    const navigation = useNavigation();
    const pswMin = parseInt(MinLength)
    const pswMax = parseInt(MaxLength)
    const pswNbCaractere = parseInt(MaxCarac)
    const pswNbNumber = parseInt(MaxNumber)
    const pswNbSpechart = parseInt(MaxSpechart)

    const usdTheme = ThemeColors();
    const [email, onChangeEmail] = useState(null);
    const [password, onChangePassword] = useState(null);
    const [pswLengthMessage, setPswLengthMessage] = useState(null);
    const [caracCountMsg, setCaracCountMsg] = useState(0);
    const [numberCountMsg, setNumberCountMsg] = useState(0);
    const [specCountMsg, setSpecCountMsg] = useState(0);
    const [emailRegexMsg, setEmailMsg] = useState(null)
    const [connexionMsg, setConnexionMsg] = useState(null)

    const storeToken = async (token) => {
        try {
            await AsyncStorage.setItem('token', token);
        } catch (error) {
            console.error('Erreur lors du stockage du token :', error);
        }
    }
    
    const countLetters=(x)=>{
        const match = x.match(/[a-zA-Z]/g)
        return match ? match.length : 0 
    }
    const countNumbers=(x)=>{
        const match = x.match(/\d/g)
        return match ? match.length : 0
    }
    const countSpecharts=(x)=>{
        const match = x.match(/[^a-zA-Z0-9\s]/g)
        return match ? match.length : 0
    }
    const VerifyEmail=(x)=>{
        const regex = /^[\w\d!@#$%^&*()_+{}[\]:;<>,.?~\\/-]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/g;
        return regex.test(x);
    }

    const handlePasswordChange=(password)=>{
        // Verifie la longeur a chaque nouveau caractères
        onChangePassword(password)
        if(password.length < pswMin){
            setPswLengthMessage('Trop petit')
        } else if(password.length > pswMax){
            setPswLengthMessage('Trop grand')
        } else {
            setPswLengthMessage('Longeur Valide')
        }
        // Verifie si le nombre de caractères (lettres) ne dépasse pas le maximum fixé par les props
        const letterCount = countLetters(password)
        if(letterCount > pswNbCaractere){
            setCaracCountMsg(`Votre mot de passe contient trop de lettres, maximum de lettres autoriser ${pswNbCaractere}`)
        } else {
            setCaracCountMsg('Votre mot de passe contient le nombre autoriser de lettres')
        }
        // Pareil qu'au dessus avec les chiffres
        const numberCount = countNumbers(password)
        if(numberCount > pswNbNumber){
            setNumberCountMsg(`Votre mot de passe contient trop de chiffres, maximum de chiffres autoriser ${pswNbNumber}`)
        } else {
            setNumberCountMsg('Votre mot de passe contient le nombres autoriser de chiffres')
        }
        // Pareil avec Caractères spéciaux
        const spechartCount = countSpecharts(password)
        if(spechartCount > pswNbSpechart){
            setSpecCountMsg(`Votre mot de passe contient trop de chiffres, maximum de chiffres autoriser ${pswNbSpechart}`)
        } else {
            setSpecCountMsg('Votre mot de passe contient le nombres autoriser de caractères spéciaux')
        }
    }

    const handleEmailChange=(mail)=>{
        onChangeEmail(mail)
        const isTrue = VerifyEmail(mail)
        if(isTrue === true){
            setEmailMsg('Email valide')
        } else {
            setEmailMsg("Votre mail n'est pas valide il doit respecter ce format : xxxx@xxxx.xx" )
        }
    }

    const handleConnexion=(email, password)=>{
        if(email !==     null && password !==    null){
            console.log("try connexion");
            fetch("http://192.168.178.62:3000/login", {
                method: "POST",
                headers: {  
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            .then((response) => response.json())
            .then((data) => {   
                storeToken(data.token);
                setConnected(true);
            })
            .catch((err) => { console.log("Error : ", err) })
        } else {
            setConnexionMsg('Veuillez vérifier les information rentrée')
        }
    }
        
    return(
        <SafeAreaProvider style={usdTheme.logForm}>    
             <Text
                style={connexionMsg === "Veuillez vérifier les information rentrée" ?
                usdTheme.unvalidInput : ''}
            >{ connexionMsg !== null ? connexionMsg : '' }</Text>
            {/* EMAIL */}
            <TextInput 
                onChangeText={handleEmailChange}
                placeholder='Enter your Email'
                placeholderTextColor='gray'
                value={email} 
                style={usdTheme.input}
            />

            {/* EMAIL - MESSAGE D'ERREUR */}
            <Text
                style={emailRegexMsg === "Votre mail n'est pas valide il doit respecter ce format : xxxx@xxxx.xx" ?
                usdTheme.unvalidInput : 
                emailRegexMsg === "Email valide" ?
                usdTheme.validInput : 
                usdTheme.unvalidInput}
            >{ emailRegexMsg !== null ? emailRegexMsg : '' }</Text>

            {/* MOT DE PASSE */}
            <TextInput 
                onChangeText={handlePasswordChange} 
                placeholder='Enter your Password'
                placeholderTextColor='gray'
                value={password} 
                style={usdTheme.input} 
                secureTextEntry={true}
                maxLength={pswMax}
            />

            {/* MOT DE PASSE - MESSAGE D'ERREUR */}
            <Text 
                style={pswLengthMessage === "Trop petit" ? 
                usdTheme.unvalidInput : 
                pswLengthMessage === "Trop grand" ? 
                usdTheme.unvalidInput : 
                usdTheme.validInput}
            >{ pswLengthMessage !== '' ? pswLengthMessage : '' }</Text>
            <Text 
                style={caracCountMsg === 'Votre mot de passe contient un nombre autoriser de lettres' ? usdTheme.validInput : 
                caracCountMsg === `Votre mot de passe contient trop de lettres, maximum de lettres autoriser ${pswNbCaractere}` ? 
                usdTheme.unvalidInput : 
                usdTheme.validInput
                }
            >{ caracCountMsg !== 0 ? caracCountMsg : '' }</Text>
            <Text 
                style={numberCountMsg === 'Votre mot de passe contient un nombre autoriser de chiffres' ?
                usdTheme.validInput :
                numberCountMsg === `Votre mot de passe contient trop de chiffres, maximum de chiffres autoriser ${pswNbNumber}` ?
                usdTheme.unvalidInput :
                usdTheme.validInput
                }
            >{ numberCountMsg !== 0 ? numberCountMsg : ''}</Text>
            <Text 
                style={specCountMsg === 'Votre mot de passe contient un nombre autoriser de caractères spéciaux' ?
                usdTheme.validInput :
                specCountMsg === `Votre mot de passe contient trop de chiffres, maximum de chiffres autoriser ${pswNbSpechart}` ?
                usdTheme.unvalidInput :
                usdTheme.validInput
                }
            >{ specCountMsg !== 0 ? specCountMsg : ''}</Text>

            <TouchableOpacity onPress={()=> handleConnexion(email ,password)} style={[usdTheme.button]}>
                <Text style={usdTheme.button.text}>Connexion</Text>
            </TouchableOpacity>
        </SafeAreaProvider>
    )   
}