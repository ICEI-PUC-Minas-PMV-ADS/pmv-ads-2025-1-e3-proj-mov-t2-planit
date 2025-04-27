import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Animated
} from 'react-native';
import { Menu, Provider, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

// Array de clientes
const clientes = [
  { id: '1', nome: 'João Silva',      ultimaVisita: '10 Mar 2024', imagem: require('../../assets/images/rosto10.png'), status: 'Finalizados' },
  { id: '2', nome: 'Ana Paula',       ultimaVisita: '06 Mar 2024', imagem: require('../../assets/images/rosto4.png'), status: 'Cancelados' },
  { id: '3', nome: 'Maria Lopes',     ultimaVisita: '28 Fev 2024', imagem: require('../../assets/images/rosto5.png'), status: 'Antigos' },
  { id: '4', nome: 'Junior Oliveira', ultimaVisita: '23 Fev 2024', imagem: require('../../assets/images/rostodois.png'), status: 'Finalizados' },
  { id: '5', nome: 'Marco Antônio',   ultimaVisita: '15 Fev 2024', imagem: require('../../assets/images/rosto3.png'), status: 'Rejeitados' },
  { id: '6', nome: 'Beatriz Souza',   ultimaVisita: '12 Fev 2024', imagem: require('../../assets/images/rosto8.png'), status: 'Finalizados' },
  { id: '7', nome: 'Carlos Mendes',   ultimaVisita: '08 Fev 2024', imagem: require('../../assets/images/rosto6.png'), status: 'Cancelados' },
  { id: '8', nome: 'Fernanda Costa',  ultimaVisita: '03 Fev 2024', imagem: require('../../assets/images/rosto9.png'), status: 'Antigos' },
  { id: '9', nome: 'Ricardo Lima',    ultimaVisita: '01 Fev 2024', imagem: require('../../assets/images/rosto7.png'), status: 'Rejeitados' },
  { id: '10', nome: 'Patrícia Xavier', ultimaVisita: '20 Abr 2024', imagem: require('../../assets/images/rosto12.png'), status: 'Em andamento' },
  { id: '11', nome: 'Eduardo Tavares', ultimaVisita: '18 Abr 2024', imagem: require('../../assets/images/rosto11.png'), status: 'Em andamento' },
  { id: '12', nome: 'Laura Ribeiro',   ultimaVisita: '16 Abr 2024', imagem: require('../../assets/images/rosto13.png'), status: 'Em andamento' },
];

export default function Cliente() {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  const [menuFiltroVisivel, setMenuFiltroVisivel] = useState(false);
  const [menuClienteVisivel, setMenuClienteVisivel] = useState<string | undefined>(undefined);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState<string[]>([]);
  const scaleAnim = useState(new Animated.Value(1))[0];
  const rotateAnim = useState(new Animated.Value(0))[0];

  const toggleFiltro = (item: string) => {
    setFiltrosSelecionados(state =>
      state.includes(item) ? state.filter(f => f !== item) : [...state, item]
    );
  };

  const animateScale = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateRotation = (abrindo: boolean) => {
    Animated.timing(rotateAnim, {
      toValue: abrindo ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const clientesFiltrados = clientes.filter(c => {
    const passaBusca = c.nome.toLowerCase().includes(busca.toLowerCase());
    const passaFiltro =
      filtro === 'Todos' ||
      (filtro === 'Em andamento' && c.status === 'Em andamento') ||
      (filtro === 'Concluídos' && c.status === 'Finalizados');

    if (filtrosSelecionados.length === 0) return passaBusca && passaFiltro;
    return passaBusca && passaFiltro && filtrosSelecionados.includes(c.status);
  });

  return (
    <Provider>
      <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
        {/* Título */}
        <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
          Histórico de clientes
        </Text>

        {/* Botões de filtro rápido */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
          {['Todos', 'Em andamento', 'Concluídos'].map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => setFiltro(item)}
              style={{
                backgroundColor: filtro === item ? '#f472b6' : '#e5e7eb',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 999,
                marginHorizontal: 6,
              }}
            >
              <Text style={{ color: filtro === item ? 'white' : 'black' }}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Busca + Menu de filtros avançados */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          {/* botão ☰ */}
          <Menu
            visible={menuFiltroVisivel}
            onDismiss={() => setMenuFiltroVisivel(false)}
            anchor={
              <TouchableOpacity onPress={() => setMenuFiltroVisivel(true)} style={{ marginRight: 12, padding: 8, zIndex: 10 }}>
                <Text style={{ fontSize: 20 }}>☰</Text>
              </TouchableOpacity>
            }
            contentStyle={{ backgroundColor: 'white', borderRadius: 12, padding: 12, elevation: 5 }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 12 }}>Selecione o filtro</Text>
            {['Finalizados', 'Cancelados', 'Antigos', 'Rejeitados', 'Em andamento'].map((item, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Checkbox
                  status={filtrosSelecionados.includes(item) ? 'checked' : 'unchecked'}
                  onPress={() => toggleFiltro(item)}
                />
                <Text style={{ fontSize: 14, color: '#374151' }}>{item}</Text>
              </View>
            ))}
          </Menu>

          {/* campo de busca */}
          <TextInput
            placeholder="Buscar cliente..."
            value={busca}
            onChangeText={setBusca}
            style={{
              flex: 1,
              borderColor: '#d1d5db',
              borderWidth: 1,
              borderRadius: 999,
              paddingHorizontal: 16,
              paddingVertical: 10,
            }}
          />
        </View>

        {/* separador */}
        <View style={{ height: 1, backgroundColor: '#e5e7eb', marginBottom: 16 }} />

        {/* lista rolável */}
        <FlatList
          data={clientesFiltrados}
          keyExtractor={i => i.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f3f4f6',
              padding: 16,
              borderRadius: 12,
              marginBottom: 12,
              justifyContent: 'space-between'
            }}>
              {/* info */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={item.imagem} style={{ width: 48, height: 48, borderRadius: 24, marginRight: 12 }} />
                <View>
                  <Text style={{ fontWeight: 'bold' }}>{item.nome}</Text>
                  <Text style={{ color: '#6b7280', fontSize: 12 }}>Última visita: {item.ultimaVisita}</Text>
                </View>
              </View>

              {/* menu individual */}
              <Menu
                visible={menuClienteVisivel === item.id}
                onDismiss={() => {
                  animateRotation(false);
                  setMenuClienteVisivel(undefined);
                }}
                anchor={
                  <TouchableOpacity
                    onPress={() => {
                      animateScale();
                      animateRotation(true);
                      setMenuClienteVisivel(item.id);
                    }}
                    style={{ padding: 8 }}
                  >
                    <Animated.View style={{
                      transform: [
                        { scale: scaleAnim },
                        {
                          rotate: rotateAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '90deg'],
                          }),
                        },
                      ],
                    }}>
                      <Icon name="chevron-right" size={24} color="#6b7280" />
                    </Animated.View>
                  </TouchableOpacity>
                }
              >
                <Menu.Item onPress={() => { alert(`Finalizado ${item.nome}`); setMenuClienteVisivel(undefined); }} title="Finalizado" leadingIcon="check-circle" />
                <Menu.Item onPress={() => { alert(`Cancelado ${item.nome}`); setMenuClienteVisivel(undefined); }} title="Cancelado" leadingIcon="close-circle" />
                <Menu.Item onPress={() => { alert(`Antigos ${item.nome}`); setMenuClienteVisivel(undefined); }} title="Antigos" leadingIcon="history" />
                <Menu.Item onPress={() => { alert(`Rejeitado ${item.nome}`); setMenuClienteVisivel(undefined); }} title="Rejeitado" leadingIcon="cancel" />
              </Menu>
            </View>
          )}
        />
      </View>
    </Provider>
  );
}
