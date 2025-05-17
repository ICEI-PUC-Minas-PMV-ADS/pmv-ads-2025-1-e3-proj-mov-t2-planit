import '../App.css'
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { eyeOutline } from 'ionicons/icons';
import PinkBtn from '../components/pinkBtn';

function Cadastro() {
    const navigate = useNavigate();

    return (
        <div>
            <div className='flex flex-col gap-3 justify-center text-center'>
                <div className='border-b border-b-gray-100 p-5'>
                    <p className='text-2xl font-semibold'>Cadastro</p>
                </div>

                <div className='p-3'>
                    <p className='font-extralight'>Crie sua Conta</p>
                </div>
            </div>

            <div className='ml-2 mr-2 mt-15'>
                <form action="" className='p-5 rounded-2xl'>
                    <div className='flex flex-col gap-5 justify-center'>
                        <div className='flex gap-2 items-center'>
                            <div>
                                <label>E-mail:</label>
                            </div>

                            <div>
                                <input type="text" className='border border-gray-700 p-2 w-52 rounded-xl  outline-none' />
                            </div>
                        </div>

                        <div className='flex gap-2 items-center'>
                            <div>
                                <label>Senha:</label>
                            </div>

                            <div className='flex gap-2 items-center'>
                                <div>
                                    <input type="password" className='outline-none border border-gray-700 p-2 w-52 rounded-xl' />
                                </div>

                                <div>
                                    <IonIcon icon={eyeOutline} className='cursor-pointer' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-15 mb-15 text-center'>
                        <p> Já possui uma conta? <span className='text-pink-700 cursor-pointer' onClick={() => navigate('/cadastrar')}>Login</span></p>
                    </div>

                    <div className='flex justify-center'>
                        <PinkBtn title='Cadastrar' onClick={() => navigate('/agendar')} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Cadastro