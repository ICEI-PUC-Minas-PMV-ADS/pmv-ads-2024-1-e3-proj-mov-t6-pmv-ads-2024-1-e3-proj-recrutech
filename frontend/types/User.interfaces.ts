export type UserType = "dev" | "recruiter";

export namespace User {
  export namespace Receive {
    export interface Create {
      id: string;
      email: string;
      userName: string;
      password: string;
      address?: string;
      curriculumId: string;
      isRecruiter: boolean;
      vacanciesOwner?: string[];
      userRecommendations?: string[];
    }
  }
}
