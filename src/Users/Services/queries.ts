import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Option } from "../../Types/options";
import { APIGet } from "../Types/APITypes";
import { UserSchemaType } from "../Types/Schema";

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

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["user", { id }],
    queryFn: async (): Promise<UserSchemaType> => {
      const { data } = await axios.get<APIGet>(
        `http://localhost:8080/users/${id}`
      );
      return {
        variant: "edit",
        id: data.id,
        name: data.name,
        email: data.email,
        states: data.states,
        languagesSpoken: data.languagesSpoken,
        formerEmploymentPeriod: [
          new Date(data.formerEmploymentPeriod[0]),
          new Date(data.formerEmploymentPeriod[1]),
        ],
        registrationDateAndTime: new Date(data.registrationDateAndTime),
        salaryRange: [data.salaryRange[0], data.salaryRange[1]],
        gender: data.gender,
        skills: data.skills,
        isTeacher: data.isTeacher,
        students: data.students,
      };
    },
    enabled: !!id,
  });
};
