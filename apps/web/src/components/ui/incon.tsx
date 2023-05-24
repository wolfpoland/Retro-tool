import { FC, useRef } from "react";
import { IconType } from "react-icons";

export type IconComponentProps = {
  iconType: IconType;
};

export const IconComponent: FC<IconComponentProps> = ({ iconType }) => {
  const icon = useRef(iconType({}));

  return (
    <div className="flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-full hover:bg-gray-600">
      {icon.current}
    </div>
  );
};
