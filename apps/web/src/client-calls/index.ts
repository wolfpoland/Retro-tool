import { addCard, deleteCard, updateCard } from "./card";
import { addWorkspace } from "./workspace/add";
import { deleteWorkspace } from "@/client-calls/workspace/remove";
import { editWorkspace } from "@/client-calls/workspace/edit";
import { addActionPlan } from "@/client-calls/action-plan/add";

export const ClientCalls = {
  addCard,
  updateCard,
  deleteCard,
  addWorkspace,
  deleteWorkspace,
  editWorkspace,
  addActionPlan,
};
