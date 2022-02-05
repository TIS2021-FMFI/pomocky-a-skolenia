import { Box, Button, Modal, Typography } from '@mui/material'

import styles from './Modal.module.css'

type RemoveEmployeeModalProps = {
  email: string
  open: boolean
  handleClose: () => void
  handleSubmit: (email: string) => void
}

const RemoveUserModal = ({
  email,
  open,
  handleClose,
  handleSubmit,
}: RemoveEmployeeModalProps) => {
  const handleRemove = async () => {
    handleSubmit(email)
    handleClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        display={'flex'}
        flexDirection={'row'}
        alignContent={'space-between'}
        className={styles.wh}
      >
        <Typography>
          Naozaj chcete odstrániť používateľa s emailom <b>{email}</b>, tento
          proces je trvalý a nenávratný.
        </Typography>
        <Box
          flexGrow={1}
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'flex-end'}
        >
          <Button
            variant="contained"
            onClick={handleRemove}
            style={{ marginRight: '1em' }}
          >
            Áno
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Nie
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default RemoveUserModal
