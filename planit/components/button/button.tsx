import { Alert, Text, TouchableOpacity } from "react-native";

const Botao = () => {
  const onPress = () => Alert.alert("oi");

  return (
    <TouchableOpacity
      className="bg-principal w-[107px] container h-[44px] flex items-center justify-center rounded-lg"
      onPress={onPress}
    >
      <Text className="text-white font-inter font-semibold">Salvar</Text>
    </TouchableOpacity>
  );
};

export default Botao;
