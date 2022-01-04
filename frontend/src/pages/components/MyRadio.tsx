import { FormControlLabel, Radio } from "@mui/material";
import { FieldAttributes, useField } from "formik";

type MyRadioProps = { label: string } & FieldAttributes<{}>;

const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
  const [field] = useField<{}>(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

export default MyRadio;
