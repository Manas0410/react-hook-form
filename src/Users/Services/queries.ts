import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Option } from "../../Types/options";

export const useStates = () => {
  return useQuery({
    queryKey: ["states"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8080/states")
        .then((res) => res.data),
    refetchOnWindowFocus: false,
  });
};

export const useLanguages = () => {
  return useQuery({
    queryKey: ["languages"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8080/languages")
        .then((res) => res.data),
    refetchOnWindowFocus: false,
  });
};

export const useGenders = () => {
  return useQuery({
    queryKey: ["genders"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8080/genders")
        .then((res) => res.data),
    refetchOnWindowFocus: false,
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8080/skills")
        .then((res) => res.data),
    refetchOnWindowFocus: false,
  });
};
