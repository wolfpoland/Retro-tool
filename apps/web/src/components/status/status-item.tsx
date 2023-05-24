import { FC } from "react";

export type StatusItemProps = {
  titles: Array<string>;
};

export const StatusItemsComponent: FC<StatusItemProps> = ({ titles = [] }) => {
  return (
    <>
      {titles.map((title: string) => {
        return (
          <div
            key={title}
            className="sm:last-pr-0 shrink-0 snap-center border-r-2  border-gray-200
            px-8 text-center dark:border-gray-700">
            <span
              className="inline-flex items-center gap-x-2 hover:text-gray-500
              dark:text-gray-400 dark:hover:text-gray-500">
              {title}
            </span>
          </div>
        );
      })}
    </>
  );
};
