import { router } from "expo-router";
import { Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface IProps {
  canGoBack?: boolean;
}

export function BackButton({ canGoBack = true }: IProps) {
  const goBack = () => (canGoBack ? router.back() : false);

  return (
    <Pressable onPress={goBack}>
      <Icon name="chevron-left" size={40} />
    </Pressable>
  );
}
