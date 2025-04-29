// app/tabs/Clientes.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import { Menu, Provider, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

// --- tipo Cliente ---
type Cliente = {
  id: string;
  nome: string;
  ultimaVisita: string;
  imagem: any;
  status: 'Finalizados' | 'Cancelados' | 'Antigos' | 'Rejeitados' | 'Em andamento';
  consultas: { titulo: string; data: string }[];
};

// --- dados ---
const clientes: Cliente[] = [
    {
      id: '1',
      nome: 'João Silva',
      ultimaVisita: '10 Mar 2024',
      imagem: require('../../assets/images/rosto11.png'),
      status: 'Finalizados',
      consultas: [
        { titulo: 'Consulta de Emergência', data: '10 Mar 2024' },
        { titulo: 'Consulta de Rotina',    data: '20 Nov 2023' },
        { titulo: 'Primeira Consulta',      data: '01 Jun 2023' },
      ],
    },
    {
      id: '2',
      nome: 'Ana Paula',
      ultimaVisita: '06 Mar 2024',
      imagem: require('../../assets/images/rosto4.png'),
      status: 'Cancelados',
      consultas: [
        { titulo: 'Avaliação Inicial', data: '06 Mar 2024' },
        { titulo: 'Retorno',           data: '15 Jan 2024' },
      ],
    },
    {
      id: '3',
      nome: 'Maria Lopes',
      ultimaVisita: '28 Fev 2024',
      imagem: require('../../assets/images/rosto5.png'),
      status: 'Antigos',
      consultas: [
        { titulo: 'Check-up Geral', data: '28 Fev 2024' },
        { titulo: 'Consulta Nutrição', data: '10 Jan 2024' },
      ],
    },
    {
      id: '4',
      nome: 'Junior Oliveira',
      ultimaVisita: '23 Fev 2024',
      imagem: require('../../assets/images/rostodois.png'),
      status: 'Finalizados',
      consultas: [
        { titulo: 'Avaliação Psicológica', data: '23 Fev 2024' },
      ],
    },
    {
      id: '5',
      nome: 'Marco Antônio',
      ultimaVisita: '15 Fev 2024',
      imagem: require('../../assets/images/rosto3.png'),
      status: 'Rejeitados',
      consultas: [
        { titulo: 'Sessão Cancelada', data: '15 Fev 2024' },
      ],
    },
    {
      id: '6',
      nome: 'Beatriz Souza',
      ultimaVisita: '12 Fev 2024',
      imagem: require('../../assets/images/rosto12.png'),
      status: 'Finalizados',
      consultas: [
        { titulo: 'Terapia Ocupacional', data: '12 Fev 2024' },
      ],
    },
    {
      id: '7',
      nome: 'Carlos Mendes',
      ultimaVisita: '08 Fev 2024',
      imagem: require('../../assets/images/rosto6.png'),
      status: 'Cancelados',
      consultas: [
        { titulo: 'Consulta Cancelada', data: '08 Fev 2024' },
      ],
    },
    {
      id: '8',
      nome: 'Fernanda Costa',
      ultimaVisita: '03 Fev 2024',
      imagem: require('../../assets/images/rosto9.png'),
      status: 'Antigos',
      consultas: [
        { titulo: 'Retorno Antigo', data: '03 Fev 2024' },
      ],
    },
    {
      id: '9',
      nome: 'Ricardo Lima',
      ultimaVisita: '01 Fev 2024',
      imagem: require('../../assets/images/rosto10.png'),
      status: 'Rejeitados',
      consultas: [
        { titulo: 'Sessão Não Compareceu', data: '01 Fev 2024' },
      ],
    },
  ];
  

