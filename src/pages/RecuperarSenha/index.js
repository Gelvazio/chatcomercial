/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* Projeto comercial Chat Comercial;
*/
import React from 'react'

import { Button } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email';

import './RecuperarSenha.css'

function RecuperarSenha() {
    return (
        <div className="recuperarsenha">
            <div className="recuperarsenha__container">

                <div className="recuperarsenha__titulo">
                    <h1>Recuperar Senha</h1>
                </div>

                <div className="recuperarsenha__input">
                    <EmailIcon />
                    <input
                        placeholder="Digite seu e-mail..."
                        type="text"
                    />
                </div>

                <div className="recuperarsenha__button">
                    <Button
                        type='submit'
                        onClick={() => { }}
                    >
                        Recuperar
                </Button>
                </div>

                <div className="recuperarsenha__voltar">
                    <h1>Voltar</h1>
                </div>

            </div>
        </div>
    )
}

export default RecuperarSenha
