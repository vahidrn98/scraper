// src/store.ts
import { createStore, Action } from 'redux';

interface Question {
    question: string;
    options: string[];
}

export interface State {
    questions: Question[];
    userSelections: Record<string, string>;
}

const initialState: State = {
    questions: [],
    userSelections: {}
};

interface SetQuestionsAction extends Action<'SET_QUESTIONS'> {
    payload: Question[];
}

interface SetSelectionAction extends Action<'SET_SELECTION'> {
    payload: { question: string; option: string };
}

type AppActions = SetQuestionsAction | SetSelectionAction;

function rootReducer(state: State = initialState, action: AppActions): State {
    switch (action.type) {
        case 'SET_QUESTIONS':
            return { ...state, questions: action.payload };
        case 'SET_SELECTION':
            return {
                ...state,
                userSelections: { ...state.userSelections, [action.payload.question]: action.payload.option }
            };
        default:
            return state;
    }
}

const store = createStore(rootReducer);
export default store;
