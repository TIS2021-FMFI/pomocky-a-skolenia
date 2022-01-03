import { useEffect, useState } from "react";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

type DatePickerProps = {
  disabled: boolean;
  setData: (d: Date | null) => void;
  initialValue: Date | null;
  sx: any;
};

const DatePicker = ({
  initialValue,
  disabled,
  setData,
  sx,
}: DatePickerProps) => {
  const [value, setValue] = useState<Date | null>(initialValue);
  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
    setData(newValue);
  };

  useEffect(() => {
    if (disabled) handleChange(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        disabled={disabled}
        inputFormat="dd.MM.yyyy"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField sx={sx} {...params} />}
      />
    </LocalizationProvider>
  );
};
export default DatePicker;
