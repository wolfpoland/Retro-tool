"use client";
import { FC, useEffect, useState } from "react";
import { StatusItemsComponent } from "@/components/status/status-item";

export type StatusNavbarProps = {
  titles: Array<string>;
  position: "LEFT" | "RIGHT";
};

export const StatusNavbarComponent: FC<StatusNavbarProps> = ({
  titles,
  position,
}) => {
  const [styles, setStyles] = useState<string>("");

  useEffect(() => {
    position === "LEFT" ? setStyles("left-0") : setStyles("right-0");
  }, [position]);

  return (
    <nav
      className={`fixed bottom-0 -mt-px border-t bg-white pt-6
      text-sm font-medium text-black shadow-sm shadow-gray-100 ring-1
      ring-gray-900 ring-opacity-5 dark:border-gray-800 dark:bg-slate-900
      dark:shadow-slate-700/[.7] md:pb-6 ${styles}`}>
      <div
        className="scrollbar-x dark:scrollbar-x mx-auto flex w-full
        max-w-7xl snap-x items-center overflow-x-auto px-4 pb-4 sm:px-6
        md:pb-0 lg:px-8">
        <StatusItemsComponent titles={titles} />
      </div>
    </nav>
  );
};
