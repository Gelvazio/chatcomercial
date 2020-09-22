/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* Projeto comercial Chat Comercial;
*/
import React, { useState, useEffect } from 'react'

import db from '../../conexao/firebase'
import firebase from '../../conexao/firebase';
import { useStateValue } from '../../util/StateProvider'

import { Avatar, IconButton } from '@material-ui/core'
import { SearchOutlined, Settings } from '@material-ui/icons'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'

import SideBarChat from '../sideBarChat'
import './SideBar.css'

const SideBar = () => {
    const [rooms, setRooms] = useState([])
    const [{ user }, dispach] = useStateValue()

    useEffect(() => {
        const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
            setRooms(snapshot.docs.map((doc) =>
                ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        )

        return () => {
            unsubscribe()
        }

    }, [])

    const logOutUser = () => {
        firebase.auth().signOut()
    };

    return (
        <div className="sidebar">

            <div className="sidebar__header">
                <IconButton>
                    <Avatar src={user?.photoURL} />
                </IconButton>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <Settings />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                    <IconButton 
                        onClick={logOutUser}
                    >
                        <PowerSettingsNewIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input
                        placeholder="Pesquisar ou iniciar uma conversa!"
                        type="text"
                    />
                </div>
            </div>

            <div className="sidebar__chats">
                <SideBarChat addNewChat />
                {rooms.map((room) => (
                    <SideBarChat
                        key={room.id}
                        id={room.id}
                        name={room.data.name}
                    />
                ))}
            </div>

        </div>
    )
}

export default SideBar
