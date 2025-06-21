import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { UserSchemaType } from "../Types/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "../Types/Schema";
import { Stack } from "@mui/material";

const Users = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchemaType>({
    mode: "all",
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = (data: { email: string }) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      </Stack>
    </form>
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
