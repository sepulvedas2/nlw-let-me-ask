import { FormEvent } from 'react';
import logo from '../assets/logo.svg';
import { Button } from '../components'

export function Room() {
    async function submeter(event: FormEvent) {
        event.preventDefault();
    }
    return (
        <div id="page-room">
            <header>
                <div className="content-header">
                    <img src={logo} alt="Logo da Letmeask"/>
                    <div></div>
                </div>
            </header>
            <main className="content">
                <div className="room-title">
                    <h1>Sala REACT</h1>
                    <span>4preguntas</span>
                </div>
                <form onSubmit={submeter}>
                    <textarea placeholder="O que você quer perguntar?"/>

                    <div className="form-footer">
                        <span>Para enviar uma pergunta, 
                            <button>faça seu login</button>.
                        </span>
                        <Button type="submit">Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}
