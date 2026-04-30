// 試験日カウントダウンコンポーネント
// 試験日までの残り日数を表示する（試験日設定済みの場合のみ表示）

import React from 'react';

interface ExamCountdownProps {
  daysUntilExam: number;
}

const ExamCountdown: React.FC<ExamCountdownProps> = ({ daysUntilExam }) => {
  // 残り日数に応じた表示スタイルを決定
  const getStyle = (): { bg: string; text: string; border: string } => {
    if (daysUntilExam < 0) {
      return { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' };
    }
    if (daysUntilExam <= 7) {
      return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
    }
    if (daysUntilExam <= 30) {
      return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' };
    }
    return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
  };

  const style = getStyle();

  // 試験済みの場合の表示
  if (daysUntilExam < 0) {
    return (
      <div className={`rounded-xl border ${style.border} ${style.bg} px-6 py-4`}>
        <p className={`text-sm font-medium ${style.text}`}>
          試験日は過ぎています
        </p>
      </div>
    );
  }

  // 試験当日の表示
  if (daysUntilExam === 0) {
    return (
      <div className={`rounded-xl border ${style.border} ${style.bg} px-6 py-4`}>
        <p className={`text-xl font-bold ${style.text}`}>
          🎯 今日が試験日です！
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border ${style.border} ${style.bg} px-6 py-4 flex items-center gap-4`}>
      <span className="text-2xl">🗓️</span>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">試験まであと</p>
        <p className={`text-3xl font-bold ${style.text}`}>
          {daysUntilExam} <span className="text-lg font-semibold">日</span>
        </p>
      </div>
    </div>
  );
};

export default ExamCountdown;
