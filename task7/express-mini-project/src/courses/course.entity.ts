import { DatabaseEntity } from "../shared/repositories/generic.repository";

export interface Course extends DatabaseEntity {
  title: string;
  description: string;
  image?: string;
  createdBy: string; 
}