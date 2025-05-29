import { initializeApp } from "firebase/app";
import { getFirestore, setLogLevel, /*doc, getDoc,*/ query, collection, getDocs, where, addDoc, writeBatch, /*addDoc, updateDoc, serverTimestamp, QuerySnapshot*/ } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Agendamento, Horario, Profissional, Servico, /*Agendamento*/ } from './types'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
setLogLevel('info')
const db = getFirestore(app);

const auth = getAuth(app);

export { app, db, auth };


export async function getProfissional(profId: string): Promise<Profissional> {
  try {
    const q = query(collection(db, "Profissional"),
      where("uid", "==", profId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("Nenhum profissional encontrado com uid:", profId);
      throw new Error("Profissional não encontrado");
    }

    const docSnap = querySnapshot.docs[0];
    const data = docSnap.data();

    return {
      id: docSnap.id,
      nome: data.nomeCompleto || "Profissional",
      profissao: data.profissao || "Autônomo",
      fotoPerfil: data.fotoPerfil || undefined,
      ...data
    } as Profissional;
  } catch (error) {
    console.error("Erro detalhado:", error);
    throw new Error("Falha ao buscar profissional");
  }
}


export async function getServicos(profId: string): Promise<Servico[]> {
  const q = query(
    collection(db, "Servicos"),
    where("uid", "==", profId),
    where("ativo", "==", true)
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => {
    const data = doc.data();

    return {
      id: doc.id,
      nome: data.nome,
      descricao: data.descricao,
      duracao: data.duracao,
      valor: parseFloat(data.valor) || 0,
      uid: data.uid
    } as Servico;
  });
}


export async function getHorarios(profissionalId: string, dataSelecionada: string): Promise<Horario[]> {
  const q = query(
    collection(db, "agenda"),
    where("uid", "==", profissionalId),
    where("data", "==", dataSelecionada),
    where("status", "==", 'disponivel')
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => {
    const data = doc.data();

    return {
      id: doc.id,
      data: data.data,
      hora: data.hora,
      status: data.status,
      uid: data.uid
    } as Horario;
  });
}


function formatarData(date: Date): string {
  return date.toISOString().split('T')[0];
}

function formatarHora(date: Date): string {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

async function updateHorarios(profissionalId: string,
  data: Date,
  horaInicio: string,
  duracao: number
) {
  const [hora, minuto] = horaInicio.split(':').map(Number);
  const inicio = new Date(data);
  inicio.setHours(hora, minuto);

  const slotsParaAtualizar = [];
  for (let i = 0; i < duracao; i += 30) {
    const slotTime = new Date(inicio.getTime() + i * 60000);
    slotsParaAtualizar.push({
      data: formatarData(slotTime),
      hora: formatarHora(slotTime)
    });
  }

  const batch = writeBatch(db);
  for (const slot of slotsParaAtualizar) {
    const q = query(
      collection(db, "agenda"),
      where("uid", "==", profissionalId),
      where("data", "==", slot.data),
      where("hora", "==", slot.hora)
    );

    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
      batch.update(doc.ref, { status: 'agendado' });
    });
  }

  await batch.commit();
};

export async function createAgendamento(dataSelecionada: Date, horaSelecionada: string, servico: Servico, clienteId: string): Promise<string> {
  const [hora, minutos] = horaSelecionada.split(':').map(Number);
  const inicio = new Date(dataSelecionada);
  inicio.setHours(hora, minutos);

  const fim = new Date(inicio.getTime() + servico.duracao + 60000);

  const agendamento: Agendamento = {
    dataInicio: formatarData(inicio),
    horaInicio: horaSelecionada,
    dataFim: formatarData(fim),
    horaFim: formatarHora(fim),
    servicoId: servico.id,
    profissionalId: servico.uid,
    clienteId,
    status: 'agendado',
    duracao: servico.duracao
  };

  const docRef = await addDoc(collection(db, "Agendamento"), agendamento);

  await updateHorarios{
    servico.uid,
      dataSelecionada,
      horaSelecionada,
      servico.duracao
  };
}