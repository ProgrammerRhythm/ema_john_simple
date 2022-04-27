import * as firebase from 'firebase/app';
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {FacebookAuthProvider,updateProfile,signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider,signOut,createUserWithEmailAndPassword } from "firebase/auth";


export const initializeLogin = () => {
    firebase.initializeApp(firebaseConfig);
}
export const handleGoogleSignIn = () => {
  const GGprovider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, GGprovider)
      .then((result) => {
        const {displayName, email, photoURL} = result.user;
        const signInUser = {
          isSigned: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        console.log(signInUser);
        
        return signInUser
        // console.log(displayName, email, photoURL,phoneNumber);
      }).catch((error) => {
        
      });
  }
export const handleSignInFB = () => {
    const FBprovider = new FacebookAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, FBprovider)
    .then((result) => {
        const {displayName, email, photoURL} = result.user;
        const signInUser = {
          isSigned: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        return signInUser
  })
  .catch((error) => {
    console.log(error);
  });
  }  

 export const handleSignOut = () => {
    const auth = getAuth();
      return signOut(auth)
       .then(() => {
        const signOutuser = {
          isSigned: false,
          name: '',
          email: '',
          photo: '',
        }
        return signOutuser
    })
    .catch((error) => {
  
    });
  }  
//  export const CreateUserWithEmailAndPassword = () => {
//     const auth = getAuth();
//     createUserWithEmailAndPassword(auth, user.email, user.password)
//     .then(() => {
//       const newUserInfo = {...user}
//       newUserInfo.error = ''
//       newUserInfo.success = true
//       setUser(newUserInfo)
//       updateUserInfo(user.name)
//    })
//    .catch((error) => {
//     const newUserInfo = {...user}
//       newUserInfo.success = false;
//       newUserInfo.error = error.code;
//       setUser(newUserInfo)
//     // console.log(error.code,error.message);
//     // ..
//    })
//  }
//  export const SignInWithEmailAndPassword = () => {
//     const auth = getAuth();
//     const email = user.email;
//     const password = user.password;
//     signInWithEmailAndPassword(auth, email, password)
//       .then(res => {
//           const newUserInfo = {...user}
//           newUserInfo.success = true;
//           setUser(newUserInfo);
//           setLogIn(newUserInfo);
//           history(from, { replace: true })
//           console.log(res.user);
//       })
//       .catch((error) => {
//         const newUserInfo = {...user}
//         newUserInfo.success = false;
//         newUserInfo.error = error.code;
//         setUser(newUserInfo)
//         console.log(error);
//       })
//  }
//  const updateUserInfo = (name) => {
//     const auth = getAuth();
//     updateProfile(auth.currentUser, {
//     displayName: name
//   })
//   .then(() => {
//     console.log('user name updated successfully');
//     }).catch((error) => {
//       console.log(error);
//   });
//   }