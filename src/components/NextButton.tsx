import {
    Pressable,
    StyleSheet,
    Text,
  } from 'react-native';
  import { Link } from 'expo-router';
  
  interface Props {
    title: string;
    backgroundColor?: string;
    onPress: () => void;
  };
  
  export function NextButton({ title, backgroundColor }: Props)     {
    backgroundColor = backgroundColor ?? '#2CCDB5';
    
    return (
        <Pressable style={styles(backgroundColor).button}>
          <Text style={styles(backgroundColor).buttonText}>{title}</Text>
        </Pressable>
    );
  }
  
  const styles = (backgroundColor: string) => StyleSheet.create({
   /*  link: {
      width: "100%",
      marginBottom: 25,
    }, */
    buttonText: {
      fontSize: 18,
      color: 'white',
      fontWeight: '700',
    },
    button: {
      width: "80%",
      maxWidth: 350,
      paddingVertical: 16,
      paddingHorizontal: 26,
      backgroundColor,
      alignItems: 'center',
      borderRadius: 20,
    }
  });
  