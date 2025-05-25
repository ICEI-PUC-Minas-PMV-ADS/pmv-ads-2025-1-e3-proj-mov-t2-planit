import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { db } from '../../../firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import CompCalendar from '../../../components/calendar';
import PinkBtn from "../../../components/button/pinkBtn";

const Calendario = () => {
  const [dataSelecionada, setDataSelecionada] = useState('2025-05-24');
  const [horarios, setHorarios] = useState<{ hora: string; status: string }[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'agenda'), where('data', '==', dataSelecionada));
    const unsubscribe = onSnapshot(q, snapshot => {
      const dados: any[] = [];
      snapshot.forEach(doc => dados.push(doc.data()));
      setHorarios(dados);
    });

    return unsubscribe;
  }, [dataSelecionada]);

  const renderHorarios = (status: string, color: string) => {
    const filtrados = horarios.filter(h => h.status === status);

    return (
      <View className="m-3 p-3 border border-neutral-200 rounded-2xl bg-white">
        <Text className="text-center text-xl mb-8 capitalize">Horários {status}</Text>
        <View className="flex flex-row flex-wrap justify-center align-middle gap-5">
          <Ionicons size={20} name="time-outline" />
          {filtrados.map((h, index) => (
            <View key={index} className={`border p-4 justify-center rounded-full border-${color}-600`}>
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
