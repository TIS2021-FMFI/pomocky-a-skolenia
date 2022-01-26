import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./LoginStyle.css";


//const [errorMessages, setErrorMessages] = useState({});
//const [isSubmitted, setIsSubmitted] = useState(false);

// User Login info
const database = [
    {
        email: "admin@gmail.com",
        password: "admin"
    },
];

const errors = {
    email: "invalid email",
    pass: "invalid password"
};

class LoginPage extends React.Component {



/*
    const handleSubmit = (event) => {
        event.preventDefault();
        var { email, pass } = document.forms[0];

        // Find user login info
        const userData = database.find((user) => user.email === email.value);

        // Compare user info
        if (userData) {
            if (userData.password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setIsSubmitted(true);
            }
        } else {
            // Username not found
            setErrorMessages({ name: "email", message: errors.email });
        }
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

 */

    render() {
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
                        />
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Zadajte svoje heslo"
                        />
                        <button className="login-btn" onClick={undefined}>
                            Prihlásiť
                        </button>
                    </div>
                </div>
        );
    }
}

export default LoginPage;