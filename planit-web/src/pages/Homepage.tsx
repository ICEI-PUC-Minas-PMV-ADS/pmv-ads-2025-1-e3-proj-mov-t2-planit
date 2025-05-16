import '../App.css';
import perfilPlanit from '../../src/assets/perfilPlanit.jpg';
import { IonIcon } from '@ionic/react';
import { heartCircleOutline, calendarClearOutline, timeOutline, pricetagOutline, trashOutline, pencilOutline, chevronBackOutline, chevronForwardOutline, chevronBackCircleOutline, chevronForwardCircleOutline,  } from 'ionicons/icons'
import ModalBase from '../components/modalBase';
import PinkBtn from '../components/pinkBtn';
import Calendar from 'react-calendar';
import { useState } from 'react'
import WhiteBtn from '../components/whiteBtn';


function Homepage() {
    const [modalVisivel1, setModalVisivel1] = useState(false);
    const [modalVisivel2, setModalVisivel2] = useState(false);

    const formatMonthYear = (_locale: unknown, date: Date) => {
        const months = [
          'Janeiro', 'Fevereiro', 'Março', 'Abril',
          'Maio', 'Junho', 'Julho', 'Agosto',
          'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        const monthIndex = date.getMonth();
        return `${months[monthIndex]} ${date.getFullYear()}`;
      };

    return (
        <div className='m-2'>
            <div className='flex justify-center'>
                <p className='text-xl font-light text-pink-700'>Serviços Agendados</p>
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

                    <div className='flex gap-5 p-3'>
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
                                <p className='text-xs'>R$ 150,00</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-5 justify-end m-3'>
                        <div className='bg-pink-700 w-8 h-8 rounded-full' onClick={() => setModalVisivel1(true)}>
                            <IonIcon className='m-2 text-white' icon={trashOutline} />
                        </div>

                        <div className='bg-white border border-gray-200 w-8 h-8 rounded-full'>
                            <IonIcon className='m-2 text-pink-700' icon={pencilOutline} onClick={() => setModalVisivel2(true)} />
                        </div>
                    </div>
                </div>
            </div>

            <ModalBase icon={trashOutline} title='Cancelar Agendamento' text='Deseja cancelar o agendamento? O profissional será notificado.' onClose={() => setModalVisivel1(false)} visible={modalVisivel1}>
                <div className='flex justify-between mt-6 mb-5'>
                    <div>
                        <PinkBtn title='Sim' onClick={() => setModalVisivel1(false)} />
                    </div>

                    <div>
                        <WhiteBtn title='Não' onClick={() => setModalVisivel1(false)} />
                    </div>
                </div>
            </ModalBase>

            <ModalBase icon={trashOutline} title='Editar Agendamento' text='Permitido mudar data e horário.' onClose={() => setModalVisivel2(false)} visible={modalVisivel2}>
                <div>
                    <div className='mt-10 ml-5 mb-10 mr-5 '>
                        <p className='text-pink-600 font-bold'>Selecione data e horário:</p>
                    </div>

                    <div className='flex justify-center'>
                        <Calendar
                            prevLabel={<IonIcon icon={chevronBackOutline} />}
                            nextLabel={<IonIcon icon={chevronForwardOutline} />}
                            prev2Label={<IonIcon icon={chevronBackCircleOutline} />}
                            next2Label={<IonIcon icon={chevronForwardCircleOutline} />}
                            formatMonthYear={formatMonthYear}
                        />
                    </div>

                    <div className=' flex flex-col gap-8 mt-10 ml-5 mb-10 mr-5 '>
                        <div>
                            <p className=''>Horários disponíveis:</p>
                        </div>

                        <div className='flex justify-center'>
                            <form action="">
                                <select id='horario' name='horario' className=' w-80 pt-2 pb-2 pl-5 pr-5 rounded-2xl border border-gray-200'>
                                    <option value="1">De 9h00 ás 9h30</option>
                                    <option value="2">De 9h30 ás 10h00</option>
                                    <option value="3">De 10h00 ás 10h30</option>
                                    <option value="4">De 10h30 ás 11h00</option>
                                    <option value="5">De 11h00 ás 11h30</option>
                                    <option value="6">De 11h30 ás 12h00</option>
                                    <option value="7">De 13h00 ás 13h30</option>
                                    <option value="8">De 13h30 ás 14h00</option>
                                </select>
                            </form>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between mt-6 mb-5'>
                    <div>
                        <PinkBtn title='Sim' onClick={() => setModalVisivel2(false)} />
                    </div>

                    <div>
                        <WhiteBtn title='Não' onClick={() => setModalVisivel2(false)} />
                    </div>
                </div>
            </ModalBase>
        </div>
    )
}

export default Homepage