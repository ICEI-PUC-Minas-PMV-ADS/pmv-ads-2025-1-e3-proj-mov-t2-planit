import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, } from "react-native";
import { Picker as RNPicker } from '@react-native-picker/picker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from "@expo/vector-icons";

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

            <ModalBase visible={modalVisivel} title="Bloquear dia" text="Ao bloquear o dia selecionado os clientes não poderão agendar horários nesta data. Deseja bloquear?" onClose={() => setModalVisivel(false)}>
                <WhiteBtn title="Cancelar" onPress={() => setModalVisivel(false)}/>
                <PinkBtn title="Confirmar"/>
            </ModalBase>
        </View>
    )
}

export default Agenda;