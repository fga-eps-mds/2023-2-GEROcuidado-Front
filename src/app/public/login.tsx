import { Text, View } from "react-native";
import { Link } from 'expo-router';

export default function Login(){
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{ fontSize: 44, fontWeight: "700"}}>
                Login
            </Text>
            <Link href="/" asChild>
                <Text>voltar home</Text>
            </Link>
        </View>
    )
}