import BeforeExpireTableWrapper from '../components/BeforeExpireTableWrapper'
import { RootState } from '../../app/store'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import MultiSelect from '../components/MultiSelect'
import { CourseBeforeExpire } from '../../types'

const CoursesBeforeExpireTab = () => {
  const { konciaceSkolenia } = useSelector((state: RootState) => ({
    konciaceSkolenia: state.konciaceSkolenia.value,
    oblasti: state.oblasti.value,
  }))

  const [rowsToShow, setRowsToShow] =
    useState<CourseBeforeExpire[]>(konciaceSkolenia)
  const [regionsToShow, setRegionsToShow] = useState<string[]>([])

  const columns = Object.keys(konciaceSkolenia[0] || []).map((k) => {
    return {
      id: k,
      label: k,
      minWidth: 120,
      format: null,
    }
  })

  useEffect(() => {
    console.log(regionsToShow)

    if (regionsToShow.length === 0) setRowsToShow(konciaceSkolenia)
    else {
      setRowsToShow(
        konciaceSkolenia.filter((k) =>
          regionsToShow.some((o) => {
            return o.toLowerCase() === k.oblast.toLowerCase()
          })
        )
      )
    }
  }, [konciaceSkolenia, regionsToShow])

  return (
    <Grid>
      <MultiSelect
        name="Oblasti"
        data={regionsToShow}
        setData={setRegionsToShow}
      />
      <BeforeExpireTableWrapper columns={columns} rows={rowsToShow} />
    </Grid>
  )
}
export default CoursesBeforeExpireTab
