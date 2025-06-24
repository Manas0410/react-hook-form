import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { UserSchemaType } from "../Types/Schema";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserSchemaType) => {
      await axios.post("http://localhost:8080/users ", data);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      alert("User created successfully");
    },
  });
};
