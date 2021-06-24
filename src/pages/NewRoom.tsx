
import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ilustration from '../assets/illustration.svg'
import logo from '../assets/logo.svg'

import { Button } from '../components'
import { database } from '../services/firebase'

import { useAuth } from '../hooks';

import '../styles/auth.scss'

export function NewRoom () {
    
    const { user } = useAuth();
    const history = useHistory();

    const [newRoom, setNewRoom] = useState('')

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        console.log(newRoom);
        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`);
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
                    <img src={logo} alt="Logo da Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
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