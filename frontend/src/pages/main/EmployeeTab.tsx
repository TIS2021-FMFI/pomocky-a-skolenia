import { Box, TextField, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { EmployeeData } from '../../types'
import EmployeeModal from '../components/EmployeeModal'
import EmployeeTableWrapper from '../components/EmployeeTableWrapper'
import { initialEmployee } from '../../constants'
import {
  addEmployee,
  editEmployee,
  fetchEmployees,
  removeEmployee,
} from '../../helpers/requests'
import RemoveEmployeeModal from '../components/RemoveEmployeeModal'
import { RootState } from '../../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { setZamestnanci } from '../../features/zamestnanciSlice'
import { exportAsCsv } from '../../helpers/exportAsCSV'

const EmployeeTab = () => {
  const zamestnanci = useSelector((state: RootState) => state.zamestnanci.value)
  const [nameInput, setNameInput] = useState<string>('')
  const [surnameInput, setSurnameInput] = useState<string>('')
  const [dataToShow, setDataToShow] = useState(zamestnanci)
  const [showAddEmployeeModal, setShowAddEmployeeModal] =
    useState<boolean>(false)
  const [showEditEmployeeModal, setShowEditEmployeeModal] =
    useState<boolean>(false)
  const [editEmployeeData, setEditEmployeeData] =
    useState<EmployeeData>(initialEmployee)
  const [showRemoveEmployeeModal, setShowRemoveEmployeeModal] =
    useState<boolean>(false)
  const [removeEmployeeData, setRemoveEmployeeData] = useState<any>({})

  const dispatch = useDispatch()

  const columns = Object.keys(zamestnanci.length > 0 ? zamestnanci[0] : []).map(
    (k) => {
      return k === 'id'
        ? {
            id: '',
            label: '',
            minWidth: 120,
            format: null,
          }
        : {
            id: k,
            label: k,
            minWidth: 120,
            format: null,
          }
    }
  )

  useEffect(() => {
    setDataToShow(
      zamestnanci.filter((row: any) => {
        return (
          row['meno'].toLowerCase().startsWith(nameInput) &&
          row['priezvisko'].toLowerCase().startsWith(surnameInput)
        )
      })
    )
  }, [nameInput, surnameInput, zamestnanci])

  const handleAddEmployee = async (newEmployee: EmployeeData) => {
    const res = addEmployee(newEmployee)
    if (await res) dispatch(setZamestnanci(await fetchEmployees()))
  }

  const handleEditEmployee = (data: any) => {
    setEditEmployeeData(data)
    setShowEditEmployeeModal(true)
  }

  const handleRemoveEmployee = (data: any) => {
    setRemoveEmployeeData(data)
    setShowRemoveEmployeeModal(true)
  }

  const removeEmp = async (id: number) => {
    const res = await removeEmployee(id)
    if (res) dispatch(setZamestnanci(await fetchEmployees()))
  }

  const editEmp = async (employee: EmployeeData) => {
    const res = await editEmployee(employee)
    if (res) dispatch(setZamestnanci(await fetchEmployees()))
  }

  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'column'}
        style={{ width: '100hw', height: '100vh' }}
      >
        <Box display={'flex'} flexDirection={'row'}>
          <TextField
            id="Meno"
            label="Meno"
            defaultValue=""
            onChange={(e) => setNameInput(e.target.value.toLowerCase())}
          />
          <TextField
            id="Priezvisko"
            label="Priezvisko"
            defaultValue=""
            onChange={(e) => setSurnameInput(e.target.value.toLowerCase())}
          />
          <Button
            onClick={() => setShowAddEmployeeModal(true)}
            variant="contained"
          >
            Pridaj zamestnanca
          </Button>
          <Button
            onClick={() => exportAsCsv(columns, dataToShow)}
            variant="contained"
          >
            Exportovať dáta
          </Button>
        </Box>
        <EmployeeTableWrapper
          rows={dataToShow}
          columns={columns}
          handleEditEmployee={handleEditEmployee}
          handleRemoveEmployee={handleRemoveEmployee}
        />
      </Box>
      <EmployeeModal
        open={showAddEmployeeModal}
        handleClose={() => setShowAddEmployeeModal(false)}
        handleSubmit={handleAddEmployee}
      />
      <EmployeeModal
        open={showEditEmployeeModal}
        handleClose={() => setShowEditEmployeeModal(false)}
        initialData={editEmployeeData}
        handleSubmit={editEmp}
      />
      <RemoveEmployeeModal
        handleClose={() => {
          setShowRemoveEmployeeModal(false)
        }}
        open={showRemoveEmployeeModal}
        employee={removeEmployeeData}
        handleSubmit={removeEmp}
      />
    </>
  )
}

export default EmployeeTab
