import './Login.css';
import React, { useState } from 'react';
import profile from "./../images/a.png";
import email from "./../images/email.jpg";
import pass from "./../images/pass.png";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

function Login() {

    const[emailId, setEmailId] = useState('');
    const[otp, setOtp] = useState('');
    const[otpReceived, setOtpReceived] = useState(false);
    const[loggedIn, setLoggedIn] = useState(false);

    const sendOTP = () => {
        fetch(`http://localhost:8080/login/send-otp-mail?emailId=${emailId}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }).then((result) => result.text()).then((res) => {
          toast(res);
          if (res.includes("Otp sent")) {
            setOtpReceived(true);
          } else {
            setOtpReceived(false);
          }
      }).catch(error => {
          setOtpReceived(false);
        });
    }

    const loginUser = () => {
        fetch(`http://localhost:8080/login?emailId=${emailId}&otp=${otp}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }).then((result) => result.text()).then((res) => {
          toast(res);
          if (res.includes("Login successful")) {
            setLoggedIn(true);
          } else {
            setLoggedIn(false);
          }
      }).catch(error => {
          setLoggedIn(false);
        });
    }

    const logoutUser = () => {
      fetch(`http://localhost:8080/login/logout-user?emailId=${emailId}`, {
          method: "GET",
          headers: {"Content-Type": "application/json"}
      }).then((result) => result.text()).then((res) => {
        toast(res);
        if (res.includes("Logout Successful")) {
          setLoggedIn(false);
          setOtpReceived(false);
        } else {
          setLoggedIn(true);
        }
    }).catch(error => {
        setLoggedIn(true);
      });
  }

    return (
      <div className="main"> {
        !loggedIn ? 
       <div className="sub-main">
         <div>
           <div className="imgs">
             <div className="container-image">
               <img src={profile} alt="profile" className="profile"/>
  
             </div>
  
  
           </div>
           <div>
             <h1>Login Page</h1>
             <div>
               <img src={email} alt="email" className="email"/>
               <input type="text" placeholder="user name" className="name" onChange={(e)=>setEmailId(e.target.value)}/>
             </div>

             {
                 otpReceived ? <div className="second-input">
                 <img src={pass} alt="pass" className="email"/>
                 <input type="password" placeholder="user name" className="name" onChange={(e)=>setOtp(e.target.value)}/>
                </div> : <div></div>  
             }

            <div className="login-button">{
               otpReceived ? <button className="login-pointer" onClick={loginUser}>Login</button> : <button className="login-pointer" onClick={sendOTP}>Send OTP</button> 
            }
            </div>
             
   
           </div>
         </div>
         
  
       </div> : <button className="login-pointer" onClick={logoutUser}>Log Out</button>
      }
      </div>
    );
  }
  
  export default Login;