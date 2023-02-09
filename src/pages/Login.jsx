import React,{useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer,toast } from 'react-toastify';
import Logo from "../Assests/logo-dark.svg"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import { LoginRoute } from '../utils/APIRoutes';

export default function Login() {
    const navigate = useNavigate();
    const toastOptions = {
        position:'bottom-right',
        autoClose:2000,
        pauseOnHover:true,
        draggable: true,
        theme: 'dark',
        };

    const [values, setValues] = useState({
        username:"",
        password:"",
    });

    useEffect(()=>{
        if(localStorage.getItem("chat-app-user")){
            navigate('/')
        }
    },[])

    const handleSubmit= async(event)=>{
        event.preventDefault();
        if(handleValidation()){
            console.log("in validation",LoginRoute)
            const{password,username}=values;
            const {data} = await axios.post(LoginRoute,{
                username,
                password,
            });
            if(data.status===false){
                toast.error(data.msg, toastOptions);
            }
            if(data.status===true){
                localStorage.setItem('chat-app-user',JSON.stringify(data.user)); 
                navigate("/");
            }

        }   

    };
    const handleValidation=()=>{
        const{password,username}=values;
        if(password===""){
            // alert("Password and confirm password must be same.");  
            toast.error("Username and Password are required ",toastOptions);
          return false;  
        }
        else if(username===""){
            toast.error("Username and Password are required",toastOptions);
            return false;
        }
        return true;
    };
    const handleChange=(event)=>{
        setValues({...values,[event.target.name]: event.target.value});
    }; 
  return (
    <>
        <FormContainer>
            <form style={{height:"70%",maxWidth:"45%", display:"flex",flexDirection: "column",gap:"2rem",backgroundColor: "#00000076",borderRadius:"2rem"}}onSubmit={(event)=>handleSubmit(event)}>
                <div className="brand" style={{fontFamily:"cursive", display:"flex",alignItems:"center",gap:"0rem",justifyContent:"center",marginTop:"15px" }}>
                  <h1 style={{color:"white",textTransform:"uppercase"}}>Ch</h1>
                    <img src={Logo} style={{height:"1.8rem" , marginTop:"-0.5px"}} alt='logo'/>
                    <h1 style={{color:"white",textTransform:"uppercase"}}>tChat</h1>
                </div>
                <input type='text' placeholder='Username' name='username'onChange={e=>handleChange(e)} min='3'/>
                <input type='password' placeholder='Password' name='password'onChange={(e)=>handleChange(e)}/>
                <button type='submit' onClick={e=>handleValidation(e)}> Login </button>
                <span>Don't have an account ? <Link to='/register'>REGISTER</Link></span>
            </form>
        </FormContainer>
        <ToastContainer/>
    </>
  )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction : column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color:#131324;
    .brand{
        display:flex;
        align-items:center;
        gap: 1rem;
        justify-content: center;
        img{
            height:4rem;
        }
        h1{
            color:white;
            text-transform:uppercase;
        }
    }
    form{
        align-items:center;
        height:90%;
        width:40%
        display:flex;
        flex-direction: column;
        gap:5rem;
        background-color: #00000076;
        border-radius:2rem;
        padding: 1rem 3rem;
        input{
            align-items:center;
            background-color: transparent;
            padding: 0.8rem;
            border:0.1rem solid #4e0eff;
            border-radius:0.4rem;
            color:white;
            width:100%;
            font-size:1rem;
            &:focus{
                border:0.1rem, solid #997a0;
                outline:none;
            }
        }
        button{
            width : 80%;
            background-color:#4e0eff;
            color:white;
            padding:1rem 2rem;
            border: none;
            font-weight:bold;
            cursor: pointer;
            border-radius:0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: o.5s ease-in-out;
            &:hover{
                background-color: #997af0;
            }
        }
        span{
            color:white;
            text-transform: uppercase;
            font-size:0.8rem;
            a{
                color:#4e0eff;
                text-decoration:none;
                font-weight:bold;
            }
        }
    }

`;


