import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from "react-router-dom"

export default function Login({ isAuthenticated, setToken }) {
  // console.log(props)
  const [formData, setFormData] = React.useState({
    email: "",
    password: ""
  })


  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = React.useState('');
  // const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const submitForm = new FormData()
    submitForm.append('email', formData.email)
    submitForm.append('password', formData.password)
    const user = {};
    submitForm.forEach((value, key) => {
      user[key] = value;
    });
    const requestBody = { user };
    const requestBodyJSON = JSON.stringify(requestBody);
    let token = document.querySelector('meta[name="csrf-token"]').content;
    axios.post('/login',
      requestBodyJSON, {
      headers: {
        "Content-Type": "application/json",
        'X-Requested-With': 'XMLHttpRequest'
        // 'X-CSRF-Token': token
      }
    })
      .then((res) => {
        if (res.data.message === 'Logged in successfully.') {
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
          navigate('/')
        } else {
          setErrorMessage('Incorrect email or password.')
        }
      })
      .catch((err) => {
        setErrorMessage('Incorrect email or password.')
      })


  }

  return (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent w-100">
        <div className="container secondary-color">
          <h1>Login Form</h1>
          <form onSubmit={handleSubmit} >
            <div className='mt-4'>
              <label htmlFor="description" className="form-label fw-semibold">Email</label>
              <input
                type="text"
                placeholder="email"
                onChange={handleChange}
                name="email"
                value={formData.email}
                className='form-control'
              />
            </div>
            <div className='mt-4'>
              <label htmlFor="description" className="form-label fw-semibold">Password</label>
              <input
                type="password"
                placeholder="password"
                onChange={handleChange}
                name="password"
                value={formData.password}
                className='form-control'
              />
            </div>
            <button className="btn btn-lg custom-button w-100 mt-3"
              role="button"
            >Login
            </button>
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
          </form>
        </div>
      </div>
    </div>
  )
}
