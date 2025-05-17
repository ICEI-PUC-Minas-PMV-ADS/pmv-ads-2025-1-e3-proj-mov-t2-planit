import '../App.css'
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { eyeOutline } from 'ionicons/icons';
import PinkBtn from '../components/pinkBtn';

function Cadastro() {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <div>
                    <p>Cadastro</p>
                </div>

                <div>
                    <p>Crie sua Conta</p>
                </div>
            </div>

            <div>
                <form action="">
                    <div>
                        <div>
                            <label>E-mail</label>
                        </div>

                        <div>
                            <input type="text" />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label>Senha</label>
                        </div>

                        <div>
                            <div>
                                <input type="password" />
                            </div>

                            <div>
                                <IonIcon icon={eyeOutline} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <p>Já posssui conta? <span>Login</span></p>
                    </div>

                    <div>
                        <PinkBtn title='Cadastrar' onClick={() => navigate('/agendar')} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Cadastro