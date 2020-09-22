/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* Projeto comercial Chat Comercial;
*/
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import db from '../../conexao/firebase'
import firebase from '../../conexao/firebase'
import { useStateValue } from '../../util/StateProvider'

import { Avatar, IconButton } from '@material-ui/core'
import { SearchOutlined, MoreVert, AttachFile, InsertEmoticon, Mic } from '@material-ui/icons'

import './Chat.css'

const Chat = () => {
    const [input, setInput] = useState('')
    const [seed, setSeed] = useState(0)
    const [roomName, setRoomName] = useState([])
    const [messages, setMessages] = useState([])

    const [{ user }, dispach] = useStateValue()
    const { roomId } = useParams()

    useEffect(() => {
        if (roomId) {
            db.collection("rooms").doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection("rooms").doc(roomId).collection("messages")
                .orderBy("timestamp", "asc").onSnapshot(snapshot =>
                    setMessages(snapshot.docs.map(doc => doc.data()))
                )
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault()

        // console.log(input)

        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('')
    }

    return (
        <div className="chat">

            <div className="chat__header">

                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Visto pela última vez{" "}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                        ).toUTCString()}
                    </p>

                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                        <span className="chat__name">
                            {message.name}
                        </span>
                        {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>

            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <form>
                    <input
                        type='text'
                        placeholder='Digite sua mensagem...'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={sendMessage} type='submit' >Enviar Mensagem</button>
                </form>
                <IconButton>
                    <Mic />
                </IconButton>
            </div>

        </div>
    )
}

export default Chat
