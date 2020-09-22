/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* Projeto comercial Chat Comercial;
*/
import React, { useState, useEffect } from 'react'

import db from '../../conexao/firebase'

import { Avatar } from '@material-ui/core'
import './SideBarChat.css'
import { Link } from 'react-router-dom'

const SideBarChat = ({ id, name, addNewChat }) => {
    const [seed, setSeed] = useState(0)
    const [messages, setMessages] = useState("")

    useEffect(() => {
        if (id) {
            db.collection("rooms").doc(id).collection("messages").orderBy("timestamp", "desc")
                .onSnapshot(snapshot =>
                    setMessages(snapshot.docs.map(doc => doc.data()))
                )
        }
    }, [id])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = () => {
        const nomeCanal = prompt('Por favor, digíte o nome para o canal!')

        if (nomeCanal) {
            db.collection('rooms').add({
                name: nomeCanal,
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`} >
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>

    ) : (
            <div
                onClick={createChat}
                className="sidebarChat"
            >
                <h2>Adicionar novo canal</h2>
            </div>
        )
}

export default SideBarChat
