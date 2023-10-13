"use client";
import { FC, JSX } from "react";

export type TableWrapperProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  buttons: JSX.Element;
};

export const TableWrapper: FC<TableWrapperProps> = ({
  children,
  buttons,
  title,
  description,
}) => {
  return (
    <div className="container mx-auto mt-3 sm:px-6">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="inline-block min-w-full p-1.5 align-middle">
            <div className="h-[80vh] overflow-hidden rounded-xl border shadow-sm">
              <div className="border-b border-b-accent bg-accent px-6 py-4 text-accent-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{title ?? ""}</h2>
                    <p className="text-sm">{description ?? ""}</p>
                  </div>

                  <div>{buttons}</div>
                </div>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
