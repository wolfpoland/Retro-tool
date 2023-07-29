"use client";
import React, { FC, Fragment, ReactNode } from "react";

export enum ControlPanelIndex {
  KANBAN = "KANBAN",
  TABLE = "TABLE",
}

export type ControlPanelElement = {
  node: ReactNode;
  index: string;
};

export type ControlPanelProps = {
  selectedControlPanelIndex?: ControlPanelIndex;
  elements: Array<ControlPanelElement>;
  onClick?: (key: ControlPanelIndex) => void;
};

export const ControlPanel: FC<ControlPanelProps> = ({
  elements,
  selectedControlPanelIndex,
  onClick,
}) => {
  return (
    <div className="mb-1 flex w-24 items-center justify-between rounded-md border border-b-accent bg-card px-2 py-1">
      {elements.map(({ node, index }, _index) => {
        return (
          <Fragment key={index}>
            <div
              className={
                selectedControlPanelIndex === index
                  ? "rounded-md bg-muted text-muted-foreground"
                  : ""
              }
              onClick={() => onClick && onClick(index as ControlPanelIndex)}
              key={index}>
              {node}
            </div>
            {elements.length - 1 !== _index && (
              <div className="h-4 w-1 border-r-2 border-gray-600"></div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
