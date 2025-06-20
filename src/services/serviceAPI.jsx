import apiClient from "./api";

const serviceAPI = {
  getCompanyServices: (userId) =>
    apiClient.get(`/user/${userId}/company-service`),

  getServiceDetail: (userId, serviceId) =>
    apiClient.get(`/user/${userId}/company-service/${serviceId}`),
  createService: (userId, data) =>
    apiClient.post(`/user/${userId}/company-service`, data),

  updateService: (userId, serviceId, data) =>
    apiClient.put(`/user/${userId}/company-service/${serviceId}`, data),
  partialUpdateService: (userId, serviceId, data) =>
    apiClient.patch(`/user/${userId}/company-service/${serviceId}`, data),

  deleteService: (userId, serviceId) =>
    apiClient.delete(`/user/${userId}/company-service/${serviceId}`),

  getDisplayedServices: (userId) =>
    apiClient.get(`/user/${userId}/displayed-service`),
};

export default serviceAPI;
