import { FC } from "react";

export type StatusItemProps = {
  titles: Array<string>;
};

export const StatusItems: FC<StatusItemProps> = ({ titles = [] }) => {
  return (
    <>
      {titles.map((title: string) => {
        return (
          <div
            key={title}
            className="snap-center text-center px-8 shrink-0  sm:last-pr-0
         border-r-2 border-gray-200 dark:border-gray-700">
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
