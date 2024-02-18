import React, { useContext, useState } from 'react'
import "../Styles/Login.css";
import login2 from "../assets/login2.svg";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { AppContext } from './../Context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [btn,setBtn] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [error,setError] = useState("")
  const {dispatch} = useContext(AppContext)
  
  const navigate = useNavigate();

  const login = (e) => {
    console.log( email,password)
    if(!email || !password){ 
      setError("Please fill the Credential")
      setTimeout( () => {
        setError("")
      },2000)
      return 
    }
    e.preventDefault()
     axios.post("http://localhost:5000/api/fac/login",{
      email,
      password
     }).then(res => {
      console.log(res.data)
      if(res.data.err){
        setError(res.data.err)
        setTimeout( () => {
          setError("")
        },2000)
        return
      }
      toast.success("Login Successfully", {
        autoClose: 1500, 
      })
      dispatch({type:"LOGIN" ,payload:res.data.user})
     }).catch(err => {
      setError(err)
      console.log(err) 
     })
  }
  return (
    <div className={btn == "sign-up-mode" ? "container sign-up-mode" : "container"}>
    <div className="forms-container">
      <div className="signin-signup">
        <form action="#" className="sign-in-form">
          <h2 className="title">Sign in </h2>
          {
            error?
            <div style={{backgroundColor:"#EAB543",padding:"0.8rem",borderRadius:"5px",width:"55%"}}>
            <h4 style={{color:"red"}}>{error}</h4>
            </div>
            :
            <div></div>
          }
         
          <div className="input-field">
           <PersonIcon/>
            <input type="text" placeholder="Username"  value={email}  onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-field">
            <LockIcon/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <input type="submit" value="Login" className="btn solid" onClick={(e) => login(e)} />
         
        </form>
      </div>
    </div>
    {/* <Signup/> */}
    <div className="panels-container">
      <div className="panel left-panel">
        <div className="content">
          <h3>New here ?</h3>
          <p>
          Are you a Student ? Click Below to login
          </p>
          <button className="btn transparent" id="sign-up-btn" onClick={() =>{
            navigate("/stlogin")
            setBtn("sign-up-mode")
            }}>
             Student Login
            </button>
        </div>
        <img src={login2} className="image" alt="" />
      </div>
      <div className="panel right-panel">
        <div className="content">
          <h3>One of us ?</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            laboriosam ad deleniti.
          </p>
          <button className="btn transparent" id="sign-in-btn" onClick={() => setBtn("")}>
            Sign in
          </button>
        </div>
        <img src={login2} className="image" alt="" />
      </div>
    </div>
  </div>
  )
}

export default Login
