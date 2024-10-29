// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Questionnaire from './Components/Questionaire';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <h1>Interest-Based Questionnaire</h1>
                <Questionnaire />
            </div>
        </Provider>
    );
};

export default App;
