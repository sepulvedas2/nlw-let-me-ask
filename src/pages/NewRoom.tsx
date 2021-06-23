
import { Link } from 'react-router-dom'
import ilustration from '../assets/illustration.svg'
import logo from '../assets/logo.svg'

import { Button } from '../components'

import { useAuth } from '../hooks';

import '../styles/auth.scss'

export function NewRoom () {
    
    const { user } = useAuth();

    return (
        <div id="page-auth">
            <aside>
                <img src={ilustration} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao vivos</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logo} alt="Logo da Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <h2>{user?.name}</h2>
                    <form>
                        <input 
                            type="text"
                            placeholder="Nome da sala"
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}