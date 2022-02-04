import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoggedIn, setIsAdmin } from '../../features/loginSlice'
import { login, resetPasswd } from '../../helpers/requests'
import './LoginStyle.css'
import logo from './logo-white.png'

const LoginPage = () => {
  const [email, setEmail] = useState<string>('')
  const [email2, setEmail2] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [done, setDone] = useState<string>('')
  const dispatch = useDispatch()

  const [isVisible, setIsVisible] = useState(true)

  const handleSubmit = async () => {
    const successfullyLoggedIn = await login({ email, password })
    if (successfullyLoggedIn === null) {
      setError('Nesprávny email alebo heslo!')
    } else {
      dispatch(setIsAdmin(successfullyLoggedIn.isAdmin))
      dispatch(setLoggedIn(true))
    }
  }

  const resetPass = async () => {
    const change = await resetPasswd(email)
    if (change) {
      setDone('Nové heslo bolo zaslané na email')
    } else {
      setError('Zadaný email neexistuje!')
    }
  }


  return (
    <div className="MainImage">
      <div className="logo"><img src={logo} alt="Logo"/></div>

      <div className="loginForm" style={{ visibility: isVisible ? "visible" : "hidden" }}>
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

        <button disabled={!email || !password} onClick={() => handleSubmit()} className="login-btn" >
          Prihlásiť
        </button>

        <button className="forgot-password-btn" onClick={() => setIsVisible(false)}>
          Zabudnuté  heslo?
        </button>
        {error ? <div className="loginError">{error}</div> : <></>}
      </div>


      <div className="loginForm2" style={{ visibility: isVisible ? "hidden" : "visible" }}>
        <h2>Zabudnuté heslo</h2>
        <input
            type="email"
            id="email2"
            className="form-control"
            placeholder="Zadajte svoj email"
            autoComplete="false"
            value={email2}
            onChange={(e) => {
              setEmail2(e.target.value)
            }}
        />

        <button onClick={() => resetPass()} disabled={!email2} className="login-btn">
          Odoslať
        </button>

        <button  style={{ width:'200px' }} className="forgot-password-btn" onClick={() => setIsVisible(true)}>
          Späť na Prihlásenie
        </button>
        {error ? <div className="loginError">{error}</div> : <></>}
        {done ? <div className="loginError">{done}</div> : <></>}
      </div>

    </div>
  )
}

export default LoginPage
