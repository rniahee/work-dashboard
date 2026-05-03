'use client';

import { useEffect } from 'react';

import { Button } from './Button';

type Props = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({ message, onConfirm, onCancel }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-80 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm text-gray-700">{message}</p>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onCancel}>
            취소
          </Button>
          <Button type="button" variant="danger" onClick={onConfirm}>
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
