import { Modal, Box, Button, Autocomplete, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import SkoleniaDropdown from "./SkoleniaDropdown";
import DatePicker from "./DatePicker";
import { useState } from "react";
import { getStore } from "../../store/store";
import { EmployeeData } from "../../types";

import styles from "./Modal.module.css";

type PridajSkolenieZamestnancoviModalProps = {
  open: boolean;
  handleClose: () => void;
};

const PridajSkolenieZamestnancoviModal = ({
  open,
  handleClose,
}: PridajSkolenieZamestnancoviModalProps) => {
  const [skolenieId, setSkolenieId] = useState<number | null>(null);
  const [zamestnanciId, setZamestnanciId] = useState<number[]>([]);
  const [date, setDate] = useState<Date | null>(new Date(Date.now()));

  const { skolenia, zamestnanci } = getStore();

  const getLabel = (employee: EmployeeData) => {
    return `${employee.osobne_cislo} ${employee.meno} ${employee.priezvisko}`;
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={styles.wh}>
        <Formik
          validateOnChange={true}
          validateOnMount={true}
          initialValues={{}}
          onSubmit={(data) => {
            //add insert to DB here
            handleClose();
          }}
        >
          {({ values, isValid, setFieldValue, setErrors }) => (
            <Form>
              <Box
                display={"flex"}
                flexDirection={"column"}
                color="secondary"
                rowGap={2}
              >
                <Box display={"flex"} flexDirection={"row"} columnGap={2}>
                  <SkoleniaDropdown options={skolenia} setId={setSkolenieId} />
                  <DatePicker
                    sx={{ flexGrow: 1 }}
                    disabled={false}
                    setData={(datum: Date | null) => setDate(datum)}
                    initialValue={date}
                  />
                </Box>

                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  id="tags-outlined"
                  options={zamestnanci}
                  getOptionLabel={(option) => getLabel(option)}
                  defaultValue={[]}
                  onChange={(event: any, newValue: EmployeeData[] | null) => {
                    if (newValue === null) {
                      setZamestnanciId([]);
                      return;
                    }
                    let ids: number[] = [];
                    newValue.forEach((employee) => {
                      employee.id && ids.push(employee.id);
                    });
                    setZamestnanciId(ids);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Zamestnanci"
                      placeholder="Zamestnanci"
                    />
                  )}
                />
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Button
                    disabled={
                      !isValid ||
                      !!!skolenieId ||
                      zamestnanciId.length < 1 ||
                      !!!date
                    }
                    type="submit"
                    variant="contained"
                  >
                    submit
                  </Button>
                  <Button onClick={handleClose} variant="contained">
                    close
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
export default PridajSkolenieZamestnancoviModal;
