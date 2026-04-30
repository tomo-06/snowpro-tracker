// ドメインフィルターコンポーネント
// トピック一覧のドメイン絞り込みフィルターを表示する

import React from 'react';
import { Domain } from '../../types';

interface DomainFilterProps {
  domains: Domain[];
  selectedDomainId: string | null; // null = 全ドメイン表示
  onChange: (domainId: string | null) => void;
}

const DomainFilter: React.FC<DomainFilterProps> = ({ domains, selectedDomainId, onChange }) => {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">
        ドメインで絞り込み
      </label>
      <div className="flex flex-wrap gap-1.5">
        {/* 「全て」ボタン */}
        <button
          onClick={() => onChange(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            selectedDomainId === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          全ドメイン
        </button>

        {/* 各ドメインのボタン */}
        {domains.map((domain) => (
          <button
            key={domain.id}
            onClick={() => onChange(domain.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedDomainId === domain.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {domain.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DomainFilter;
