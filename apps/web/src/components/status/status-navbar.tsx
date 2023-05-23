import { FC } from "react";
import { StatusItems } from "@/components/status/status-item";

export type StatusNavbarProps = {
  titles: Array<string>;
};

export const StatusNavbar: FC<StatusNavbarProps> = ({ titles = [] }) => {
  return (
    <nav
      className="fixed bottom-0 bg-white text-sm font-medium text-black
    ring-1 ring-gray-900 ring-opacity-5 border-t shadow-sm shadow-gray-100
     pt-6 md:pb-6 -mt-px dark:bg-slate-900 dark:border-gray-800 dark:shadow-slate-700/[.7]">
      <div
        className="max-w-7xl snap-x w-full flex items-center
       overflow-x-auto scrollbar-x px-4 sm:px-6 lg:px-8 pb-4 md:pb-0
       mx-auto dark:scrollbar-x">
        <StatusItems titles={titles} />
      </div>
    </nav>
  );
};
