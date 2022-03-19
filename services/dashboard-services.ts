import { apiCall } from "../utilities/api-call";

export const getDashboardData = () => {
  return apiCall("dashboard");
};
