import { Text, TouchableOpacity } from "react-native";

type Props = {
    title: string;
}

export function Button({ title }: Props) {
    return(
        <TouchableOpacity style={{ width: 200, padding: 16, backgroundColor: "#2CCDB5", alignItems: "center", borderRadius: 7}}>
            <Text style={{ fontSize: 16, color: "white", fontWeight: "700" }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}