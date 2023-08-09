"use client";
import React, { FC, useRef } from "react";

import { CardComponent } from "@/components/card";
import { TextareaComponent } from "@/components/ui/textarea";
import { cn } from "@/utils/util";
import { Card } from "../../../../../packages/types/card";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

type ColumnProps = {
  title: string;
  columnId: number;
  cards: Array<Card>;
  onCardAdd: (text: string, columnName: string, columnId: number) => void;
  onCardRemove: (card: Card) => void;
  onCardEdit: (card: Card) => void;
};

export const ColumnComponent: FC<ColumnProps> = ({
  title,
  columnId,
  onCardAdd,
  cards,
  onCardRemove,
  onCardEdit,
}) => {
  const textArea = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef(null);
  const { isOver, setNodeRef } = useDroppable({
    id: columnId,
  });

  const handleKeyDownOnTextArea = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (!textArea.current || !textArea.current.value?.length) return;

      onCardAdd(textArea.current.value, title, columnId);
      textArea.current.value = "";
    }
  };

  const handleCardRemove = (card: Card) => {
    onCardRemove(card);
  };

  const handleCardEdit = (card: Card) => {
    onCardEdit(card);
  };

  const style = isOver ? "background: green" : "";

  return (
    <div
      className={cn(`flex h-full flex-col justify-between rounded-xl border bg-white
          shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7]`)}>
      <div
        className={cn(
          `flex-none rounded-t-xl border-b bg-gray-100 px-4 py-3
            dark:border-gray-700 dark:bg-gray-800 md:px-5 md:py-4`
        )}>
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {title}
        </h3>
      </div>

      <div
        ref={containerRef}
        className="h-[60vh] max-h-[60vh] flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-5">
        <div ref={setNodeRef} className={`h-full w-full ${style}`}>
          <SortableContext id={columnId.toString()} items={cards}>
            {cards.map((card: Card) => {
              return (
                <CardComponent
                  key={card.id}
                  card={card}
                  onCardRemove={handleCardRemove}
                  onCardEdit={handleCardEdit}
                />
              );
            })}
          </SortableContext>
        </div>
      </div>

      <div
        className={cn(`h-[15vh] max-h-[100px] flex-none overflow-y-auto rounded-b-xl border-t bg-gray-100 px-4 py-3
         dark:border-gray-700 dark:bg-gray-800 md:px-5 md:py-4`)}>
        <TextareaComponent
          textAreaRef={textArea}
          handleKeyDownOnTextArea={handleKeyDownOnTextArea}
          className="mb-2"
        />
      </div>
    </div>
  );
};
