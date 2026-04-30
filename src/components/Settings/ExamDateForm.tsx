// 試験日設定フォームコンポーネント
// 日付ピッカーで試験予定日を入力・保存する

import React, { useState } from 'react';

interface ExamDateFormProps {
  examDate: string | null;
  onSave: (examDate: string | null) => void;
}

const ExamDateForm: React.FC<ExamDateFormProps> = ({ examDate, onSave }) => {
  const [inputValue, setInputValue] = useState<string>(examDate ?? '');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // 試験日を保存する
  const handleSave = () => {
    const newExamDate = inputValue.trim() === '' ? null : inputValue;
    onSave(newExamDate);
    setSaveMessage('保存しました');
    // 2秒後にメッセージを消す
    setTimeout(() => setSaveMessage(null), 2000);
  };

  // 試験日をクリアする
  const handleClear = () => {
    setInputValue('');
    onSave(null);
    setSaveMessage('試験日をクリアしました');
    setTimeout(() => setSaveMessage(null), 2000);
  };

  const hasChanged = inputValue !== (examDate ?? '');

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h2 className="text-base font-bold text-gray-800 mb-1">試験日設定</h2>
      <p className="text-xs text-gray-500 mb-4">
        試験予定日を設定するとダッシュボードにカウントダウンが表示されます。
      </p>

      <div className="flex items-end gap-3">
        {/* 日付入力フォーム */}
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            試験予定日
          </label>
          <input
            type="date"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 保存ボタン */}
        <button
          onClick={handleSave}
          disabled={!hasChanged}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            hasChanged
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          保存
        </button>

        {/* クリアボタン（試験日設定済みの場合のみ表示） */}
        {examDate && (
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 border border-red-200 transition-colors"
          >
            クリア
          </button>
        )}
      </div>

      {/* 保存メッセージ */}
      {saveMessage && (
        <p className="mt-2 text-xs text-green-600 font-medium">{saveMessage}</p>
      )}

      {/* 現在設定中の試験日 */}
      {examDate && (
        <p className="mt-3 text-xs text-gray-500">
          現在の設定:{' '}
          <span className="font-semibold text-gray-700">
            {new Date(examDate).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </p>
      )}
    </div>
  );
};

export default ExamDateForm;
