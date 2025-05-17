import '../App.css';
import perfilPlanit from '../../src/assets/perfilPlanit.jpg';
import { IonIcon } from '@ionic/react';
import { heartCircleOutline, calendarClearOutline, timeOutline, pricetagOutline, trashOutline, pencilOutline } from 'ionicons/icons'
import ModalBase from '../components/modalBase';
import PinkBtn from '../components/pinkBtn';
import { useState } from 'react'
import WhiteBtn from '../components/whiteBtn';
import { useNavigate } from 'react-router-dom';


function Homepage() {
    const [modalVisivel, setModalVisivel] = useState(false);
    const navigate = useNavigate();

    return (
        <div className='m-2'>
            <div className='flex justify-center border-b border-b-gray-100'>
                <p className='text-xl font-light text-pink-700 p-5'>Serviços Agendados</p>
            </div>

            <div className='flex justify-center'>
                <div className='flex flex-col gap-4 w-80 p-3 mt-10 rounded-3xl shadow-xl'>
                    <div className='flex flex-wrap gap-6 mt-3 items-center'>
                        <div>
                            <img className='rounded-full w-18' src={perfilPlanit} alt="Perfil Profissional" />
                        </div>

                        <div>
                            <p className='text-lg font-bold'>Iriana Darua</p>

                            <div>
                                <p className='text-emerald-500 font-light'>Médica</p>
                            </div>
                        </div>
                    </div>

                    <div className='pr-3 pl-3 flex justify-between items-center'>
                        <div>
                            <p className='text-xl text-emerald-500'>Primeira Consulta</p>
                        </div>

                        <div>
                            <IonIcon className='text-emerald-500' icon={heartCircleOutline} style={{ fontSize: "25px" }} />
                        </div>
                    </div>

                    <div>
                        <p className='font-light text-center'>Primeiro contato do cliente conosco</p>
                    </div>

                    <div className='flex gap-2 p-3'>
                        <div className='flex gap-1 items-center font-extralight'>
                            <div>
                                <IonIcon icon={calendarClearOutline} style={{ fontSize: "12px" }} />
                            </div>

                            <div>
                                <p className='text-xs'>17/05/2025</p>
                            </div>
                        </div>

                        <div className='flex gap-1 items-center font-extralight'>
                            <div>
                                <IonIcon icon={timeOutline} style={{ fontSize: "12px", fontWeight: 700 }} />
                            </div>

                            <div>
                                <p className='text-xs'>De 9h ás 10h30</p>
                            </div>
                        </div>

                        <div className='flex gap-1 items-center font-extralight text-emerald-500'>
                            <div>
                                <IonIcon icon={pricetagOutline} style={{ fontSize: "12px", fontWeight: 700 }} />
                            </div>

                            <div>
                                <p className='text-xs'>150,00</p>
                            </div>
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
            </div>

            <ModalBase icon={trashOutline} title='Cancelar Agendamento' text='Deseja cancelar o agendamento? O profissional será notificado.' onClose={() => setModalVisivel(false)} visible={modalVisivel}>
                <div className='flex justify-between mt-6 mb-5'>
                    <div>
                        <PinkBtn title='Sim' onClick={() => setModalVisivel(false)} />
                    </div>

                    <div>
                        <WhiteBtn title='Não' onClick={() => setModalVisivel(false)} />
                    </div>
                </div>
            </ModalBase>
        </div>
    )
}

export default Homepage