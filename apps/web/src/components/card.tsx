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
import { motion } from "framer-motion";

export type CardProps = {
  card: Card;
  onCardRemove?: (card: Card) => void;
  onCardEdit?: (card: Card) => void;
};

enum ControlPanelAction {
  EDIT = "EDIT",
  REMOVE = "REMOVE",
}

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
    disabled: editMode,
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

  const onControlPanelClick = (key: ControlPanelAction | string) => {
    console.log("onControlPanelClick");
    switch (key) {
      case ControlPanelAction.EDIT:
        return handleEditOnClick();
      case ControlPanelAction.REMOVE:
        return handleRemoveOnClick();
    }
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
      setStyles("bg-gray-500");
    } else {
      setStyles("bg-gray-700");
    }
  }, [mouseOver]);

  const elements: Array<ControlPanelElement> = [
    {
      node: <IconComponent key={0} iconType={RxPencil1} />,
      index: ControlPanelAction.EDIT,
    },
    {
      node: <IconComponent key={1} iconType={RxTrash} />,
      index: ControlPanelAction.REMOVE,
    },
  ];

  return (
    <div onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className={`mb-4 flex justify-between rounded-xl border p-4
              shadow-sm transition  duration-200 ease-in-out dark:border-gray-600 dark:text-gray-300
           md:p-5 ${styles}
              `}>
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
        {mouseOver && (
          <motion.div
            style={{ opacity: mouseOver ? 1 : 0 }}
            transition={{ duration: 2 }}
            className="flex items-center justify-end">
            <ControlPanel onClick={onControlPanelClick} elements={elements} />
          </motion.div>
        )}
      </div>
    </div>
  );
};
