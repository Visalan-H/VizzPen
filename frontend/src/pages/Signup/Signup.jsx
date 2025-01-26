import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'


const Signup = () => {

    const nav = useNavigate();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const handleSave = () => {
        if (!name || !email || !pass) return;
        axios.post(`${import.meta.env.VITE_BASE_URL}/user/signup`,
            { name, email, password:pass },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })
            .then(() => nav('/'))
            .catch((err) => console.log(err))
    }

    return (
        <div className='main_signup'>
            <h1>Signup</h1>
            <div className="form">
                <div className="spacer" style={{ width: "100%", height: "1px" }}></div>
                <div className="labelin">
                    <label htmlFor="name">UserName:</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" id='name' placeholder='Name' required />
                </div>
                <div className="labelin">
                    <label htmlFor="mail">Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id='mail' placeholder='Email' required />
                </div>
                <div className="labelin">
                    <label htmlFor="pass">Password: <span id='helper'>(Must be 6 characters atleast)</span></label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder='Password' id='pass' min={6} required />
                </div>
               <div className='buttonandlink'>
                 <button onClick={handleSave} type='submit'>Submit</button>
                 <Link to={'/login'}>Existing User?</Link>
               </div>
            </div>
        </div>
    )
}

export default Signup