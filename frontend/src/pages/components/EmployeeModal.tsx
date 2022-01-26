import { Box, Button, Modal, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { initialEmployee } from '../../constants'
import { addEmployeeSchema } from '../../schemas'
import { EmployeeData, Fa, Kava } from '../../types'

import styles from './Modal.module.css'
import DropdownWithAdd from './DropdownWithAdd'
import DatePicker from './DatePicker'
import MyTextField from './MyTextField'
import MyRadio from './MyRadio'
import { useState } from 'react'
import { RootState } from '../../app/store'
import { useSelector } from 'react-redux'

type EmployeeModalProps = {
  open: boolean
  handleClose: () => void
  handleSubmit: (value: EmployeeData) => void
  initialData?: EmployeeData
}

type Option = {
  inputValue?: string
  name: string
}

const EmployeeModal = ({
  open,
  handleClose,
  handleSubmit,
  initialData,
}: EmployeeModalProps) => {
  const oblasti = useSelector((state: RootState) => state.oblasti.value)

  const [oblast, setOblast] = useState<Option | null>(null)

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={styles.wh}>
        <Formik
          validateOnChange={true}
          validateOnMount={true}
          initialValues={initialData || initialEmployee}
          validationSchema={addEmployeeSchema}
          onSubmit={(data) => {
            handleSubmit(data)
            setOblast(null)
            handleClose()
          }}
        >
          {({ values, isValid, setFieldValue }) => (
            <Form>
              <Box display={'flex'} flexDirection={'column'} color="secondary">
                <MyTextField name="meno" />
                <MyTextField name="priezvisko" />
                <MyTextField name="osobne_cislo" type="number" />
                <MyTextField name="karticka" type="number" />
                <MyTextField name="bufetka" type="number" />
                <MyTextField name="zfsatna" type="string" />
                <MyTextField name="zfskrinka" type="number" />
                <MyTextField name="winnex" type="number" />
                <MyTextField name="pozicia" type="string" />
                <Box display={'flex'} flexDirection={'row'}>
                  <MyTextField name="VZV" type="string" />
                  <DatePicker
                    sx={{ flexGrow: 1 }}
                    disabled={!!!values.VZV}
                    setData={(datum: Date | null) =>
                      setFieldValue('datum_vydania', datum)
                    }
                    initialValue={values.datum_vydania}
                  />
                </Box>
                <Box display={'flex'} flexDirection={'row'}>
                  <Typography width={120}>Oblasť</Typography>
                  <DropdownWithAdd
                    options={oblasti.map((o) => ({ name: o.oblast }))}
                    setData={(data: string) => setFieldValue('oblast', data)}
                    value={
                      oblast
                        ? oblast
                        : initialData
                        ? { name: initialData.oblast }
                        : null
                    }
                    setOblast={setOblast}
                  />
                </Box>

                <Box display={'flex'} flexDirection={'row'}>
                  <Typography width={120}>Faktúra</Typography>
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
                <Box display={'flex'} flexDirection={'row'}>
                  <Typography width={120}>Káva</Typography>
                  <MyRadio
                    name="kava"
                    type="radio"
                    value={Kava.ANO}
                    label={'Áno'}
                  />
                  <MyRadio
                    name="kava"
                    type="radio"
                    value={Kava.NIE}
                    label={'Nie'}
                  />
                </Box>
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

export default EmployeeModal
