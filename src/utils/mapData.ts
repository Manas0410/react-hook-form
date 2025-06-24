import { APICreateEdit, commonFields } from "../Users/Types/APITypes";
import { UserSchemaType } from "../Users/Types/schema";

export const mapData = (data: UserSchemaType): APICreateEdit => {
  const common: commonFields = {
    name: data.name,
    email: data.email,
    states: data.states,
    languagesSpoken: data.languagesSpoken,
    gender: data.gender,
    skills: data.skills,
    registrationDateAndTime: data.registrationDateAndTime.toString(),
    formerEmploymentPeriod: [
      data.formerEmploymentPeriod[0].toString(),
      data.formerEmploymentPeriod[1].toString(),
    ],
    salaryRange: [data.salaryRange[0], data.salaryRange[1]],
    isTeacher: data.isTeacher,
    students: data.isTeacher ? data.students : [],
  };

  switch (data.variant) {
    case "create":
      return {
        ...common,
        variant: data.variant,
      };
    case "edit":
      return {
        ...common,
        id: data.id,
        variant: data.variant,
      };
  }
};
