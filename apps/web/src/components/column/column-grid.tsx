"use client";
import React, {
  FC,
  MutableRefObject,
  useContext,
  useEffect,
  useState,
} from "react";
import { ColumnComponent } from "./column";
import { WsObserverContext } from "@/providers/ws";
import { useSelector } from "react-redux";
import {
  columnsSelector,
  previewSelector,
} from "@/store/selectors/column.selector";
import { Card, createCard } from "../../../../../packages/types/card";
import { store } from "@/store/store";
import {
  addingPreviewAction,
  addingPreviewSuccessAction,
  changeCardOrderAction,
  changeColumnAction,
  setColumnsAction,
} from "@/store/actions/column.action";
import { cn } from "@/utils/util";
import { Column } from "../../../../../packages/types/column";
import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { DragEndEvent } from "@dnd-kit/core/dist/types";
import { createPortal } from "react-dom";
import { CardComponent } from "@/components/card";
import { dndPortal } from "@/utils/dnd-portal";

export type ColumnMap = {
  [key: string]: Column;
};

export type ColumnGridComponentProps = {
  columnHash: ColumnMap;
  onCardAdd: (
    text: string,
    columnName: string,
    columnId: number
  ) => Promise<number>;
  onCardRemove: (id: number) => void;
  onCardUpdate: (card: Card) => void;
};
// Rzeczy do zrobienia:
// [] Dodac update column
// [] Dodac position dla card

export const ColumnGridComponent: FC<ColumnGridComponentProps> = ({
  columnHash,
  onCardAdd,
  onCardRemove,
  onCardUpdate,
}) => {
  const wsObserver = useContext(WsObserverContext);
  const columns = useSelector(columnsSelector);
  const { previewColumnId, previewCard } = useSelector(previewSelector);
  const [getCard, setCard] = useState<Card | null>(null);
  const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.4",
        },
      },
    }),
  };
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    store.dispatch(setColumnsAction(columnHash));
  }, [columnHash]);

  const handleCardAdd = async (
    text: string,
    columnName: string,
    columnId: number
  ) => {
    const id = await onCardAdd(text, columnName, columnId);

    const card = createCard({
      id,
      text,
      columnId: columnId,
    });

    wsObserver?.emitMessage({
      id: crypto.randomUUID(),
      userId: "To implement",
      type: "NEW_CARD",
      cargo: card,
    });
  };

  const handleCardRemove = (card: Card) => {
    onCardRemove(card.id);

    wsObserver?.emitMessage({
      id: crypto.randomUUID(),
      userId: "To implement",
      type: "CARD_REMOVE",
      cargo: {
        ...card,
      },
    });
  };

  const handleCardEdit = (card: Card) => {
    onCardUpdate(card);

    wsObserver?.emitMessage({
      id: crypto.randomUUID(),
      userId: "To implement",
      type: "CARD_EDIT",
      cargo: {
        ...card,
      },
    });
  };

  const onDragEnd = (event: DragEndEvent) => {
    if (!event.over) {
      return;
    }

    const currentOver = event?.over?.data.current;
    const data: MutableRefObject<{ card: Card }> = event.active
      .data as MutableRefObject<{ card: Card }>;

    if (
      currentOver &&
      currentOver["card"] &&
      currentOver.card.id !== data.current.card.id &&
      currentOver.card.columnId === data.current.card.columnId
    ) {
      const card: Card = currentOver.card;

      store.dispatch(
        changeCardOrderAction({
          card: data.current.card,
          collisionCard: card,
        })
      );

      return;
    } else if (previewColumnId) {
      store.dispatch(addingPreviewSuccessAction());
      const updatedCard = createCard({
        ...data.current.card,
        columnId: previewColumnId,
      });

      handleCardEdit(updatedCard);
      return;
    }

    const dropColumnId: number | undefined = currentOver
      ? parseInt(currentOver?.sortable?.containerId)
      : (event.over?.id as number | undefined);

    if (!dropColumnId) {
      return;
    }

    store.dispatch(
      changeColumnAction({
        card: data.current.card,
        dropColumnId,
      })
    );

    const updatedCard = createCard({
      ...data.current.card,
      columnId: dropColumnId,
    });

    handleCardEdit(updatedCard);
  };

  const onDragOver = (event: DragEndEvent) => {
    const currentActiveData: { card: Card } | undefined = event.active.data
      .current as { card: Card } | undefined;
    const currentOverData: { card: Card } | undefined = event.over?.data
      .current as { card: Card } | undefined;

    if (!currentActiveData?.card || !currentOverData?.card) {
      return;
    }

    if (
      currentActiveData &&
      currentOverData &&
      (previewCard ||
        currentActiveData.card.columnId === currentOverData.card.columnId ||
        currentActiveData.card.id === currentOverData.card.id)
    ) {
      return;
    }

    store.dispatch(
      addingPreviewAction({
        card: currentActiveData?.card as Card,
        overCard: currentOverData?.card as Card,
      })
    );
  };

  const onDragStart = (event: DragStartEvent) => {
    const data: MutableRefObject<{ card: Card }> = event.active
      .data as MutableRefObject<{ card: Card }>;
    setCard(data.current.card);
  };

  const generatedColumns = Object.keys(columns).map((key) => {
    const column = columns[key];

    return (
      <ColumnComponent
        key={key}
        columnId={column.id}
        onCardAdd={handleCardAdd}
        onCardRemove={handleCardRemove}
        onCardEdit={handleCardEdit}
        title={column.name}
        cards={column.card ?? []}
      />
    );
  });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}>
      <>
        <div
          className={cn(
            "mx-auto h-[110vh] max-w-[85rem] px-4 py-2 sm:px-6 lg:px-8 lg:py-6"
          )}>
          <div
            className={cn(
              "mt-12 grid h-[80vh] max-h-[80vh] gap-6 lg:grid-cols-3 lg:items-center"
            )}>
            {generatedColumns}
          </div>
        </div>
        {getCard &&
          createPortal(
            <DragOverlay dropAnimation={dropAnimationConfig}>
              <CardComponent card={getCard} />
            </DragOverlay>,
            dndPortal()
          )}
      </>
    </DndContext>
  );
};
