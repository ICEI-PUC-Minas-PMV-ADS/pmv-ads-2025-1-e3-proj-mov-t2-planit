import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import useAuth from "./useAuth";

export function useUserData() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "Usuario", user.uid);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("Documento não encontrado!");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar dados do usuário:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  return { userData, loading };
}
