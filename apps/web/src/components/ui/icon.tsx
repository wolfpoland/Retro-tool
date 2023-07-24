import { FC, useRef } from "react";
import { IconType } from "react-icons";
import { IconWrapper } from "@/components/ui/icon-wrapper";

export type IconComponentProps = {
  iconType: IconType;
  onIconClick?: () => void;
};

export const IconComponent: FC<IconComponentProps> = ({
  iconType,
  onIconClick,
}) => {
  const icon = useRef(iconType({}));

  return <IconWrapper onIconClick={onIconClick}>{icon.current}</IconWrapper>;
};
