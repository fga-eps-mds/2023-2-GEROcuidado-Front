import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Link } from 'expo-router';

interface Props {
  title: string;
  href: string;
  backgroundColor?: string;
};

export function LinkButton({ title, backgroundColor, href }: Props) {
  return (
    <Link href={href} style={styles.link}>
      <TouchableOpacity style={buttonStyle(backgroundColor ?? '#2CCDB5')}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 25,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '700'
  },
});

const buttonStyle = (backgroundColor: string): StyleProp<ViewStyle> => {
  return {
    width: '80%',
    maxWidth: 350,
    paddingVertical: 16,
    paddingHorizontal: 26,
    backgroundColor,
    alignItems: 'center',
    borderRadius: 20,
  };
};
