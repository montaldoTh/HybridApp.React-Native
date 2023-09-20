import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import useAppStyle from "../../appStyles";
import { Input } from 'react-native-elements';
import { useState } from 'react';
import * as ImagePicker from "expo-image-picker";

export const AdingMaterial = ({ navigation }) => {
  const currentDate = new Date();
  const formattedDate = 
    currentDate.getFullYear() +
    '-' +
    (currentDate.getMonth() + 1) +
    '-' +
    currentDate.getDate();  
    
    const usdTheme = useAppStyle();
    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [geoloc, setGeoLoc] = useState(null)

    const styles = {
      input: {
        fontSize: 16,
        paddingLeft: 8,
        paddingTop: 8,
        paddingBottom: 8,
      }
    };

    const onAddMaterial = () => {
        fetch("http://192.168.178.62:3000/material", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ material: { 
            name: name, 
            description: description, 
            photo: photo, 
            date: date
          }})
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then(navigation.navigate("Material list"))
        .catch((err) => console.log(err))
    }

    const onAddPhoto = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraPermission.granted === false) {
          return;
        }
    
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          const { assets } = result;
          if (assets && assets.length > 0) {
            setPhoto(assets[0].uri);
          }
        }
    };

    const onSelectPhotoFromLibrary = async () => {
      const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (libraryPermission.granted === false) {
          alert("La permission pour accéder a votre gallerie d'image est nécessaire ajouter une image");
          return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
      });
  
      if (!result.canceled) {
        const { assets } = result;
        if (assets && assets.length > 0) {
          setPhoto(assets[0].uri);
        }
      }
    };

    return(
      <View style={usdTheme.container}>
        <Input
          placeholder='Nom du matériel'
          value={name}
          style={{ color: "#fff"}}
          onChangeText={(value) => setName(value)}
        ></Input>

        <Text style={{ color: "#8ba3b3", fontSize: 16 }}>Description du Matériel</Text>
        <TextInput
          style={[styles.input, { color: "#fff"}]}
          value={description}
          onChangeText={(value) => setDescription(value)}
        ></TextInput>

        <TouchableOpacity onPress={()=> onAddPhoto()} style={[usdTheme.button]}>
          <Text style={usdTheme.button.text}>Ajouter d'une photo (camera)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[usdTheme.button]} onPress={() => onSelectPhotoFromLibrary()}>
          <Text style={usdTheme.button.text}>Ajout d'une image (galerie d'image)</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> onAddMaterial()} style={[usdTheme.button, { backgroundColor: "#487aa1"}]}>
          <Text style={usdTheme.button.text}>Enregistrer le matériel</Text>
        </TouchableOpacity>
      </View>
  )
}