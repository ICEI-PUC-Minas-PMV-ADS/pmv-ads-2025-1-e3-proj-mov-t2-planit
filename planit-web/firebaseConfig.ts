import { initializeApp } from "firebase/app";
import { getFirestore, setLogLevel, doc, getDoc, query, collection, getDocs, where, /*addDoc, updateDoc, serverTimestamp, QuerySnapshot*/ } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Profissional, Servico, /*Agendamento*/ } from './types'

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

function extraiMinutos(duracaoString: string): number {
  const match = duracaoString.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
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
      duracao: extraiMinutos(data.duracao),
      valor: parseFloat(data.valor) || 0,
      uid: data.uid
    } as Servico;
  });
}