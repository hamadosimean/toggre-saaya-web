import api from "./api";

const companyAPI = {
  getCompanies: () => api.get("/companies"),
};

export default companyAPI;
