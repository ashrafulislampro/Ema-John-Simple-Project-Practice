import { initializeApp } from 'firebase/app';
import { GithubAuthProvider, FacebookAuthProvider, updateProfile, signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from './firebaseConfig';
let app;
export const initializeAuthProvider = () =>{
      app = initializeApp(firebaseConfig);
}
// const app = initializeApp(firebaseConfig);

export const handleGoogleSignIn = () => {
          const GoogleProvider = new GoogleAuthProvider();
          const auth = getAuth(app);
          signInWithPopup(auth, GoogleProvider)
            .then((result) => {
              const users = result.user;
              const { displayName, email, photoURL } = users;
              const isSignedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
              }
              return isSignedInUser;
            })
            .catch(err => {
                      console.log(err);
                      console.log(err.message);
            })
        }


   export const handleFacebookSignIn = () => {
          const FacebookProvider = new FacebookAuthProvider();
          const auth = getAuth(app);
          signInWithPopup(auth, FacebookProvider)
            .then((result) => {
              const user = result.user;
              console.log("sign in with Facebook", user);
              return user;
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              const email = error.email;
              const credential = FacebookAuthProvider.credentialFromError(error);
              console.log("error", errorCode, errorMessage, email, credential);
             
            });
        }

   export const handleGithubSignIn = () => {
          const GithubProvider = new GithubAuthProvider();
          const auth = getAuth(app);
          signInWithPopup(auth, GithubProvider)
            .then((result) => {
              const credential = GithubAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;
              const user = result.user;
              console.log("sign in", user);
              return user;
      
            }).catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              const email = error.email;
              const credential = GithubAuthProvider.credentialFromError(error);
              console.log("error", errorCode, errorMessage, email, credential);
            });
        }


   export const handleSignOut = () => {
          const auth = getAuth(app);
          signOut(auth).then(res => {
      
            const isSignOutUser = {
              isSignedIn: false,
              name: '',
              email: '',
              photo: '',
          //     error : '',
          //     success: false
            }
            return isSignOutUser;
          }).catch((error) => {
            // An error happened.
          });
        }

//         export const createUserWithEmailAndPassword = () => {
//           const auth = getAuth(app);
//           createUserWithEmailAndPassword(auth, user.email, user.password)
//             .then( result => {
//               const newUserInfo = { ...user };
//               newUserInfo.error = "";
//               newUserInfo.success = true;
//               setUser(newUserInfo);
//               updateUserName(user.name);
//             })
//             .catch((error) => {
//               const newUserInfo = { ...user };
//               newUserInfo.error = error.message;
//               newUserInfo.success = false;
//               setUser(newUserInfo);
//             });
//         }

//         export const signInWithEmailAndPassword = () => {
//           const auth = getAuth(app);
//           signInWithEmailAndPassword(auth, user.email, user.password)
//             .then((res) => {
//               // Signed in 
//               const newUserInfo = { ...user };
//               newUserInfo.error = "";
//               newUserInfo.success = true;
//               setUser(newUserInfo);
//               setLoggedInUser(newUserInfo);
//               history.replace(from);
//               console.log("Sign in user info", res.user);
//             })
//             .catch((error) => {
//               const newUserInfo = { ...user };
//               newUserInfo.error = error.message;
//               newUserInfo.success = false;
//               setUser(newUserInfo);
//             });
//         }



//         const updateUserName = name => {
//           const auth = getAuth(app);
//           updateProfile(auth.currentUser, {
//             displayName: name
//           }).then(() => {
//             // Profile updated!
//             console.log("User successfully update his profile")
//           }).catch((error) => {
//             console.log(error)
//           });
//         }