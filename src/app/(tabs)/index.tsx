import { Button, Text, View } from "react-native";

import { Link } from "expo-router";

export default function Home(){
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{ fontSize: 44, fontWeight: "700"}}>
                Home - GEROcuidado
            </Text>

            <Link href ="/settings" asChild>
                <Button title="Configurações" />
            </Link>
        </View>
    )
}