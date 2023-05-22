"use client";
import React, { FC, useRef } from "react";
import { Card } from "../../../../packages/types/card";

type ColumnProps = {
  title: "Start" | "Adopt" | "Dont know";
  cards: Array<Card>;
  onColumnSubmit: (
    text: string,
    columnName: "Start" | "Adopt" | "Dont know",
    columnId: string
  ) => void;
};

export const Column: FC<ColumnProps> = ({ title, onColumnSubmit, cards }) => {
  const textArea = useRef<HTMLTextAreaElement>(null);
  const columnId = useRef<string>(crypto.randomUUID());

  const handleKeyDownOnTextArea = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (!textArea.current || !textArea.current.value?.length) return;

      onColumnSubmit(textArea.current.value, title, columnId.current);
    }
  };

  return (
    <div
      className="flex flex-col bg-white border shadow-sm rounded-xl
          h-full
         dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]"
    >
      <div className="flex-none bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {title}
        </h3>
      </div>

      <div className="p-4 md:p-5 flex-1">
        {cards.map((card: Card) => {
          return (
            <div
              key={card.id}
              className="flex flex-col bg-white border shadow-sm rounded-xl
              p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700
              dark:shadow-slate-700/[.7] dark:text-gray-400"
            >
              {card.text}
            </div>
          );
        })}
      </div>

      <div
        className="flex-none overflow-y-auto h-[15vh] bg-gray-100 border-t rounded-b-xl py-3 px-4 md:py-4
         md:px-5 dark:bg-gray-800 dark:border-gray-700"
      >
        <textarea
          ref={textArea}
          onKeyDown={handleKeyDownOnTextArea}
          className="py-1 px-4 block w-full border-gray-200 rounded-md text-sm
           focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900
            dark:border-gray-700
            dark:text-gray-400 resize-none"
          placeholder="Write somethig here"
          rows={3}
        ></textarea>
      </div>
    </div>
  );
};
