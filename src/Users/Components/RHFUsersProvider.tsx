import { FormProvider, useForm } from "react-hook-form";
import Users from "./Users";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, UserSchemaType } from "../Types/Schema";

const RHFUsersProvider = () => {
  const methods = useForm<UserSchemaType>({
    mode: "all",
    resolver: zodResolver(UserSchema),
  });
  return (
    <FormProvider {...methods}>
      <Users />
    </FormProvider>
  );
};

export default RHFUsersProvider;
