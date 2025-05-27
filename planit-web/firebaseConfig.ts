import { initializeApp } from "firebase/app";
import { getFirestore, setLogLevel, doc, getDoc, query, collection, getDocs, where, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Profissional, Servico, Agendamento } from './types'

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
  const docRef = doc(db, "Profissional", profId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Profissional não encontrado"); 
  }

  return {
    id: docSnap.id,
    ...docSnap.data()
  } as Profissional;
}