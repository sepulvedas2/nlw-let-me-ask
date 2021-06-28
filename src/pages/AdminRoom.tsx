
import { useParams } from 'react-router-dom';
import { database } from '../services/firebase';

import logo from '../assets/logo.svg';
import deleteImg from '../assets/delete.svg';

import { Button, RoomCode, Question } from '../components'
import { useRoom } from '../hooks';

import '../styles/room.scss'

type RoomParams = {
    id: string;
}


export function AdminRoom() {
    const params = useParams<RoomParams>();

    const roomId = params.id;

    const {title, questions} = useRoom(roomId);

    async function handleDeleteQuestion(questionId: string) {
        if( window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logo} alt="Logo da Letmeask"/>
                    <div>
                    <RoomCode code={roomId}></RoomCode>
                    <Button isOutlined>Encerrar sala</Button></div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>
                <div className="question-list">
                    {questions.map((question, i) => {
                        return (
                        <Question
                            key={question.id}
                            content={question.content}
                            author={question.author}
                        >
                            <button
                                className="admin-icons"
                                type="button"
                                onClick={() => handleDeleteQuestion(question.id)}
                            >
                                <img src={deleteImg} alt="Remover pergunta" />
                            </button>
                        </Question>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
