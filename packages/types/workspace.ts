import { Column } from "./column";

export type Workspace = {
  id: string;
  name: string;
  // description: string;
  createdAt: string;
  updatedAt: string;
  column: Column[];
  // Todo: ADD MEMBERS
  // Todo: ADD admin
};
