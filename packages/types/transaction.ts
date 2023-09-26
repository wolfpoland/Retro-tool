import { TransactionType } from "./transaction-type";

export type Transaction<Cargo> = {
  id: string;
  userId: string;
  type: TransactionType;
  token: string | undefined;
  channelId?: number;
  wsId?: string;

  cargo: Cargo;
};
