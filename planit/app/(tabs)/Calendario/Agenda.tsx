import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Picker as RNPicker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import ModalBase from "../../../components/modais/modalBase";
import PinkBtn from "@/components/button/pinkBtn";
import WhiteBtn from "../../../components/button/whiteBtn";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Modal para escolher status de um horário
function StatusModal({
  visible,
  currentStatus,
  onClose,
  onSelectStatus,
}: {
  visible: boolean;
  currentStatus: number;
  onClose: () => void;
  onSelectStatus: (status: number) => void;
}) {
  const options = [
    { status: 1, label: "Disponível", color: "green-600", icon: "checkmark-circle-outline" },
    { status: 3, label: "Bloqueado", color: "pink-700", icon: "remove-circle-outline" },
    { status: 2, label: "Agendado", color: "slate-500", icon: "calendar" },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/40 justify-center items-center px-4">
        <View className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
          {/* Header */}
          <Text className="text-2xl font-semibold text-center mb-4">
            Alterar status
          </Text>
          <View className="h-px bg-gray-200 mb-4" />

          {/* Opções */}
          {options.map(({ status, label, color, icon }) => {
            const selected = currentStatus === status;
            const disabled = status === 2; // desabilita "Agendado"
            return (
              <TouchableOpacity
                key={status}
                className={`flex-row items-center p-3 mb-2 rounded-lg ${
                  disabled ? "opacity-50" : "hover:bg-gray-100"
                }`}
                disabled={disabled}
                onPress={() => {
                  onSelectStatus(status);
                  onClose();
                }}
              >
                <Ionicons
                  name={icon as any}
                  size={24}
                  className={`mr-3 ${selected ? `text-${color}` : "text-gray-400"}`}
                />
                <Text
                  className={`text-lg ${
                    selected ? `text-${color}` : "text-gray-700"
                  }`}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* Footer */}
          <View className="h-px bg-gray-200 mt-4 mb-4" />
          <TouchableOpacity
            className="py-3 bg-gray-100 rounded-lg"
            onPress={onClose}
          >
            <Text className="text-center text-gray-700 text-base">
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// Função auxiliar para cores de status
const getStatusCor = (status: number) => {
  switch (status) {
    case 1:
      return { text: "text-green-600", border: "border-green-600" };
    case 2:
      return { text: "text-pink-700", border: "border-pink-700" };
    case 3:
      return { text: "text-slate-500", border: "border-slate-500" };
    default:
      return { text: "text-black", border: "border-black" };
  }
};

const meses = [
  { name: "Jan", value: 1 },
  { name: "Fev", value: 2 },
  { name: "Mar", value: 3 },
  { name: "Abr", value: 4 },
  { name: "Mai", value: 5 },
  { name: "Jun", value: 6 },
  { name: "Jul", value: 7 },
  { name: "Ago", value: 8 },
  { name: "Set", value: 9 },
  { name: "Out", value: 10 },
  { name: "Nov", value: 11 },
  { name: "Dez", value: 12 },
];
const getDiasMes = (mes: number, ano: number) => new Date(ano, mes, 0).getDate();

const Agenda = () => {
  const router = useRouter();

  type Horario = {
    name: string;
    value: number;
    status: number;
  };

  const [horarios, setHorarios] = useState<Horario[]>([
    { name: "08:00", value: 1, status: 1 },
    { name: "08:30", value: 2, status: 1 },
    { name: "09:00", value: 3, status: 1 },
    { name: "09:30", value: 4, status: 1 },
    { name: "10:00", value: 5, status: 1 },
    { name: "10:30", value: 6, status: 2 },
    { name: "11:00", value: 7, status: 1 },
    { name: "11:30", value: 8, status: 1 },
    { name: "12:00", value: 9, status: 2 },
    { name: "12:30", value: 10, status: 1 },
    { name: "13:00", value: 11, status: 3 },
    { name: "13:30", value: 12, status: 1 },
    { name: "14:00", value: 13, status: 1 },
    { name: "14:30", value: 14, status: 1 },
    { name: "15:00", value: 15, status: 1 },
    { name: "15:30", value: 16, status: 1 },
    { name: "16:00", value: 17, status: 1 },
    { name: "16:30", value: 18, status: 3 },
    { name: "17:00", value: 19, status: 1 },
    { name: "17:30", value: 20, status: 1 },
    { name: "18:00", value: 21, status: 1 },
  ]);

  const anoAtual = new Date().getFullYear();
  const [mesSelecionado, setMesSelecionado] = useState<number>(
    new Date().getMonth() + 1
  );
  const [diaSelecionado, setDiaSelecionado] = useState<number>(1);
  const [diasNoMes, setDiasNoMes] = useState<number[]>([]);

  // Bloquear dia modal
  const [modalVisivel, setModalVisivel] = useState(false);

  // StatusModal
  const [statusModalVisivel, setStatusModalVisivel] = useState(false);
  const [horarioSelecionadoState, setHorarioSelecionadoState] = useState<
    Horario | null
  >(null);

  useEffect(() => {
    const dias = Array.from(
      { length: getDiasMes(mesSelecionado, anoAtual) },
      (_, i) => i + 1
    );
    setDiasNoMes(dias);
    setDiaSelecionado(1);
  }, [mesSelecionado]);

  // Ações de bloqueio de dia
  const bloquearDia = () => setModalVisivel(true);
  const confirmBloquearDia = () => {
    setHorarios((prev) => prev.map((h) => ({ ...h, status: 3 })));
    setModalVisivel(false);
  };

  // Abrir modal de status de horário
  const abrirStatusModal = (h: Horario) => {
    setHorarioSelecionadoState(h);
    setStatusModalVisivel(true);
  };
  const fecharStatusModal = () => setStatusModalVisivel(false);

  const handleSelectStatus = (novoStatus: number) => {
    if (!horarioSelecionadoState) return;
    setHorarios((prev) =>
      prev.map((h) =>
        h.value === horarioSelecionadoState.value
          ? { ...h, status: novoStatus }
          : h
      )
    );
  };

  return (
    <ScrollView>
      <View className="flex-1 bg-white p-4">
        {/* Botão bloquear dia */}
        <TouchableOpacity
          className="flex-row justify-center mb-4"
          onPress={bloquearDia}
        >
          <Ionicons
            name="lock-closed-outline"
            size={30}
            color="#4b5563"
            className="bg-slate-100 p-3 rounded-full"
          />
        </TouchableOpacity>

        {/* Seletor mês */}
        <View className="flex-row justify-between items-center mb-4 px-4">
          <Text className="text-lg">Selecione o mês:</Text>
          <View className="border border-slate-400 rounded-full w-32">
            <RNPicker
              selectedValue={mesSelecionado}
              onValueChange={(v) => setMesSelecionado(v)}
            >
              {meses.map((m) => (
                <RNPicker.Item key={m.value} label={m.name} value={m.value} />
              ))}
            </RNPicker>
          </View>
        </View>

        {/* Seletor dia */}
        <View className="flex-row justify-between items-center mb-6 px-4">
          <Text className="text-lg">Selecione o dia:</Text>
          <View className="border border-slate-400 rounded-full w-32">
            <RNPicker
              selectedValue={diaSelecionado}
              onValueChange={(v) => setDiaSelecionado(v)}
            >
              {diasNoMes.map((d) => (
                <RNPicker.Item
                  key={d}
                  label={`${d.toString().padStart(2, "0")}/${mesSelecionado
                    .toString()
                    .padStart(2, "0")}`}
                  value={d}
                />
              ))}
            </RNPicker>
          </View>
        </View>

        {/* Grade de horários */}
        <Text className="text-center text-xl mb-4">Horários</Text>
        <View className="flex-row flex-wrap justify-center gap-4">
          {horarios.map((h) => {
            const cls = getStatusCor(h.status);
            return (
              <TouchableOpacity
                key={h.value}
                className={`p-4 rounded-full border ${cls.border}`}
                onPress={() => abrirStatusModal(h)}
              >
                <Text className={cls.text}>{h.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Botão Salvar */}
        <View className="mt-6 items-center">
          <PinkBtn
            title="Salvar"
            onPress={() => router.push("/(tabs)/Calendario/Index")}
          />
        </View>

        {/* Modal de confirmação de bloqueio de dia */}
        <ModalBase
          visible={modalVisivel}
          title="Bloquear dia"
          text="Deseja realmente bloquear todos os horários deste dia?"
          icone="lock-closed-outline"
          onClose={() => setModalVisivel(false)}
        >
          <View className="flex-row justify-between mt-4">
            <WhiteBtn title="Cancelar" onPress={() => setModalVisivel(false)} />
            <PinkBtn title="Confirmar" onPress={confirmBloquearDia} />
          </View>
        </ModalBase>

        {/* Modal de seleção de status de horário */}
        <StatusModal
          visible={statusModalVisivel}
          currentStatus={horarioSelecionadoState?.status ?? 1}
          onClose={fecharStatusModal}
          onSelectStatus={handleSelectStatus}
        />
      </View>
    </ScrollView>
  );
};

export default Agenda;
