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
import { initialEmployee } from "../../constants";
import { addEmployeeSchema } from "../../schemas";
import { EmployeeData, Fa, Kava } from "../../types";
import { keyToText as k } from "../../helpers/keysToText";

import styles from "./AddEmployeeModal.module.css";
import { getStore } from "../../store/store";
import DropdownWithAdd from "./DropdownWithAdd";
import DatePicker from "./DatePicker";

type MyRadioProps = { label: string } & FieldAttributes<{}>;

const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
  const [field] = useField<{}>(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const MyTextField: React.FC<FieldAttributes<{}>> = ({ name, ...props }) => {
  const [field, meta] = useField<{}>({ ...props, name });
  const errorText = meta.error ? meta.error : "";
  return (
    <Box display={"flex"} flexDirection={"row"}>
      <Typography width={120}>{k(name)}</Typography>
      <TextField
        placeholder={k(name)}
        {...field}
        helperText={errorText}
        error={!!errorText}
        sx={{ flexGrow: 1 }}
        disabled={props.disabled}
      />
    </Box>
  );
};

type EmployeeModalProps = {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (value: EmployeeData) => void;
  initialData?: EmployeeData;
};

const EmployeeModal = ({
  open,
  handleClose,
  handleSubmit,
  initialData,
}: EmployeeModalProps) => {
  const { oblasti } = getStore();
  console.log(initialData);

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={styles.wh}>
        <Formik
          validateOnChange={true}
          validateOnMount={true}
          initialValues={initialData || initialEmployee}
          validationSchema={addEmployeeSchema}
          onSubmit={(data) => {
            handleSubmit(data);
            handleClose();
          }}
        >
          {({ values, isValid, setFieldValue }) => (
            <Form>
              <Box display={"flex"} flexDirection={"column"} color="secondary">
                <MyTextField name="priezvisko" />
                <MyTextField name="meno" />
                <MyTextField name="osobne_cislo" type="number" />
                <MyTextField name="karticka" type="number" />
                <MyTextField name="bufetka" type="number" />
                <MyTextField name="zfsatna" type="string" />
                <MyTextField name="zfskrinka" type="number" />
                <MyTextField name="winnex" type="number" />
                <MyTextField name="pozicia" type="string" />
                <Box display={"flex"} flexDirection={"row"}>
                  <MyTextField name="VZV" type="string" />
                  <DatePicker
                    sx={{ flexGrow: 1 }}
                    disabled={!!!values.VZV}
                    setData={(datum: Date | null) =>
                      setFieldValue("datum_vydania", datum)
                    }
                    initialValue={values.datum_vydania}
                  />
                </Box>
                <Box display={"flex"} flexDirection={"row"}>
                  <Typography width={120}>Oblasť</Typography>
                  <DropdownWithAdd
                    options={oblasti.map((o) => ({ name: o.oblast }))}
                    setData={(data: string) => setFieldValue("oblast", data)}
                    initialValue={
                      values.oblast ? { name: values.oblast } : null
                    }
                  />
                </Box>

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
                    label={"Áno"}
                  />
                  <MyRadio
                    name="kava"
                    type="radio"
                    value={Kava.NIE}
                    label={"Nie"}
                  />
                </Box>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Button disabled={!isValid} type="submit" variant="contained">
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

export default EmployeeModal;
