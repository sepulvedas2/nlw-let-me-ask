import { useContext } from 'react';
import { useHistory } from 'react-router-dom'

import { AuthContext } from '../App';
  
import ilustration from '../assets/illustration.svg'
import logo from '../assets/logo.svg';
import google from '../assets/google-icon.svg';

import { Button } from '../components';


import '../styles/auth.scss'

export function Home () {
    const history = useHistory();
    const { user, signInWithGoogle } = useContext(AuthContext);

    async function handleCreateRoom() {
        if (!user){
            await signInWithGoogle()
        }
        history.push('/rooms/new');
    }
    return (
        <div id="page-auth">
            <aside>
                <img src={ilustration} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao vivos</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <h2>{user?.name}</h2>
                    <img src={logo} alt="Logo da Letmeask" />
                    <button onClick={handleCreateRoom} type="button" className="create-room">
                        <img src={google} alt="Logo da Google"/>
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}