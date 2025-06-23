import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { UserSchemaType } from "../Types/Schema";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (data: UserSchemaType) => {
      await axios.post("http://localhost:8080/users", data);
    },
  });
};
