import React ,{useState,useEffect, useRef} from 'react'
import styled from "styled-components"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client';


export default function Chat() {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  //const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function worked(){
      console.log("chat");
      if(!localStorage.getItem("chat-app-user")){
        console.log(currentUser);
        navigate('/login');
      }else{
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
      } 
    }
    worked();
  },[]);
  
  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);

    }
  },[currentUser]);

  useEffect(()=>{
    async function cUser(){
    if(currentUser){
      if(currentUser.isAvatatarImageSet){
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      }else{
        navigate("/setAvatar");
      }
    } 
  }
    cUser();
   },[currentUser]);

  const handleChatChange=(chat)=>{
    setCurrentChat(chat);
  }

  return (
    <>
    <Container>
    <div className='container'>
      <Contacts contacts={contacts} currentUser={currentUser} changechat={handleChatChange}/>
      {
        currentChat === undefined?(
        <Welcome/>):(
        <ChatContainer currentChat={currentChat} socket={socket}/>)
      }
      
    </div>
    </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items:center;
  background-color: #131324;
  .container{
    height : 85vh;
    width : 85vw;
    background-color:#00000076; 
    display:grid;
    grid-template-columns:28% 75%;
    @media screen and (min-width:720px) and (max-width:1080px){
      grid-template-colmns:35% 65%;
    }
  }
`;