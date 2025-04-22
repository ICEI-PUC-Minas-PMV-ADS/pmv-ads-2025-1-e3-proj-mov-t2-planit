import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-1" />

      <View className="bg-white rounded-t-3xl px-5 pt-10 pb-8 -mt-12 min-h-[450px]">
        <TouchableOpacity
          className="absolute top-4 right-4 p-2"
          onPress={() => router.back()}
        >
          <Text className="text-2xl text-gray-500">×</Text>
        </TouchableOpacity>

        <Text className="text-4xl font-bold text-center mt-6">Login</Text>
        <Text className="text-sm text-gray-600 text-center mt-6 mb-8">
          Entre com o seu e-mail e senha
        </Text>

        <View>
          <TextInput
            className="border-b border-gray-300 py-2 mb-6 text-base"
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <View className="flex-row items-center border-b border-gray-300 mb-4">
            <TextInput
              className="flex-1 py-2 text-base"
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => { /* Depois colocar funçao de recuperar senha */ }}>
              <Text className="text-pink-500 text-sm ml-2">Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="mb-8"
            onPress={() => router.push('/Register')}
          >
            <Text className="text-center text-gray-600 text-base">
              Não tem uma conta?{' '}
              <Text className="text-pink-500 font-bold underline">Cadastro</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-pink-500 py-3 rounded-full items-center"
            onPress={() => { /* TODO: handle login */ }}
          >
            <Text className="text-white text-base font-bold">Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
