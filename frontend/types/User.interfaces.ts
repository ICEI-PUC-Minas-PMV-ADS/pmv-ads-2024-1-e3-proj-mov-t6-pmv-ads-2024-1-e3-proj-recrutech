export type UserType = "dev" | "recruiter";

export interface User {
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
