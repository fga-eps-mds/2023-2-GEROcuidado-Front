import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabRoutesLayout(){
    return (
        <Tabs screenOptions={{ headerShown: false}}>
            <Tabs.Screen
                name="rotinas"
                options={{
                    title: "Rotinas",
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="date-range" size={size} color={color}/>
                    )
                }}
            />
            <Tabs.Screen
                name="registros"
                options={{
                    title: "Registros",
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="favorite" size={size} color={color}/>
                    )
                }}
            />

            <Tabs.Screen
                name="forum"
                options={{
                    title: "Forum",
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="chatbox-outline" size={size} color={color}/>
                    )
             }}
             />

            <Tabs.Screen
                name="perfil"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="person" size={size} color={color}/>
                    )
             }}
             />
        </Tabs>
    )
}