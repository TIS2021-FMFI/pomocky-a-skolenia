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
import { EmployeeData, Fa, Kava, Pravomoc } from "../../types";
import { keyToText as k } from "../../helpers/keysToText";

import styles from "./AddEmployeeModal.module.css";
import MultiSelect from "./MultiSelect";

type MyRadioProps = { label: string } & FieldAttributes<{}>;

const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
  const [field] = useField<{}>(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const MyTextField: React.FC<FieldAttributes<{}>> = ({ name, ...props }) => {
  const [field, meta] = useField<{}>({ ...props, name });
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <Box display={"flex"} flexDirection={"row"}>
      <Typography width={120}>{k(name)}</Typography>
      <TextField
        placeholder={k(name)}
        {...field}
        helperText={errorText}
        error={!!errorText}
        className={styles.half}
        fullWidth={true}
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
            console.log("submit: ", data);
            handleSubmit(data);
            handleClose();
          }}
        >
          {({ values, errors, isValid, setFieldValue }) => (
            <Form>
              <Box display={"flex"} flexDirection={"column"} color="secondary">
                <MyTextField name="priezvisko" className={styles.half} />
                <MyTextField name="meno" />
                <MyTextField name="osobne_cislo" type="number" />
                <MultiSelect
                  name="oblasti"
                  data={values.oblasti || []}
                  setData={(data) => setFieldValue("oblasti", data)}
                  disabled={values.pravomoc !== Pravomoc.NADRIADENY}
                />
                <Box>
                  <MyRadio
                    name="pravomoc"
                    type="radio"
                    value={Pravomoc.NADRIADENY}
                    label={Pravomoc.NADRIADENY}
                  />
                  <MyRadio
                    name="pravomoc"
                    type="radio"
                    value={Pravomoc.PRACOVNIK}
                    label={Pravomoc.PRACOVNIK}
                  />
                </Box>
                {/* <MyTextField
                  name="oblasti"
                  type="array"
                  disabled={values.pravomoc === Pravomoc.PRACOVNIK}
                /> */}
                <MyTextField name="karticka" type="number" />
                <MyTextField name="bufetka" type="number" />
                <MyTextField name="zfsatna" type="number" />
                <MyTextField name="zfskrinka" type="number" />
                <MyTextField name="winnex" type="number" />
                <MyTextField name="pozicia" type="number" />
                <MyTextField name="oblast" type="number" />

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
                    value={"true"}
                    label={Kava.ANO}
                  />
                  <MyRadio
                    name="kava"
                    type="radio"
                    value={"false"}
                    label={Kava.NIE}
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
                {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                {console.log(values)}
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default EmployeeModal;
