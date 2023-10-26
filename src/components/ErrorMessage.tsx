import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Props {
  text: string | undefined;
  show: boolean;
}

export function ErrorMessage({ text, show }: Readonly<Props>) {
  return (
    <View>
      <Text style={styles.error}>{show ? text : "   "}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    height: 15,
    color: "#FF7F7F",
    fontSize: 12,
  },
});
