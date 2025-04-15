import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, ScrollView } from "react-native";
import { ChevronDown } from "lucide-react-native";
import { Colors } from "@/constants/Colors";

export default function ConfigScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View className="flex-1 bg-white px-4 pt-14 items-center">
      <ScrollView className="space-y-8">
        {/* Notificações */}
        <View className="flex-row border-gray-300 justify-between items-center border w-[336px] h-[70px] p-2 mb-4">
          <Text className="text-base">Desativar Notificações</Text>
          <Switch
            value={!notificationsEnabled}
            onValueChange={() => setNotificationsEnabled((prev) => !prev)}
            trackColor={{ false: "#d1d5db", true: "#f472b6" }}
            thumbColor={!notificationsEnabled ? Colors.principal : "#f4f3f4"}
          />
        </View>

        {/* Tema do Aplicativo */}
        <View className="flex-row border-gray-300 justify-between items-center border w-[336px] h-[70px] p-2 mb-4">
          <Text className="text-base">Tema do Aplicativo:</Text>
          <View className="flex-row items-center">
            <Text className="text-gray-600 mr-2">Padrão</Text>
            <ChevronDown size={20} color={Colors.principal} />
          </View>
        </View>

        {/* Termos de Serviço */}
        <TouchableOpacity className="flex-row border-gray-300 justify-between items-center border w-[336px] h-[70px] p-2 mb-4">
          <Text className="text-base">Termos de Serviço</Text>
        </TouchableOpacity>

        {/* Políticas */}
        <TouchableOpacity className="flex-row border-gray-300 justify-between items-center border w-[336px] h-[70px] p-2 mb-4">
          <Text className="text-base">
            Políticas de Privacidade e Segurança
          </Text>
        </TouchableOpacity>

        {/* Excluir Conta */}
        <TouchableOpacity className="flex-row border-gray-300 justify-between items-center border w-[336px] h-[70px] p-2 mb-4">
          <Text className="text-base text-error">Excluir Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
