// src/presentation/components/common/Dialog.tsx
import { Dialog as HeadlessDialog } from '@headlessui/react';

export const Dialog = ({ isOpen, onClose, children }: any) => (
  <HeadlessDialog open={isOpen} onClose={onClose}>
    {/* Aquí no se usa Dialog.Overlay ni Dialog.Panel directamente. */}
    <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true"></div>
    <HeadlessDialog.Panel className="fixed inset-0 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        {children}
      </div>
    </HeadlessDialog.Panel>
  </HeadlessDialog>
);
