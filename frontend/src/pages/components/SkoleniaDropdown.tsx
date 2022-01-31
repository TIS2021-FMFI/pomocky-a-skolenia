import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Skolenie } from '../../types'
import { FormikErrors } from 'formik'

type DropdownWithAddProps = {
  options: Skolenie[]
  setFieldValue?: (
    s: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void
  setOblast?: (o: Option) => void
  setErrors?: (errors: FormikErrors<Skolenie>) => void
  setId?: (id: number | null) => void
}

type Option = {
  inputValue?: string
  name: string
}

type LabeledSkolenie = {
  id: number | null
  nazov: string
  kod_skolenia: string
  dlzka_platnosti: number | null
  oblast: string
  popis: string
  label: string
}

const SkoleniaDropdown = ({
  options,
  setFieldValue,
  setOblast,
  setErrors,
  setId,
}: DropdownWithAddProps) => {
  const labeledOptions: LabeledSkolenie[] = options.map((option) => {
    return { ...option, label: option.kod_skolenia + ' ' + option.nazov }
  })

  return (
    <Autocomplete
      disablePortal
      id="skolenie-pre-upravu"
      options={labeledOptions}
      sx={{ width: '60%' }}
      renderInput={(params) => <TextField {...params} label="Školenie" />}
      isOptionEqualToValue={(option: LabeledSkolenie, value: LabeledSkolenie) =>
        option.id === value.id
      }
      onChange={(event: any, newValue: LabeledSkolenie | null) => {
        if (newValue === null) {
          setId && setId(null)
          return
        }
        if (setId !== undefined) {
          setId(newValue.id)
          return
        }

        const val: Skolenie = newValue
        setOblast && setOblast({ name: val.oblast })

        Object.entries(val).forEach(([key, value]) => {
          setFieldValue && setFieldValue(key, value, false)
        })

        setErrors && setErrors({})
      }}
    />
  )
}

export default SkoleniaDropdown
