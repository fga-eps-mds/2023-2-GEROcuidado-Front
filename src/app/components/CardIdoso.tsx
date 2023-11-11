import React from "react"
import { View, Image, Text, StyleSheet, Pressable} from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface IProps{
    nome : string;
}

const navigate = () => {
    
}

export default function CardIdoso({nome}:IProps){
    return (
        <View>
            <Image source={require("../../../assets/Idoso.png")} style={styles.imagem} />
                <Text style={styles.texto}>{nome}</Text>
                <Pressable onPress={navigate}>
                    <Icon style={styles.foot} name="pencil" size={18} color={"black"} />
                </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    imagem:{
        height: 149,
        width: 132,
        borderRadius: 12,
    },
    texto:{
        alignSelf: "center",
    },
    foot: {
        position: "absolute",
        right: 3,
        bottom: 20,
    }
})
