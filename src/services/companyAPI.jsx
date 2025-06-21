import apiClient from "./api";

const companyAPI = {
  getCompanies: () => apiClient.get("/companies"),
  createCompany: (userId, data) =>
    apiClient.post(`/user/${userId}/company`, data),
  update: (userId, data) =>
    apiClient.put(`/user/${userId}/company-detail`, data),
  delete: (userId) => apiClient.delete(`/user/${userId}/company-detail`),
  getCompanyByUser: (userId) => apiClient.get(`/user/${userId}/company-detail`),
  getCompanyDetail: (userId) => apiClient.get(`/user/${userId}/company-detail`),
};

export default companyAPI;
