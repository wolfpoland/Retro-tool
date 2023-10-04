import { FC, ReactNode } from "react";

export type IconWrapperProps = {
  className?: string;
  children: ReactNode;
  onIconClick?: () => void;
};

export const IconWrapper: FC<IconWrapperProps> = ({
  className,
  children,
  onIconClick,
}) => {
  return (
    <div
      className={`${
        className ?? ""
      } flex h-[30px] w-[30px] cursor-pointer items-center justify-center
       rounded-full p-1.5 hover:bg-gray-600`}>
      {children}
    </div>
  );
};
