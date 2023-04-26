import React, { FC, useRef, useState } from 'react';
import { withReact } from 'slate-react';
import { createEditor } from 'slate';

type ColumnProps = {
  title: string;
  onCardSubmit: (text: string, columnName: string) => void;
};

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'lol' }]
  }
];


export const Column: FC<ColumnProps> = ({ title, onCardSubmit }) => {
  const [editor] = useState(() => withReact(createEditor()));
  const textArea = useRef<HTMLTextAreaElement>(null);

  const handleKeyDownOnTextArea = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (!textArea.current || !textArea.current.value?.length) return;

      onCardSubmit(textArea.current.value, title);
    }
  };

  return (
    <div
      className='flex flex-col bg-white border shadow-sm rounded-xl
          h-full
         dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]'>
      <div
        className='flex-none bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-gray-800 dark:border-gray-700'>
        <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
          {title}
        </h3>
      </div>

      <div className='p-4 md:p-5 flex-1'>

      </div>

      <div
        className='flex-none overflow-y-auto h-[15vh] bg-gray-100 border-t rounded-b-xl py-3 px-4 md:py-4
         md:px-5 dark:bg-gray-800 dark:border-gray-700'>
        {/*<p className='mt-1 text-sm text-gray-500 dark:text-gray-500'>*/}
        {/*  Write something here*/}
        {/*</p>*/}
        <textarea
          ref={textArea}
          onKeyDown={handleKeyDownOnTextArea}
          className='py-1 px-4 block w-full border-gray-200 rounded-md text-sm
           focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900
            dark:border-gray-700
            dark:text-gray-400 resize-none'
          placeholder='Write somethig here'
          rows={3}>
        </textarea>

        {/*<Slate editor={editor} value={initialValue}>*/}
        {/*  <Editable placeholder="test" className='py-1 px-4 block w-full border-gray-200 rounded-md text-sm*/}
        {/*   focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900*/}
        {/*    dark:border-gray-700*/}
        {/*    dark:text-gray-400 resize-none' />*/}
        {/*</Slate>*/}
      </div>
    </div>
  );
};
