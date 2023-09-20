import { Text, TextInput, View, TouchableOpacity, Image } from "react-native";
import useAppStyle from "../../appStyles";
import { useEffect, useState } from "react";
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from 'react-native-elements';
import * as ImagePicker from "expo-image-picker";


export const DetailsMaterial = ({ id }) => {
    
    const route = useRoute();
    const unupdaptedMaterialId = route.params?.id;
    const [unupdaptedMaterial, setUnupdatedMaterial] = useState({})

    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [geoloc, setGeoLoc] = useState(null)
    const [reserver, setReserver] = useState(null)

    const style = useAppStyle();

    useEffect(() => {
        fetch(`http://192.168.178.62:3000/material/${unupdaptedMaterialId}`)
        .then((result) => result.json())
        .then((data) => {
            setUnupdatedMaterial(data)
            console.log("received");
        })
        .catch((err) => console.log(err))
    }, []);
    
    const onAddPhoto = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraPermission.granted === false) {
            alert("La permission pour accéder a votre caméra est nécessaire pour prendre une photo");
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

    const onUpdateMaterial = () => {
        if(name === null){
            setName(unupdaptedMaterial.name)
        }
        if(description === null){
            setDescription(unupdaptedMaterial.description)
        }
        if(photo === null){
            setPhoto(unupdaptedMaterial.photo)
        }
        if(reserver === null){
            setReserver(unupdaptedMaterial.reserver)
        }
        console.log("try update");
        fetch(`http://192.168.178.62:3000/material/${unupdaptedMaterialId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ material: {
                name: name,
                description: description,
                photo: photo,
                reserver: reserver
            }})
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then(navigation.navigate("Material list"))
        .catch((err) => console.log(err))
    }
    

    return(
        <View style={style.container}>
            <Input
                placeholder={"Nom du matériel actuel"}
                value={name === null ? unupdaptedMaterial.name : name}
                onChangeText={(value) => setName(value)}
                style={{ color: "#fff"}}
            ></Input>

            <Text style={{ color: "#8ba3b3", fontSize: 16 }}>Description du Matériel</Text>
            <TextInput
                style={[style.input, { color: "#fff"}]}
                value={description === null ? unupdaptedMaterial.description : description}
                onChangeText={(value) => setDescription(value)}
            ></TextInput>
            
            {
                unupdaptedMaterial.image !== null && (
                    <View>
                        <Image
                            source={{ uri: "http://192.168.178.62:3000/uploads/materials/" + unupdaptedMaterial.image}}
                            style={{width: 100, height: 100}} 
                        ></Image>

                        <TouchableOpacity style={[style.button]} onPress={()=> onAddPhoto()}>
                            <Text style={style.button.text}>Changer la photo (camera)</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[style.button]} onPress={onSelectPhotoFromLibrary}>
                            <Text style={style.button.text}>Changer d'image (galerie d'image)</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
            {
                unupdaptedMaterial.image === null && (
                    <View>
                        <TouchableOpacity style={[style.button]} onPress={()=> onAddPhoto()}>
                            <Text style={style.button.text}>Ajout d'une photo (camera)</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[style.button]} onPress={() => onSelectPhotoFromLibrary()}>
                            <Text style={style.button.text}>Ajout d'une image (galerie d'image)</Text>
                        </TouchableOpacity>

                        <Image
                            source={{uri: photo}}
                            style={{width: 100, height: 100}} 
                        ></Image>
                    </View>
                )
            }

            <TouchableOpacity style={[style.button, { backgroundColor: "#487aa1"}]} onPress={() => onUpdateMaterial()}>
                <Text style={style.button.text}>Modifier du matériel</Text>
            </TouchableOpacity>
        </View>
    )
}