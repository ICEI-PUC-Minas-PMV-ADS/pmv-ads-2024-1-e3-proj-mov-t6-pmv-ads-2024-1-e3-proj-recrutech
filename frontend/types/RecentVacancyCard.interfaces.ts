export interface RecentVacancyCardProps {
  id: string;
  title: string;
  seniority: string;
  enterprise: string;
  workingModel: string;
  onPress: (vacancyId:string) => void; 
}
