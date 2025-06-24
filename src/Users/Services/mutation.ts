import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { UserSchemaType } from "../Types/schema";
import { useQueryClient } from "@tanstack/react-query";
import { omit } from "lodash";
import { mapData } from "../../utils/mapData";

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

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserSchemaType) => {
      if (data.variant === "edit") {
        await axios.put(
          `http://localhost:8080/users/${data.id}`,
          omit(mapData(data), "variant")
        );
        alert("user edited successfully");
      }
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });

      if (variables.variant === "edit") {
        await queryClient.invalidateQueries({
          queryKey: ["user", { id: variables.id }],
        });
      }
    },
  });
};
