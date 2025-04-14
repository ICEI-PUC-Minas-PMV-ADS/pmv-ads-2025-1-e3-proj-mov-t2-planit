import { View, Text } from "react-native";
import React from "react";
import Botao from "@/components/button/button";

const Clientes = () => {
  return (
    <View>
      <Text>Clientes</Text>
      <View className="flex items-center justify-center">
        <Botao />
      </View>
    </View>
  );
};

export default Clientes;
