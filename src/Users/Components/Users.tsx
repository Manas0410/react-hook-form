import {
  SubmitHandler,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
} from "@mui/material";
import { defaultValues, UserSchemaType } from "../Types/Schema";
import RHFAutoComplete from "../../Components/RHFAutoComplete";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
  useUser,
  useUsers,
} from "../Services/queries";
import { RHFToggleButtonGroup } from "../../Components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../../Components/RHFRadioGroup";
import { RHFCheckBox } from "../../Components/RHFCheckBox";
import { RHFDateTimePicker } from "../../Components/RHFDateTimePicker";
import { RHFDateRangePicker } from "../../Components/RHFDateRangePicker";
import { RHFSlider } from "../../Components/RHFSlider";
import { RHFSwitch } from "../../Components/RHFSwitch";
import { RHFTextField } from "../../Components/RHFTextField";
import { useEffect } from "react";
import { useCreateUser } from "../Services/mutation";

const Users = () => {
  const { control, unregister, reset, setValue, handleSubmit } =
    useFormContext<UserSchemaType>();

  const id = useWatch({ control, name: "id" });
  const variant = useWatch({ control, name: "variant" });

  const statesQuery = useStates();
  const languageQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();
  const usersQuery = useUsers();
  const userQuery = useUser(id);

  const createUserMutation = useCreateUser();

  const handleUserClick = (id: string) => {
    setValue("id", id);
  };

  const onSubmit: SubmitHandler<UserSchemaType> = (data) => {
    if (variant === "create") {
      createUserMutation.mutate(data);
    } else if (variant === "edit") {
      // Edit user logic
    }
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: "students",
  });

  const isTeacher = useWatch({ control, name: "isTeacher" });

  useEffect(() => {
    if (userQuery.data) {
      reset(userQuery.data);
    }
  }, [userQuery.data, reset]);

  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      // students:undefined
      unregister("students");
    }
  }, [isTeacher, replace, unregister]);

  return (
    <Container
      maxWidth="sm"
      sx={{ marginBottom: 100, marginTop: 4 }}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <List subheader={<ListSubheader>USERS</ListSubheader>}>
          {usersQuery.data?.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton
                onClick={() => {
                  handleUserClick(user.id);
                }}
                selected={user.id === id}
              >
                <ListItemText primary={user.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Stack sx={{ gap: 2 }}>
          <RHFTextField<UserSchemaType> name="name" label="Name" />
          <RHFTextField<UserSchemaType> name="email" label="Email" />
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
          <RHFCheckBox<UserSchemaType>
            name="skills"
            options={skillsQuery.data || []}
            label="Skills"
          />
          <RHFDateTimePicker<UserSchemaType>
            name="registrationDateAndTime"
            label="Registration Date and Time"
          />
          <RHFDateRangePicker<UserSchemaType>
            name="formerEmploymentPeriod"
            label="Former Employment Period"
          />
          <RHFSlider<UserSchemaType> name="salaryRange" label="Salary Range" />
          <RHFSwitch<UserSchemaType>
            name="isTeacher"
            label="Are you a Teacher"
          />

          {isTeacher && (
            <Button onClick={() => append({ name: "" })} type="button">
              Add New Student
            </Button>
          )}

          {fields.map((field, index) => (
            <>
              <RHFTextField<UserSchemaType>
                key={field.id}
                name={`students.${index}.name`}
                label="Student Name"
              />
              <Button
                key={`remove-${field.id}`}
                onClick={() => remove(index)}
                type="button"
                color="error"
              >
                Remove Student
              </Button>
            </>
          ))}

          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button type="submit">New User</Button>
            <Button type="button" onClick={handleReset}>
              Reset
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
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
