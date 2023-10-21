import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Link } from 'expo-router';

interface Props {
  title: string;
  href: string;
  backgroundColor?: string;
};

export function LinkButton({ title, href, backgroundColor }: Props) {
  backgroundColor = backgroundColor ?? '#2CCDB5';

  return (
    <Link href={href} style={styles(backgroundColor).link} asChild>
      <TouchableOpacity style={styles(backgroundColor).button}>
        <Text style={styles(backgroundColor).buttonText}>{title}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = (backgroundColor: string) => StyleSheet.create({
  link: {
    width: "100%",
    marginBottom: 25,
  },
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
