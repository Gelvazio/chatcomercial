/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* Projeto comercial Chat Comercial;
*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import reducer, { initialState } from './util/reducer'
import { StateProvider } from './util/StateProvider'

ReactDOM.render(
    <React.StrictMode>
        <StateProvider
            initialState={initialState}
            reducer={reducer}
        >
            <App />
        </StateProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
