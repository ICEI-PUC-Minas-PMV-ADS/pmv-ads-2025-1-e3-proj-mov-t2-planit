import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { db } from '../../../firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import CompCalendar from '../../../components/calendar';
import PinkBtn from "../../../components/button/pinkBtn";

const statusMap = {
  1: 'disponivel',
  2: 'agendado',
  3: 'bloqueado',
};

const Calendario = () => {
  const [dataSelecionada, setDataSelecionada] = useState('2025-05-24');
  const [horarios, setHorarios] = useState<{ hora: string; status: string }[]>([]);

  useEffect(() => {
    if (!dataSelecionada) return;

    const docRef = doc(db, 'agenda', dataSelecionada);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const horariosConvertidos = data.horarios.map((h: any) => ({
          hora: h.name,
          status: statusMap[h.status] || 'desconhecido',
        }));
        setHorarios(horariosConvertidos);
      } else {
        setHorarios([]);
      }
    });

    return () => unsubscribe(); // Limpar listener ao desmontar
  }, [dataSelecionada]);

  const renderHorarios = (status: string, color: string) => {
    const filtrados = horarios.filter(h => h.status === status);

    if (filtrados.length === 0) return null;

    return (
      <View className="m-3 p-3 border border-neutral-200 rounded-2xl bg-white">
        <Text className="text-center text-xl mb-4 capitalize">Horários {status}</Text>
        <View className="flex flex-row flex-wrap justify-center gap-4">
          {filtrados.map((h, index) => (
            <View key={index} className={`border p-3 rounded-full border-${color}-600`}>
              <Text className={`text-${color}-600`}>{h.hora}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View className="flex flex-1 bg-white">
      <ScrollView>
        <View className="mt-6 mb-5">
          <CompCalendar onChangeDate={setDataSelecionada} />
        </View>

        {renderHorarios('disponivel', 'green')}
        {renderHorarios('agendado', 'pink')}
        {renderHorarios('bloqueado', 'blue')}

        <View className="mt-6 mb-8 flex flex-row flex-wrap justify-evenly">
          <PinkBtn title="Editar Agenda" onPress={() => router.push('/(tabs)/Calendario/Agenda')} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Calendario;
