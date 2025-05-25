import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import CompCalendar from "../../../components/calendar/index";
import PinkBtn from "../../../components/button/pinkBtn";
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

const Calendario = () => {
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([]);
  const [horariosAgendados, setHorariosAgendados] = useState<string[]>([]);
  const [horariosBloqueados, setHorariosBloqueados] = useState<string[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState("2025-05-24"); // futuramente controlada pelo CompCalendar

  useEffect(() => {
    const q = query(collection(db, 'agendamentos'), where('data', '==', dataSelecionada));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const disponiveis: string[] = [];
      const agendados: string[] = [];
      const bloqueados: string[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.status === 'disponivel') disponiveis.push(data.hora);
        if (data.status === 'agendado') agendados.push(data.hora);
        if (data.status === 'bloqueado') bloqueados.push(data.hora);
      });

      setHorariosDisponiveis(disponiveis);
      setHorariosAgendados(agendados);
      setHorariosBloqueados(bloqueados);
    });

    return () => unsubscribe();
  }, [dataSelecionada]);

  const renderHorarios = (lista: string[], cor: string) => (
    <View className='flex flex-row flex-wrap justify-center gap-5'>
      <View>
        <Ionicons size={20} name="time-outline" className='p-4 justify-center' />
      </View>
      {lista.map((hora, index) => (
        <View
          key={index}
          className={`border p-4 justify-center rounded-full ${
            cor === 'green' ? 'border-green-600' :
            cor === 'pink' ? 'border-pink-700' :
            'border-slate-500'
          }`}
        >
          <Text className={`${
            cor === 'green' ? 'text-green-600' :
            cor === 'pink' ? 'text-pink-700' :
            'text-slate-500'
          }`}>
            {hora}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <View className='flex flex-1 bg-white'>
      <ScrollView className='h-auto'>
        <View className='mt-6 mb-5'>
          <CompCalendar onChangeDate={setDataSelecionada} /> 
        </View>

        {/* Disponíveis */}
        <View className='bg-white'>
          <View className='m-3 p-3 border border-neutral-200 rounded-2xl'>
            <Text className='text-center text-xl mb-8'>Horários Disponíveis</Text>
            {renderHorarios(horariosDisponiveis, 'green')}
          </View>
        </View>

        {/* Agendados */}
        <View className='bg-white'>
          <View className='m-3 p-3 border border-neutral-200 rounded-2xl'>
            <Text className='text-center text-xl mb-8'>Horários Agendados</Text>
            {renderHorarios(horariosAgendados, 'pink')}
          </View>
        </View>

        {/* Bloqueados */}
        <View className='bg-white'>
          <View className='m-3 p-3 border border-neutral-200 rounded-2xl'>
            <Text className='text-center text-xl mb-8'>Horários Bloqueados</Text>
            {renderHorarios(horariosBloqueados, 'slate')}
          </View>
        </View>

        <View className='mt-6 mb-8 flex flex-row flex-wrap justify-evenly'>
          <PinkBtn title="Editar Agenda" onPress={() => { router.push('/(tabs)/Calendario/Agenda') }} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Calendario;
