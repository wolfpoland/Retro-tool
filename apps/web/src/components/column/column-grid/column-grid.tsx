"use client";
import React, {
  FC,
  MutableRefObject,
  useContext,
  useEffect,
  useState,
} from "react";
import { ColumnComponent } from "../column";
import { WsObserverContext } from "@/providers/ws";
import { useSelector } from "react-redux";
import {
  columnsSelector,
  columnToUpdateSelector,
  previewSelector,
} from "@/store/selectors/column.selector";
import { Card, createCard } from "../../../../../../packages/types/card";
import { store } from "@/store/store";
import {
  addingPreviewAction,
  addingPreviewSuccessAction,
  changeCardOrderAction,
  changeColumnAction,
  ChangeColumnActionType,
  createCardAction,
  editCardAction,
  removeCardAction,
  setColumnsAction,
} from "@/store/actions/column.action";
import { cn } from "@/utils/util";
import { Column } from "../../../../../../packages/types/column";
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
import { ClientCalls } from "@/client-calls";
import { useSession } from "next-auth/react";

export type ColumnMap = {
  [key: string]: Column;
};

export type ColumnGridComponentProps = {
  columnHash: ColumnMap;
  onCardAdd: (
    text: string,
    columnName: string,
    columnId: number
  ) => Promise<number | undefined>;
  onCardRemove: (id: number) => void;
  onCardUpdate: (card: Card) => void;
};

export const ColumnGridComponent: FC<ColumnGridComponentProps> = ({
  columnHash,
  onCardAdd,
  onCardRemove,
  onCardUpdate,
}) => {
  const session = useSession();
  const wsObserver = useContext(WsObserverContext);
  const columns = useSelector(columnsSelector);
  const columnToUpdate = useSelector(columnToUpdateSelector);
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
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    store.dispatch(setColumnsAction(columnHash));
  }, [columnHash]);

  useEffect(() => {
    columnToUpdate && ClientCalls.updateColumCardsPositions(columnToUpdate);
  }, [columnToUpdate]);

  const handleCardAdd = async (
    text: string,
    columnName: string,
    columnId: number
  ) => {
    const id = await onCardAdd(text, columnName, columnId);

    if (!id) {
      return;
    }

    const card = createCard({
      id,
      text,
      position: columnHash[columnId].card.length - 1,
      columnId: columnId,
    });

    wsObserver?.emitMessage({
      id: crypto.randomUUID(),
      userId: "To implement",
      type: "NEW_CARD",
      token: session.data?.token,
      cargo: card,
    });

    store.dispatch(createCardAction(card));
  };

  const handleCardRemove = (card: Card) => {
    onCardRemove(card.id);

    wsObserver?.emitMessage({
      id: crypto.randomUUID(),
      userId: "To implement",
      type: "CARD_REMOVE",
      token: session.data?.token,
      cargo: {
        ...card,
      },
    });

    store.dispatch(removeCardAction(card));
  };

  const handleCardEdit = (card: Card) => {
    onCardUpdate(card);

    wsObserver?.emitMessage({
      id: crypto.randomUUID(),
      userId: "To implement",
      type: "CARD_EDIT",
      token: session.data?.token,
      cargo: {
        ...card,
      },
    });

    store.dispatch(editCardAction(card));
  };

  const handleCardMove = (changeColumnActionType: ChangeColumnActionType) => {
    const { card, dropColumnId } = changeColumnActionType;
    onCardUpdate(
      createCard({
        ...card,
        columnId: dropColumnId,
      })
    );

    wsObserver?.emitMessage({
      id: crypto.randomUUID(),
      userId: "To implement",
      token: session.data?.token,
      type: "CARD_MOVE",
      cargo: {
        ...changeColumnActionType,
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
      currentOver.card.id !== data.current?.card?.id &&
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

    handleCardMove({
      card: data.current.card,
      dropColumnId,
    });
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
            "mx-auto h-[110vh] max-w-[85rem] px-4 pb-2 sm:px-6 lg:px-8 lg:pb-3"
          )}>
          <div
            className={cn(
              "mt-6 grid h-[80vh] max-h-[80vh] gap-6 lg:grid-cols-3 lg:items-center"
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
