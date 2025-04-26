import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { Menu, Provider, Checkbox } from 'react-native-paper';

// Lista de clientes (simulada)
const clientes = [
  {
    id: '1',
    nome: 'João Silva',
    ultimaVisita: '10 Mar 2024',
    imagem: require('../../assets/images/icon.png'),
    status: 'Finalizados',
  },
  {
    id: '2',
    nome: 'Ana Paula',
    ultimaVisita: '06 Mar 2024',
    imagem: require('../../assets/images/icon.png'),
    status: 'Cancelados',
  },
  {
    id: '3',
    nome: 'Maria Lopes',
    ultimaVisita: '28 Fev 2024',
    imagem: require('../../assets/images/icon.png'),
    status: 'Antigos',
  },
  {
    id: '4',
    nome: 'Junior Oliveira',
    ultimaVisita: '23 Fev 2024',
    imagem: require('../../assets/images/icon.png'),
    status: 'Finalizados',
  },
  {
    id: '5',
    nome: 'Marco Antônio',
    ultimaVisita: '15 Fev 2024',
    imagem: require('../../assets/images/icon.png'),
    status: 'Rejeitados',
  },
];

export default function Cliente() {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  const [menuVisivel, setMenuVisivel] = useState<string | null>(null);
  const [menuFiltroVisivel, setMenuFiltroVisivel] = useState(false);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState<string[]>([]);

  const toggleFiltro = (filtro: string) => {
    if (filtrosSelecionados.includes(filtro)) {
      setFiltrosSelecionados(filtrosSelecionados.filter(f => f !== filtro));
    } else {
      setFiltrosSelecionados([...filtrosSelecionados, filtro]);
    }
  };

  const clientesFiltrados = clientes.filter(cliente => {
    const nomeFiltraBusca = cliente.nome.toLowerCase().includes(busca.toLowerCase());

    if (filtrosSelecionados.length === 0) {
      return nomeFiltraBusca;
    }

    const filtraPorStatus = filtrosSelecionados.includes(cliente.status);

    return nomeFiltraBusca && filtraPorStatus;
  });

  return (
    <Provider>
      <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
        {/* Título */}
        <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
          Histórico de clientes
        </Text>

        {/* Filtros principais */}
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

        {/* Barra de busca + botão de filtros */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          {/* Menu lateral de filtros */}
          <Menu
            visible={menuFiltroVisivel}
            onDismiss={() => setMenuFiltroVisivel(false)}
            anchor={
              <TouchableOpacity onPress={() => setMenuFiltroVisivel(true)} style={{ marginRight: 12 }}>
                <Text style={{ fontSize: 20 }}>☰</Text>
              </TouchableOpacity>
            }
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: 12,
              padding: 12,
              elevation: 5,
            }}
          >
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 12, color: '#374151' }}>
                Selecione o filtro
              </Text>

              {['Finalizados', 'Cancelados', 'Antigos', 'Rejeitados'].map((item, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                  <Checkbox
                    status={filtrosSelecionados.includes(item) ? 'checked' : 'unchecked'}
                    onPress={() => toggleFiltro(item)}
                  />
                  <Text style={{ fontSize: 14, color: '#374151' }}>{item}</Text>
                </View>
              ))}
            </View>
          </Menu>

          {/* Campo de busca */}
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

        {/* Separador */}
        <View style={{ height: 1, backgroundColor: '#e5e7eb', marginBottom: 16 }} />

        {/* Lista de clientes */}
        <FlatList
          data={clientesFiltrados}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#f3f4f6',
                padding: 16,
                borderRadius: 12,
                marginBottom: 12,
                justifyContent: 'space-between',
              }}
            >
              {/* Informações do cliente */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={item.imagem}
                  style={{ width: 48, height: 48, borderRadius: 24, marginRight: 12 }}
                />
                <View>
                  <Text style={{ fontWeight: 'bold' }}>{item.nome}</Text>
                  <Text style={{ color: '#6b7280', fontSize: 12 }}>
                    Última visita: {item.ultimaVisita}
                  </Text>
                </View>
              </View>

              {/* Menu de opções individuais */}
              <Menu
                visible={menuVisivel === item.id}
                onDismiss={() => setMenuVisivel(null)}
                anchor={
                  <TouchableOpacity
                    onPress={() => setMenuVisivel(item.id)}
                    style={{
                      padding: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 18 }}>⋮</Text>
                  </TouchableOpacity>
                }
              >
                <Menu.Item
                  onPress={() => alert(`Marcar ${item.nome} como Finalizado`)}
                  title="Finalizado"
                  leadingIcon="check-circle"
                />
                <Menu.Item
                  onPress={() => alert(`Marcar ${item.nome} como Cancelado`)}
                  title="Cancelado"
                  leadingIcon="close-circle"
                />
                <Menu.Item
                  onPress={() => alert(`Ver antigos registros de ${item.nome}`)}
                  title="Antigos"
                  leadingIcon="history"
                />
                <Menu.Item
                  onPress={() => alert(`Rejeitar ${item.nome}`)}
                  title="Rejeitado"
                  leadingIcon="cancel"
                />
              </Menu>
            </View>
          )}
        />
      </View>
    </Provider>
  );
}
