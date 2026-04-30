// メモ編集コンポーネント
// テキストエリアによる学習メモの入力・編集（最大1000文字）

import React from 'react';

interface MemoEditorProps {
  value: string;
  onChange: (value: string) => void;
}

// メモの最大文字数
const MAX_MEMO_LENGTH = 1000;

const MemoEditor: React.FC<MemoEditorProps> = ({ value, onChange }) => {
  const remainingChars = MAX_MEMO_LENGTH - value.length;
  const isOverLimit = remainingChars < 0;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 最大文字数を超えた入力は受け付けない
    if (e.target.value.length <= MAX_MEMO_LENGTH) {
      onChange(e.target.value);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        学習メモ
      </label>
      <textarea
        value={value}
        onChange={handleChange}
        rows={5}
        placeholder="このトピックに関するメモを記入してください..."
        className={`
          w-full rounded-lg border px-3 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
          resize-y transition-colors
          ${isOverLimit ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}
        `}
        maxLength={MAX_MEMO_LENGTH}
      />
      {/* 文字数カウンター */}
      <div className="flex justify-end mt-1">
        <span
          className={`text-xs ${
            remainingChars <= 100 ? 'text-red-500 font-medium' : 'text-gray-400'
          }`}
        >
          {value.length} / {MAX_MEMO_LENGTH}文字
        </span>
      </div>
    </div>
  );
};

export default MemoEditor;
