import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import logo from '../assets/logo.svg';

import { Button, RoomCode } from '../components'

import '../styles/room.scss'

type RoomParams = {
    id: string;
}

export function Room() {
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');

    async function submeter(event: FormEvent) {
        event.preventDefault();
    }
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logo} alt="Logo da Letmeask"/>
                    <RoomCode code={params.id}></RoomCode>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>
                <form onSubmit={submeter}>
                    <textarea 
                        placeholder="O que você quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button>faça seu login.</button></span>
                        <Button type="submit">Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}
