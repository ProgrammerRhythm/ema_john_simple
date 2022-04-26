/* eslint-disable no-use-before-define */
import React, { useContext, useState } from 'react';
import * as firebase from 'firebase/app';
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {FacebookAuthProvider,updateProfile,signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider,signOut,createUserWithEmailAndPassword } from "firebase/auth";
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

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


  const GGprovider = new GoogleAuthProvider();
  const FBprovider = new FacebookAuthProvider();
  const handleSignInFB = () => {
    const auth = getAuth();
    signInWithPopup(auth, FBprovider)
    .then((result) => {
    const user = result.user;
    console.log('Facebook User',user);
  })
  .catch((error) => {
    console.log(error);
  });
  }
  const handleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, GGprovider)
      .then((result) => {
        const {displayName, email, photoURL,phoneNumber} = result.user;
        const signInUser = {
          isSigned: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        
        setUser(signInUser)
        console.log(displayName, email, photoURL,phoneNumber);
      }).catch((error) => {
        
      });
  }


  const handleSignOut = () => {
    const auth = getAuth();
      signOut(auth).then(() => {
        const signOutuser = {
          isSigned: false,
          name: '',
          email: '',
          photo: '',
        }
        setUser(signOutuser)
    })
    .catch((error) => {
  
    });
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
      const auth = getAuth();
    createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(() => {
      const newUserInfo = {...user}
      newUserInfo.error = ''
      newUserInfo.success = true
      setUser(newUserInfo)
      updateUserInfo(user.name)
  })
  .catch((error) => {
    const newUserInfo = {...user}
      newUserInfo.success = false;
      newUserInfo.error = error.code;
      setUser(newUserInfo)
    // console.log(error.code,error.message);
    // ..
  });
    }

  else if(!newUser && user.email && user.password){
    // debugger;
    const auth = getAuth();
    const email = user.email;
    const password = user.password;
    signInWithEmailAndPassword(auth, email, password)
      .then(res => {
          const newUserInfo = {...user}
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLogIn(newUserInfo);
          history(from, { replace: true })
          console.log(res.user);
      })
      .catch((error) => {
        const newUserInfo = {...user}
        newUserInfo.success = false;
        newUserInfo.error = error.code;
        setUser(newUserInfo)
        console.log(error);
      });
   } 
    e.preventDefault();
  }

  const updateUserInfo = (name) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
    displayName: name
  })
  .then(() => {
    console.log('user name updated successfully');
    }).catch((error) => {
      console.log(error);
  });
  }

  const [login,setLogIn] = useContext(UserContext)
  

  return (
    <div style={{textAlign: 'center'}}>
      {
      user.isSigned ?<button onClick={handleSignOut}>Sign Out</button> :
      <button onClick={handleSignIn}>Sign in</button>
      }
      <button onClick={handleSignInFB}>Sign in Useing Facebook</button>
      {
        user.isSigned 
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
