import { create } from 'zustand';

type ModalType = 'onboarding' | 'celebration' | 'report' | null;

interface ModalState {
  activeModal: ModalType;
  modalData: Record<string, unknown> | null;
  openModal: (type: Exclude<ModalType, null>, data?: Record<string, unknown>) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  modalData: null,
  openModal: (type, data) => set({ activeModal: type, modalData: data ?? null }),
  closeModal: () => set({ activeModal: null, modalData: null }),
}));
