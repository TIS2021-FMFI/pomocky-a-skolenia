import { Box, Button, Modal, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { useState } from "react";
import { initialSkolenie } from "../../constants";
import { upravSkolenie } from "../../helpers/requests";
import { skolenieSchema } from "../../schemas";
import { getStore } from "../../store/store";
import DropdownWithAdd from "./DropdownWithAdd";

import styles from "./Modal.module.css";
import MyTextField from "./MyTextField";
import SkoleniaDropdown from "./SkoleniaDropdown";

type UpravSkolenieModalProps = {
  open: boolean;
  handleClose: () => void;
};

type Option = {
  inputValue?: string;
  name: string;
};

const UpravSkolenieModal = ({ open, handleClose }: UpravSkolenieModalProps) => {
  const { skolenia, oblasti } = getStore();

  const [oblast, setOblast] = useState<Option | null>(null);

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={styles.wh}>
        <Formik
          validateOnChange={true}
          validateOnMount={true}
          initialValues={initialSkolenie}
          validationSchema={skolenieSchema}
          onSubmit={(data) => {
            upravSkolenie(data);
            handleClose();
          }}
        >
          {({ values, isValid, setFieldValue, setErrors }) => (
            <Form>
              <Box display={"flex"} flexDirection={"column"} color="secondary">
                <SkoleniaDropdown
                  options={skolenia}
                  setFieldValue={setFieldValue}
                  setOblast={setOblast}
                  setErrors={setErrors}
                />
                <MyTextField name="nazov" disabled={!!!values.id} />
                <MyTextField name="kod_skolenia" disabled={!!!values.id} />
                <MyTextField
                  name="dlzka_platnosti"
                  type="number"
                  disabled={!!!values.id}
                />
                <Box display={"flex"} flexDirection={"row"}>
                  <Typography width={120}>Oblasť</Typography>
                  <DropdownWithAdd
                    options={oblasti.map((o) => ({ name: o.oblast }))}
                    setData={(data: string) => setFieldValue("oblast", data)}
                    value={oblast}
                    setOblast={setOblast}
                    disabled={!!!values.id}
                  />
                </Box>
                <MyTextField name="popis" disabled={!!!values.id} />
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

export default UpravSkolenieModal;
