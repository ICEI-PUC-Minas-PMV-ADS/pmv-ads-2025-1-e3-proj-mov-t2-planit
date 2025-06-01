import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

type UserData = {
  nome?: string;
  profissao?: string;
  email?: string;
  uid?: string;
  docId?: string;
};

export const useUserData = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (user?.uid) {
      const fetchUserData = async () => {
        try {
          const q = query(
            collection(db, "Usuario"),
            where("uid", "==", user.uid)
          );

          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            setUserData({ ...doc.data(), docId: doc.id } as UserData);          
          
          } else {
            console.log("Nenhum documento encontrado com este UID");
          
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      };

      fetchUserData();
    }
  }, [user]);

  return { userData };
};
