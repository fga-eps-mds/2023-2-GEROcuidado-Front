import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface ToggleButtonProps {
  onPress: () => void;
  active: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ onPress, active }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.toggleButton, { backgroundColor: active ? '#2CCDB5' : '#CCCCCC' }]}>
        <Text style={{ color: active ? 'white' : 'black' }}>Ativar</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});

export default ToggleButton;
