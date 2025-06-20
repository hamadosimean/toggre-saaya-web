import apiClient from "./api";

const companyAPI = {
  getCompanies: () => apiClient.get("/companies"),
  getCompanyByUser: (userId) => apiClient.get(`/user/${userId}/company`),
  getCompanyDetail: (userId) => apiClient.get(`/user/${userId}/company-detail`),
};

export default companyAPI;
