import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

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

    updateGreeting();
    const intervalId = setInterval(updateGreeting, 3600000);
    return () => clearInterval(intervalId);
  }, []);

  // Componente de Calendário
  const CalendarioSemana = () => {
    const hoje = new Date();
    const atualDiaDaSemana = hoje.getDay();
    const AtualDia = hoje.getDate();
    const diasDaSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    const obterDiasDaSemanaComDatas = () => {
      const resultado = [];
      const comecoDaSemana = new Date(hoje);
      comecoDaSemana.setDate(AtualDia - atualDiaDaSemana);

      for (let i = 0; i < 7; i++) {
        const dataDoDia = new Date(comecoDaSemana);
        dataDoDia.setDate(comecoDaSemana.getDate() + i);

        resultado.push({
          letter: diasDaSemana[i],
          number: dataDoDia.getDate().toString(),
          isToday: dataDoDia.getDate() === AtualDia
        });
      }
      return resultado;
    };

    const dias = obterDiasDaSemanaComDatas();

    return (
      <View className="flex flex-row justify-between mt-4 px-1">
        {dias.map((dia, index) => (
          <View key={index} className="items-center">
            <View
              className={`w-14 h-12 rounded-full justify-center items-center mb-2
                ${dia.isToday ? 'bg-pink-500' : 'bg-secundaria'}`}
            >
              <Text className={`text-lg font-bold
                ${dia.isToday ? 'text-secundaria' : 'text-gray-600'}`}
              >
                {dia.letter}
              </Text>
            </View>
            <Text className={`text-lg
              ${dia.isToday ? 'font-bold text-gray-500' : 'text-gray-300'}`}
            >
              {dia.number}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View className="bg-gray-50 border-b border-gray-200">
      <View className="flex justify-between flex-row items-center px-6 py-4">
        <View>
          <TouchableOpacity onPress={() => router.push("/Notificacao")}>
            <Feather name="bell" size={20} color={Colors.preto} />
          </TouchableOpacity>
        </View>
        <View className='flex items-end flex-row'>
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

      <CalendarioSemana />
    </View>
  );
};

export default Header;