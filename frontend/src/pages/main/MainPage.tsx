import { Tab, Tabs, Grid } from "@mui/material";
import { useState } from "react";
import CoursesBeforeExpireTab from "./CoursesBeforeExpireTab";
import EmployeeTab from "./EmployeeTab";

const MainPage = () => {
  const [tabValue, setTabValue] = useState<number>(0);

  return (
    <>
      <Grid container>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ height: "100vh" }}
          xl={1}
        >
          <Tabs orientation="vertical" value={tabValue}>
            <Tab
              label="Konciace skolenia"
              color={"primary.contrastText"}
              onClick={() => setTabValue(0)}
            />
            <Tab
              label="Zakladne skolenia"
              color={"primary.contrastText"}
              onClick={() => setTabValue(1)}
            />
            <Tab
              label="Skolenia"
              color={"primary.contrastText"}
              onClick={() => setTabValue(2)}
            />
          </Tabs>
        </Grid>
        {tabValue === 0 && (
          <Grid xl={11}>
            <CoursesBeforeExpireTab />
          </Grid>
        )}
        {tabValue === 1 && (
          <Grid xl={11}>
            <EmployeeTab />
          </Grid>
        )}
      </Grid>
    </>
  );
};
export default MainPage;
