import { Tab, Tabs, Grid, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { setZamestnanci } from '../../features/zamestnanciSlice'
import { setOblasti } from '../../features/oblastiSlice'
import { setSkolenia } from '../../features/skoleniaSlice'
import { setKonciaceSkolenia } from '../../features/konciaceSkoleniaSlice'

import styles from './MainPage.module.css'
import '../login/LoginStyle.css'
import { setSkoleniaZamestnancov } from '../../features/skoleniaZamestnancovSlice'
import AccountManagementTab from './AccountManagementTab'
import { RootState } from '../../app/store'
import { setLoggedIn } from '../../features/loginSlice'
import UsersManagementTab from './UsersManagementTab'

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
  const isAdmin = useSelector((state: RootState) => state.loggin.isAdmin)

  const handleSubmit = async () => {
    dispatch(setLoggedIn(false))
  }

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
          <p className="statusOfUser">
            {isAdmin ? 'Administr??tor' : 'Nadriaden??'}
          </p>
          <Tabs
            orientation={largeScreen ? 'vertical' : 'horizontal'}
            value={tabValue}
            indicatorColor="primary"
          >
            <Tab
              label="Kon??iace ??kolenia"
              color={'secondary.contrastText'}
              onClick={() => setTabValue(0)}
            />
            <Tab
              label="Z??kladn?? ??daje"
              color={'secondary.contrastText'}
              onClick={() => setTabValue(1)}
            />
            <Tab
              label="??kolenia"
              color={'secondary.contrastText'}
              onClick={() => setTabValue(2)}
            />
            <Tab
              label="Spr??va ????tu"
              color={'secondary.contrastText'}
              onClick={() => setTabValue(3)}
            />
            {isAdmin && (
              <Tab
                label="Spr??va u????vate??ov"
                color={'secondary.contrastText'}
                onClick={() => setTabValue(4)}
              />
            )}
          </Tabs>
          <button className="logOutbtn" onClick={() => handleSubmit()}>
            Odhl??si??
          </button>
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
          {tabValue === 3 && <AccountManagementTab />}
          {tabValue === 4 && <UsersManagementTab />}
        </Grid>
      </Grid>
    </>
  )
}
export default MainPage
