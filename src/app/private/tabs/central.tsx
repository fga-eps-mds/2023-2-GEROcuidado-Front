import {Button, StyleSheet, Text, View} from 'react-native';

import React from 'react';

const BotaoCentral= () => {
    return (
        <View style={styles.container}>
            <Text>Botão Central</Text>
            <Button
                title="Aperte aqui"
                onPress={() => alert('Botão Central!')}
            />
        </View>
    );
};

export default BotaoCentral;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});