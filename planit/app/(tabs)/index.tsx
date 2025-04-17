import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

// Ana Clara

const Header = ({ userName = "Iriana Darua" }) => {
  const [saudacao, setGreeting] = useState('Bom dia');
  const router = useRouter();
  const navigation = useNavigation<any>();

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 5 && hours < 12) {
        setGreeting('Bom dia!');
      } else if (hours >= 12 && hours < 18) {
        setGreeting('Boa tarde!');
      } else {
        setGreeting('Boa noite!');
      }
    };

    // atualiza
    updateGreeting();

    // configura o intervalo para atualizar a cada hora
    const intervalId = setInterval(updateGreeting, 3600000); // 1 hora

    // limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  return (

    <View className="flex justify-between flex-row items-center px-6 py-4 bg-gray-50 border-b border-gray-200 ">
      <View>
        <TouchableOpacity onPress={() => router.push("/Notificacao")}>
          <Feather name="bell" size={20} color={Colors.preto} />
        </TouchableOpacity>
      </View>
      <View className='flex items-end flex-row '>
        <View className="flex-col items-start mr-2">

          <Text className="text-sm text-gray-300">
            {saudacao}
          </Text>
          <Text className="text-lg font-bold text-gray-600">
            {userName}
          </Text>


        </View>
        <View>
          <TouchableOpacity onPress={() => router.push("/(tabs)/Perfil")}>
            <Image
              source={{
                uri: "https://i.pinimg.com/280x280_RS/53/3e/03/533e031c488dd2ec98c186e90a89d1c0.jpg",
              }}
              className="w-[55px] h-[55px] rounded-full"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;