import React, { useEffect, useState } from 'react';
import {View,Text,TouchableOpacity,StyleSheet,ScrollView,ActivityIndicator,Alert} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {collection,onSnapshot,query,where,orderBy,updateDoc,doc,Timestamp,Query,QuerySnapshot,QueryDocumentSnapshot,FirestoreError} from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig';

interface Servico {
  id: string;
  nome: string;
  duracao: string;
  valor: string;
  ativo: boolean;
  criadoEm: Timestamp;
}

const Servicos: React.FC = () => {
  const router = useRouter();

  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<'Todos' | 'Ativos' | 'Inativos' | 'Recentes'>('Todos');
  const [switches, setSwitches] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setLoading(true);

    const user = auth.currentUser;
    if (!user) {
      router.replace('/Login');
      return;
    }

    let q: Query = query(
      collection(db, 'Servicos'),
      where('uid', '==', user.uid)
    );

    if (filtro === 'Recentes') {
      q = query(q, where('uid', '==', user.uid), orderBy('criadoEm', 'desc'));
    } else if (filtro === 'Ativos') {
      q = query(q, where('uid', '==', user.uid), where('ativo', '==', true));
    } else if (filtro === 'Inativos') {
      q = query(q, where('uid', '==', user.uid), where('ativo', '==', false));
    }

    const unsub = onSnapshot(
      q,
      (snapshot: QuerySnapshot) => {
        const lista: Servico[] = [];
        const mapSwitches: Record<string, boolean> = {};

        snapshot.forEach((docSnap: QueryDocumentSnapshot) => {
          const data = docSnap.data() as any;
          lista.push({
            id: docSnap.id,
            nome: data.nome,
            duracao: data.duracao,
            valor: data.valor,
            ativo: data.ativo,
            criadoEm: data.criadoEm
          });
          mapSwitches[docSnap.id] = data.ativo;
        });

        setServicos(lista);
        setSwitches(mapSwitches);
        setLoading(false);
      },
      (error: FirestoreError) => {
        console.error('Erro ao ler serviços:', error);
        Alert.alert('Erro', 'Não foi possível carregar serviços.');
        setLoading(false);
      }
    );

    return () => unsub();
  }, [filtro, router]);

  const toggleAtivo = async (id: string) => {
    try {
      await updateDoc(doc(db, 'Servicos', id), { ativo: !switches[id] });
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      Alert.alert('Erro', 'Não foi possível alterar o status.');
    }
  };

  const countAtivos = servicos.filter(s => s.ativo).length;
  const countAndamento = servicos.length - countAtivos;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF006F" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Meus Serviços</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.cardEstatisticaAmarelo}>
          <Text style={styles.statsTitle}>Serviços Ativos</Text>
          <Text style={styles.statsValue}>{countAtivos}</Text>
        </View>
        <View style={styles.cardEstatisticaRosa}>
          <Text style={styles.statsTitle}>Em Andamento</Text>
          <Text style={styles.statsValue}>{countAndamento}</Text>
        </View>
      </View>

      <View style={styles.filters}>
        {['Todos', 'Ativos', 'Inativos', 'Recentes'].map(f => (
          <TouchableOpacity
            key={f}
            onPress={() => setFiltro(f as any)}
            style={filtro === f ? styles.filterActive : styles.filterInactive}
          >
            <Text style={filtro === f ? styles.filterTextActive : styles.filterTextInactive}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {servicos.map(item => (
          <View key={item.id} style={styles.card}>
            <View>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: '/(tabs)/Servicos/EditarServicos',
                      params: { id: item.id }
                    })
                  }
                >
                  <Ionicons name="create-outline" size={16} color="#000" />
                </TouchableOpacity>
              </View>
              <Text style={styles.cardDetails}>
                {item.duracao} • R$ {item.valor}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => toggleAtivo(item.id)}
              style={[
                styles.switchOuter,
                { backgroundColor: switches[item.id] ? '#FF007F' : '#D1D5DB' }
              ]}
            >
              <View
                style={[
                  styles.switchInner,
                  { alignSelf: switches[item.id] ? 'flex-end' : 'flex-start' }
                ]}
              />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/(tabs)/Servicos/CadastroServicos')}
        >
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    paddingTop: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    height: 48
  },
  headerButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  cardEstatisticaAmarelo: {
    flex: 1,
    backgroundColor: '#E1FF00',
    borderRadius: 12,
    marginRight: 8,
    alignItems: 'center',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#FFD600'
  },
  cardEstatisticaRosa: {
    flex: 1,
    backgroundColor: '#FFE5EF',
    borderRadius: 12,
    marginLeft: 8,
    alignItems: 'center',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#F48FB1'
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF006F'
  },
  statsValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF006F'
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16
  },
  filterActive: {
    backgroundColor: '#FF006F',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20
  },
  filterInactive: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDD'
  },
  filterTextActive: {
    color: '#FFF',
    fontWeight: '600'
  },
  filterTextInactive: {
    color: '#333',
    fontWeight: '600'
  },
  list: {
    paddingBottom: 32
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#F3F4F6'
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 6
  },
  cardDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4
  },
  switchOuter: {
    width: 50,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    padding: 3
  },
  switchInner: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    borderRadius: 12
  },
  addButton: {
    marginTop: 24,
    alignSelf: 'center',
    backgroundColor: '#FF007F',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default Servicos;
