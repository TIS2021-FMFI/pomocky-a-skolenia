import { Autocomplete, Chip, TextField } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

type MultiSelectProps = {
  data: any[]
  setData: (data: any[]) => void
  disabled: boolean
  name: string
}

const MultiSelect = ({ name, data, setData, disabled }: MultiSelectProps) => {
  const oblasti = useSelector((state: RootState) => state.oblasti.value)

  return (
    <div>
      <Autocomplete
        value={data}
        disabled={disabled}
        onChange={(event, newValue) => {
          setData(newValue)
        }}
        multiple
        id="tags-filled"
        options={oblasti.map((option) => option.oblast)}
        freeSolo
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            variant="filled"
            label="Users"
            placeholder="Search"
            fullWidth={true}
          />
        )}
      />
    </div>
  )
}

export default MultiSelect
