import '../App.css';
import perfilPlanit from '../assets/perfilPlanit.jpg';
import { IonIcon } from '@ionic/react';
import { heartCircleOutline, timeOutline } from 'ionicons/icons'

function SeletcServico() {

  return (
    <div className='m-5 flex flex-col gap-10'>
      <div className='flex flex-wrap gap-6 items-center'>
        <div>
          <img className='rounded-full w-20' src={perfilPlanit} alt="Perfil Profissional" />
        </div>

        <div>
          <p className='text-xl font-bold'>Iriana Darua</p>

          <div>
            <p className='text-emerald-500 font-light'>Médica</p>
          </div>
        </div>
      </div>

      <div>
        <p className='text-pink-600 font-bold'>Selecione o Serviço Desejado: </p>

        <div className='flex justify-center'>
          <div className='mt-10 w-72 p-5 rounded-3xl border border-gray-100 shadow-gray-200 shadow-2xl flex flex-col gap-3 hover:scale-105'>
            <div className='flex flex-row justify-between'>
              <div>
                <p className='text-xl text-emerald-600'>Primeira Consulta</p>
              </div>

              <div>
                <IonIcon icon={heartCircleOutline} style={{fontSize: "30px", color: "#059669"}} className='text-shadow-emerald-600'></IonIcon>
              </div>
            </div>

            <div>
              <p className='font-extralight'>Primeiro contato do cliente conosco</p>
            </div>

            <div className='flex flex-row gap-6 justify-end mt-7'>
              <div className='flex flex-row'>
                <div>
                  <IonIcon icon={timeOutline} style={{fontSize: "20px", paddingTop: "3px", fontWeight: 900}}></IonIcon>
                </div>

                <div>
                  <p className='font-bold'>30 Min</p>
                </div>
              </div>

              <div>
                <p className='text-emerald-600 font-bold'>R$ 150,00</p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-center'>
          <div className='mt-10 w-72 p-5 rounded-3xl border border-gray-100 shadow-gray-200 shadow-2xl flex flex-col gap-3 hover:scale-105'>
            <div className='flex flex-row justify-between'>
              <div>
                <p className='text-xl text-emerald-600'>Consulta de Rotina</p>
              </div>

              <div>
                <IonIcon icon={heartCircleOutline} style={{fontSize: "30px", color: "#059669"}} className='text-shadow-emerald-600'></IonIcon>
              </div>
            </div>

            <div>
              <p className='font-extralight'>Consulta periódica</p>
            </div>

            <div className='flex flex-row gap-6 justify-end mt-7'>
              <div className='flex flex-row'>
                <div>
                  <IonIcon icon={timeOutline} style={{fontSize: "20px", paddingTop: "3px", fontWeight: 900}}></IonIcon>
                </div>

                <div>
                  <p className='font-bold'>30 Min</p>
                </div>
              </div>

              <div>
                <p className='text-emerald-600 font-bold'>R$ 150,00</p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-center'>
          <div className='mt-10 w-72 p-5 rounded-3xl border border-gray-100 shadow-gray-200 shadow-2xl flex flex-col gap-3 hover:scale-105'>
            <div className='flex flex-row justify-between'>
              <div>
                <p className='text-xl text-emerald-600'>Retorno</p>
              </div>

              <div>
                <IonIcon icon={heartCircleOutline} style={{fontSize: "30px", color: "#059669"}} className='text-shadow-emerald-600'></IonIcon>
              </div>
            </div>

            <div>
              <p className='font-extralight'>Checkup após emergência</p>
            </div>

            <div className='flex flex-row gap-6 justify-end mt-7'>
              <div className='flex flex-row'>
                <div>
                  <IonIcon icon={timeOutline} style={{fontSize: "20px", paddingTop: "3px", fontWeight: 900}}></IonIcon>
                </div>

                <div>
                  <p className='font-bold'>30 Min</p>
                </div>
              </div>

              <div>
                <p className='text-emerald-600 font-bold'>R$ 150,00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-end'>
        <button  type='submit' className='p-1 w-26 h-12 rounded-xl border border-emerald-600  bg-emerald-500 cursor-pointer text-white hover:bg-white hover:text-emerald-600'>Avançar</button>
      </div>
    </div>
  )
}

export default SeletcServico