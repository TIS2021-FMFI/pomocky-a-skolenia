import { Tab, Tabs, Grid, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  fetchEmployees,
  fetchKonciaceSkolenia,
  fetchRegions,
  fetchSkolenia,
  fetchSkoleniaZamestnancov,
} from '../../helpers/requests'
import CoursesBeforeExpireTab from './CoursesBeforeExpireTab'
import CoursesTab from './CoursesTab'
import EmployeeTab from './EmployeeTab'
import { useDispatch } from 'react-redux'
import { setZamestnanci } from '../../features/zamestnanciSlice'
import { setOblasti } from '../../features/oblastiSlice'
import { setSkolenia } from '../../features/skoleniaSlice'
import { setKonciaceSkolenia } from '../../features/konciaceSkoleniaSlice'

import styles from './MainPage.module.css'
import { setSkoleniaZamestnancov } from '../../features/skoleniaZamestnancovSlice'

const MainPage = () => {
  const [tabValue, setTabValue] = useState<number>(1)
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetch() {
      dispatch(setZamestnanci(await fetchEmployees()))
      dispatch(setOblasti(await fetchRegions()))
      dispatch(setSkolenia(await fetchSkolenia()))
      dispatch(setSkoleniaZamestnancov(await fetchSkoleniaZamestnancov()))
      dispatch(setKonciaceSkolenia(await fetchKonciaceSkolenia()))
    }
    fetch()
  }, [dispatch])

  const theme = useTheme()
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <>
      <Grid container className={styles.wrapper}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          bgcolor={'secondary.main'}
          item={true}
          style={{
            ...(largeScreen
              ? { height: '100vh', width: 'fit-content' }
              : { height: 'fit-content', width: '100vw' }),
            ...{ position: 'sticky', top: 0, left: 0, zIndex: 100 },
          }}
          md={1}
          lg={1}
          xl={1}
        >
          <Tabs
            orientation={largeScreen ? 'vertical' : 'horizontal'}
            value={tabValue}
            indicatorColor="primary"
            // textColor="inherit"
          >
            <Tab
              label="Konciace skolenia"
              color={'secondary.contrastText'}
              onClick={() => setTabValue(0)}
            />
            <Tab
              label="Zakladne skolenia"
              color={'secondary.contrastText'}
              onClick={() => setTabValue(1)}
            />
            <Tab
              label="Skolenia"
              color={'secondary.contrastText'}
              onClick={() => setTabValue(2)}
            />
          </Tabs>
        </Grid>
        <Grid
          md={11}
          lg={11}
          xl={11}
          item={true}
          className={largeScreen ? styles.rowContent : styles.colContent}
        >
          {tabValue === 0 && <CoursesBeforeExpireTab />}
          {tabValue === 1 && <EmployeeTab />}
          {tabValue === 2 && <CoursesTab />}
        </Grid>
      </Grid>
    </>
  )
}
export default MainPage
