import { FC, useRef } from "react";
import { IconType } from "react-icons";

export type IconComponentProps = {
  iconType: IconType;
  onIconClick?: () => void;
};

export const IconComponent: FC<IconComponentProps> = ({
  iconType,
  onIconClick,
}) => {
  const icon = useRef(iconType({}));

  return (
    <div
      className="flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-full hover:bg-gray-600"
      onClick={onIconClick}>
      {icon.current}
    </div>
  );
};
