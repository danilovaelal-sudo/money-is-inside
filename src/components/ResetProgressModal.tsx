"use client";

import { AnimatePresence, motion } from "framer-motion";

export function ResetProgressModal({
  isOpen,
  onClose,
  onConfirm
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/35 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-lg rounded-[32px] bg-milk p-6 text-navy shadow-card"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
          >
            <h3 className="text-2xl font-black uppercase">Вы уверены?</h3>
            <p className="mt-4 text-sm leading-7 text-navy/75">
              Все ответы, дневник и карта будут удалены из этого браузера.
            </p>
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-navy/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em]"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="rounded-full bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-navy"
              >
                Сбросить
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
