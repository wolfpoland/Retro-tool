import { Workspace as WorkspaceModel } from "../../../../../packages/types/workspace";
import { WorkspaceTable } from "@/app/workspace/(components)/workspace-table";
import prisma from "@/utils/prisma";

// const mockData: Array<Workspace> = [
//   {
//     id: "1",
//     name: "test",
//     createdAt: "25-10-1994",
//     updatedAt: "25-10-1994",
//     columns: [],
//   },
//   {
//     id: "12",
//     name: "test2",
//     createdAt: "25-10-1994",
//     updatedAt: "25-10-1994",
//     columns: [],
//   },
//   {
//     id: "13",
//     name: "test3",
//     createdAt: "25-10-1994",
//     updatedAt: "25-10-1994",
//     columns: [],
//   },
// ];

const getWorkspaces = async (): Promise<Array<WorkspaceModel>> => {
  const workspaces = await prisma.workspace.findMany({
    include: {
      column: true,
    },
  });

  return workspaces.map((data) => {
    return {
      id: data.id.toString(),
      name: data.name,
      columns: [],
      updatedAt: "",
      createdAt: "",
    } as WorkspaceModel;
  });
};

export default async function Workspace() {
  const workspaces = await getWorkspaces();

  return (
    <div>
      <WorkspaceTable workspaces={workspaces} />
    </div>
  );
}
