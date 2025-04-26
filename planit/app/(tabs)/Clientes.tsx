import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { Menu, Provider } from 'react-native-paper';

// Lista de clientes (simulada)
const clientes = [
  {
    id: '1',
    nome: 'João Silva',
    ultimaVisita: '10 Mar 2024',
    imagem: require('../../assets/images/icon.png'),
  },
  {
    id: '2',
    nome: 'Ana Paula',
    ultimaVisita: '06 Mar 2024',
    imagem: require('../../assets/images/icon.png'),
  },
  {
    id: '3',
    nome: 'Maria Lopes',
    ultimaVisita: '28 Fev 2024',
    imagem: require('../../assets/images/icon.png'),
  },
  {
    id: '4',
    nome: 'Junior Oliveira',
    ultimaVisita: '23 Fev 2024',
    imagem: require('../../assets/images/icon.png'),
  },
  {
    id: '5',
    nome: 'Marco Antônio',
    ultimaVisita: '15 Fev 2024',
    imagem: require('../../assets/images/icon.png'),
  },
];

export default function Cliente() {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  const [menuVisivel, setMenuVisivel] = useState<string | null>(null);// Controla o menu aberto
 

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <Provider>
      <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
        
        {/* Título */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          Histórico de clientes
        </Text>

        {/* Filtros */}
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

        {/* Busca */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity style={{ marginRight: 12 }}>
            <Text style={{ fontSize: 20 }}>☰</Text>
          </TouchableOpacity>
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

        {/* Lista com menu */}
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
              {/* Info do cliente */}
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

              {/* Menu de opções */}
              <Menu
                visible={menuVisivel === item.id}
                onDismiss={() => setMenuVisivel(null)}
                anchor={
                  <TouchableOpacity onPress={() => setMenuVisivel(item.id)}>
                    
                    <Text style={{ fontSize: 20 }}>⋮</Text>
                  </TouchableOpacity>
                }
              >
                <Menu.Item onPress={() => alert(`Ver detalhes de ${item.nome}`)} title="Ver detalhes" />
                <Menu.Item onPress={() => alert(`Editar ${item.nome}`)} title="Editar" />
                <Menu.Item onPress={() => alert(`Excluir ${item.nome}`)} title="Excluir" />
              </Menu>
            </View>
          )}
        />
      </View>
    </Provider>
  );
}
