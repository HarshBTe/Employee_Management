export interface Employee {
  _id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  salary: number;
  joiningDate: string;
  status: "Active" | "Inactive";
  role: "Super Admin" | "HR Manager" | "Employee";
  manager?:
  | string
  | {
      _id: string;
      name: string;
      employeeId: string;
    };
  profileImage?: string;
}