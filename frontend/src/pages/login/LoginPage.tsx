import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoggedIn } from '../../features/loginSlice'
import './LoginStyle.css'

//const [errorMessages, setErrorMessages] = useState({});
//const [isSubmitted, setIsSubmitted] = useState(false);

// User Login info

const LoginPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('dada')

  const dispatch = useDispatch()

  const handleSubmit = () => {
    console.log('submit')

    const x = true
    if (x) dispatch(setLoggedIn(true))
  }

  console.log(email)

  return (
    <div className="MainImage">
      <div className="loginForm">
        <h2>Prihlásenie</h2>
        <input
          type="email"
          id="email"
          className="form-control"
          placeholder="Zadajte svoj email"
          autoComplete="false"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <input
          type="password"
          id="password"
          className="form-control"
          placeholder="Zadajte svoje heslo"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <button className="login-btn" onClick={handleSubmit}>
          Prihlásiť
        </button>
        {error ? <div>{error}</div> : <></>}
      </div>
    </div>
  )
}

export default LoginPage
