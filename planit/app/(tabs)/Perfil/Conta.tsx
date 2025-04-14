import { View, Image, ScrollView, TextInput, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Botao from "@/components/button/button";

const Conta = () => {
  return (
    <ScrollView className="px-4 bg-white">
      {/*foto do perfil*/}
      <View className="flex flex-row justify-center items-center my-12 ml-3">
        <Image
          source={{
            uri: "https://i.pinimg.com/280x280_RS/53/3e/03/533e031c488dd2ec98c186e90a89d1c0.jpg",
          }}
          className="w-[125px] h-[125px] rounded-full mb-2"
        />
      </View>

      {/*input*/}
      <View className="flex items-center">
        {/*input nome e sobrenome*/}
        <View className="mb-4">
          <View className="flex items-start ">
            <Text>Nome Completo</Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="w-[171px] h-[41px] bg-white border-2
          rounded-lg border-gray-300 mr-3"
              placeholder="Nome"
            ></TextInput>
            <TextInput
              className="w-[171px] h-[41px] bg-white border-2
          rounded-lg border-gray-300"
              placeholder="Sobrenome"
            ></TextInput>
          </View>
        </View>
        {/*fim input nome e sobrenome*/}
        <View className="flex-col flex mb-4 justify-start items-start">
          <Text>
            <Feather name="info" size={15} color={Colors.preto} />
            Descreva seu trabalho
            <TextInput
              className="w-[352px] h-[104px] bg-white border-2
          rounded-lg border-gray-300"
              placeholder="Diga nos sobre o seu trabalho."
            ></TextInput>
          </Text>
        </View>

        <View className="mb-4">
          <View className="">
            <Text>Celular</Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="w-[352px] h-[41px] bg-white border-2
          rounded-lg border-gray-300"
              placeholder="Telefone celular"
            ></TextInput>
          </View>
        </View>
        <View className="mb-4">
          <View className="">
            <Text>
              <Feather name="info" size={15} color={Colors.preto} />
              E-mail
            </Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="w-[352px] h-[41px] bg-white border-2
          rounded-lg border-gray-300"
              placeholder="E-mail"
            ></TextInput>
          </View>
        </View>
        <View className="mb-4">
          <View className="">
            <Text>
              <Feather name="info" size={15} color={Colors.preto} />
              Profissão
            </Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="w-[352px] h-[41px] bg-white border-2
          rounded-lg border-gray-300"
              placeholder="Profissão"
            ></TextInput>
          </View>
          <View className="flex mt-5 items-end">
            <Botao />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Conta;
