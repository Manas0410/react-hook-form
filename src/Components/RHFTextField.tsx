import { TextField } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
};

export function RHFTextField<T extends FieldValues>({ name }: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
}
