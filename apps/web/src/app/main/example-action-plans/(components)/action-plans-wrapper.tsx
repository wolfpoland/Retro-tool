"use client";
import { ActionPlan } from "../../../../../../../packages/types/action-plan";
import { FC, ReactNode, useState } from "react";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { ActionPlansTable } from "@/app/main/example-action-plans/(components)/action-plans-table";
import { ControlPanel, ControlPanelIndex } from "@/components/ui/control-panel";
import { IconWrapper } from "@/components/ui/icon-wrapper";
import { KanbanSquare, Table } from "lucide-react";
import { ActionPlansColumnGridWrapper } from "@/app/main/example-action-plans/(components)/action-plans-column-grid-wrapper";
import { cn } from "@/lib/utils";

export type ActionPlansTableProps = {
  actionPlans: ActionPlan[];
};

const elements: Array<{ node: ReactNode; index: string }> = [
  {
    node: (
      <IconWrapper key="1">
        <KanbanSquare />
      </IconWrapper>
    ),
    index: ControlPanelIndex.KANBAN,
  },
  {
    node: (
      <IconWrapper key="0">
        <Table />
      </IconWrapper>
    ),
    index: ControlPanelIndex.TABLE,
  },
];

export const ActionPlansTableWrapper: FC<ActionPlansTableProps> = ({
  actionPlans,
}) => {
  const [controlPanelIndex, setControlPanel] = useState<ControlPanelIndex>(
    ControlPanelIndex.KANBAN
  );

  const onControlPanelClick = (key: ControlPanelIndex) => {
    setControlPanel(key);
  };

  return (
    <Provider store={store}>
      <div
        className={cn(
          `${
            controlPanelIndex === ControlPanelIndex.KANBAN
              ? "justify-between"
              : "justify-end"
          } container mx-auto mt-3 flex items-center px-12 pt-14`
        )}>
        {controlPanelIndex === ControlPanelIndex.KANBAN && (
          <div className={cn("px-4 text-xl font-semibold")}>
            Action Plans
            <p className="text-sm">Manage action plans of your team</p>
          </div>
        )}
        <ControlPanel
          selectedControlPanelIndex={controlPanelIndex}
          elements={elements}
          onClick={onControlPanelClick}
        />
      </div>

      {controlPanelIndex === ControlPanelIndex.KANBAN ? (
        <ActionPlansColumnGridWrapper actionPlans={actionPlans} />
      ) : (
        <ActionPlansTable actionPlans={actionPlans} />
      )}
    </Provider>
  );
};
