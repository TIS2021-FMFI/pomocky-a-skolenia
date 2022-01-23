import { Box, Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { RootState } from '../../app/store'
import CoursesTableWrapper from '../components/CoursesTableWrapper'
import PridajSkolenieZamestnancoviModal from '../components/PridajSkolenieZamestnancoviModal'
import SkolenieModal from '../components/SkolenieModal'
import UpravSkolenieModal from '../components/UpravSkolenieModal'
import { useSelector, useDispatch } from 'react-redux'
import { SkoleniaZamestnanca, Skolenie } from '../../types'
import {
  fetchSkolenia,
  fetchSkoleniaZamestnancov,
  pridajSkoleniaZamestnancom,
  pridajSkolenie,
  upravSkolenie,
} from '../../helpers/requests'
import { setSkoleniaZamestnancov } from '../../features/skoleniaZamestnancovSlice'
import { setSkolenia } from '../../features/skoleniaSlice'
import { exportAsCsv } from '../../helpers/exportAsCSV'

const CoursesTab = () => {
  const { skoleniaZamestnancov, skolenia } = useSelector(
    (state: RootState) => ({
      skoleniaZamestnancov: state.skoleniaZamestnancov.value,
      skolenia: state.skolenia.value,
    })
  )

  const dispatch = useDispatch()

  const [dataToShow, setDataToShow] =
    useState<SkoleniaZamestnanca[]>(skoleniaZamestnancov)

  const [nameInput, setNameInput] = useState<string>('')
  const [surnameInput, setSurnameInput] = useState<string>('')
  const [skolenieInput, setSkolenieInput] = useState<string>('')
  const [showAddSkolenieModal, setShowAddSkolenieModal] =
    useState<boolean>(false)
  const [showUpravSkolenieModal, setShowUpravSkolenieModal] =
    useState<boolean>(false)

  const [showPridajSkolenieZamestnancovi, setShowPridajSkolenieZamestnancovi] =
    useState<boolean>(false)

  const columns = [
    {
      id: 'meno',
      label: '',
      minWidth: 120,
      format: null,
    },
    {
      id: 'priezvisko',
      label: '',
      minWidth: 120,
      format: null,
    },
    {
      id: 'oblast',
      label: '',
      minWidth: 120,
      format: null,
    },
    ...skolenia.map((k) => {
      console.log(skolenia)

      return {
        id: k.kod_skolenia,
        label: k.nazov,
        minWidth: 120,
        format: null,
      }
    }),
  ]

  const [columnsToShow, setColumnsToShow] = useState(columns)

  useEffect(() => {
    setDataToShow(
      skoleniaZamestnancov.filter((row: any) => {
        return (
          row['meno'].toLowerCase().startsWith(nameInput) &&
          row['priezvisko'].toLowerCase().startsWith(surnameInput)
        )
      })
    )
  }, [nameInput, surnameInput, skoleniaZamestnancov])

  useEffect(() => {
    console.log(columns)

    setColumnsToShow(
      columns.filter((col) => {
        return (
          col['id'] === 'meno' ||
          col['id'] === 'priezvisko' ||
          col['id'] === '' ||
          col['id'].toLowerCase().startsWith(skolenieInput) ||
          col['label'].toLowerCase().startsWith(skolenieInput)
        )
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skolenieInput, skoleniaZamestnancov])

  const handleAddCourseToEmployees = async (
    courseId: number,
    employeesIds: number[],
    date: Date
  ) => {
    const res = await pridajSkoleniaZamestnancom({
      id_zamestnancov: employeesIds,
      id_skolenia: courseId,
      datum: date,
    })
    if (res)
      dispatch(setSkoleniaZamestnancov(await fetchSkoleniaZamestnancov()))
  }

  const handleEditCourse = async (course: Skolenie) => {
    const res = await upravSkolenie(course)
    if (res) {
      dispatch(setSkoleniaZamestnancov(await fetchSkoleniaZamestnancov()))
      dispatch(setSkolenia(await fetchSkolenia()))
    }
  }

  const handleAddCourse = async (course: Skolenie) => {
    const res = await pridajSkolenie(course)
    if (res) {
      dispatch(setSkoleniaZamestnancov(await fetchSkoleniaZamestnancov()))
      dispatch(setSkolenia(await fetchSkolenia()))
    }
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
            onClick={() => setShowAddSkolenieModal(true)}
            variant="contained"
          >
            Pridaj skolenie
          </Button>
          <Button
            onClick={() => setShowUpravSkolenieModal(true)}
            variant="contained"
          >
            Uprav skolenie
          </Button>
          <Button
            onClick={() => setShowPridajSkolenieZamestnancovi(true)}
            variant="contained"
          >
            Pridaj/Uprav skolenie zamestnancom
          </Button>
          <Button
            onClick={() => exportAsCsv(columnsToShow, dataToShow)}
            variant="contained"
          >
            Exportovat data
          </Button>
        </Box>
        <CoursesTableWrapper columns={columnsToShow} rows={dataToShow} />
      </Box>
      <SkolenieModal
        open={showAddSkolenieModal}
        handleClose={() => setShowAddSkolenieModal(false)}
        handleSubmit={handleAddCourse}
      />
      <UpravSkolenieModal
        open={showUpravSkolenieModal}
        handleClose={() => setShowUpravSkolenieModal(false)}
        handleSubmit={handleEditCourse}
      />
      <PridajSkolenieZamestnancoviModal
        open={showPridajSkolenieZamestnancovi}
        handleClose={() => setShowPridajSkolenieZamestnancovi(false)}
        handleSubmit={handleAddCourseToEmployees}
      />
    </>
  )
}

export default CoursesTab
