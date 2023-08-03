import React, { CSSProperties, FC, useEffect, useRef, useState } from "react";
import { Card } from "../../../../packages/types/card";
import { RxPencil1, RxTrash } from "react-icons/rx";
import { IconComponent } from "@/components/ui/icon";
import { TextareaComponent } from "@/components/ui/textarea";
import {
  ControlPanel,
  ControlPanelElement,
} from "@/components/ui/control-panel";
import { useSortable } from "@dnd-kit/sortable";

export type CardProps = {
  card: Card;
  onCardRemove?: (card: Card) => void;
  onCardEdit?: (card: Card) => void;
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
    transition,
  } = useSortable({
    id: card.id,
    data: {
      card,
    },
    // strategy: rectSwappingStrategy,
  });

  const handleMouseOver = () => {
    setMouseOver(true);
  };

  const handleMouseLeave = () => {
    setMouseOver(false);
  };

  const handleRemoveOnClick = () => {
    onCardRemove && onCardRemove(card);
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
      onCardEdit && onCardEdit(newCard);
      textArea.current.value = "";
      setEditMode(false);
    }
  };

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  useEffect(() => {
    if (mouseOver) {
      setStyles("dark:bg-gray-500");
    } else {
      setStyles("dark:bg-gray-700");
    }
  }, [mouseOver]);

  const elements: Array<ControlPanelElement> = [
    {
      node: (
        <IconComponent
          key={0}
          iconType={RxPencil1}
          onIconClick={handleEditOnClick}
        />
      ),
      index: "0",
    },
    {
      node: (
        <IconComponent
          key={1}
          iconType={RxTrash}
          onIconClick={handleRemoveOnClick}
        />
      ),
      index: "1",
    },
  ];

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`mb-4 flex flex-col rounded-xl border bg-white p-4
              shadow-sm dark:border-gray-600  dark:text-gray-300
              dark:shadow-slate-700/[.7] md:p-5 ${styles}
              `}>
      <div className="flex items-center justify-end">
        {mouseOver && <ControlPanel elements={elements} />}
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
