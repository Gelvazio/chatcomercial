/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* Projeto comercial Chat Comercial;
*/
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { useStateValue } from './util/StateProvider'

import SideBar from '../src/components/SideBar'
import Chat from '../src/components/Chat'
import Login from './pages/Login';
import RecuperarSenha from './pages/RecuperarSenha'

import './App.css';

export const AuthContext = React.createContext(null);

const App = () => {
    const [{ user },] = useStateValue()
    const [isLoggedIn, setLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            {/* Está logado? {JSON.stringify(isLoggedIn)} */}
            <div className="app">
                {!user ? (
                    <Login />
                ) : (
                        <div className="app__body">
                            <Router>
                                <SideBar />
                                <Switch>
                                    <Route path="/rooms/:roomId">
                                        <Chat />
                                    </Route>

                                    <Route path="/recuperarsenha">
                                        <RecuperarSenha />
                                    </Route>

                                    <Route path="/">
                                        <Chat />
                                    </Route>
                                </Switch>
                            </Router>
                        </div>
                    )
                }

            </div>
        </AuthContext.Provider>
    );
}

export default App;
