/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* Projeto comercial Chat Comercial;
*/
import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { auth, provider } from '../../conexao/firebase'
import { useStateValue } from '../../util/StateProvider'
import { actionTypes } from '../../util/reducer'

import { Button } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import EmailIcon from '@material-ui/icons/Email'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import Divider from '../../components/Divider'

import './Login.css'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setErrors] = useState("")

    const [users, setUsers] = useState([])
    const [{ }, dispach] = useStateValue()

    const history = useHistory()

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                dispach({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch(error => alert(error.message))
    }

    const handlerShowPassword = () => {
        setShowPassword(!showPassword)
    }

    // const Auth = useContext(AuthContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        
        auth.signInWithEmailAndPassword("silvaneimartins_rcc@hotmail.com", "123456")
        .then(history.push("/rooms")).
        catch(err => alert(err));
    };

    const recuperarsenha = () => {
        history.push('/recuperarsenha')
    }

    return (
        <div className="login">
            <div className="login__container">
                <h1>Login no Sistema</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="login__input">
                        <div className="login__inputEmail">
                            <EmailIcon />
                            <input
                                name="email"
                                placeholder="Digite seu e-mail..."
                                type="text"
                                onChange={e => {
                                    setEmail(e.target.value);
                                }}
                                value={email}
                            />
                        </div>
                        
                        <div className="login__inputPassword">
                            <LockIcon />
                            <input
                                name="password"
                                placeholder="Digite sua senha..."
                                type={showPassword ? 'text' : 'password'}
                                onChange={e => {
                                    setPassword(e.target.value);
                                }}
                                value={password}
                            />
                            {showPassword ?
                                (
                                    <VisibilityIcon
                                        name="eye"
                                        onClick={handlerShowPassword}
                                    />
                                ) : (
                                    <VisibilityOffIcon
                                        name="eye slash outline"
                                        onClick={handlerShowPassword}
                                    />
                                )
                            }
                        </div>
                        
                        <span onClick={() => recuperarsenha} >Esqueci minha senha </span>
                    </div>
                </form>

                {/* Botão entrar com autenticação email e password */}
                <div className="login__buttonEntrar">
                    <Button
                        type='submit'
                        onClick={handleSubmit}
                    >
                        Entrar
                    </Button>
                </div>

                {/* componentes que divide entre 2 botão */}
                <Divider />

                {/* Botão entrar com autenticação google */}
                <div className="login__buttonGoogle">
                    <h4>Ou entre com</h4>
                    <Button
                        type='submit'
                        onClick={signIn}
                    >
                        Faça login com Google
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login
