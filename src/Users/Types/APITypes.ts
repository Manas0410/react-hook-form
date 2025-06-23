type Create = {
  variant: "create";
};

type Edit = {
  variant: "edit";
  id: string;
};

export type commonFields = {
  name: string;
  email: string;
  states: string[];
  languagesSpoken: string[];
  gender: string;
  skills: string[];
  registrationDateAndTime: string;
  formerEmploymentPeriod: [string, string];
  salaryRange: [number, number];
  isTeacher: boolean;
  students: { name: string }[];
};

export type APICreateEdit = commonFields & (Create | Edit);
export type APIGet = Edit & commonFields;
