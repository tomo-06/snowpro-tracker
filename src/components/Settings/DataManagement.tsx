// データ管理コンポーネント
// JSONエクスポート・インポート・リセット機能を提供する

import React, { useRef, useState } from 'react';
import { AppData } from '../../types';
import { exportAppData, importAppData } from '../../utils/exportImport';

interface DataManagementProps {
  appData: AppData;
  onImport: (newData: AppData) => void;
  onReset: () => void;
}

const DataManagement: React.FC<DataManagementProps> = ({ appData, onImport, onReset }) => {
  // インポートの処理状態
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  // リセット確認ダイアログの表示状態
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // ファイル入力要素への参照
  const fileInputRef = useRef<HTMLInputElement>(null);

  // エクスポートボタンの処理
  const handleExport = () => {
    try {
      exportAppData(appData);
    } catch (error) {
      console.error('エクスポートに失敗しました:', error);
      alert('エクスポートに失敗しました。');
    }
  };

  // ファイル選択後のインポート処理
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 状態をリセット
    setImportError(null);
    setImportSuccess(false);
    setIsImporting(true);

    try {
      const importedData = await importAppData(file);
      onImport(importedData);
      setImportSuccess(true);
      // 3秒後に成功メッセージを消す
      setTimeout(() => setImportSuccess(false), 3000);
    } catch (error) {
      const message = error instanceof Error ? error.message : '不明なエラーが発生しました';
      setImportError(message);
    } finally {
      setIsImporting(false);
      // ファイル入力をリセット（同じファイルを再インポートできるように）
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // データリセットの確認後処理
  const handleReset = () => {
    onReset();
    setShowResetConfirm(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-5">
      <h2 className="text-base font-bold text-gray-800">データ管理</h2>

      {/* エクスポートセクション */}
      <div className="border border-gray-100 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">データのエクスポート</h3>
        <p className="text-xs text-gray-500 mb-3">
          現在の学習データをJSONファイルとしてダウンロードします。バックアップとして保存してください。
        </p>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          JSONでエクスポート
        </button>
      </div>

      {/* インポートセクション */}
      <div className="border border-gray-100 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">データのインポート</h3>
        <p className="text-xs text-gray-500 mb-3">
          エクスポートしたJSONファイルを選択してデータを復元します。
          <span className="text-red-500 font-medium">現在のデータは上書きされます。</span>
        </p>

        {/* 隠しファイル入力 */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFileChange}
          className="hidden"
          id="import-file-input"
        />
        <label
          htmlFor="import-file-input"
          className={`inline-block px-4 py-2 text-sm font-medium rounded-lg border cursor-pointer transition-colors ${
            isImporting
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              : 'bg-white text-green-600 border-green-400 hover:bg-green-50'
          }`}
        >
          {isImporting ? 'インポート中...' : 'JSONファイルを選択'}
        </label>

        {/* エラーメッセージ */}
        {importError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-600 font-medium">{importError}</p>
          </div>
        )}

        {/* 成功メッセージ */}
        {importSuccess && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-xs text-green-700 font-medium">
              データのインポートに成功しました。
            </p>
          </div>
        )}
      </div>

      {/* リセットセクション */}
      <div className="border border-red-100 rounded-lg p-4 bg-red-50">
        <h3 className="text-sm font-semibold text-red-700 mb-1">データのリセット</h3>
        <p className="text-xs text-red-600 mb-3">
          全ての学習データを初期状態にリセットします。この操作は取り消せません。
        </p>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 bg-white text-red-500 text-sm font-medium rounded-lg border border-red-300 hover:bg-red-50 transition-colors"
          >
            初期データにリセット
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              リセットを実行
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-4 py-2 bg-white text-gray-600 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataManagement;
