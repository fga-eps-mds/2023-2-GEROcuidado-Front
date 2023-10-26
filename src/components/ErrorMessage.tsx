import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface IProps {
  text: string | undefined;
  show: boolean
};

export function ErrorMessage({ text, show }: IProps) {
  return (
    <View>
      <Text style={styles.error}>{show ? text : '   '}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    height: 15,
    color: "#FF7F7F",
    fontSize: 12,
  }
});
