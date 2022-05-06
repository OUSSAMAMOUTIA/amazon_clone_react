import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { auth } from "../../helpers/firebase.js";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

import "./Login.css";
function Login() {
    const navigate = useNavigate();
      const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((auth) => {
        // Signed in
        if (auth) {
            navigate("/");
        } // ...
      })
      .catch((error) => {
        alert(error.message);
        // ..
      });
  };
  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        // Signed in
        if (auth) {
            navigate("/");
        } // ...
      })
      .catch((error) => {
        alert(error.message);
        // ..
      });
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_image"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt=""
        />
      </Link>
      <div className="login_container">
        <h1>Sign In</h1>
        <form>
          <h5>Email</h5>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login_signInButton" onClick={signIn}>
            Sign In
          </button>
        </form>
        <p>
          By continuing, you agree to Amazon's
          <a
            href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=508088"
            style={{
              color: "#0066c0",
              textDecoration: "none",
              marginLeft: 5,
              marginRight: 5,
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Conditions of Use
          </a>
          and
          <a
            href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=468496"
            style={{ color: "#0066c0", textDecoration: "none", marginLeft: 5 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Notice.
          </a>
        </p>
        <button className="login_registerButton" onClick={register}>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}
export default Login;
