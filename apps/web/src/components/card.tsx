import React, { FC, useEffect, useRef, useState } from "react";
import { Card } from "../../../../packages/types/card";
import { RxPencil1, RxTrash } from "react-icons/rx";
import { IconComponent } from "@/components/ui/icon";
import { TextareaComponent } from "@/components/ui/textarea";

export type CardProps = {
  card: Card;
  onCardRemove: (card: Card) => void;
  onCardEdit: (card: Card) => void;
};

export const CardComponent: FC<CardProps> = ({
  card,
  onCardRemove,
  onCardEdit,
}) => {
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [styles, setStyles] = useState<string>("");
  const textArea = useRef<HTMLTextAreaElement>(null);

  const handleMouseOver = () => {
    setMouseOver(true);
  };

  const handleMouseLeave = () => {
    setMouseOver(false);
  };

  const handleRemoveOnClick = () => {
    onCardRemove(card);
  };

  const handleEditOnClick = () => {
    setEditMode(true);
  };

  const handleKeyDownOnTextArea = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (!textArea.current || !textArea.current.value?.length) return;
      const newCard = { ...card, text: textArea.current.value };
      onCardEdit(newCard);
      textArea.current.value = "";
      setEditMode(false);
    }
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
          <div className="mb-1 flex w-24 items-center justify-between rounded-md border bg-gray-700 px-2 py-1 dark:border-gray-600">
            <IconComponent
              iconType={RxPencil1}
              onIconClick={handleEditOnClick}
            />
            <div className="h-4 w-1 border-r-2 border-gray-600"></div>
            <IconComponent
              iconType={RxTrash}
              onIconClick={handleRemoveOnClick}
            />
          </div>
        )}
      </div>

      {editMode ? (
        <TextareaComponent
          value={card.text}
          textAreaRef={textArea}
          handleKeyDownOnTextArea={handleKeyDownOnTextArea}
          rows={1}
        />
      ) : (
        card.text
      )}
    </div>
  );
};
