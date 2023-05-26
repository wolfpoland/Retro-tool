import React, { FC, useEffect, useState } from "react";
import { Card } from "../../../../packages/types/card";
import { RxPencil1, RxTrash } from "react-icons/rx";
import { IconComponent } from "@/components/ui/incon";

export type CardProps = {
  card: Card;
  onCardRemove: (card: Card) => void;
};

export const CardComponent: FC<CardProps> = ({ card, onCardRemove }) => {
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const [styles, setStyles] = useState<string>("");

  const handleMouseOver = () => {
    setMouseOver(true);
  };

  const handleMouseLeave = () => {
    setMouseOver(false);
  };

  const handleRemoveOnClick = () => {
    onCardRemove(card);
  };

  useEffect(() => {
    if (mouseOver) {
      setStyles("dark:bg-gray-500");
    } else {
      setStyles("dark:bg-gray-700");
    }
  }, [mouseOver]);

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className={`mb-4 flex flex-col rounded-xl border bg-white p-4
              shadow-sm dark:border-gray-600  dark:text-gray-300
              dark:shadow-slate-700/[.7] md:p-5 ${styles}`}>
      <div className="flex items-center justify-end">
        {mouseOver && (
          <div className="flex w-24 items-center justify-between rounded-md border bg-gray-700 px-2 py-1 dark:border-gray-600">
            <IconComponent iconType={RxPencil1} />
            <div className="h-4 w-1 border-r-2 border-gray-600"></div>
            <IconComponent
              iconType={RxTrash}
              onIconClick={handleRemoveOnClick}
            />
          </div>
        )}
      </div>

      {card.text}
    </div>
  );
};
