import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  return (
    <div className="login-modal-container">
      <div className="login-upper-container"><img src='https://opentables.s3.us-west-1.amazonaws.com/onetableicon.png' /><h2>Open Tables</h2></div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li style={{color:"red"}} key={idx}>{error}</li>
          ))}
        </ul>
        <div style={{textAlign:"center", fontWeight:"bold"}}>Log in to your account</div>
        <div className="login-lower-container">
          <label>
            <div>Email</div>
            <input
              style={{width:"92%", height:"25px", padding:"10px"}}
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <div>Password</div>
            <input
              placeholder="Password"
              style={{width:"92%",  height:"25px", padding:"10px"}}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
