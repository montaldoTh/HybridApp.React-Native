import { FlatList, Text, View } from "react-native";
import useAppStyle from "../../appStyles";
import { useEffect, useState } from "react";
import { Button } from "../../component/Button";
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

    return(
        <View style={style.container}>
            <Text style={[style.text, {marginBottom: 20 }]}>
              Nombre de Matériel enregistrer : {materialList.length}
            </Text>
            <FlatList
                style={{ width: "100%", padding: 15 }}
                data={materialList}
                renderItem={({ item }) => {
                    <View
                        style={[
                            materialStyle,
                            item.complete ? { backgroundColor: "#beebc0" } : {}
                        ]}
                    >
                        <Text style={{ color: "#fff"}}>{item.name}</Text>
                    </View>
                }}
            ></FlatList>
        </View>
    )
}