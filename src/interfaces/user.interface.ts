import { Rol } from "./rol.interface";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  rolId: number | string;
  role: Rol;
  permission?:String
  createdAt?: string;
}
 