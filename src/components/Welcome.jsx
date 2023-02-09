import React,{useState,useEffect}from "react";
import styled from "styled-components";
import Robot from "../Assests/robot.gif";

export default function Welcome(){
  const [userName,setUserName] = useState("");
  useEffect(()=>{
    async function fetchData() { 
    setUserName(await JSON.parse(localStorage.getItem("chat-app-user")).username)
    }
    fetchData() ;
  });
  return (
  <>
  <Container>
    <img src={Robot} alt="Robot" />
    <h1>
       Welcome <span style={{color:"#7fffd4"}}>{userName} !</span>
    </h1>
    <h3>Select a chat to message</h3>
  </Container>
  </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  color: white;
  .img{
    height : 18rem;
  }
`;