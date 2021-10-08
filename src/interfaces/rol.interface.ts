import { Permission } from "./permission.interface";

export interface Rol {
  id: string;
  name: string;
  description: string;
  status: string;
  permissions: Permission[];
  permission:String
}
