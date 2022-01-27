import {
    CourseBeforeExpire,
    EmployeeData,
    Oblast,
    SkoleniaZamestnanca,
    Skolenie,
    PasswordChange,
    AddUser,
    Login,
} from '../types'

let TESTING_TOKEN =''
export const fetchEmployees = async (): Promise<EmployeeData[]> => {
  return fetch('/zamestnanci', {
    method: 'get',
    headers: {
      'x-access-token': TESTING_TOKEN,
      Accept: 'application/json',
    },
  })
    .then((res) => res.json())
    .then(
      (result) => {
        return result
      },
      (error) => {
        console.log(error)
        return []
      }
    )
}

export const fetchRegions = async (): Promise<Oblast[]> => {
  return fetch('/oblasti', {
    method: 'get',
    headers: {
      'x-access-token': TESTING_TOKEN,
      Accept: 'application/json',
    },
  })
    .then((res) => res.json())
    .then(
      (result) => {
        return result
      },
      (error) => {
        console.log(error)
        return []
      }
    )
}

export const addEmployee = async (employee: EmployeeData): Promise<boolean> => {
  return fetch('/pridajzamestnanca', {
    method: 'post',
    headers: {
      'x-access-token': TESTING_TOKEN,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        return true
      },
      (error) => {
        console.log(error)
        return false
      }
    )
}

export const removeEmployee = async (id: number): Promise<boolean> => {
  return fetch('/zmazzamestnanca', {
    method: 'delete',
    headers: {
      'x-access-token': TESTING_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then(
      (_) => {
        return true
      },
      (error) => {
        console.log(error)
        return false
      }
    )
}

export const fetchSkolenia = (): Promise<Skolenie[]> => {
  return fetch('/skolenia', {
    method: 'get',
    headers: {
      'x-access-token': TESTING_TOKEN,
      Accept: 'application/json',
    },
  })
    .then((res) => res.json())
    .then(
      (result) => {
        return result
      },
      (error) => {
        return []
      }
    )
}

export const fetchSkoleniaZamestnancov = (): Promise<SkoleniaZamestnanca[]> => {
  return fetch('/vsetkyskolenia', {
    method: 'get',
    headers: {
      'x-access-token': TESTING_TOKEN,
      Accept: 'application/json',
    },
  })
    .then((res) => res.json())
    .then(
      (result) => {
        return result
      },
      (error) => {
        return []
      }
    )
}

export const upravSkolenie = async (skolenie: Skolenie): Promise<boolean> => {
  return fetch('upravskolenie', {
    method: 'put',
    headers: {
      'x-access-token': TESTING_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(skolenie),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        return true
      },
      (error) => {
        console.log(error)
        return false
      }
    )
}

export const pridajSkolenie = async (skolenie: Skolenie): Promise<boolean> => {
  return fetch('/pridajskolenie', {
    method: 'post',
    headers: {
      'x-access-token': TESTING_TOKEN,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(skolenie),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        return true
      },
      (error) => {
        console.log(error)
        return false
      }
    )
}

export const fetchKonciaceSkolenia = async (): Promise<
  CourseBeforeExpire[]
> => {
  return fetch('/konciaceskolenia', {
    method: 'get',
    headers: {
      'x-access-token': TESTING_TOKEN,
      Accept: 'application/json',
    },
  })
    .then((res) => res.json())
    .then(
      (result) => {
        console.log(result)

        // result = result.slice(0, 20)
        return result
        // return result.map((o: any) => ({
        //   meno: o.meno,
        //   priezvisko: o.priezvisko,
        //   kod_skolenia: o.kod_skolenia,
        //   dlzka_platnosti: o.dlzka_platnosti,
        //   datum_absolvovania: o.datum_absolvovania,
        //   koniec_platnosti: o.koniec_platnosti,
        //   oblast: o.oblast,
        // }))
      },
      (error) => {
        return []
      }
    )
}

export const editEmployee = async (
  employee: EmployeeData
): Promise<boolean> => {
  return fetch('/upravzamestnanca', {
    method: 'put',
    headers: {
      'x-access-token': TESTING_TOKEN,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        return true
      },
      (error) => {
        console.log(error)
        return false
      }
    )
}

export const pridajSkoleniaZamestnancom = async (
  data: any
): Promise<boolean> => {
  return fetch('/pridajskoleniezamestnancom', {
    method: 'post',
    headers: {
      'x-access-token': TESTING_TOKEN,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(
      (_) => {
        return true
      },
      (error) => {
        console.log(error)
        return false
      }
    )
}

 export const zmenHeslo = async (heslo: PasswordChange): Promise<boolean> => {
     return fetch('/upravheslo', {
         method: 'put',
         headers: {
            'x-access-token': TESTING_TOKEN,
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(heslo),
     })
         .then((res) => res.json())
         .then(
             (result) => {
                 return true
             },
             (error) => {
                 console.log(error)
                 return false
             }
         )
}

export const pridajUzivatela = async (uzivatel: AddUser): Promise<boolean> => {
    return fetch('/register', {
        method: 'post',
        headers: {
            'x-access-token': TESTING_TOKEN,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(uzivatel),
    })
        .then((res) => res.json())
        .then(
            (result) => {
                return true
            },
            (error) => {
                console.log(error)
                return false
            }
        )
}

export const login = async (data: Login): Promise<any> => {
    return fetch('/login', {
        method: 'post',
        headers: {
            'x-access-token': TESTING_TOKEN,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then(
            (result) => {
                TESTING_TOKEN = result.token
                if(result.message === 'Invalid Credentials'){
                    return null
                }
                console.log('Result:',result)
                return result
            },
            (error) => {
                console.log('Error:',error)
                return null
            }
        )
}