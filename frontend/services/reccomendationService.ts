import { Recommendation } from "@/types/User.interfaces";
import axios from "axios";

export interface CreateRecommendation {
  providerId: number;
  description: string;
}

export interface FormattedRecommendation {
  id: number;
  userId: number;
  recommendationId: number;
  providerName: string;
  recommendation: Recommendation;
}

export const createReccomendation = (
  receiverId: number,
  data: CreateRecommendation
) => {
  return axios.post(
    `https://recrutech-webapi.azurewebsites.net/api/Recommendations/CreateRecommendation?ReceivedId=${receiverId}`,
    data
  );
};

export const deleteRecommendation = (recommendationId: number) => {
  return axios.delete(
    `https://recrutech-webapi.azurewebsites.net/api/Recommendations/${recommendationId}`
  );
};
