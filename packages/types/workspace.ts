import { Column } from "./column";

export type Workspace = {
  id: string;
  name: string;
  // description: string;
  createdAt: string;
  updatedAt: string;
  columns: Column[];
  // Todo: ADD MEMBERS
  // Todo: ADD admin
};
