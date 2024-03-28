import React, { useContext, useState } from "react";
import wave from "../assets/wave.png";
import bg from "../assets/bg.svg";
import avatar from "../assets/avatar.svg";
import "../Styles/Signup.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import { AppContext } from "./../Context/AuthContext";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import "../Styles/Login.css"
import { useNavigate } from "react-router-dom";

const StLogin = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState();
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate()

  // Styles
  const inputStyles = {
    "& label": {
      marginLeft: "30px",
    },
  };

  const login = (e) => {
    e.preventDefault();
    // setIsLogin(true)
    if (!email || !password) {
      setError("Please fill the Credential");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    axios
      .post("http://localhost:5000/api/stu/login", {
        oldEmail:email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.err) {
          setError(res.data.err);
          setTimeout(() => {
            setError("");
          }, 2000);
          return;
        }
        // setIsLogin(false)
        toast.success("Login Successfully", {
          autoClose: 1500,
        });
        dispatch({ type: "LOGIN", payload: res.data.user });
        navigate("/")
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  };

  return (
    <>
      <img className="wave" src={wave} />
   
      <div className="containerr">
        <div className="img" style={{position:"relative"}}>
          <img src={bg} />
          <div style={{padding:"10px",position:"absolute",top:"100px",left:"400px",}}>
       <h5 style={{fontSize:"14px",fontWeight:"500"}}> Are you a Faculty ? Click Below to login </h5>
          <button className="btn transparent" id="sign-up-btn" style={{border:"2px solid #5995fd",marginTop:"20px",marginLeft:"40px",color:"#5995fd",fontWeight:"bold"}}  onClick={() =>{
            navigate("/")
            // setBtn("sign-up-mode")
            }}>
              Login
            </button>
       </div>
        </div>
        <div className="formContainer">
          <div className="top">
            <img src={avatar} style={{ width: "200px", height: "200px" }} />
            <h2 style={{ textAlign: "center", fontSize: "45px" }}>Welcome</h2>

            {error ? (
              <div
                style={{
                  backgroundColor: "#EAB543",
                  padding: "0.8rem",
                  borderRadius: "5px",
                  width: "100%",
                }}
              >
                <h4 style={{ color: "red" }}>{error}</h4>
              </div>
            ) : (
              <div></div>
            )}

            <form  className="sign-in-form">
              <div className="input-field stu">
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <LockIcon />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Login"
                className="btn solid"
                onClick={(e) => login(e)}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StLogin;
