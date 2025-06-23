import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Option } from "../../Types/options";
import { APIGet } from "../Types/APITypes";

export const useStates = () => {
  return useQuery({
    queryKey: ["states"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8080/states")
        .then((res) => res.data),
  });
};

export const useLanguages = () => {
  return useQuery({
    queryKey: ["languages"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8080/languages")
        .then((res) => res.data),
  });
};

export const useGenders = () => {
  return useQuery({
    queryKey: ["genders"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8080/genders")
        .then((res) => res.data),
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8080/skills")
        .then((res) => res.data),
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: (): Promise<Option[]> =>
      axios.get<APIGet[]>("http://localhost:8080/users").then((res) =>
        res.data.map(
          (user) =>
            ({
              label: user.name,
              id: user.id,
            } satisfies Option)
        )
      ),
  });
};
