import axiosInstance from "../api/axios";
import type { Employee } from "../types/employee";

export interface EmployeeQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  role?: string;
  status?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

// ================= Dashboard =================

export const getDashboardStats = () =>
  axiosInstance.get("/dashboard/stats");

export const getDepartmentChart = () =>
  axiosInstance.get("/dashboard/department-chart");

// ================= Employees =================

export const getEmployees = (
  params?: EmployeeQueryParams
) => axiosInstance.get("/employees", { params });

export const getEmployeeById = (id: string) =>
  axiosInstance.get(`/employees/${id}`);

export const createEmployee = (data: FormData) =>
  axiosInstance.post("/employees", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateEmployee = (
  id: string,
  data: FormData
) =>
  axiosInstance.put(`/employees/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteEmployee = (id: string) =>
  axiosInstance.delete(`/employees/${id}`);

export const assignManager = (
  id: string,
  managerId: string
) =>
  axiosInstance.put(`/employees/${id}/manager`, {
    managerId,
  });

export const getReportees = (id: string) =>
  axiosInstance.get(`/employees/${id}/reportees`);

// ================= Organization =================

export const getOrganizationTree = () =>
  axiosInstance.get("/organization/tree");

// ================= Profile =================

export const getMyProfile = () =>
  axiosInstance.get("/employees/me/profile");

export const updateMyProfile = (data: FormData) =>
  axiosInstance.put("/employees/me/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });