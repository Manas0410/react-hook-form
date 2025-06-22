import { FormControlLabel, Slider, Switch, Typography } from "@mui/material";
import {
  Controller,
  FieldValues,
  Form,
  Path,
  useFormContext,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

export function RHFSwitch<T extends FieldValues>({ name, label }: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControlLabel control={<Switch {...field} />} label={label} />
      )}
    />
  );
}
