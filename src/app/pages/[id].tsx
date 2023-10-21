import { Text, View } from "react-native";

import { useSearchParams } from "expo-router";

// Aqui temos a navegação em pilha, diferente da navegação da outra pasta que é em tabs
export default function Coment(){
    const { id } = useSearchParams();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{ fontSize: 44, fontWeight: "700"}}>
                Comentario:  { id }
            </Text>
        </View>
    )
}