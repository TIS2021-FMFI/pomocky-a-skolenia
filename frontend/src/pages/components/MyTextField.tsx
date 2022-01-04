import { Box, Typography, TextField } from "@mui/material";
import { FieldAttributes, useField } from "formik";
import { keyToText as k } from "../../helpers/keysToText";

const MyTextField: React.FC<FieldAttributes<{}>> = ({ name, ...props }) => {
  const [field, meta] = useField<{}>({ ...props, name });
  const errorText = meta.error ? meta.error : "";
  return (
    <Box display={"flex"} flexDirection={"row"}>
      <Typography width={120}>{k(name)}</Typography>
      <TextField
        placeholder={k(name)}
        {...field}
        helperText={errorText}
        error={!!errorText}
        sx={{ flexGrow: 1 }}
        disabled={props.disabled}
      />
    </Box>
  );
};

export default MyTextField;
