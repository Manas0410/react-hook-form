import { useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { UserSchemaType } from "../Types/Schema";
import RHFAutoComplete from "../../Components/RHFAutoComplete";
import { useGenders, useLanguages, useStates } from "../Services/queries";
import { RHFToggleButtonGroup } from "../../Components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../../Components/RHFRadioGroup";

const Users = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<UserSchemaType>();

  const statesQuery = useStates();
  const languageQuery = useLanguages();
  const gendersQuery = useGenders();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Stack sx={{ gap: 2 }}>
      <TextField
        {...register("name", {})}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register("email", {})}
        label="E-mail"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <RHFAutoComplete<UserSchemaType>
        name="states"
        options={statesQuery.data || []}
        label="States"
      />
      <RHFToggleButtonGroup<UserSchemaType>
        name="languagesSpoken"
        options={languageQuery.data || []}
      />
      <RHFRadioGroup<UserSchemaType>
        name="gender"
        options={gendersQuery.data || []}
        label="Gender"
      />
    </Stack>
  );
};

export default Users;

// basic usage

// const Users = () => {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm<{ email: string }>({ mode: "all" });

//   const onSubmit = (data: { email: string }) => {
//     console.log(data);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input type="submit" value="Submit" style={{ marginBottom: "10px" }} />
//         <input
//           type="text"
//           {...register("email", {
//             required: { value: true, message: "Email is required" },
//             maxLength: {
//               value: 10,
//               message: "too many characters",
//             },
//           })}
//           placeholder="Email"
//         />
//       </form>
//       <p>{errors.email?.message}</p>
//     </div>
//   );
// };

// basic usage with MUI

// const Users = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<UserSchemaType>({
//     mode: "all",
//     resolver: zodResolver(UserSchema),
//   });

//   const onSubmit = (data: { email: string }) => {
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Stack sx={{ gap: 2 }}>
//         <TextField
//           {...register("name", {})}
//           label="Name"
//           error={!!errors.name}
//           helperText={errors.name?.message}
//         />
//         <TextField
//           {...register("email", {})}
//           label="E-mail"
//           error={!!errors.email}
//           helperText={errors.email?.message}
//         />
//       </Stack>
//     </form>
//   );
// };
