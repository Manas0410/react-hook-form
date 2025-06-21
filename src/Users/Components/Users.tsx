import { useForm } from "react-hook-form";

const Users = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ email: string }>({ mode: "all" });

  const onSubmit = (data: { email: string }) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="submit" value="Submit" style={{ marginBottom: "10px" }} />
        <input
          type="text"
          {...register("email", {
            required: { value: true, message: "Email is required" },
            maxLength: {
              value: 10,
              message: "too many characters",
            },
          })}
          placeholder="Email"
        />
      </form>
      <p>{errors.email?.message}</p>
    </div>
  );
};

export default Users;
