import { Box, TextField, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { EmployeeData } from '../../types'
import EmployeeModal from '../components/EmployeeModal'
import EmployeeTableWrapper from '../components/EmployeeTableWrapper'
import { initialEmployee } from '../../constants'
import { addEmployee, fetchEmployees } from '../../helpers/requests'
import RemoveEmployeeModal from '../components/RemoveEmployeeModal'
import { RootState } from '../../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { setZamestnanci } from '../../features/zamestnanciSlice'

const EmployeeTab = () => {
  const zamestnanci = useSelector((state: RootState) => state.zamestnanci.value)
  const [nameInput, setNameInput] = useState<string>('')
  const [surnameInput, setSurnameInput] = useState<string>('')
  const [dataToShow, setDataToShow] = useState(zamestnanci)
  const [skolenieInput, setSkolenieInput] = useState<string>('')
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
    async function fetch() {
      dispatch(setZamestnanci(await fetchEmployees()))
    }
    fetch()
  }, [dispatch])

  const [columnsToShow, setColumnsToShow] = useState(columns)

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

  useEffect(() => {
    setColumnsToShow(
      columns.filter((col) => {
        return (
          col['id'] === 'meno' ||
          col['id'] === 'priezvisko' ||
          col['id'] === '' ||
          col['id'].toLowerCase().startsWith(skolenieInput)
        )
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skolenieInput, zamestnanci])

  const handleAddEmployee = (newEmployee: EmployeeData) => {
    addEmployee(newEmployee)
    fetchEmployees()
  }

  const handleEditEmployee = (data: any) => {
    setEditEmployeeData(data)
    setShowEditEmployeeModal(true)
  }

  const handleRemoveEmployee = (data: any) => {
    setRemoveEmployeeData(data)
    setShowRemoveEmployeeModal(true)
  }

  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'column'}
        style={{ width: 'fit-content' }}
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
          <TextField
            id="Skolenie"
            label="Skolenie"
            defaultValue=""
            onChange={(e) => setSkolenieInput(e.target.value.toLowerCase())}
          />
          <Button
            onClick={() => setShowAddEmployeeModal(true)}
            variant="contained"
          >
            Pridaj zamestnanca
          </Button>
        </Box>
        <EmployeeTableWrapper
          rows={dataToShow}
          columns={columnsToShow}
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
        handleSubmit={handleAddEmployee}
      />
      <RemoveEmployeeModal
        handleClose={() => {
          setShowRemoveEmployeeModal(false)
          setDataToShow(zamestnanci)
        }}
        open={showRemoveEmployeeModal}
        employee={removeEmployeeData}
      />
    </>
  )
}

export default EmployeeTab
