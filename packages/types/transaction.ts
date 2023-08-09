import { TransactionType } from "./transaction-type";

export type Transaction<Cargo> = {
  id: string;
  userId: string;
  type: TransactionType;
  wsId?: string;

  cargo: Cargo;
};
