import {
  View,
  Image,
  ScrollView,
  TextInput,
  Text,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/hooks/useUserData";
import useAuth from "@/hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import MudarFotoPerfil from "@/components/modais/mudarFotoPerfil";

const Conta = () => {
  const { user } = useAuth();
  const { userData } = useUserData();
  const profileImage =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  const [profileImageModalVisible, setProfileImageModalVisible] =
    useState(false);
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null);

  const onConfirmProfileImage = async () => {
    try {
      if (auth.currentUser && newImageUrl) {
        await updateProfile(auth.currentUser, {
          photoURL: newImageUrl,
        });
        await auth.currentUser.reload();
        setNewImageUrl(auth.currentUser.photoURL);
        Alert.alert("Sucesso", "Foto de perfil atualizada.");
      }
      setProfileImageModalVisible(false);
    } catch (error) {
      console.error("Erro ao atualizar foto:", error);
      Alert.alert("Erro", "Não foi possível atualizar a foto.");
    }
  };

  return (
    <ScrollView className="px-4 bg-white">
      {/* Foto do perfil */}
      <View className="flex flex-row justify-center items-center my-12 ml-3">
        <Pressable onPress={() => setProfileImageModalVisible(true)}>
          <Image
            source={{ uri: user?.photoURL || profileImage }}
            className="w-[125px] h-[125px] rounded-full mb-2"
          />
        </Pressable>
      </View>

      {/* Inputs */}
      <View className="flex items-center">
        {/* Nome */}
        <View className="mb-4">
          <View className="flex items-start">
            <Text className="mb-3 ml-1">Nome</Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="w-[352px] h-[41px] bg-transparent border-b-2 border-gray-100"
              placeholder={user?.displayName || "Usuário"}
            />
          </View>
        </View>

        {/* Celular */}
        <View className="mb-4">
          <View className="ml-1">
            <Text className="mb-3">Celular</Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="w-[352px] h-[41px] bg-transparent border-b-2 border-gray-100"
              placeholder="Telefone celular"
            />
          </View>
        </View>

        {/* Email */}
        <View className="mb-4">
          <View className="flex-row items-center mb-3">
            <Feather
              name="info"
              size={15}
              color={Colors.preto}
              className="mr-1"
            />
            <Text>E-mail</Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="w-[352px] h-[41px] bg-transparent border-b-2 border-gray-100"
              placeholder={user?.email || "E-mail"}
            />
          </View>
        </View>

        {/* Profissão */}
        <View className="mb-4">
          <View className="flex-row items-center mb-3">
            <Feather
              name="info"
              size={15}
              color={Colors.preto}
              className="mr-1"
            />
            <Text>Profissão</Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="w-[352px] h-[41px] bg-transparent border-b-2 border-gray-100"
              placeholder={userData?.profissao ?? "Profissão"}
            />
          </View>
        </View>
      </View>

      {/* Modal para mudar foto */}
      <MudarFotoPerfil
        visible={profileImageModalVisible}
        title="Envie uma nova foto para atualizar seu perfil."
        text="Envie e anexe arquivos a esta aba."
        icone="folder-open-outline"
        onClose={() => setProfileImageModalVisible(false)}
        onConfirm={onConfirmProfileImage}
        setNewImageUrl={setNewImageUrl}
      />
    </ScrollView>
  );
};

export default Conta;
