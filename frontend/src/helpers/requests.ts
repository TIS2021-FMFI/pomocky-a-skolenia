import { EmployeeData, Oblast, SkoleniaZamestnanca, Skolenie } from '../types'

export const fetchEmployees = async (): Promise<EmployeeData[]> => {
  return fetch('/zamestnanci', {
    method: 'get',
    headers: {
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

export const addEmployee = (employee: EmployeeData) => {
  fetch('/pridajzamestnanca', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  })
    .then((res) => res.json())
    .then(
      (result) => {},
      (error) => {
        console.log(error)
      }
    )
}

export const removeEmployee = async (id: number) => {
  await fetch('/zmazzamestnanca', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then(
      (_) => {},
      (error) => {
        console.log(error)
      }
    )
}

export const fetchSkolenia = (): Promise<Skolenie[]> => {
  return fetch('/skolenia', {
    method: 'get',
    headers: {
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
      Accept: 'application/json',
    },
  })
    .then((res) => res.json())
    .then(
      (result) => {
        console.log(result)

        return result
      },
      (error) => {
        return []
      }
    )
}

export const upravSkolenie = (skolenie: Skolenie) => {
  fetch('upravskolenie', {
    method: 'put',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(skolenie),
  })
    .then((res) => res.json())
    .then(
      (result) => {},
      (error) => {
        console.log(error)
      }
    )
}

export const pridajSkolenie = (skolenie: Skolenie) => {
  fetch('/pridajskolenie', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(skolenie),
  })
    .then((res) => res.json())
    .then(
      (result) => {},
      (error) => {
        console.log(error)
      }
    )
}
