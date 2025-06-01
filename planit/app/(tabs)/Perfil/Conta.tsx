import { View, Image, ScrollView, TextInput, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/hooks/useUserData";
import useAuth from "@/hooks/useAuth";

const Conta = () => {
  const { user } = useAuth();
  const { userData } = useUserData();
  const profileImage =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
  return (
    <ScrollView className="px-4 bg-white">
      {/*foto do perfil*/}
      <View className="flex flex-row justify-center items-center my-12 ml-3">
        <Image
          source={{ uri: user?.photoURL || profileImage }}
          className="w-[125px] h-[125px] rounded-full mb-2"
        />
      </View>

      {/*input*/}
      <View className="flex items-center">
        {/*input nome e sobrenome*/}
        <View className="mb-4 ">
          <View className="flex items-start ">
            <Text className="mb-3 ml-1">Nome</Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="w-[352px] h-[41px] bg-transparent border-b-2 border-gray-100"
              placeholder={user?.displayName || "Usuário"}
            ></TextInput>
          </View>
        </View>

        {/*fim input nome e sobrenome*/}

        <View className="mb-4">
          <View className="ml-1">
            <Text className="mb-3">Celular</Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="w-[352px] h-[41px] bg-transparent border-b-2 border-gray-100"
              placeholder="Telefone celular"
            ></TextInput>
          </View>
        </View>
        <View className="mb-4">
          <View className="flex-row items-center mb-3">
            <Feather
              name="info"
              size={15}
              color={Colors.preto}
              className="mr-1"
            />
            <Text className="">E-mail</Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="w-[352px] h-[41px] bg-transparent border-b-2 border-gray-100"
              placeholder={user?.email || "E-mail"}
            ></TextInput>
          </View>
        </View>
        <View className="mb-4">
          <View className="flex-row items-center mb-3">
            <Feather
              name="info"
              size={15}
              color={Colors.preto}
              className="mr-1"
            />
            <Text className="">Profissão</Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="w-[352px] h-[41px] bg-transparent border-b-2 border-gray-100"
              placeholder={userData?.profissao ?? "Profissão"}
            ></TextInput>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Conta;
