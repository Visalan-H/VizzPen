import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'

const Login = () => {

  const nav = useNavigate();
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const handleSave = (e) => {
    e.preventDefault();
    if (!email || !pass) return;
    axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,
      { email, password: pass },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(() => nav('/'))
  }

  return (
    <div className='main_signup login'>
      <h1>Login</h1>
      <form onSubmit={handleSave} className="form">
        <div className="spacer" style={{ width: "100%", height: "1px" }}></div>
        <div className="labelin">
          <label htmlFor="mail">Email:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id='mail' placeholder='Email' required />
        </div>
        <div className="labelin">
          <label htmlFor="pass">Password:</label>
          <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder='Password' id='pass' min={6} required />
        </div>
        <div className='buttonandlink'>
          <button type='submit'>Submit</button>
          <Link to={'/signup'}>New User?</Link>
        </div>
      </form>
    </div>
  )
}

export default Login