//import emojis from "emoji-picker-react/dist/data/emojis";
import React, { useState,useEffect } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from 'emoji-picker-react';
//import {Convert} from 'mongo-image-converter';
//import FormData from "FormData";
// import axios from "axios";
// import { sendMessageRoute } from "../utils/APIRoutes";


export default function ChatInput({handleSendMsg, handleSendImg}){
    
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg,setMsg] = useState("");
    //const [file,setFile] = useState(undefined);

    const handleEmojiPickerHideShow=()=>{
        setShowEmojiPicker(!showEmojiPicker);
    };

    // useEffect(() => {
    //     if(file){
    //       localStorage.setItem()
    //     }
    // }, [file])
    const handleEmojiClick=(emojiObject,event)=>{
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
    };

    const sendChat = async(event) => {
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg("");
        }
    }
      //   try {
      //     const convertedImage = await Convert(file)
      //     if( convertedImage ){
      //     console.log(convertedImage);
      //     console.log(file);
      //     handleSendImg(convertedImage);
      //     } else{
      //         console.log('The file is not in format of image/jpeg or image/png')
      //     }
      // } 
      // catch (error) {
      //     console.warn(error.message)
      //     }
      
        // if(file){
        // console.log(file);
        // const formData = new FormData();
        // formData.append('file',file);
        // //localStorage.setItem('file-details',JSON.stringify(file));
        // console.log(formData);
        // handleSendMsg(file);
        // setFile(undefined);
        // }
        // try{
        //   const formData = new FormData();
        //   formData.append('file',file);
        //   await axios.post(sendMessageRoute,formData,{
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     }
        //   }).then(res=>{console.log(res)});
        // }catch(error){
        //   console.error("while uploading",error);
        // }
    


    // const selectFile=(e)=>{
    //    console.log(e.target.files[0].name)
    //    //setMsg(e.target.files[0].name);
    //    setFile(e.target.files[0]);
    // }

    return(
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                    {
                        showEmojiPicker && <div className="picker"><Picker onEmojiClick={handleEmojiClick}/></div>
                    }
                </div>
            </div>
            <form className="input-container" onSubmit={(e)=>sendChat(e)}>
                {/* <input onChange={selectFile} type="file" /> */}
                <input type="text" placeholder="Type your message here" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
                <button  type="submit">
                    <IoMdSend/>
                </button>
            </form>
        </Container>
    );
}

const Container = styled.div`
display: grid;
align-items: center;
grid-template-columns: 5% 95%;
background-color: #080420;
padding: 0 2rem;
@media screen and (min-width: 720px) and (max-width: 1080px) {
  padding: 0 1rem;
  gap: 1rem;
}
.button-container {
  display: flex;
  align-items: center;
  color: white;
  gap: 1rem;
  .emoji {
    position: relative;
    svg {
      font-size: 1.5rem;
      color: #ffff00c8;
      cursor: pointer;
    }
    .EmojiPickerReact {
      height:350px;
      width:250px;
      position: absolute;
      top: -450px;
      background-color: #080420;
      box-shadow: 0 5px 10px #9a86f3;
      border-color: #9a86f3;
      .emoji-scroll-wrapper::-webkit-scrollbar {
        background-color: #080420;
        width: 5px;
        &-thumb {
          background-color: #9a86f3;
        }
      }
      .epr-emoji-categories{
        button {
          filter: contrast(0);
        }
      }
      .epr-emoji-category-label{
        background-color:#080420;
      }
      .emoji-search {
        background-color: transparent;
        border-color: #9a86f3;
      }
      .epr-emoji-group:before {
        background-color: #080420;
      }
      .Flex {
        height:50px;
      }
      .__EmojiPicker__epr-emoji-img{
        height:15px;
        width:15px;
        font-size:45px;
      }
    }
  }
}
.input-container {
  width: 99%;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: #ffffff34;
  input {
    width: 90%;
    height: 60%;
    background-color: transparent;
    color: white;
    border: none;
    padding-left: 1rem;
    font-size: 1.2rem;
    &::selection {
      background-color: #9a86f3;
    }
    &:focus {
      outline: none;
    }
  }
  button {
    padding: 0.3rem 2rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #9a86f3;
    border: none;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      padding: 0.3rem 1rem;
      svg {
        font-size: 1rem;
      }
    }
    svg {
      font-size: 2rem;
      color: white;
    }
  }
}
`;