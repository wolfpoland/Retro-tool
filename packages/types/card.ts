export type ColumnName = "Start" | "Adopt" | "Dont know";

export type Card = {
  id: string;
  text: string;
  columnName: ColumnName;
  columnId: string;
};
