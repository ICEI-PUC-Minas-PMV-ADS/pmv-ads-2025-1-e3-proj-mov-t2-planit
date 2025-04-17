import React from 'react';
import { Stack } from "expo-router";
import { View } from 'react-native';

// Ana Clara
const Notificacao = () => {
    return (
        <View>
            <Stack.Screen
                options={{
                    title: "Notificações",
                }}
            />
        </View>
    )
}
export default Notificacao;