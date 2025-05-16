import '../App.css';
import perfilPlanit from '../../src/assets/perfilPlanit.jpg';
import { IonIcon } from '@ionic/react';
import { heartCircleOutline, calendarClearOutline, timeOutline, pricetagOutline, trashOutline, pencilOutline } from 'ionicons/icons'

function Homepage() {
    return (
        <div className='m-2'>
            <div className='flex justify-center'>
                <p className='text-xl font-light text-pink-700'>Serviços Agendados</p>
            </div>

            <div className='flex justify-center'>
                <div className='flex flex-col gap-5 w-80 p-3 mt-10 rounded-3xl bg-amber-200'>
                    <div className='flex flex-wrap gap-6 items-center'>
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
                            <IonIcon className='text-emerald-500' icon={heartCircleOutline} style={{fontSize: "25px"}}/>
                        </div>
                    </div>

                    <div>
                        <p className='font-light text-center'>Primeiro contato do cliente conosco</p>
                    </div>

                    <div className='flex flex-col pl-3'>
                        <div className='flex gap-1 items-center'>
                            <div>
                                <IonIcon icon={calendarClearOutline} style={{fontSize: "12px", fontWeight: 700}}/>
                            </div>

                            <div>
                                <p className='text-xs font-bold'>Data</p>
                            </div>
                        </div>

                        <div className='flex gap-1 items-center font-bold'>
                            <div>
                                <IonIcon icon={timeOutline} style={{fontSize: "12px", fontWeight: 700}}/>
                            </div>

                            <div>
                                <p className='text-xs'>Horário</p>
                            </div>
                        </div>

                        <div className='flex gap-1 items-center font-bold'>
                            <div>
                                <IonIcon icon={pricetagOutline} style={{fontSize: "12px", fontWeight: 700}}/>
                            </div>

                            <div>
                                <p className='text-xs'>Valor</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <IonIcon icon={trashOutline}/>
                        </div>

                        <div>
                            <IonIcon icon={pencilOutline}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Homepage