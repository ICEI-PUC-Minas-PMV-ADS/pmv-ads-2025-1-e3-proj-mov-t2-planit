import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Alert,
  TextInput,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { X } from "lucide-react-native";
import * as Clipboard from "expo-clipboard";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import SairContaModal from "@/components/modais/sairConta";
import MudarFotoPerfil from "@/components/modais/mudarFotoPerfil";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import useAuth from "@/hooks/useAuth";
import { updateProfile } from "firebase/auth";
import MetodoPagamentoModal from "@/components/modais/pagamento";
import CompartilharAgendaModal from "@/components/modais/compartilharPerfil";

const shareLink = "www.planit.com/id.name=iriana";
const profileImage =
  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

export default function Perfil() {
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [payModalVisible, setPayModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [profileImageModalVisible, setProfileImageModalVisible] =
    useState(false);
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const { user } = useAuth();
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null);

  const onConfirmLogout = () => {
    setLogoutModalVisible(false);
    signOut(auth).then(() => {
      Alert.alert("Sucesso", "Logout realizado com sucesso!");
      router.replace("/Login");
    });
  };
  const onConfirmProfileImage = async () => {
    try {
      if (auth.currentUser && newImageUrl) {
        await updateProfile(auth.currentUser, {
          photoURL: newImageUrl,
        });
        await auth.currentUser.reload();
        setNewImageUrl(auth.currentUser.photoURL);
      }
      setProfileImageModalVisible(false);
    } catch (error) {
      console.error("Erro ao atualizar foto:", error);
      Alert.alert("Erro", "Não foi possível atualizar a foto.");
    }
  };

  return (
    <View className="bg-white flex-1">
      <ScrollView className="px-4 pt-10">
        {/* Foto do Perfil */}
        <View className="flex-row items-center my-6 ml-3">
          <Pressable onPress={() => setProfileImageModalVisible(true)}>
            <Image
              source={{ uri: user?.photoURL || profileImage }}
              className="w-24 h-24 rounded-full"
            />
          </Pressable>
          <Text className="text-2xl font-semibold ml-6">
            {user?.displayName || "Usuário"}
          </Text>
        </View>

        {/* Lista de Opções */}
        <View className="mx-3">
          <Item
            icon={<Feather name="user" size={15} color={Colors.preto} />}
            label="Conta"
            onPress={() => router.push("/Perfil/Conta")}
          />
          <Item
            icon={<Feather name="settings" size={15} color={Colors.preto} />}
            label="Configurações"
            onPress={() => router.push("/Perfil/Configuracao")}
          />
          <Item
            icon={<Feather name="share-2" size={15} color={Colors.preto} />}
            label="Compartilhar Agenda"
            onPress={() => setShareModalVisible(true)}
          />
          <Item
            icon={
              <MaterialIcons name="payment" size={15} color={Colors.preto} />
            }
            label="Métodos de Pagamento"
            onPress={() => setPayModalVisible(true)}
          />
          <Item
            icon={
              <MaterialIcons name="logout" size={15} color={Colors.preto} />
            }
            label="Logout"
            textColor="text-error"
            onPress={() => setLogoutModalVisible(true)}
          />
        </View>
      </ScrollView>

      <SairContaModal
        visible={logoutModalVisible}
        title="Deseja sair da conta?"
        text="Você deseja encerrar as suas atividades?"
        icone="log-out-outline"
        onClose={() => setLogoutModalVisible(false)}
        onConfirm={onConfirmLogout}
      ></SairContaModal>

      <MudarFotoPerfil
        visible={profileImageModalVisible}
        title="Envie uma nova foto para atualizar seu perfil."
        text="Envie e anexe arquivos a esta aba."
        icone="folder-open-outline"
        onClose={() => setProfileImageModalVisible(false)}
        onConfirm={onConfirmProfileImage}
        setNewImageUrl={setNewImageUrl}
      ></MudarFotoPerfil>

      <CompartilharAgendaModal
        visible={shareModalVisible}
        onClose={() => setShareModalVisible(false)}
        displayName={user?.displayName || "Usuário"}
      />
      <MetodoPagamentoModal
        visible={payModalVisible}
        onClose={() => setPayModalVisible(false)}
      />
    </View>
  );
}

const Item = ({
  icon,
  label,
  textColor = "text-black",
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  textColor?: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between py-7 border-b border-gray-100"
  >
    <View className="flex-row items-center">
      <View className="bg-slate-100 justify-center items-center w-10 h-10 rounded-2xl mr-3">
        {icon}
      </View>
      <Text className={`text-base ${textColor}`}>{label}</Text>
    </View>
    <Feather name="chevron-right" size={20} color="#999" />
  </TouchableOpacity>
);
