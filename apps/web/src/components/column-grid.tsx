"use client";
import { FC } from "react";
import { Column } from "./column";
import { WsStore } from "@/store/ws-store";

export const ColumnGrid: FC = () => {
  const onColumnSubmit = (text: string, columnName: string) => {
    WsStore.setState((state) => {
      const messagesToSynchronize = state.messagesToSynchronize;

      return { messagesToSynchronize: [...state.messagesToSynchronize, text] };
    });
  };

  return (
    <div className="max-w-[85rem] px-4 py-2 sm:px-6 lg:px-8 lg:py-6 mx-auto">
      <div className="mt-12 h-[70vh] grid lg:grid-cols-3 gap-6 lg:items-center">
        <Column onColumnSubmit={onColumnSubmit} title="Start"></Column>
        <Column onColumnSubmit={onColumnSubmit} title="Adopt"></Column>
        <Column onColumnSubmit={onColumnSubmit} title="Dont know"></Column>
      </div>
    </div>
  );
};
