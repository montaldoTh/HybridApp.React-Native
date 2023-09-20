import { useState  } from 'react';
import { View, TextInput, Text } from 'react-native';
import { Button } from '../../component/Button';
import ThemeColors from '../../appStyles';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export const Inscription = ({ MinLength, MaxLength, MaxCarac, MaxNumber, MaxSpechart }) => {
    
  const pswMin = parseInt(MinLength)
  const pswMax = parseInt(MaxLength)
  const pswNbCaractere = parseInt(MaxCarac)
  const pswNbNumber = parseInt(MaxNumber)
  const pswNbSpechart = parseInt(MaxSpechart)

  const usdTheme = ThemeColors();
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [pswLengthMessage, setPswLengthMessage] = useState('');
  const [caracCountMsg, setCaracCountMsg] = useState(0);
  const [numberCountMsg, setNumberCountMsg] = useState(0);
  const [specCountMsg, setSpecCountMsg] = useState(0);
  const [emailRegexMsg, setEmailMsg] = useState(null)

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
    const regex = /^[\w\d!@#$%^&*()_+{}[\]:;<>,.?~\\/-]+@[a-zA-Z]+\.[a-zA-Z]{2}$/g;
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

  const handleConnexion=(mail, password)=>{
    fetch("http://127.0.0.1:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: {email: mail, password: password} })
    })
    .then()
    .then()
    .catch()
  }
    
  return(
      <SafeAreaProvider style={usdTheme.logForm}>    

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

          <Button content="Inscription"></Button>

      </SafeAreaProvider>
  )   
}