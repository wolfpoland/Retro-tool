import { FC } from "react";
import { Column } from "./column";


export const ColumnGrid: FC = () => {
  return (
    <div className="max-w-[85rem] px-4 py-2 sm:px-6 lg:px-8 lg:py-6 mx-auto">
      <div className="mt-12 h-[60vh] grid lg:grid-cols-3 gap-6 lg:items-center">
        <Column title="Start"></Column>
        <Column title="Adopt"></Column>
        <Column title="Dont know"></Column>
      </div>
    </div>
  );
};
