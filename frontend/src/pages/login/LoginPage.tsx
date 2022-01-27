import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoggedIn, setIsAdmin} from '../../features/loginSlice'
import { login } from '../../helpers/requests'
import './LoginStyle.css'

const LoginPage = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const dispatch = useDispatch()

    const handleSubmit = async () => {
        console.log('submit')
        const successfullyLoggedIn = await login({email, password});
        if(successfullyLoggedIn === null){
            setError('Nesprávne meno alebo heslo!')
            console.log('Nesprávne meno alebo heslo!')
        }else{
            dispatch(setIsAdmin(successfullyLoggedIn.isAdmin))
            dispatch(setLoggedIn(true))
        }
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
                <button className="login-btn" onClick={() => handleSubmit()}>
                    Prihlásiť
                </button>
                {error ? <div className="loginError">{error}</div> : <></>}

            </div>
        </div>
    )
}

export default LoginPage;
