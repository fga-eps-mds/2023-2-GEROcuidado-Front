import React from "react";
import { Text, View, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

export default function Hide(){

    const navigate = () => {
        router.push("/public/login");
    }

    return (
        <View style={styles.textContainer}>
            <Text style={styles.text}>Você precisar efetuar login para acessar essa página!</Text>
            <CustomButton title="Efetuar Login" callbackFn={navigate}></CustomButton>
        </View>
    );
}

const styles = StyleSheet.create({
    textContainer:{
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        marginTop: "90%",
    },
    text: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        margin: 8,
    }
})