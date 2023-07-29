"use client";
import { ActionPlan } from "../../../../../../packages/types/action-plan";
import { FC, ReactNode, useState } from "react";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { ActionPlansTable } from "@/app/example-action-plans/(components)/action-plans-table";
import { ControlPanel, ControlPanelIndex } from "@/components/ui/control-panel";
import { IconWrapper } from "@/components/ui/icon-wrapper";
import { KanbanSquare, Table } from "lucide-react";
import { ActionPlansColumnGridWrapper } from "@/app/example-action-plans/(components)/action-plans-column-grid-wrapper";

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
      <div className="container mx-auto mt-3 flex items-center justify-end px-12">
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
