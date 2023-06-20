import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// TODO: Think which way of getting data is better
export const workspaceApi = createApi({
  reducerPath: "workspace",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/workspace/",
  }),
  endpoints: (builder) => ({
    deleteWorkspace: builder.mutation<void, number>({
      query(workspaceId: number) {
        return {
          url: `delete-workspace`,
          method: "POST",
          body: { workspaceId },
        };
      },
    }),
  }),
});

export const { useDeleteWorkspaceMutation } = workspaceApi;
