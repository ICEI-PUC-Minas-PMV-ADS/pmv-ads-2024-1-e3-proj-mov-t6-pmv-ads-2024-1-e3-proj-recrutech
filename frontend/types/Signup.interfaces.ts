export namespace SignupFormModel {
  interface ComonFields {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  export interface Dev extends ComonFields {
    cep: string;
    github: string;
    linkedIn: string;
    curriculum: File;
    technologies: string[];
  }

  export interface Recruiter extends ComonFields {}
}
