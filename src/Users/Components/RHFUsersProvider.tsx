import { FormProvider, useForm } from "react-hook-form";
import Users from "./Users";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValues, UserSchema, UserSchemaType } from "../Types/Schema";
import { DevTool } from "@hookform/devtools";

const RHFUsersProvider = () => {
  const methods = useForm<UserSchemaType>({
    mode: "all",
    resolver: zodResolver(UserSchema),
    defaultValues: defaultValues,
  });
  return (
    <FormProvider {...methods}>
      <Users />
      <DevTool control={methods.control} />
    </FormProvider>
  );
};

export default RHFUsersProvider;
