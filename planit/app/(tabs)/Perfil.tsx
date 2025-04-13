import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const Perfil = () => {
  return (
    <ScrollView className=" bg-white px-4 pt-10">

      {/*foto do perfil*/}
      <View className="flex flex-row justify-start items-center my-6 ml-3">
        <Image
          source={{
            uri: "https://i.pinimg.com/280x280_RS/53/3e/03/533e031c488dd2ec98c186e90a89d1c0.jpg",
          }}
          className="w-24 h-24 rounded-full mb-2"
        />
        <Text className="text-2xl font-semibold m-9">Iriana Darua</Text>
      </View>

      {/*opções*/}
      <View className="mx-3">
        <Item
          icon={<Ionicons name="person" size={15} color={Colors.preto} />}
          label="Conta"
        />
        <Item
          icon={<Feather name="settings" size={15} color={Colors.preto} />}
          label="Configurações"
        />
        <Item 
          icon={<Feather name="share-2" size={15} color={Colors.preto} />}
          label="Compartilhar Agenda"
        />
        <Item
          icon={<MaterialIcons name="payment" size={15} color={Colors.preto} />}
          label="Métodos de Pagamento"
        />
        <Item
          icon={<MaterialIcons name="logout" size={15} color={Colors.preto} />}
          label="Logout"
          textColor="text-error"
        />
      </View>
    </ScrollView>
  );
};

/*Configuração das opções*/
const Item = ({
  icon,
  label,
  textColor = "text-black",
}: {
  icon: React.ReactNode;
  label: string;
  textColor?: string;
}) => {
  return (
    <TouchableOpacity className="flex-row items-center justify-between py-7 border-b border-gray-100">
      <View className="flex flex-row justify-center items-center">
        <View className="bg-violet-100 flex justify-center items-center w-10 h-10 rounded-2xl mr-3">
          {icon}
        </View>
        <Text className={`text-base ${textColor}`}>{label}</Text>
      </View>
      <Feather name="chevron-right" size={20} color={"#999"} />
    </TouchableOpacity>
  );
};

export default Perfil;
