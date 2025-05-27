import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { router } from 'expo-router';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import PinkBtn from '../../../components/button/pinkBtn';

const statusMap = {
  1: 'disponivel',
  2: 'agendado',
  3: 'bloqueado',
};

const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const Calendario = () => {
  const [dataSelecionada, setDataSelecionada] = useState(formatDate(new Date()));
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);

  useEffect(() => {
    if (!dataSelecionada) {
      setHorarios([]);
      setMensagem(null);
      return;
    }

    setLoading(true);
    setMensagem(null);

    const docRef = doc(db, 'agenda', dataSelecionada);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const lista = data.horarios || [];

        const horariosConvertidos = lista.map((h) => ({
          hora: h.name,
          status: statusMap[h.status] || 'disponivel',
        }));

        setHorarios(horariosConvertidos);
        setMensagem(null);
      } else {
        setHorarios([]);
        setMensagem('Nenhum horário cadastrado para essa data.');
      }
      setLoading(false);
    }, (error) => {
      console.error('Erro ao buscar horários:', error);
      setMensagem('Erro ao buscar horários.');
      setHorarios([]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dataSelecionada]);

  const renderHorarios = (status: string, cor: string) => {
    const filtrados = horarios.filter(h => h.status === status);
    if (filtrados.length === 0) return null;

    return (
      <View style={{ margin: 12, padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 16, backgroundColor: '#fff' }}>
        <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 16, textTransform: 'capitalize' }}>Horários {status}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
          {filtrados.map((h, i) => (
            <View
              key={i}
              style={{
                borderWidth: 2,
                padding: 12,
                borderRadius: 50,
                borderColor: cor,
                margin: 4,
              }}
            >
              <Text style={{ color: cor }}>{h.hora}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <View style={{ marginTop: 24, marginBottom: 20 }}>
          <Calendar
            onDayPress={(day) => setDataSelecionada(day.dateString)}
            markedDates={{
              [dataSelecionada]: {
                selected: true,
                selectedColor: '#FF69B4', // rosa
              },
            }}
          />
        </View>

        {loading ? (
          <View style={{ marginTop: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#FF69B4" />
            <Text style={{ marginTop: 12, color: '#888' }}>Carregando horários...</Text>
          </View>
        ) : mensagem ? (
          <Text style={{ textAlign: 'center', color: '#888', marginTop: 24 }}>{mensagem}</Text>
        ) : (
          <>
            {renderHorarios('disponivel', 'green')}
            {renderHorarios('agendado', 'pink')}
            {renderHorarios('bloqueado', 'blue')}
          </>
        )}

        <View style={{ marginTop: 24, marginBottom: 32, flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <PinkBtn
            title="Editar Agenda"
            onPress={() => router.push('/(tabs)/Calendario/Agenda')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Calendario;
