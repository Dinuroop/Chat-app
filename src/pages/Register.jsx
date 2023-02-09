import React,{useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer,toast } from 'react-toastify';
import Logo from "../Assests/logo-dark.svg"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import { RegisterRoute } from '../utils/APIRoutes';

export default function Register() {
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
        email:"",
        password:"",
        confirmpassword:"",
    });

    useEffect(()=>{
        if(localStorage.getItem("chat-app-user")){
            navigate('/login');
        }
    },[])

    const handleSubmit= async(event)=>{
        event.preventDefault();
        if(handleValidation()){
            const{password,username,email}=values;
            const {data} = await axios.post(RegisterRoute,{
                username,
                email,
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
        const{password, confirmpassword,username,email}=values;
        if(password!==confirmpassword){
            // alert("Password and confirm password must be same.");  
            toast.error("Password and confirm password must be same. ",toastOptions);
          return false;  
        }
        else if(username.length<3){
            toast.error("Username must be greater than 3 letters",toastOptions);
            return false;
        }
        else if(password.length<6){
            toast.error("Password must be greater than or equal to 6 letters",toastOptions);
            return false;
        }
        else if(email===""){
            toast.error("Email is required!",toastOptions);
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
            <form style={{height:"90%",maxWidth:"45%", display:"flex",flexDirection: "column",gap:"2rem",backgroundColor: "#00000076",borderRadius:"2rem", marginTop:"5px"}}onSubmit={(event)=>handleSubmit(event)}>
                <div className="brand" style={{fontFamily:"cursive", display:"flex",alignItems:"center",gap:"0rem",justifyContent:"center",marginTop:"15px" }}>
                  <h1 style={{color:"white",textTransform:"uppercase"}}>Ch</h1>
                    <img src={Logo} style={{height:"1.8rem" , marginTop:"-0.5px"}} alt='logo'/>
                    <h1 style={{color:"white",textTransform:"uppercase"}}>tChat</h1>
                </div>
                <input type='text' placeholder='Username' name='username'onChange={e=>handleChange(e)}/>
                <input type='email' placeholder='Email' name='email'onChange={e=>handleChange(e)}/>
                <input type='password' placeholder='Password' name='password'onChange={e=>handleChange(e)}/>
                <input type='password' placeholder='Confirm Password' name='confirmpassword'onChange={e=>handleChange(e)}/>
                <button type='submit' onClick={e=>handleValidation(e)}> Create User </button>
                <span>Already have an account ? <Link to='/login'>Login</Link></span>
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
  gap : 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  .brand { 
    display: flex;
    align-items: center;
    gap: 0rem;
    justify-content: center;
    img {
      height: 3rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.7rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 0.8rem 3rem;
  }
  input {
    background-color: transparent;
    padding: 0.7rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    width:80%;
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color:#997af0;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    font-size:0.8rem;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;


