import React from "react";
import "./LoginStyle.css";
import logo from './logoW.png';

class LoginPage extends React.Component {
    // @ts-ignore
    constructor(props) {
        super(props);
        this.state = {
            users: [
                { email: "admin1@gmail.com", password: "admin1" },
                { email: "admin2@gmail.com", password: "admin2" },
                { email: "admin3@gmail.com", password: "admin3" }
            ],
            trueUsername: "",
            isSign: false
        };
        //this.new = this.props;
    }

    /*Control = () => {
        var newState = this.state.users.concat(this.new.newUser);
        if (this.new.newUser !== undefined) {
            this.setState({
                users: newState
            });
        }

        var email = document.getElementById("email");
        var password = document.getElementById("password");
        this.state.users.map(user => {
            if (
                user.email === email.value &&
                user.password === password.value
            ) {
                return this.setState({
                    welcomeConnect: true,
                    trueUsername: user.email
                });
            }
        });
    };*/


    render() {
        return (
            <div>
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>

                <div className="loginSquare">
                    <h1>Vitajte na GEFCO portály</h1>
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
            </div>
        );
    }
}

export default LoginPage;