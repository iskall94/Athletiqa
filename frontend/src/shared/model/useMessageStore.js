import { create } from 'zustand';

export const useMessageStore = create((set) => ({
  isOpen: false,
  activeTab: 'chatt',
  openChat: () => set({ isOpen: true }),
  closeChat: () => set({ isOpen: false }),
  setTab: (tab) => set({ activeTab: tab }),
}));