export default function Cliente() {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<'Todos'|'Em andamento'|'Concluídos'>('Todos');
  const [menuFiltroVisivel, setMenuFiltroVisivel] = useState(false);
  const [menuClienteVisivel, setMenuClienteVisivel] = useState<string|null>(null);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState<Cliente['status'][]>([]);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const [modalAberto, setModalAberto] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente|null>(null);

  const toggleFiltro = (item: Cliente['status']) => {
    setFiltrosSelecionados(s =>
      s.includes(item) ? s.filter(f=>f!==item) : [...s, item]
    );
  };

  const animateScale = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue:1.2, duration:100, useNativeDriver:true }),
      Animated.timing(scaleAnim, { toValue:1,   duration:100, useNativeDriver:true }),
    ]).start();
  };
  const animateRotation = (abrir:boolean) => {
    Animated.timing(rotateAnim, {
      toValue: abrir ? 1 : 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  const clientesFiltrados = clientes.filter(c=>{
    const passaBusca = c.nome.toLowerCase().includes(busca.toLowerCase());
    const passaFiltro =
      filtro==='Todos' ||
      (filtro==='Em andamento' && c.status==='Em andamento') ||
      (filtro==='Concluídos'   && c.status==='Finalizados');
    if (filtrosSelecionados.length===0) return passaBusca && passaFiltro;
    return passaBusca && passaFiltro && filtrosSelecionados.includes(c.status);
  });

  const abrirPerfil = (c: Cliente) => {
    animateScale();
    animateRotation(true);
    setClienteSelecionado(c);
    setModalAberto(true);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.titulo}>Histórico de clientes</Text>

        {/* filtro rápido */}
        <View style={styles.filtroRapido}>
          {['Todos','Em andamento','Concluídos'].map(item=>(
            <TouchableOpacity
              key={item}
              onPress={()=>setFiltro(item as any)}
              style={[
                styles.botaoFiltro,
                filtro===item && styles.botaoFiltroAtivo
              ]}
            >
              <Text style={filtro===item?styles.txtFiltroAtivo:styles.txtFiltro}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* busca + avançado */}
        <View style={styles.buscaRow}>
          <Menu
            visible={menuFiltroVisivel}
            onDismiss={()=>setMenuFiltroVisivel(false)}
            anchor={
              <TouchableOpacity onPress={()=>setMenuFiltroVisivel(true)} style={styles.iconBtn}>
                <Icon name="sliders" size={24} color="#333"/>
              </TouchableOpacity>
            }
            contentStyle={styles.menuContent}
          >
            <Text style={styles.menuTitle}>Selecione o filtro</Text>
            {['Finalizados','Cancelados','Antigos','Rejeitados','Em andamento'].map((f,i)=>(
              <View key={i} style={styles.menuItem}>
                <Checkbox
                  status={filtrosSelecionados.includes(f as any)?'checked':'unchecked'}
                  onPress={()=>toggleFiltro(f as any)}
                />
                <Text style={styles.menuTxt}>{f}</Text>
              </View>
            ))}
          </Menu>

          <TextInput
            placeholder="Buscar cliente..."
            value={busca}
            onChangeText={setBusca}
            style={styles.inputBusca}
          />
        </View>

        <View style={styles.separador}/>

        {/* lista: style flex:1 para ficar rolável */}
        <FlatList
          style={{ flex: 1 }}
          data={clientesFiltrados}
          keyExtractor={i => i.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item})=>(
            <View style={styles.card}>
              <View style={styles.cardInfo}>
                <Image source={item.imagem} style={styles.avatar}/>
                <View>
                  <Text style={styles.nome}>{item.nome}</Text>
                  <Text style={styles.ultima}>Última visita: {item.ultimaVisita}</Text>
                </View>
              </View>

              <TouchableOpacity onPress={()=>abrirPerfil(item)} style={styles.iconBtn}>
                <Animated.View style={{
                  transform: [
                    { scale: scaleAnim },
                    { rotate: rotateAnim.interpolate({ inputRange:[0,1], outputRange:['0deg','90deg'] }) }
                  ]
                }}>
                  <Icon name="chevron-right" size={24} color="#757575"/>
                </Animated.View>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Modal de Perfil */}
        <Modal
          isVisible={modalAberto}
          onBackdropPress={()=>{ setModalAberto(false); animateRotation(false); }}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={()=>{ setModalAberto(false); animateRotation(false); }} style={styles.closeBtn}>
              <Icon name="arrow-left" size={24} color="#333"/>
            </TouchableOpacity>
            {clienteSelecionado && (
              <>
                <Image source={clienteSelecionado.imagem} style={styles.modalAvatar}/>
                <Text style={styles.modalNome}>{clienteSelecionado.nome}</Text>
                {clienteSelecionado.consultas.map((c,i)=>(
                  <View key={i} style={styles.consultaCard}>
                    <Text style={styles.consultaTitulo}>{c.titulo}</Text>
                    <Text style={styles.consultaData}>{c.data}</Text>
                  </View>
                ))}
              </>
            )}
          </View>
        </Modal>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#fafafa', padding:20 },
  titulo:    { fontSize:22,fontWeight:'700',textAlign:'center',marginBottom:20 },
  filtroRapido:   { flexDirection:'row', justifyContent:'center', marginBottom:24 /* ↑ mais espaço abaixo */ },
  botaoFiltro:    { backgroundColor:'#e0e0e0', paddingHorizontal:16, paddingVertical:8, borderRadius:999, marginHorizontal:6 },
  botaoFiltroAtivo: { backgroundColor:'#ff4081' },
  txtFiltro: { color:'#333' }, txtFiltroAtivo: { color:'#fff' },

  buscaRow: { flexDirection:'row',alignItems:'center',marginBottom:20 },
  iconBtn:  { marginRight:12,padding:8 },
  menuContent:    { backgroundColor:'#fff', borderRadius:12, padding:12, elevation:2 /* ↓ sombra mais suave */ },
  menuTitle:   { fontWeight:'700',fontSize:16,marginBottom:12 },
  menuItem:    { flexDirection:'row',alignItems:'center',marginBottom:12 },
  menuTxt:     { fontSize:14,color:'#374151' },
  inputBusca:  { flex:1,backgroundColor:'#fff',borderColor:'#ddd',borderWidth:1,borderRadius:999,paddingHorizontal:16,paddingVertical:10 },
  separador:   { height:1,backgroundColor:'#e0e0e0',marginBottom:16 },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  
  cardInfo:  { flexDirection:'row',alignItems:'center' },
  avatar:    { width:56,height:56,borderRadius:28,marginRight:16,borderWidth:1,borderColor:'#eee' },
  nome:      { fontWeight:'600',fontSize:16 },
  ultima:    { color:'#757575',fontSize:12 },

  modal:        { justifyContent:'flex-end', margin:0 },
  modalContent: { backgroundColor:'#fff', padding:20, borderTopLeftRadius:20, borderTopRightRadius:20 },
  closeBtn:     { position:'absolute', top:16, left:16, zIndex:10 },
  modalAvatar:  { width:120,height:120,borderRadius:60,alignSelf:'center',marginBottom:20 },
  modalNome:    { fontSize:20,fontWeight:'600',textAlign:'center',marginBottom:20 },
  consultaCard:{ backgroundColor:'#f3f3f3',padding:16,borderRadius:12,marginBottom:12 },
  consultaTitulo:{ fontWeight:'600',fontSize:16 },
  consultaData: { color:'#757575',fontSize:12,marginTop:4 },
});
