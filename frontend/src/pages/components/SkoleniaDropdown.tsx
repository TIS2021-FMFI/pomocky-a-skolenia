import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Skolenie } from "../../types";
import { FormikErrors } from "formik";

type DropdownWithAddProps = {
  options: Skolenie[];
  setFieldValue: (
    s: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  setOblast: (o: Option) => void;
  setErrors: (errors: FormikErrors<Skolenie>) => void;
};

type Option = {
  inputValue?: string;
  name: string;
};

type LabeledSkolenie = {
  id: number | null;
  nazov: string;
  kod_skolenia: string;
  dlzka_platnosti: number | null;
  oblast: string;
  popis: string;
  label: string;
};

const SkoleniaDropdown = ({
  options,
  setFieldValue,
  setOblast,
  setErrors,
}: DropdownWithAddProps) => {
  const labeledOptions: LabeledSkolenie[] = options.map((option) => {
    return { ...option, label: option.kod_skolenia + " " + option.nazov };
  });

  return (
    <Autocomplete
      disablePortal
      id="skolenie-pre-upravu"
      options={labeledOptions}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Skolenie pre upravu" />
      )}
      isOptionEqualToValue={(option: LabeledSkolenie, value: LabeledSkolenie) =>
        option.id === value.id
      }
      onChange={(event: any, newValue: LabeledSkolenie | null) => {
        if (newValue === null) return;
        const val: Skolenie = newValue;
        setOblast({ name: val.oblast });

        Object.entries(val).forEach(([key, value]) => {
          setFieldValue(key, value, false);
        });

        setErrors({});
      }}
    />
  );
};

export default SkoleniaDropdown;
