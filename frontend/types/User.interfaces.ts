export type UserType = "dev" | "recruiter";

export interface UserCourse {
  id: number;
  institution: string;
  myCourse: string;
}

export interface UserExperience {
  id: number;
  enterprise: string;
  function: string;
}

export interface Curriculum {
  id: number;
  about: string;
  tecnologies: string[];
  linkedin: string;
  github: string;
  course: UserCourse[];
  experience: UserExperience[];
  userId: number;
}

export interface Address {
  bairro: string;
  cep: string;
  complemento: string;
  localidade: string;
  logradouro: string;
  uf: string;
}

export namespace User {
  export namespace Receive {
    export interface Create {
      id: string;
      email: string;
      userName: string;
      password: string;
      address?: Address;
      curriculumId: string;
      isRecruiter: boolean;
      curriculum: Curriculum;
      vacanciesOwner?: string[];
      userRecommendations?: string[];
    }
  }

  export namespace Send {
    export interface Update {
      path: string;
      op: string;
      value: unknown;
    }
  }
}
