import { useState } from "react";
import { View, Text, TouchableOpacity, } from "react-native"

import { Ionicons } from "@expo/vector-icons";

import ModalBase from "../../../components/modais/modalBase"
import PinkBtn from "@/components/button/pinkBtn";
import WhiteBtn from "../../../components/button/whiteBtn"

const Agenda = () => {
    const [modalVisivel, setModalVisivel] = useState(false);

    return (
        <View className="flex flex-1 bg-white">
            <TouchableOpacity className="flex flex-row justify-center m-5" onPress={() => setModalVisivel(true)}>
                <Ionicons accessibilityLabel="Bloquear o dia" size={30} name="lock-closed-outline" className="bg-slate-50 pb-6 pt-6 pl-1 pr-1 rounded-3xl border border-gray-400"/>
            </TouchableOpacity>

            <ModalBase visible={modalVisivel} title="Bloquear dia" text="Ao bloquear o dia selecionado os clientes não poderão agendar horários nesta data. Deseja bloquear?" onClose={() => setModalVisivel(false)}>
                <WhiteBtn title="Cancelar" onPress={() => setModalVisivel(false)}/>
                <PinkBtn title="Confirmar"/>
            </ModalBase>


        </View>
    )
}

export default Agenda;