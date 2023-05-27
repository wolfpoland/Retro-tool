import React, { FC } from "react";

export type TextareaProps = {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  handleKeyDownOnTextArea: (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => void;
  className?: string;
  rows?: number;
  value?: string;
};

export const TextareaComponent: FC<TextareaProps> = ({
  handleKeyDownOnTextArea,
  textAreaRef,
  className = "",
  rows = 2,
  value = "",
}) => {
  return (
    <textarea
      ref={textAreaRef}
      defaultValue={value}
      onKeyDown={handleKeyDownOnTextArea}
      className={`${className} block w-full resize-none rounded-md border-gray-200 px-4 py-1
           text-sm focus:border-blue-500 focus:ring-blue-500
            dark:border-gray-700
            dark:bg-slate-900 dark:text-gray-400`}
      placeholder="Write somethig here"
      rows={rows}></textarea>
  );
};
