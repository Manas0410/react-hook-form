import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../Types/options";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

type Prop<T extends FieldValues> = {
  name: Path<T>;
  options: Option[];
  label: string;
};

const RHFAutoComplete = <T extends FieldValues>({
  name,
  options,
  label,
}: Prop<T>) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <Autocomplete
          options={options}
          value={value.map((id: string) =>
            options.find((option) => option.id === id)
          )}
          getOptionLabel={(option) =>
            options.find((o) => o.id === option.id)?.label || ""
          }
          isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
          onChange={(_, newValue) => {
            onChange(newValue ? newValue.map((item) => item.id) : []);
          }}
          disableCloseOnSelect
          multiple
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              inputRef={ref}
              helperText={error?.message}
              error={!!error}
              label={label}
            />
          )}
          renderOption={(props, option, { selected }) => (
            <Box component="li" {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
                checked={selected}
              />
              {option.label}
            </Box>
          )}
        />
      )}
    />
  );
};

export default RHFAutoComplete;
