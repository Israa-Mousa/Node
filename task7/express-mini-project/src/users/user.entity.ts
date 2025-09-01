import { DatabaseEntity } from "../shared/repositories/generic.repository";
import { Role } from "../shared/repositories/role.enum";

export interface User extends DatabaseEntity  {
  name: string;
  email: string;
  password: string;
  role: Role;
}
