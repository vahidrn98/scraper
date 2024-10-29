// src/components/Questionnaire.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { State } from '../store';

interface Question {
    question: string;
    options: string[];
}

const Questionnaire: React.FC = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state: State) => state.questions);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:5000/scrape', { url: 'https://example.com' });
                dispatch({ type: 'SET_QUESTIONS', payload: response.data.questions });
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            }
        };
        fetchQuestions();
    }, [dispatch]);

    const handleSelection = (question: string, option: string) => {
        dispatch({ type: 'SET_SELECTION', payload: { question, option } });
    };

    return (
        <div>
            {questions.map((q, index) => (
                <div key={index}>
                    <p>{q.question}</p>
                    {q.options.map((option, i) => (
                        <button key={i} onClick={() => handleSelection(q.question, option)}>
                            {option}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Questionnaire;
