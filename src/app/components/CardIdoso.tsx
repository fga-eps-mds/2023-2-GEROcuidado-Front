import React from "react"
import { View, Image, Text, StyleSheet} from "react-native"

interface IProps{
    nome : string;
}

export default function CardIdoso({nome}:IProps){
    return (
        <View>
            <Image source={require("../../../assets/Idoso.png")} style={styles.imagem} />
            <Text style={styles.texto}>{nome}</Text>
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
    
})
