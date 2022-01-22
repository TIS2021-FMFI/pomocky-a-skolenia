
import React from "react";
import "./AccountManagementStyle.css";
import "../login/LoginStyle.css";

class AccountManagementTab extends React.Component {

    render() {
        return (
            <div>

                <div className="AccountSquare">
                    <div className="accountForm">
                        <h2>Zmena hesla</h2>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Zadajte heslo"
                        />
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Zadajte nové heslo"
                        />
                        <button className="login-btn" onClick={undefined}>
                            Zmeniť
                        </button>
                    </div>
                    <div className="verticalLine"/>

                    <div className="accountForm2">
                        <h2>Pridanie priameho nadriadeného</h2>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Zadajte mail nadriadeného"
                        />
                        <p>Vyberte oblasti</p>
                        <button className="login-btn" onClick={undefined}>
                            Pridať
                        </button>
                    </div>

                </div>
            </div>
        );
    }
}

export default AccountManagementTab;