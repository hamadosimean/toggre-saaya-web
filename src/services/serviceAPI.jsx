import apiClient from "./api";

const serviceAPI = {
  getCompanyServices: (userId) =>
    apiClient.get(`/user/${userId}/company-service`),

  getServiceDetail: (userId, serviceId) =>
    apiClient.get(`/user/${userId}/company-service/${serviceId}`),

  getDisplayedServices: (userId) =>
    apiClient.get(`/user/${userId}/displayed-service`),
};

export default serviceAPI;
