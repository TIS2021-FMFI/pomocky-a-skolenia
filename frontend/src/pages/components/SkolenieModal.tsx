import { Box, Button, Modal, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import { useState } from 'react'
import { initialSkolenie } from '../../constants'
import { pridajSkolenie } from '../../helpers/requests'
import { skolenieSchema } from '../../schemas'
import { Skolenie } from '../../types'
import DropdownWithAdd from './DropdownWithAdd'
import { useSelector } from 'react-redux'

import styles from './Modal.module.css'
import MyTextField from './MyTextField'
import { RootState } from '../../app/store'

type SkolenieModalProps = {
  open: boolean
  handleClose: () => void
  initialData?: Skolenie
}

type Option = {
  inputValue?: string
  name: string
}

const SkolenieModal = ({
  open,
  handleClose,
  initialData,
}: SkolenieModalProps) => {
  const oblasti = useSelector((state: RootState) => state.oblasti.value)

  const [oblast, setOblast] = useState<Option | null>(null)

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={styles.wh}>
        <Formik
          validateOnChange={true}
          validateOnMount={true}
          initialValues={initialData || initialSkolenie}
          validationSchema={skolenieSchema}
          onSubmit={(data) => {
            pridajSkolenie(data)
            handleClose()
          }}
        >
          {({ values, errors, isValid, setFieldValue }) => (
            <Form>
              <Box display={'flex'} flexDirection={'column'} color="secondary">
                <MyTextField name="nazov" />
                <MyTextField name="kod_skolenia" />
                <MyTextField name="dlzka_platnosti" type="number" />
                <Box display={'flex'} flexDirection={'row'}>
                  <Typography width={120}>Oblasť</Typography>
                  <DropdownWithAdd
                    options={oblasti.map((o) => ({ name: o.oblast }))}
                    setData={(data: string) => setFieldValue('oblast', data)}
                    value={oblast}
                    setOblast={setOblast}
                  />
                </Box>
                <MyTextField name="popis" />
                <Box display={'flex'} justifyContent={'space-between'}>
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
  )
}

export default SkolenieModal
