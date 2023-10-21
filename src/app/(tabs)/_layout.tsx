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
                name="index"
                options={{
                    title: "Inicio",
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="home" size={size} color={color}/>
                    )
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="person" size={size} color={color}/>
                    )
             }}
             />

            <Tabs.Screen
                name="settings"
                options={{
                    title: "Configurações",
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="settings" size={size} color={color}/>
                    )
             }}
             />
        </Tabs>
    )
}