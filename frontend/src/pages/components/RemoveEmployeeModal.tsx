import { Box, Button, Modal, Typography } from "@mui/material";
import { removeEmployee } from "../../helpers/requests";

import styles from "./Modal.module.css";

type RemoveEmployeeModalProps = {
  employee: any;
  open: boolean;
  handleClose: () => void;
};

const RemoveEmployeeModal = ({
  employee,
  open,
  handleClose,
}: RemoveEmployeeModalProps) => {
  const handleRemove = async () => {
    await removeEmployee(employee.id);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        alignContent={"space-between"}
        className={styles.wh}
      >
        <Typography>
          Naozaj chcete odstráňiť zamestnanca{" "}
          <b>{employee.meno + " " + employee.priezvisko}</b>, tento proces je
          trvalý a nenávratný.
        </Typography>
        <Box
          flexGrow={1}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"flex-end"}
        >
          <Button
            variant="contained"
            onClick={handleRemove}
            style={{ marginRight: "1em" }}
          >
            Áno
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Nie
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RemoveEmployeeModal;
