// 試験日カウントダウンコンポーネント
// 試験日までの残り日数を表示する（試験日設定済みの場合のみ表示）

import React from 'react';

interface ExamCountdownProps {
  daysUntilExam: number;
}

const ExamCountdown: React.FC<ExamCountdownProps> = ({ daysUntilExam }) => {
  // 残り日数に応じた表示スタイルを決定
  const getStyle = (): { bg: string; textMain: string; border: string; label: string } => {
    if (daysUntilExam < 0) {
      return {
        bg: 'bg-gray-50',
        textMain: 'text-gray-600',
        border: 'border-gray-200',
        label: '試験日は過ぎています',
      };
    }
    if (daysUntilExam <= 7) {
      return {
        bg: 'bg-red-50',
        textMain: 'text-red-700',
        border: 'border-red-200',
        label: '試験まであと',
      };
    }
    if (daysUntilExam <= 30) {
      return {
        bg: 'bg-amber-50',
        textMain: 'text-amber-700',
        border: 'border-amber-200',
        label: '試験まであと',
      };
    }
    return {
      bg: 'bg-blue-50',
      textMain: 'text-blue-700',
      border: 'border-blue-200',
      label: '試験まであと',
    };
  };

  const style = getStyle();

  // 試験済みの場合の表示
  if (daysUntilExam < 0) {
    return (
      <div className={`rounded-2xl border ${style.border} ${style.bg} px-6 py-4`}>
        <p className={`text-sm font-medium ${style.textMain}`}>
          試験日は過ぎています
        </p>
      </div>
    );
  }

  // 試験当日の表示
  if (daysUntilExam === 0) {
    return (
      <div className={`rounded-2xl border ${style.border} ${style.bg} px-6 py-4 text-center`}>
        <p className={`text-2xl font-bold ${style.textMain}`}>
          🎯 今日が試験日です！ベストを尽くしてください！
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border ${style.border} ${style.bg} px-6 py-4 flex items-center gap-4`}>
      <div className="text-3xl flex-shrink-0">🗓️</div>
      <div className="flex-1">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-0.5">
          {style.label}
        </p>
        <p className={`text-4xl font-bold leading-none ${style.textMain}`}>
          {daysUntilExam}
          <span className="text-xl font-semibold ml-1.5">日</span>
        </p>
      </div>
    </div>
  );
};

export default ExamCountdown;
