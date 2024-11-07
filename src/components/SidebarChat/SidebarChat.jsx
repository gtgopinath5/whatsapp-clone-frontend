import React, { useEffect, useState } from 'react';
import './SidebarChat.css';
import { Avatar } from '@mui/material';
import axios from "axios"
import {Link} from "react-router-dom"

const SidebarChat = ({ addNewChat,name,id }) => {
    const [seed, setSeed] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

const createChat=async()=>{
    const roomName=prompt("please enter name for the group");
    if(roomName){
        try{
         await axios.post("http://localhost:5000/group/create",{
            groupName:roomName
         }) 
        }catch(err){
          console.log(err);
          
        }
    }
}

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className='sidebarChat'>
            <Avatar
                className='avatar'
                src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}`}
                alt="Avatar"
            />
            <div className='sidebarChat_info'>
                <h2>{name}</h2>
            </div>
        </div>
        </Link>
    ) : (
        <div className='sidebarChat sidebarChat--addNew' onClick={createChat}>
            <h2>Add new Chat +</h2>
        </div>
    );
};

export default SidebarChat;
