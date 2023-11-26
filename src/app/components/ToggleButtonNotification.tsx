import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

interface ToggleButtonProps {
  onPress: () => void;
  active: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ onPress, active }) => {
  return (
    <View style={styles.toggleButtonContainer}>
      <Switch
        trackColor={{ false: "#CCCCCC", true: "#2CCDB5" }}
        thumbColor={active ? "#ffffff" : "#ffffff"}
        ios_backgroundColor="#CCCCCC"
        onValueChange={onPress}
        value={active}
      />
      <Text style={styles.toggleButtonText}>Ativar notificação</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleButtonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },

  toggleButtonText: {
    marginLeft: 10,
    color: 'black',
    fontSize: 17,
  },
});

export default ToggleButton;



