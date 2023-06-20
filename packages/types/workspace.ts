import { Column, ColumnSchema } from "./column";
import { z } from "zod";

export type WorkspaceStatus = "CREATING_CARDS" | "GROUPING" | "VOTING";

export type Workspace = {
  id: number;
  name: string;
  // description: string;
  createdAt: string;
  updatedAt: string;
  column: Column[];
  status: WorkspaceStatus;
  // Todo: ADD MEMBERS
  // Todo: ADD admin
};

export const WorkspaceSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  status: z.string(),
  column: z.array(ColumnSchema).optional(),
});

export const createWorkspace = (rawWorkspace: Workspace) => {
  WorkspaceSchema.parse(rawWorkspace);

  return rawWorkspace as Workspace;
};
