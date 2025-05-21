import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CadastroServicos = () => {
  const router = useRouter();

  // Dados do serviço
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [duracao, setDuracao] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [valor, setValor] = useState('');

  // Dados do horário
  const [diaSemana, setDiaSemana] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');

  // Controle de modais
  const [modalVisivelCategoria, setModalVisivelCategoria] = useState(false);
  const [modalVisivelDia, setModalVisivelDia] = useState(false);

  const categorias = ['Saúde', 'Beleza', 'Design', 'Outros'];
  const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  function handleSalvar() {
    const novoServico = {
      nome,
      descricao,
      duracao,
      categoria: categoriaSelecionada,
      valor,
      horario: {
        dia: diaSemana,
        inicio: horaInicio,
        fim: horaFim,
      },
      ativo: true,
    };

    // TODO: envie `novoServico` ao Firestore ou sua API aqui

    alert('Serviço cadastrado!');
    // Se a sua página de serviços for uma rota _sem_ barra inicial, use:
    router.push('MeusServicos');
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => router.back()} style={styles.botaoVoltar}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Cadastro de Serviço</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formBox}>

          {/* Nome */}
          <View style={styles.row}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Ex: Corte feminino"
            />
          </View>

          {/* Descrição */}
          <View style={styles.column}>
            <Text style={styles.label}>Descrição:</Text>
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
              multiline
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Descreva o serviço..."
            />
          </View>

          {/* Duração */}
          <View style={styles.row}>
            <Text style={styles.label}>Duração:</Text>
            <TextInput
              style={styles.input}
              value={duracao}
              onChangeText={setDuracao}
              placeholder="Ex: 30 min"
            />
          </View>

          {/* Categoria */}
          <View style={styles.row}>
            <Text style={styles.label}>Categoria:</Text>
            <TouchableOpacity
              style={[styles.input, styles.categoriaBox]}
              onPress={() => setModalVisivelCategoria(true)}
            >
              <Text style={{ flex: 1 }}>
                {categoriaSelecionada || 'Selecionar...'}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Valor */}
          <View style={styles.row}>
            <Text style={styles.label}>Valor:</Text>
            <TextInput
              style={styles.input}
              value={valor}
              onChangeText={setValor}
              keyboardType="numeric"
              placeholder="Ex: 120,00"
            />
          </View>

          {/* Horário de Atendimento */}
          <Text style={[styles.sectionTitle]}>Horário de Atendimento</Text>

          {/* Dia da Semana */}
          <TouchableOpacity
            style={[styles.input, styles.categoriaBox, { marginBottom: 12 }]}
            onPress={() => setModalVisivelDia(true)}
          >
            <Text style={{ flex: 1 }}>
              {diaSemana || 'Selecionar dia...'}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#6B7280" />
          </TouchableOpacity>

          {/* Hora Início */}
          <TextInput
            style={[styles.input, { marginBottom: 12 }]}
            value={horaInicio}
            onChangeText={setHoraInicio}
            placeholder="Início (Ex: 09:00)"
          />

          {/* Hora Fim */}
          <TextInput
            style={styles.input}
            value={horaFim}
            onChangeText={setHoraFim}
            placeholder="Término (Ex: 18:00)"
          />

        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSalvar}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal de Categoria */}
      <Modal visible={modalVisivelCategoria} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalVisivelCategoria(false)}
              style={styles.modalClose}
            >
              <Ionicons name="close" size={24} color="#FF006F" />
            </TouchableOpacity>
            {categorias.map(cat => (
              <TouchableOpacity
                key={cat}
                onPress={() => {
                  setCategoriaSelecionada(cat);
                  setModalVisivelCategoria(false);
                }}
                style={styles.modalItem}
              >
                <Text>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Modal de Dia da Semana */}
      <Modal visible={modalVisivelDia} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalVisivelDia(false)}
              style={styles.modalClose}
            >
              <Ionicons name="close" size={24} color="#FF006F" />
            </TouchableOpacity>
            {dias.map(d => (
              <TouchableOpacity
                key={d}
                onPress={() => {
                  setDiaSemana(d);
                  setModalVisivelDia(false);
                }}
                style={styles.modalItem}
              >
                <Text>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 16, paddingTop: 10 },
  cabecalho: { position: 'relative', height: 48, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  botaoVoltar: { position: 'absolute', left: 0, top: 0, bottom: 0, justifyContent: 'center', paddingHorizontal: 12 },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 20 },
  formBox: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 16, marginTop: 12 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  column: { marginBottom: 16 },
  label: { width: 90, fontSize: 14, color: '#374151' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#374151', marginBottom: 8, marginTop: 16 },
  input: { flex: 1, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 10, backgroundColor: '#FFF' },
  categoriaBox: { flexDirection: 'row', alignItems: 'center' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16, paddingHorizontal: 16 },
  button: { backgroundColor: '#FF006F', paddingVertical: 10, paddingHorizontal: 24, borderRadius: 10 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: '#00000088', padding: 20 },
  modalContent: { backgroundColor: '#FFF', borderRadius: 10, padding: 16 },
  modalClose: { alignSelf: 'flex-end' },
  modalItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#EEE' },
});

export default CadastroServicos;
