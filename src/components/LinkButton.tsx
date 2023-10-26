import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  title: string;
  href: string;
  backgroundColor?: string;
}

export function LinkButton({ title, href, backgroundColor }: Props) {
  backgroundColor = backgroundColor ?? "#2CCDB5";

  const navigate = () => router.push(href);

  return (
    <Pressable style={styles(backgroundColor).button} onPress={navigate}>
      <Text style={styles(backgroundColor).buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = (backgroundColor: string) =>
  StyleSheet.create({
    buttonText: {
      fontSize: 18,
      color: "white",
      fontWeight: "700",
    },
    button: {
      width: "100%",
      marginBottom: 25,
      maxWidth: 350,
      paddingVertical: 16,
      paddingHorizontal: 26,
      backgroundColor,
      alignItems: "center",
      borderRadius: 20,
    },
  });