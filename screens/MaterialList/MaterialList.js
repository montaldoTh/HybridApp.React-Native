import { FlatList, Text, View, TouchableOpacity } from "react-native";
import useAppStyle from "../../appStyles";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MaterialList = ({ navigation })=>{

    const [materialList, setMaterialList] = useState([])

    const materialStyle = {
        padding: 15,
        margin: 5,
        backgroundColor: "#eee",
        borderRadius: 5,
        minHeight: 50,
        width: "100%",
        alignSelf: "center"
    };

    const style = useAppStyle();

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            return token;
        } catch (error) {
            console.error('Erreur lors de la récupération du token :', error);
        }
    }

    useEffect(() => {
        fetch("http://192.168.178.62:3000/materials")
        .then((result) => result.json())
        .then((data) => {
            setMaterialList(data);
            console.log("received");
        });
    }, []);

    const reservationUpdate = (id) => {
        console.log("try update");
        fetch(`http://192.168.178.62:3000/material/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ material: {
                id : id,
                reserver: 1, 
            }})
        })
        .then((response) =>  response.json())
        .then((data) => 
            fetch("http://192.168.178.62:3000/materials")
            .then((result) => result.json())
            .then((data) => {
                setMaterialList(data);
                console.log("updated");
            }))
        .catch((err) => console.log(err))
    }

    return(
        <View style={style.container}>
            <Text style={[style.text, {marginBottom: 20 }]}>
              Nombre de Matériel enregistrer : {materialList.length}
            </Text>
            <FlatList
                style={{ width: "100%", padding: 15 }}
                data={materialList}
                renderItem={({ item }) => {
                    return(
                    <View
                        style={[
                            materialStyle,
                            item.complete ? { backgroundColor: "#beebc0" } : {}
                        ]}
                    >
                        <Text>{item.name}</Text>
                        <Text style={{ fontSize: 7, color: "#525252"}}>{item.date}</Text>
                        {
                            item.reserver === 0 && (
                                <TouchableOpacity style={[style.button]}>
                                    <Text style={style.button.text} onPress={() => reservationUpdate(item.id)}>Reserver</Text>
                                </TouchableOpacity>
                            )
                        }

                        <TouchableOpacity style={[style.button, { backgroundColor: "#487aa1"}]} onPress={() => navigation.navigate("Material", { id: item.id})}>
                            <Text style={style.button.text}>Voir</Text>
                        </TouchableOpacity>
                    </View>
                    )
                }}
            ></FlatList>
        </View>
    )
}