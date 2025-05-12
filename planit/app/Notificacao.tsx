import { View, Text } from "react-native";
import { Stack } from "expo-router";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import Feather from "react-native-vector-icons/Feather";
import { Colors } from "@/constants/Colors";

const Notificacao = () => {
  return (
    <View className="flex-1 p-4">
      <Stack.Screen
        options={{
          title: "Notificações",
          headerTitleAlign: "left",
          headerBackVisible: true, // Alinha o título à esquerda
          headerRight: () => (
            <Menu>
              <MenuTrigger>
                <Feather
                  name="more-horizontal"
                  size={24}
                  color={Colors.preto}
                  style={{ marginRight: 16 }}
                />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption
                  onSelect={() => alert("Notificações marcadas como lidas.")}
                  text="Marcar como lido"
                />
                <MenuOption
                  onSelect={() => alert("Notificações excluídas com sucesso.")}
                >
                  <Text>Excluir tudo</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          ),
        }}
      />
      {/* Conteúdo principal */}
      <Text className="text-center mt-5 text-base">
        Suas notificações aparecerão aqui
      </Text>
    </View>
  );
};

export default Notificacao;
