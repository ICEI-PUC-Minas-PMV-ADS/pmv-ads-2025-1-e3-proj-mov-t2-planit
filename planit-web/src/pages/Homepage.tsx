import '../App.css';
import { IonIcon } from '@ionic/react';
import { heartCircleOutline, calendarClearOutline, timeOutline, pricetagOutline, trashOutline, pencilOutline, logOutOutline } from 'ionicons/icons';

import ModalBase from '../components/modalBase';
import PinkBtn from '../components/pinkBtn';
import WhiteBtn from '../components/whiteBtn';
import perfilPadrao from '../../src/assets/perfilPadrao.jpg';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth, db } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { Servico, Profissional, Agendamento, AgendamentoCompleto } from '../../types';


function Homepage() {
    const [modalVisivel, setModalVisivel] = useState(false);
    const [agendamentos, setAgendamentos] = useState<AgendamentoCompleto[]>([]);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                const agendamentoSnap = await getDocs(collection(db, 'Agendamento'));

                const agendamentoData: AgendamentoCompleto[] = await Promise.all(
                    agendamentoSnap.docs.map(async (docAg) => {
                        const data = docAg.data() as Agendamento;

                        // Buscar profissional
                        let profissional: Profissional | null = null;
                        try {
                            const profissionalDocRef = doc(db, 'Profissional', data.profissionalId);
                            const profissionalDocSnap = await getDoc(profissionalDocRef);
                            if (profissionalDocSnap.exists()) {
                                const p = profissionalDocSnap.data();
                                profissional = {
                                    id: profissionalDocSnap.id,
                                    nome: p.nome || 'Profissional',
                                    especialidade: p.especialidade || 'Especialidade',
                                    foto: p.foto || perfilPadrao,
                                };
                            }
                        } catch (e) {
                            console.error('Erro ao buscar profissional:', e);
                        }

                        // Buscar serviço
                        let servico: Servico | null = null;
                        try {
                            const servicoDocRef = doc(db, 'Servico', data.servicoId);
                            const servicoDocSnap = await getDoc(servicoDocRef);
                            if (servicoDocSnap.exists()) {
                                const s = servicoDocSnap.data();
                                servico = {
                                    uid: servicoDocSnap.id,  // <== corrigido aqui
                                    nome: s.nome || 'Serviço',
                                    descricao: s.descricao || 'Descrição do serviço',
                                    valor: s.valor || 0,
                                    duracao: s.duracao || '',
                                };
                            }
                        } catch (e) {
                            console.error('Erro ao buscar serviço:', e);
                        }


                        return {
                            id: docAg.id,
                            ...data,
                            profissional,
                            servico,
                        };
                    })
                );

                setAgendamentos(agendamentoData);
            } catch (error) {
                console.error('Erro ao buscar agendamentos:', error);
            }
        };

        fetchAgendamentos();
    }, []);


    return (
        <div className='m-2'>
            <div className='flex justify-center border-b border-b-gray-100'>
                <p className='text-xl font-light text-pink-700 p-5'>Serviços Agendados</p>
            </div>

            <div className='flex justify-center'>
                <div className='flex flex-col gap-6 mt-10 w-full items-center'>
                    {agendamentos.map((item, idx) => (
                        <div key={idx} className='flex flex-col gap-4 w-80 p-3 rounded-3xl shadow-xl'>
                            <div className='flex flex-wrap gap-6 mt-3 items-center'>
                                <div>
                                    <img
                                        className='rounded-full w-18'
                                        src={item.profissional?.foto || perfilPadrao}
                                        alt="Perfil Profissional"
                                    />
                                </div>

                                <div>
                                    <p className='text-lg font-bold'>{item.profissional?.nome || 'Profissional'}</p>
                                    <p className='text-emerald-500 font-light'>{item.profissional?.especialidade || 'Especialidade'}</p>
                                </div>
                            </div>

                            <div className='pr-3 pl-3 flex justify-between items-center'>
                                <p className='text-xl text-emerald-500'>{item.servico?.nome || 'Serviço'}</p>
                                <IonIcon className='text-emerald-500' icon={heartCircleOutline} style={{ fontSize: "25px" }} />
                            </div>

                            <p className='font-light text-center'>{item.servico?.descricao || 'Descrição do serviço'}</p>

                            <div className='flex gap-5 p-3'>
                                <div className='flex gap-1 items-center font-extralight'>
                                    <IonIcon icon={calendarClearOutline} style={{ fontSize: "12px" }} />
                                    <p className='text-xs'>{new Date(item.dataInicio).toLocaleDateString()}</p>
                                </div>

                                <div className='flex gap-1 items-center font-extralight'>
                                    <IonIcon icon={timeOutline} style={{ fontSize: "12px" }} />
                                    <p className='text-xs'>De {item.horaInicio} às {item.horaFim}</p>
                                </div>

                                <div className='flex gap-1 items-center font-extralight text-emerald-500'>
                                    <IonIcon icon={pricetagOutline} style={{ fontSize: "12px" }} />
                                    <p className='text-xs'>{item.servico?.valor?.toFixed(2) || '---'}</p>
                                </div>
                            </div>

                            <div className='flex gap-5 justify-end m-3'>
                                <div className='bg-pink-700 w-8 h-8 rounded-full' onClick={() => setModalVisivel(true)}>
                                    <IonIcon className='m-2 text-white' icon={trashOutline} />
                                </div>
                                <div className='bg-white border border-gray-200 w-8 h-8 rounded-full' onClick={() => navigate('/editar')}>
                                    <IonIcon className='m-2 text-pink-700' icon={pencilOutline} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex mt-20 mb-20 ml-10'>
                <div className='flex gap-3 items-center cursor-pointer' onClick={handleLogout}>
                    <div className='flex bg-pink-100 w-10 h-10 p-1 rounded-full justify-center items-center'>
                        <IonIcon className='text-pink-600' icon={logOutOutline} style={{ fontSize: 20 }} />
                    </div>
                    <p className='font-light text-pink-600'>Logout</p>
                </div>
            </div>

            <ModalBase
                icon={trashOutline}
                title='Cancelar Agendamento'
                text='Deseja cancelar o agendamento? O profissional será notificado.'
                onClose={() => setModalVisivel(false)}
                visible={modalVisivel}
            >
                <div className='flex justify-between mt-6 mb-5'>
                    <PinkBtn title='Sim' onClick={() => setModalVisivel(false)} />
                    <WhiteBtn title='Não' onClick={() => setModalVisivel(false)} />
                </div>
            </ModalBase>
        </div>
    );
}

export default Homepage;
