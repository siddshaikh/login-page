import React, { useState } from "react";
import "./login.css";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const postData = async () => {
    let data = { name: email, password: password };
    try {
      await axios.post(
        "http://94.23.80.228:8000/pos/login/",
        { name: data.name, password: data.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!isEmailValid(newEmail)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = () => {
    if (!isEmailValid(email)) {
      alert("Please provide a valid email address.");
    } else {
      alert(`Congratulations ${email}! You have successfully logged in.`);
      postData();
      setEmail("");
      setPassword("");
      setEmailError("");
    }
  };

  return (
    <div className="main__container">
      {/* image section */}
      <div className="first">
        <img
          src={`${process.env.PUBLIC_URL}/assets/bg.png`}
          alt="bg"
          className="bg__img"
          loading="lazy"
        />
      </div>
      {/* signin section */}
      <div className="second">
        <div>
          <h1>Sign In</h1>
          <p>Sign in to continue our application.</p>
          <div className="input_container">
            <span>
              <input
                type="email"
                placeholder="Email"
                className="input__box"
                value={email}
                required
                onChange={handleEmailChange}
              />
              <AiOutlineMail className="icon__box" />
            </span>
            {emailError && <p className="error">{emailError}</p>}
          </div>
          <div className="input_container">
            <span>
              <input
                type="password"
                placeholder="Password"
                className="input__box"
                value={password}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />{" "}
              <AiOutlineLock className="icon__box" />
            </span>
          </div>
          <p className="left">I can't remember my password</p>
          <button className="btn" onClick={handleSubmit}>
            Sign in <BsArrowRight />
          </button>
          <p className="last__p">Not a member? Sign up.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
