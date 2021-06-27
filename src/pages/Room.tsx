import { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import logo from '../assets/logo.svg';

import { Button, RoomCode, Question } from '../components'
import { useAuth } from '../hooks';
import { database } from '../services/firebase';

import '../styles/room.scss'

type RoomParams = {
    id: string;
}

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

type FirebaseQuestions = Record<string,{
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');

    const roomId = params.id;

    useEffect(() => {
        const questions = database.ref(`rooms/${roomId}`);
        questions.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }
            });
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
    }, [roomId]);

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();
        if (newQuestion.trim() === '')
            return;
        if (!user) {
            throw new Error('You must be logged in');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user?.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
        
    }
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logo} alt="Logo da Letmeask"/>
                    <RoomCode code={roomId}></RoomCode>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>
                <form onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder="O que você quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt="Imagem do usuário logado" />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login.</button></span>
                        ) }
                        <Button type="submit" disabled={!user} >Enviar pergunta</Button>
                    </div>
                </form>
                <div className="question-list">
                    {questions.map((question, i) => {
                        return (<Question
                            key={question.id}
                            content={question.content}
                            author={question.author}
                        />)
                    })}
                </div>
            </main>
        </div>
    );
}
