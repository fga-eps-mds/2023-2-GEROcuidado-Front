import { Text, View } from "react-native";

import { Button } from "../../components/Button"
import { Link } from "expo-router";

export default function Home() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{ fontSize: 44, fontWeight: "700"}}>
                Home - GEROcuidado
            </Text>

            <Link href="/settings" asChild>
                <View style={{ marginTop: 20 }}>
                    <Button title="Configurações" />
                </View>
            </Link>

            <Link href="/pages/5" asChild>
                <View style={{ marginTop: 20 }}>
                    <Button title="Comentário" />
                </View>    
            </Link>

            <View style={{ marginTop: 20 }}>
                <Button title="Ver comentário" />
            </View>
        </View>
    )
}
