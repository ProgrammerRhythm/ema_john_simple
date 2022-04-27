/* eslint-disable no-use-before-define */
import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleGoogleSignIn, initializeLogin,handleSignOut,handleSignInFB } from './LoginManager';


function Login() {
  const history = useNavigate();
  const location = useLocation()
  const { from } = location.state || { from: { pathname: "/" } };
  const [newUser,setNewUser] = useState(false)
  const [user,setUser] = useState({
    isSigned: false,
    name: '',
    email: '',
    photo: '',
    password: '',
    error: '',
    success: false,
  })
  initializeLogin();

  const googleSignIn  = () => {
    handleGoogleSignIn()
    .then(res => {
      setUser(res)
      setLogIn(res)
      history(from, { replace: true })
    })
  }

  const SignOut  = () => {
    handleSignOut()
    .then(res => {
      setUser(res)
      setLogIn(res)
    })
  }

  const SignInFB  = () => {
    handleSignInFB()
    .then(res => {
      setUser(res)
      setLogIn(res)
      history(from, { replace: true })
    })
  }


  const handleChange = (e) => {
    console.log(e.target.value);
    let fildValid = true;
    if(e.target.name === 'email'){
      fildValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    else if(e.target.name === 'password') {
      const passwordTest = e.target.value.length > 6;
      const passwordNum = /\d{1}/.test(e.target.value);
      fildValid = passwordTest && passwordNum;
    }
    if (fildValid) {
      const newUserInfo = {...user}
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    console.log(user.name, user.email, user.password);
    if (newUser && user.email && user.password) {
     ;
    }

  else if(!newUser && user.email && user.password){
    // debugger;
   
   } 
    e.preventDefault();
  }
  const [login,setLogIn] = useContext(UserContext)
  
  return (
    <div style={{textAlign: 'center'}}>
       
          {/* <p>Password: {user.password}</p> */}
      {
      user.isSigned ?<button onClick={SignOut}>Sign Out</button> :
      <button onClick={googleSignIn}>Sign in</button>
      }
      <button onClick={SignInFB}>Sign in Useing Facebook</button>
      {
        user.isSigned &&
        <div>
          <img src={user.photo} alt="" />
          <p>Welcome!{user.name}</p>
          <p>Name: {user.name}</p>
          <p>Your Email:{user.email}</p>
        </div>
      }
      <h1>Our own authtications</h1>
      <form onSubmit={handleSubmit}>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
        <label htmlFor="newUser">New User</label> <br />
        {newUser && <input type="text" placeholder='Name' required onBlur={handleChange}  name='name'/>}
        <br />
        <input type="text" name="email" onBlur={handleChange} required  placeholder="Email Address"/><br />
        <input type="password" name="password" id="" required onBlur={handleChange} placeholder="Password"/><br />
        <br />
        <input type="submit" value={newUser? 'Sign Up' : 'Sign In'} />
      </form>
      <h4 style={{color: 'red'}}>{user.error}</h4>
      {
      user.success && <h4 style={{color: 'green'}}>User{newUser ? ' Sign Up' : 'Sign In'}Success</h4>
      }
    </div>
  );
}

export default Login;
