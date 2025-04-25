import React from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, Image, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Serviços = () => {
  const router = useRouter();

  const [switches, setSwitches] = React.useState({
    1: true,
    2: true,
    3: false
  });

  const toggleSwitch = (id: number) => {
    setSwitches({ ...switches, [id]: !switches[id] });
  };

  const listaServicos = [
    { id: 1, nome: 'Brand Guide', duracao: '45 min', preco: 'R$ 50,00' },
    { id: 2, nome: 'Mockup', duracao: '2h', preco: 'R$ 250,00' },
    { id: 3, nome: 'Edição de Foto', duracao: '1 sem', preco: 'R$ 50,00' }
  ];

  return (

    <View style={styles.container}>
      <View style={styles.cabecalho}> 
        <TouchableOpacity onPress={() => router.push('/Clientes')}>
          <Image source={require('../../assets/images/button.png')} />
        </TouchableOpacity>

        <Text style={styles.titulo}>Meus Serviços</Text>

        <TouchableOpacity onPress={() => router.push('/Clientes')}>
          <Image source={require('../../assets/images/Frame.png')} />
        </TouchableOpacity>
      </View>

     
      <View style={{ flexDirection: 'row', padding: 16 }}>
        <View style={{
          backgroundColor: '#E1FF00',
          borderRadius: 12,
          flex: 1,
          marginRight: 8,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: '#FFD600'
        }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FF006F' }}>Serviços Ativos</Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#FF006F' }}>7</Text>
        </View>

        <View style={{
          backgroundColor: '#FFE5EF',
          borderRadius: 12,
          flex: 1,
          marginLeft: 8,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: '#F48FB1'
        }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FF006F' }}>Em Andamento</Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#FF006F' }}>9</Text>
        </View>
      </View>

 
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
        <TouchableOpacity style={styles.botaoSelecionado}>
          <Text style={{ color: '#FFF', fontWeight: '600' }}>Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoNaoSelecionado}>
          <Text style={{ color: '#333', fontWeight: '600' }}>Ativos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoNaoSelecionado}>
          <Text style={{ color: '#333', fontWeight: '600' }}>Inativos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoNaoSelecionado}>
          <Text style={{ color: '#333', fontWeight: '600' }}>Recentes</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 24 }}>
        {listaServicos.map((item) => (
          <View key={item.id} style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFF',
            borderRadius: 12,
            paddingVertical: 16,
            paddingHorizontal: 16,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: '#F3F4F6'
          }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>{item.nome}</Text>
              <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>{item.duracao} • {item.preco}</Text>
            </View>
            <TouchableOpacity
              onPress={() => toggleSwitch(item.id)}
              style={{
                width: 50,
                height: 30,
                borderRadius: 20,
                backgroundColor: switches[item.id] ? '#FF007F' : '#D1D5DB',
                justifyContent: 'center',
                padding: 3
              }}
            >
              <View style={{
                width: 24,
                height: 24,
                backgroundColor: '#FFF',
                borderRadius: 12,
                alignSelf: switches[item.id] ? 'flex-end' : 'flex-start'
              }} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 16,
    paddingTop: 10,
  },
  cabecalho: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  botaoSelecionado: {
    backgroundColor: '#FF006F',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  botaoNaoSelecionado: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDD',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 1,
  },
});

export default Serviços;
