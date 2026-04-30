// 分野別進捗カード一覧コンポーネント
// 全ドメインの進捗カードをグリッド表示する

import React from 'react';
import { DomainProgress } from '../../types';
import DomainProgressCard from './DomainProgressCard';

interface DomainProgressListProps {
  domainProgresses: DomainProgress[];
}

const DomainProgressList: React.FC<DomainProgressListProps> = ({ domainProgresses }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-3">分野別進捗</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {domainProgresses.map((progress) => (
          <DomainProgressCard key={progress.domain.id} progress={progress} />
        ))}
      </div>
    </div>
  );
};

export default DomainProgressList;
