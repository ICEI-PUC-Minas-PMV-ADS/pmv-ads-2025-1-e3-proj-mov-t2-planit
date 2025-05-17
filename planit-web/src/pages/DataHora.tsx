import '../App.css';
import perfilPlanit from '../assets/perfilPlanit.jpg';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { chevronBackCircleOutline, chevronForwardCircleOutline, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';

function DataHora() {
  const navigate = useNavigate();

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
    <div>
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
      </div>

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

      <div className='flex justify-end m-5'>
        <button onClick={() => navigate('/home')} type='submit' className='p-1 w-26 h-12 rounded-xl border border-emerald-600  bg-emerald-500 cursor-pointer text-white hover:bg-white hover:text-emerald-600'>Concluir</button>
      </div>

    </div>
  )
}

export default DataHora