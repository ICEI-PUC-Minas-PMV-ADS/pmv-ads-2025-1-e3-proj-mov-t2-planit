import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';

const clientes = [
  {
    id: '1',
    nome: 'João Silva',
    ultimaVisita: '10 Mar 2024',
    imagem: require('../assets/joao.png'),
  },
  {
    id: '2',
    nome: 'Ana Paula',
    ultimaVisita: '06 Mar 2024',
    imagem: require('../assets/ana.png'),
  },
  {
    id: '3',
    nome: 'Maria Lopes',
    ultimaVisita: '28 Fev 2024',
    imagem: require('../assets/maria.png'),
  },
  {
    id: '4',
    nome: 'Junior Oliveira',
    ultimaVisita: '23 Fev 2024',
    imagem: require('../assets/junior.png'),
  },
  {
    id: '5',
    nome: 'Marco Antônio',
    ultimaVisita: '15 Fev 2024',
    imagem: require('../assets/marco.png'),
  },
];

export default function Cliente() {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('Todos');

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 }}>
        Histórico de clientes
      </Text>

      {/* Botões de Filtro */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 12 }}>
        {['Todos', 'Em andamento', 'Concluídos'].map(item => (
          <TouchableOpacity
            key={item}
            onPress={() => setFiltro(item)}
            style={{
              backgroundColor: filtro === item ? '#f472b6' : '#e5e7eb',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 999,
              marginHorizontal: 4,
            }}
          >
            <Text style={{ color: filtro === item ? 'white' : 'black' }}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Campo de busca */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <TouchableOpacity style={{ marginRight: 8 }}>
          <Text style={{ fontSize: 18 }}>☰</Text>
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
            paddingVertical: 8,
          }}
        />
      </View>

      {/* Lista de clientes */}
      <FlatList
        data={clientesFiltrados}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f3f4f6',
              padding: 12,
              borderRadius: 12,
              marginBottom: 8,
            }}
          >
            <Image
              source={item.imagem}
              style={{ width: 48, height: 48, borderRadius: 24, marginRight: 12 }}
            />
            <View>
              <Text style={{ fontWeight: 'bold' }}>{item.nome}</Text>
              <Text style={{ color: '#6b7280', fontSize: 12 }}>Última visita: {item.ultimaVisita}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
