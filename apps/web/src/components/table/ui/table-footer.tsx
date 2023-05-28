import { FC } from "react";
import { cn } from "@/utils/util";

export const TableFooter: FC = () => {
  return (
    <div
      className={cn(`grid gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700
       md:flex md:items-center md:justify-between`)}>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            0
          </span>{" "}
          results
        </p>
      </div>

      <div>
        <div className="inline-flex gap-x-2">
          <div
            className={cn(`inline-flex items-center justify-center gap-2 rounded-md border bg-white px-3 py-2
             text-sm font-medium text-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400`)}>
            <svg
              className="h-3 w-3"
              width="16"
              height="16"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.506 1.64001L4.85953 7.28646C4.66427 7.48172 4.66427 7.79831 4.85953 7.99357L10.506 13.64"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            Prev
          </div>

          <div
            className={cn(`inline-flex items-center justify-center gap-2 rounded-md border bg-white px-3 py-2
             text-sm font-medium text-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400`)}>
            Next
            <svg
              className="h-3 w-3"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.50598 2L10.1524 7.64645C10.3477 7.84171 10.3477 8.15829 10.1524 8.35355L4.50598 14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
