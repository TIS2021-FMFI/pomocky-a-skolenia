import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoggedIn, setIsAdmin } from '../../features/loginSlice'
import { login } from '../../helpers/requests'
import './LoginStyle.css'
import logo from './logo-white.png'

const LoginPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    const successfullyLoggedIn = await login({ email, password })
    if (successfullyLoggedIn === null) {
      setError('Nesprávne meno alebo heslo!')
    } else {
      dispatch(setIsAdmin(successfullyLoggedIn.isAdmin))
      dispatch(setLoggedIn(true))
    }
  }

  return (
    <div className="MainImage">
      <div className="logo"><img src={logo} alt="Logo"/></div>
      <div className="loginForm">
        <h2>Prihlásenie</h2>

        <input
          type="email"
          id="email"
          className="form-control"
          placeholder="Zadajte svoj email"
          autoComplete="false"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <input
          type="password"
          id="password"
          className="form-control"
          placeholder="Zadajte svoje heslo"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <button disabled={!email || !password} className="login-btn" onClick={() => handleSubmit()}>
          Prihlásiť
        </button>
        {error ? <div className="loginError">{error}</div> : <></>}
      </div>
    </div>
  )
}

export default LoginPage
