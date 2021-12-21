import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import { FieldAttributes, Form, Formik, useField } from "formik";
import { addEmployeeSchema } from "../../schemas";
import { EmployeeData, Pravomoc, Fa, Kava } from "../../types";

import styles from "./AddEmployeeModal.module.css";

type MyRadioProps = { label: string } & FieldAttributes<{}>;

const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
  const [field] = useField<{}>(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <Box display={"flex"} flexDirection={"row"}>
      <Typography width={120}>
        {placeholder}
      </Typography>
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
      className={styles.half}
      fullWidth={true}
    />
    </Box>
  );
};

type AddEmployeeModalProps = {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (value: EmployeeData) => void;
};

const AddEmployeeModal = ({
  open,
  handleClose,
  handleSubmit,
}: AddEmployeeModalProps) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className={styles.wh}>
        <Formik
          validateOnChange={true}
          initialValues={{
            meno: "",
            priezvisko: "",
            pravomoc: Pravomoc.PRACOVNIK,
            oblasti: [],
            pozicia: "",
            fa: Fa.GEFCO,
            oblast: "",
            osobneCislo: undefined,
            karticka: undefined,
            kava: Kava.NIE,
            bufetka: undefined,
            zfSatna: undefined,
            zfSkrinka: undefined,
            winnex: undefined,
          }}
          validationSchema={addEmployeeSchema}
          onSubmit={(data) => {
            console.log("submit: ", data);
            handleSubmit({ id: 5, ...data });
            handleClose();
          }}
        >
          {({ values, errors, isValid }) => (
            <Form>
              <Box display={"flex"} flexDirection={"column"} color="secondary">
                <MyTextField
                  name="priezvisko"
                  placeholder="Priezvisko"
                  className={styles.half}
                />
                <MyTextField name="meno" placeholder="Meno" />
                <MyTextField
                  name="osobneCislo"
                  type="number"
                  placeholder="Osobne cislo"
                />
                <MyTextField
                  name="karticka"
                  type="number"
                  placeholder="Karticka"
                />
                <MyTextField
                  name="bufetka"
                  type="number"
                  placeholder="Bufetka"
                />
                <MyTextField
                  name="zfSatna"
                  type="number"
                  placeholder="ZF Satna"
                />
                <MyTextField
                  name="zfSkrinka"
                  type="number"
                  placeholder="ZF Skrinka"
                />
                <MyTextField name="winnex" type="number" placeholder="Winnex" />
                <MyTextField
                  name="pozicia"
                  type="number"
                  placeholder="Pozicia"
                />
                <MyTextField name="oblast" type="number" placeholder="Oblast" />

                <Box>
                  <MyRadio
                    name="fa"
                    type="radio"
                    value={Fa.GEFCO}
                    label={Fa.GEFCO}
                  />
                  <MyRadio
                    name="fa"
                    type="radio"
                    value={Fa.AGENTURA}
                    label={Fa.AGENTURA}
                  />
                  <MyRadio
                    name="fa"
                    type="radio"
                    value={Fa.LEASING}
                    label={Fa.LEASING}
                  />
                </Box>
                <Box>
                  <MyRadio
                    name="kava"
                    type="radio"
                    value={Kava.ANO}
                    label={Kava.ANO}
                  />
                  <MyRadio
                    name="kava"
                    type="radio"
                    value={Kava.NIE}
                    label={Kava.NIE}
                  />
                </Box>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Button disabled={!isValid} type="submit">
                    submit
                  </Button>
                  <Button onClick={handleClose}>close</Button>
                </Box>
                {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
                {console.log(errors)} */}
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default AddEmployeeModal;
