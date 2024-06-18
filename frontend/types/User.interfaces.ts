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

export interface ViaCepAddress {
  uf: string;
  cep: string;
  bairro: string;
  localidade: string;
  logradouro: string;
  complemento: string;
}

export interface UserAddress {
  uf: string;
  cep: string;
  bairro: string;
  logradouro: string;
  complemento: string;
  localidade: string;
}

export interface Recommendation {
  description: string;
  providerId: number;
  id: number;
}
export namespace User {
  export namespace Receive {
    export interface Create {
      id: string;
      email: string;
      userName: string;
      password: string;
      address?: UserAddress;
      curriculumId: string;
      isRecruiter: boolean;
      curriculum: Curriculum;
      vacanciesOwner?: string[];
      userRecommendations?: {
        id: number;
        userId: number;
        recommendationId: number;
        recommendation: Recommendation;
      }[];
    }
  }

  export namespace Send {
    export interface Create {
      user: {
        email: string;
        userName: string;
        isRecruiter: boolean;
        address: UserAddress;
      };
      password: string;
    }

    export interface Update {
      path: string;
      op: string;
      value: unknown;
    }
  }
}
