import React from "react";
import { useState } from 'react'
import { RootState } from '../../app/store'
import "./AccountManagementStyle.css";
import {pridajUzivatela, zmenHeslo,} from '../../helpers/requests'
import {useDispatch, useSelector} from 'react-redux'
import MultiSelect from "../components/MultiSelect";
import {setIsAdmin} from "../../features/loginSlice";


const AccountManagementTab = () => {
    const [password, setPassword] = useState<string>('')
    const [newpassword, setNewpassword] = useState<string>('')
    const [error1, setError1] = useState<string>('')
    const [error2, setError2] = useState<string>('')
    const [done1, setDone1] = useState<string>('')
    const [done2, setDone2] = useState<string>('')
    const dispatch = useDispatch()


    const isAdmin = useSelector((state: RootState) => state.loggin.isAdmin)

    const handleSubmit = async ()=> {
        const zmenene = await zmenHeslo({password, newpassword})
        if(zmenene){
            console.log('Heslo bolo úspešne zmenené')
            dispatch(setDone1('Heslo bolo úspešne zmenené'))
        }else{
            dispatch(setError1('Heslo nebolo zmenené'))
        }
    }

    const [regionsToShow, setRegionsToShow] = useState<string[]>([])
    const oblast = useSelector((state: RootState) => state.oblasti.value)
    const [oblasti, setOblasti] = useState<string[]>([])
    const [email, setEmail] = useState<string>("")
    const [is_admin, setAdmin] = useState<boolean>(false)

    const handleSubmit2 = async () => {
        console.log(email)
        const succes = await pridajUzivatela({email, is_admin,  oblasti}) //oblasti string[]
        if (succes ) {
            dispatch(setDone2('Nový úžívateľ bol úspešne pridaný'))
        } else {
            dispatch(setError2('Nepodarilo sa pridať nového užívateľa'))
        }
    }
    return (
        <div>
            <div className="AccountSquare">
                <div className="accountForm">
                    <h1>Zmena hesla</h1>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Zadajte staré heslo"
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    />
                    <input
                        type="password"
                        id="newpassword"
                        className="form-control2"
                        placeholder="Zadajte nové heslo"
                        onChange={(e) => {
                            setNewpassword(e.target.value)
                        }}
                    />
                    <button className="account-btn" onClick={() => handleSubmit()}>
                        Zmeniť
                    </button>
                    {error1 ? <div className="error">{error1}</div> : <></>}
                    {done1 ? <div className="done">{done1}</div> : <></>}
                </div>
                <div>
                <div className="verticalLine"/>

                <div className="accountForm2">
                    <h1>Pridanie užívateľa</h1>
                    <div>
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
                    </div>
                    <div>
                        <p id="multi">Oblasť</p>
                        <MultiSelect
                            name="Oblasti"
                            data={regionsToShow}
                            setData={setRegionsToShow}
                        />
                    </div>
                    <div>
                        <p>Admin</p>
                        <input type={"radio"} name="admin"
                               onChange={(e) => {
                               setIsAdmin(true)
                               }}/>
                        <label>Áno</label>
                        <input type={"radio"} name="admin"
                               onChange={(e) => {
                                setIsAdmin(false)
                        }}/>
                        <label>Nie</label>
                    </div>
                    <button type="submit" className="account-btn" onClick={() =>handleSubmit2()}>
                        Pridať
                    </button>
                    {error2 ? <div className="error">{error2}</div> : <></>}
                    {done2 ? <div className="done">{done2}</div> : <></>}
                </div>
            </div>
                </div>
        </div>
    )
}
export default AccountManagementTab