import '../App.css'
import { IonIcon } from '@ionic/react';
import { heartCircleOutline, timeOutline } from 'ionicons/icons'
import { chevronBackCircleOutline, chevronForwardCircleOutline, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProfissional, getServicos } from '../../firebaseConfig';
import { Profissional, Servico } from '../../types';

import Calendar from 'react-calendar';
import perfilPlanit from '../assets/perfilPlanit.jpg';
import WhiteBtn from '../components/whiteBtn';
import GreenBtn from '../components/greenBtn';


function Agendar() {
  const navigate = useNavigate();
  const [profissional, setProfissional] = useState<Profissional | null>(null);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const profId = localStorage.getItem('profissionalId');

        if (!profId) {
          navigate('/home');
          return;
        }

        const [profData, servicosData] = await Promise.all([
          getProfissional(profId),
          getServicos(profId)
        ]);

        setProfissional(profData);
        setServicos(servicosData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        navigate('/home');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [navigate])

  const formatMonthYear = (_locale: unknown, date: Date) => {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril',
      'Maio', 'Junho', 'Julho', 'Agosto',
      'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const monthIndex = date.getMonth();
    return `${months[monthIndex]} ${date.getFullYear()}`;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (!profissional) {
    return null;
  }

  return (
    <div>
      <div className='m-5 flex flex-col gap-10'>
        <div className='flex flex-wrap gap-6 items-center'>
          <div>
            <img className='rounded-full w-20' src={profissional.fotoPerfil || perfilPlanit} alt="Perfil Profissional" />
          </div>

          <div>
            <p className='text-xl font-bold'>{profissional.nome}</p>

            <div>
              <p className='text-emerald-500 font-light'>{profissional.profissao}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='m-5 flex flex-col gap-10'>
        <div>
          <p className='text-pink-600 font-bold'>Selecione o Serviço Desejado: </p>

          {servicos.map(servico => (
            <div key={servico.id} className='flex justify-center'>
              <div className='mt-10 w-72 p-5 rounded-3xl border border-gray-100 shadow-gray-200 shadow-2xl flex flex-col gap-3 hover:scale-105'>
                <div className='flex flex-row justify-between'>
                  <div>
                    <p className='text-xl text-emerald-600'>{servico.nome}</p>
                  </div>
                  <div>
                    <IonIcon icon={heartCircleOutline} style={{ fontSize: "30px", color: "#059669" }} />
                  </div>
                </div>

                <div>
                  <p className='font-extralight'>{servico.descricao}</p>
                </div>

                <div className='flex flex-row gap-6 justify-end mt-7'>
                  <div className='flex flex-row'>
                    <IonIcon icon={timeOutline} style={{ fontSize: "20px", paddingTop: "3px", fontWeight: 900 }} />
                    <p className='font-bold'>{servico.duracao} Min</p>
                  </div>
                  <div>
                    <p className='text-emerald-600 font-bold'>R$ {servico.valor.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

      </div>

      <div className='flex justify-around m-5'>
        <WhiteBtn title='Pular' onClick={() => navigate('/home')} />
        <GreenBtn title='Agendar' onClick={() => navigate('/home')} type='submit' />
      </div>
    </div>
  )
}

export default Agendar