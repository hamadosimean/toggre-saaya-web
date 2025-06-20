import apiClient from "./api";

const queueAPI = {
  getSlotList: (userId, serviceId) =>
    apiClient.get(`/user/${userId}/company-service/${serviceId}/slot`),

  reserveSlot: (userId, serviceId) =>
    apiClient.post(`/user/${userId}/company-service/${serviceId}/slot`),

  getSlotDetail: (userId, serviceId, slotId) =>
    apiClient.get(
      `/user/${userId}/company-service/${serviceId}/slot/${slotId}`
    ),

  getQueueCount: (userId, serviceId) =>
    apiClient.get(`/user/${userId}/company-service/${serviceId}/queue-count`),

  getWaitingCount: (userId, serviceId) =>
    apiClient.get(`/user/${userId}/company-service/${serviceId}/waiting`),

  getCurrentAndNext: (userId, serviceId) =>
    apiClient.get(
      `/user/${userId}/company-service/${serviceId}/current-next-queue`
    ),

  performAction: (userId, serviceId, slotId, data) =>
    apiClient.post(
      `/user/${userId}/company-service/${serviceId}/slot/${slotId}/action`,
      data
    ),
};

export default queueAPI;
