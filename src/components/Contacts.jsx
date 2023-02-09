import React, { useState,useEffect } from "react";
import styled from "styled-components";
import Logo from "../Assests/logo-dark.svg";
import Logout from "./Logout";

export default function Contacts({ contacts, changechat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    async function check() {
      const data = await JSON.parse(localStorage.getItem("chat-app-user"));
        setCurrentUserImage(data.avatarImage);
        setCurrentUserName(data.username);
    }
    check();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changechat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand" style={{fontFamily:"cursive", display:"flex",alignItems:"center",gap:"0rem",justifyContent:"center",marginTop:"15px", marginBottom:"15px"}}>
              <h3 style={{color:"white",textTransform:"uppercase"}}>Ch</h3>
                <img src={Logo} style={{height:"1rem" , marginTop:"-0.5px"}} alt='logo'/>
              <h3 style={{color:"white",textTransform:"uppercase"}}>tChat</h3>
          </div>
          {/* <div className="brand">
            <img src={Logo} alt="Logo" />
            <h3>Chatty</h3>
          </div> */}
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div className={`contact ${index === currentSelected ? "selected" : "" }`} key={contact._id} onClick={()=>changeCurrentChat(index,contact)}>
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml; base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user" style={{justifyContent:"space-between"}}>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <div className="avatar">
              <img
                src={`data:image/svg+xml; base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username" >
              <h2>{currentUserName}</h2>
            </div>
            </div>
            <div style={{justifyContent:"end"}}>
            <Logout/>
            </div>
          </div>
          
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
display: grid;
grid-template-rows: 10% 75% 15%;
overflow: hidden;
background-color: #080420;
.brand {
  display: flex;
  align-items: center;
  gap:5ram
  justify-content: center;
  h3 {
    gap:1rem;
    color: white;
    text-transform: uppercase;
  }
}
.contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  gap: 0.8rem;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .contact {
    background-color: #ffffff34;
    min-height: 3.5rem;
    cursor: pointer;
    width: 90%;
    border-radius: 0.4rem;
    padding: 0.4rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    transition: 0.5s ease-in-out;
    .avatar {
      img {
        height: 3rem;
      }
    }
    .username {
      h3 {
        color: white;
      }
    }
  }
  .selected {
    background-color: #9a86f3;
  }
}
.current-user {
  background-color: #0d0d30;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  .avatar {
    img {
      height: 3rem;
      max-inline-size: 90%;
    }
  }
  .username {
    h2 {
      color: white;
    }
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    gap: 0.5rem;
    .username {
      h2 {
        font-size: 1rem;
      }
    }
  }
}
`;
