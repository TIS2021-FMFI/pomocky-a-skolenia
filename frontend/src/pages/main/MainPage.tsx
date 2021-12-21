import { Tab, Tabs, Grid } from "@mui/material";
import { useState } from "react";
import CoursesBeforeExpireTab from "./CoursesBeforeExpireTab";
import EmployeeTab from "./EmployeeTab";

const MainPage = () => {
  const [tabValue, setTabValue] = useState<number>(1);

  return (
    <>
      <Grid container>
        <Grid xl={1}>
          <Tabs orientation="vertical" value={tabValue}>
            <Tab
              label="Konciace skolenia"
              color={"primary.contrastText"}
              value={0}
              onClick={() => setTabValue(0)}
            />
            <Tab
              label="Zakladne skolenia"
              color={"primary.contrastText"}
              value={1}
              onClick={() => setTabValue(1)}
            />
            <Tab
              label="Skolenia"
              color={"primary.contrastText"}
              value={2}
              onClick={() => setTabValue(2)}
            />
          </Tabs>
        </Grid>
        {tabValue === 1 && (
          <Grid xl={11}>
            <EmployeeTab />
          </Grid>
        )}
        {tabValue === 2 && (
          <Grid xl={11}>
            <CoursesBeforeExpireTab />
          </Grid>
        )}
      </Grid>
    </>
  );
};
export default MainPage;
