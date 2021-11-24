import { initializeApp } from 'firebase/app';
import { GithubAuthProvider, FacebookAuthProvider, updateProfile, signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import { initializeAuthProvider } from './LoginManager';
import firebaseConfig from './firebaseConfig';
const app = initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: '',
    name: '',
    photo: '',
    password: '',
    email: '',
    error: '',
    success: ''
  });

  initializeAuthProvider();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const GoogleProvider = new GoogleAuthProvider();
  const FacebookProvider = new FacebookAuthProvider();
  const GithubProvider = new GithubAuthProvider();
  const handleGoogleSignIn = () => {
    const auth = getAuth(app);
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        const users = result.user;
        const { displayName, email, photoURL } = users;

        const isSignedIn = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(isSignedIn);
      });
  }

  const handleSignOut = () => {
    const auth = getAuth(app);
    signOut(auth).then(res => {

      const isSignOut = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(isSignOut);
      console.log(res);
    }).catch((error) => {
      // An error happened.
    });
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e.target.value);
    }
    if (e.target.name === "password") {
      isFieldValid = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(e.target.value);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }

  }
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          // const user = userCredential.user;
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });

    }
    if (!newUser && user.email && user.password) {
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          // Signed in 
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log("Sign in user info", res.user);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  }
  const updateUserName = name => {
    const auth = getAuth(app);
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      // Profile updated!
      console.log("User successfully update his profile")
    }).catch((error) => {
      console.log(error)
    });
  }

  const handleFacebook = () => {

    const auth = getAuth(app);
    signInWithPopup(auth, FacebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log("sign in with Facebook", user);
        setUser(user);
        setLoggedInUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log("error", errorCode, errorMessage, email, credential);
        // ...
      });
  }

  const handleGithubSignIn = () => {

    const auth = getAuth(app);
    signInWithPopup(auth, GithubProvider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("sign in", user);
        setUser(user);
        setLoggedInUser(user);

      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GithubAuthProvider.credentialFromError(error);
        console.log("error", errorCode, errorMessage, email, credential);
      });
  }

  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button>
          : <button onClick={handleGoogleSignIn}>Sign in</button>
      }
      <br />
      <button onClick={handleFacebook}>Sign in using Facebook</button>
      <br />
      <button onClick={handleGithubSignIn}>Sign in using Github</button>
      
      {
        user.isSignedIn && <div>
          <h1>Welcome To {user.name}</h1>
          <h3>Email : {user.email}</h3>
          <img src={user.photo} alt="" />
        </div>
      }
      
      <h1>Our Own Authentication</h1>
      <input type="checkbox" onClick={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign Up</label>

      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your name" required />}
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your email" required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your password" required />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>
      {
        user.error && <p style={{ color: 'red' }}>The email already used. Please try another email.</p>
      }
      {
        user.success && <p style={{ color: 'green' }}>User {newUser ? "Created" : "Logged In"} successfully</p>
      }
    </div>
  );
}

export default Login;
