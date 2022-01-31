import React from 'react'
import { useState } from 'react'
import { RootState } from '../../app/store'
import './AccountManagementStyle.css'
import { pridajUzivatela, zmenHeslo } from '../../helpers/requests'
import { useSelector } from 'react-redux'
import MultiSelect from '../components/MultiSelect'
import { Button } from '@mui/material'

const AccountManagementTab = () => {
  const [password, setPassword] = useState<string>('')
  const [newpassword, setNewpassword] = useState<string>('')
  const [error1, setError1] = useState<string>('')
  const [error2, setError2] = useState<string>('')
  const [done1, setDone1] = useState<string>('')
  const [done2, setDone2] = useState<string>('')

  const isAdmin = useSelector((state: RootState) => state.loggin.isAdmin)

  const ob = useSelector((state: RootState) => state.oblasti.value)

  const handleSubmit = async () => {
    const zmenene = await zmenHeslo({ password, newpassword })
    if (zmenene) {
      setDone1('Heslo bolo úspešne zmenené')
    } else {
      setError1('Heslo nebolo zmenené')
    }
  }

  const [oblasti, setOblasti] = useState<string[]>([])
  const [email, setEmail] = useState<string>('')
  const [is_admin, setAdmin] = useState<boolean>(false)

  const handleSubmit2 = async () => {
    const oblastiId = oblasti.map(
      (s) => ob.find((o) => o.oblast === s)?.id || 1
    )
    const succes = await pridajUzivatela({
      email,
      is_admin,
      oblasti: oblastiId,
    })
    if (succes) {
      setDone2('Nový úžívateľ bol úspešne pridaný')
    } else {
      setError2('Nepodarilo sa pridať nového užívateľa')
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
            className="form-control2"
            placeholder="Zadajte staré heslo"
            onChange={(e) => {
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
          {isAdmin && (
            <div>
              <div className="verticalLine" />

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
                    data={oblasti}
                    setData={setOblasti}
                  />
                </div>
                <div>
                  <p>Admin</p>
                  <input
                    type={'radio'}
                    name="admin"
                    checked={is_admin}
                    onChange={(e) => {
                      setAdmin(true)
                    }}
                  />
                  <label>Áno</label>
                  <input
                    type={'radio'}
                    name="admin"
                    checked={!is_admin}
                    onChange={(e) => {
                      setAdmin(false)
                    }}
                  />
                  <label>Nie</label>
                </div>
                <Button
                  className="button2"
                  variant="contained"
                  onClick={() => handleSubmit2()}
                  disabled={(!is_admin && oblasti.length === 0) || email === ''}
                >
                  Pridať
                </Button>
                {error2 ? <div className="error">{error2}</div> : <></>}
                {done2 ? <div className="done">{done2}</div> : <></>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default AccountManagementTab
