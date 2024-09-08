import React, { useContext, useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import validate from '../../validation.jsx';
import { FirebaseContext } from '../../firebase/firebaseContext.jsx'
import { useNavigate } from 'react-router-dom';


export default function Signup() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState({ name: "", email: "", phone: "", password: "" })
  const Navigate = useNavigate();


  const { addDocument } = useContext(FirebaseContext)

  const submitSignup = async (e) => {
    e.preventDefault();
    const data = { name, email, phone, password };

    if (validate({ ...data, from: "SIGNUP", setError })) {
      await addDocument(data)
      Navigate('/login')
    }
  };

  return (
    <div className='row'>

      <div className="mx-auto mt-5 signupParentDiv">
        <center>
          <img width="200px" height="170px" src={Logo} alt='' />

          <form onSubmit={submitSignup}>
            <div className="formDiv">
              {error.name && <p className='errorShow'>{error.name}</p>}
              <input onChange={(e) => { setName(e.target.value); setError((prev) => ({ ...prev, name: "" })) }}
                className="form-control"
                type="text"
                name="name"
                placeholder='Enter the Name'
              />
              <br />
              {error.email && <p className='errorShow'>{error.email}</p>}
              <input onChange={(e) => { setEmail(e.target.value); setError((prev) => ({ ...prev, email: "" })) }}
                className="form-control"
                type="email"
                id="fname"
                name="email"
                placeholder="Enter the Email"
              />
              <br />
              {error.phone && <p className='errorShow'>{error.phone}</p>}

              <input onChange={(e) => { setPhone(e.target.value); setError((prev) => ({ ...prev, phone: "" })) }}
                className="form-control"
                type="number"
                id="lname"
                name="phone"
                placeholder="Enter the Phone Number"
              />
              <br />
              {error.password && <p className='errorShow'>{error.password}</p>}

              <input onChange={(e) => { setPassword(e.target.value); setError((prev) => ({ ...prev, password: "" })) }}
                className="form-control"
                type="password"
                id="lname"
                name="password"
                placeholder="Enter the password"
              /> <br />
              <a href="/login">Already have an account ? Login</a>
              <br />
            </div>
            <button type='submit' className='signupButton' >Signup</button>
          </form>
        </center>
      </div>

    </div>
  );
}
