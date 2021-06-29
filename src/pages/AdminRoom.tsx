
import { useHistory, useParams } from 'react-router-dom';
import { database } from '../services/firebase';

import logo from '../assets/logo.svg';
import deleteImg from '../assets/delete.svg';
import checkImg from '../assets/check.svg';
import answerImg from '../assets/answer.svg';

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
    const history = useHistory();

    async function handleEndRoom(roomId: string) {

        if( window.confirm('Tem certeza que você deseja deletar esta sala?')) {
            database.ref(`rooms/${roomId}`).update({
                endedAt: new Date(),
            })
    
            history.push('/');
        }
    }

    async function handleDeleteQuestion(questionId: string) {
        if( window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }
    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logo} alt="Logo da Letmeask"/>
                    <div>
                    <RoomCode code={roomId}></RoomCode>
                    <Button isOutlined onClick={() => {handleEndRoom(roomId)}}>Encerrar sala</Button></div>
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
                                isHighlighted={question.isHighlighted}
                                isAnswered={question.isAnswered}
                            >
                            {!question.isAnswered && (
                            <>
                                <button
                                    className="admin-icons"
                                    type="button"
                                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                >
                                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                                </button>
                                <button
                                    className="admin-icons"
                                    type="button"
                                    onClick={() => handleHighlightQuestion(question.id)}
                                >
                                    <img src={answerImg} alt="Dar destaque à pergunta" />
                                </button>
                            </>
                            )}
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
