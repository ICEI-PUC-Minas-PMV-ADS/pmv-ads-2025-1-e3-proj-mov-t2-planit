import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, } from "react-native";
import { Picker as RNPicker } from '@react-native-picker/picker';
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';

import ModalBase from "../../../components/modais/modalBase";
import PinkBtn from "@/components/button/pinkBtn";
import WhiteBtn from "../../../components/button/whiteBtn";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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
    { name: "Dez", value: 12 }
];

const getDiasMes = (mes: number, ano: number) => {
    return new Date(ano, mes, 0).getDate();
};

const horarios = [
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
    { name: "18:00", value: 21, status: 1},
    { name: "18:30", value: 22, status: 1 },
];

const getStatusCor = ( status: number ) => {
    switch (status) {
        case 1: return {
            text: 'text-green-600',
            border: 'border-green-600' 
        };
        case 2: return {
            text: 'text-pink-700',
            border: 'border-pink-700' 
        };
        case 3: return {
            text: 'text-slate-500',
            border: 'border-slate-500' 
        };
        default: return {
            text: 'text-black',
            border: 'border-black' 
        };
    }
};

const Agenda = () => {
    const [modalVisivel, setModalVisivel] = useState(false);

    const anoAtual = new Date().getFullYear();
    const [mesSelecionado, setMesSelecionado] = useState<number>(new Date().getMonth() + 1);
    const [diaSelecionado, setDiaSelecionado] = useState<number>(1);
    const [diasNoMes, setDiasNoMes] = useState<number[]>([]);

    useEffect(() => {
        const dias = Array.from(
            { length: getDiasMes(mesSelecionado, anoAtual) },
            (_, i) => i + 1
        );
        setDiasNoMes(dias);
        setDiaSelecionado(1);
    }, [mesSelecionado]);

    return (
        <ScrollView>
            <View className="flex flex-1 bg-white">
                <TouchableOpacity className="flex flex-row justify-center m-5" onPress={() => setModalVisivel(true)}>
                    <Ionicons accessibilityLabel="Bloquear o dia" size={30} name="lock-closed-outline" className="bg-slate-50 pb-6 pt-6 pl-1 pr-1 rounded-3xl border border-gray-400"/>
                </TouchableOpacity>

                <SafeAreaProvider>
                    <SafeAreaView>
                        <View className="flex flex-col justify-end mt-8">
                            <View className="flex flex-row justify-between items-center mt-5 mr-16 ml-16">
                                <View>
                                    <Text className="text-lg">Selecione o mês:</Text>
                                </View>

                                <View className="w-40 border border-slate-400 rounded-full">
                                    <RNPicker selectedValue={mesSelecionado} onValueChange={(itemValue) => setMesSelecionado(itemValue)}>
                                        {meses.map((mes) => (
                                            <RNPicker.Item key={mes.value} label={mes.name} value={mes.value}/>
                                        ))}
                                    </RNPicker>
                                </View>
                            </View>

                            <View className="flex flex-row justify-between items-center mt-5 mr-16 ml-16">
                                <View>
                                    <Text className="text-lg">Selecione o dia:</Text>
                                </View>

                                <View className="w-40 border border-slate-400 rounded-full">
                                    <RNPicker selectedValue={diaSelecionado} onValueChange={(itemValue) => setDiaSelecionado(itemValue)}>
                                        {diasNoMes.map((dia) => (
                                            <RNPicker.Item key={dia} label={`${dia.toString().padStart(2, '0')}/${mesSelecionado.toString().padStart(2, '0')}`} value={dia}/>
                                        ))}
                                    </RNPicker>
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </SafeAreaProvider>

                <View className='bg-white mt-10'>
                    <View className='m-3 p-3'>
                        <Text className='text-center text-xl mb-8'>Horários</Text>
                            
                        <View className='flex flex-row flex-wrap justify-center gap-5'> 
  
                            {horarios.map((horario) => {
                            const statusClasses = getStatusCor(horario.status);

                            return (
                            <TouchableOpacity
                                key={horario.value} className={`p-4 justify-center rounded-full border ${statusClasses.border}`}>
                                <Text className={`text-center ${statusClasses.text}`}>{horario.name}</Text>
                            </TouchableOpacity>
                            );
                        })}
                        </View>
                    </View>
                </View>

                <View className='mt-6 mb-8 flex flex-row flex-wrap justify-evenly'>
                    <PinkBtn title="Salvar" onPress={() => { router.push('/(tabs)/Calendario/Index') }} />
                </View>

                <ModalBase visible={modalVisivel} title="Bloquear dia" text="Ao bloquear o dia selecionado os clientes não poderão agendar horários nesta data. Deseja bloquear?" onClose={() => setModalVisivel(false)}>
                    <WhiteBtn title="Cancelar" onPress={() => setModalVisivel(false)}/>
                    <PinkBtn title="Confirmar"/>
                </ModalBase>
            </View>
        </ScrollView>
        )
}

export default Agenda;