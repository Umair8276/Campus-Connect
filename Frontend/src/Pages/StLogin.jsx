import React, { useContext, useState } from 'react'
import wave from "../assets/wave.png"
import bg from "../assets/bg.svg"
import avatar from "../assets/avatar.svg"
import "../Styles/Signup.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import { AppContext } from './../Context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner'

const StLogin = () => {
  const [error,setError] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [isLogin,setIsLogin] = useState()
  const {dispatch} = useContext(AppContext)

  // Styles
const inputStyles= {
  "& label":{
    marginLeft:"30px"
  }

}


  const login = (e) => {
    // setIsLogin(true)
    if(!email || !password){ 
      setError("Please fill the Credential")
      setTimeout( () => {
        setError("")
      },2000)
      
    }
     axios.post("http://localhost:5000/api/stu/login",{
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
      // setIsLogin(false)
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
    <>

      <img className="wave" src={wave} />
      <div className="containerr">
        <div className="img">
          <img src={bg} />
        </div>
        <div className="formContainer">



          <div className='top'>
            <img src={avatar} style={{ width: "200px", height: "200px" }} />
            <h2 style={{ textAlign: "center", fontSize: "45px" }}>Welcome</h2>

            {
            error?
            <div style={{backgroundColor:"#EAB543",padding:"0.8rem",borderRadius:"5px",width:"100%"}}>
            <h4 style={{color:"red"}}>{error}</h4>
            </div>
            :
            <div></div>
          }

            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '40ch' },
              }}
              noValidate
              autoComplete="off"
            >
                 <div style={{display:"flex",alignItems:"center",position:"relative"}}>
              <EmailIcon style={{position:"absolute" , left:"5"}}/>
              <TextField id="filled-basic" label="Email" value={email} sx={{width:"100%",border:"none",...inputStyles}}  onChange={(e) =>setEmail(e.target.value)}  />
              </div>

              <div style={{display:"flex",alignItems:"center",position:"relative"}}>
              <HttpsIcon style={{position:"absolute" , left:"5"}}/> 
              <TextField id="filled-basic" type={"password"} label="Password" value={password} sx={{width:"100%",border:"none",...inputStyles}} onChange={(e) =>setPassword(e.target.value)} />
              </div>
              <div >
              <a href="#">Forgot Password?</a>
            	<input className="btnn" value={isLogin ? 
                  <Oval
                  visible={true}
                  height="30"
                  width="30"
                  color="#4fa94d"
                 ariaLabel="oval-loading"
                 wrapperStyle={{}}
                 wrapperClass=""
                 />
                 :

              "Login"} onClick={() =>login()}/>
              </div>
            
            </Box>

          </div>
        </div>
      </div>

    </>
  )
}

export default StLogin
