import { Autocomplete } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type Prop<T extends FieldValues> = {
  name: Path<T>;
};

const RHFAutoComplete = <T extends FieldValues>({ name }: Prop<T>) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={(params) => <Autocomplete />}
    />
  );
};

export default RHFAutoComplete;
